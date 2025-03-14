/* eslint-disable max-lines */
import datadog from 'lib/datadog';
import { takeLatest, select, put, delay, all, call, retry } from 'redux-saga/effects';
import { PRINT_TICKET, CONTINUE_TO_CONFIRMATION } from 'actions/types';
import Debug from 'debug';
import {
	printTicket,
	printReceipt,
	selectOrderToService,
	setAppAlert,
	resetQuicksale,
	onKioskTransactionComplete,
	setInFlightAction,
	flushPrint,
	loading,
	updateOrderMassPrintTickets
} from 'actions';
import {
	getTicketsData,
	shouldCollectAttendeeDetails,
	isCollectAttendeeDetailsOnQuickSaleCheckoutEnabled,
	isAttendeeDetailsNotRequiredInRegularBoxOfficeEnabled,
	getAttendeeModalOnCheckoutOpen,
	getOrderToService,
	getOrderToServiceConfirmation,
	getLocaleRoot,
	getPrintBocaOnConfirmation,
	getOrderResult,
	getPropertyId,
	getSelectedOrderPropertySettings,
	getSellerNodeId,
	isQuickSale,
	getSellerNodeSettings,
	isKioskMode,
	getBillingFormValues,
	shouldPrintTicketsInFrame,
	getForceDisablePrintTicketsOnConfirmation,
	isShowPrintTicketsInBoxOfficeReservationEnabled,
	isShowPrintTicketsInQuickSaleEnabled,
	getIsDockAccess,
	getCheckoutEventType,
	disableAutoPrintTicketsOnCheckout as disableAutoPrintTicketsOnCheckoutSelector,
	turnOffPrintTicketsViaDesktopInBoxOffice as turnOffPrintTicketsViaDesktopInBoxOfficeSelctor,
	getDisablePrintTickets,
	isSendTextEnabledToTrueInReservation,
	getSourceId,
	isPrintTicketsOverride,
	getPrintSelectedOrderTicketsInBulk,
	shouldAdjustPrintTicketsIFrameHeight,
	getEnableSendTicketEmailInKiosk
} from 'selectors';
import getGlobalProps from 'lib/globalProps';
import {
	checkinByBookingIds as checkinByBookingIdsApi,
	orderPrintTickets as orderPrintTicketsApi,
	orderMassPrintTickets as orderMassPrintTicketsApi,
	orderPrintCharterTickets as orderPrintCharterTicketsApi,
	sendTicketText as sendTicketTextApi,
	netepayPrintTickets
} from 'api/hb/graphql';
import { checkForPrintContent } from 'lib/checkForPrintContent';
import propertyConfig from 'propertyConfig';
import { isTrue } from 'lib/booleanCheck';
import getRefreshedUserToken from './getRefreshedUserToken';
import printInFrame from 'lib/printInFrame';
import { PRINTING_TICKETS } from 'lib/inlineLoadingTypes';
import { PAYMENT_TYPES } from 'shared/enums';
import fetch from 'isomorphic-fetch';
import { SOURCES, PUBLIC_FACING_WEBSITE } from '../../lib/shared/enums';
import { isValidArray } from '../lib/isValidArray';

const debug = Debug('hb:commerce-sdk:sagas:printTicket');

const doNativePrint = async({
	                            nodeId,
	                            propertyId,
	                            token,
	                            orderId
                            }) => {
	const {
		error,
		message,
		netepayProxyUrl,
		netepayServerCommand
	} = await netepayPrintTickets({
		nodeId,
		propertyId,
		token,
		orderId
	});

	debug('netepay print tix response', {
		error,
		message,
		netepayProxyUrl,
		netepayServerCommand
	});

	if (error) {
		throw new Error(message);
	}

	await fetch(netepayProxyUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: netepayServerCommand
	});
};

const getTicketHTMLFromURL = async url => {
	if (url) {
		const html = await fetch(url).then(res => res.text());
		return html;
	}
	return '';
};

function* requestProcessed(apiParams) {
	const { confirmation: { massTicketsHTML } = {} } = yield orderMassPrintTicketsApi(apiParams);
	const { status, printingId, error, message, htmlsForTicket } = massTicketsHTML;
	if (status === 'pending') {
		debug(status, printingId);
		throw 'Request still processing';
	}
	yield put(setInFlightAction({ [PRINTING_TICKETS]: false }));
	return { status, error, message, htmlsForTicket };
}

export function* printTicketSaga({ type, payload }) {
	debug('called');
	const isCheckout = type === CONTINUE_TO_CONFIRMATION;
	const kioskMode = yield select(isKioskMode);
	try {
		const secondaryOrderId = (payload || {}).secondaryOrderId;
		const printSingleTicketForEntireGroup = !!(payload || {}).printSingleTicketForEntireGroup;
		const isCheckIn = !!(payload || {}).isCheckIn;
		const printMassTicketsInQueue = !!(payload || {}).printMassTicketsInQueue;
		let printOnlyEnhancements = false;
		if (payload && payload.printOnlyEnhancements) {
			printOnlyEnhancements = true;
		}
		let printLuggageTags = false;
		if (payload && isTrue(payload.printLuggageTags)) {
			printLuggageTags = true;
		}
		let indyBarcodesToPrint = [];
		if (isValidArray(payload?.indyBarcodesToPrint)) {
			indyBarcodesToPrint = payload.indyBarcodesToPrint;
		}
		const billingFormValue = yield select(getBillingFormValues);
		const token = yield getRefreshedUserToken();
		const printBocaOnConfirmation = yield select(getPrintBocaOnConfirmation);
		const isDockAccess = yield select(getIsDockAccess);
		const isAttendeeModalOnCheckoutOpen = yield select(getAttendeeModalOnCheckoutOpen);
		const collectAttendeeDetails = yield select(shouldCollectAttendeeDetails);
		const collectAttendeeDetailsOnQuickSaleCheckout = yield select(isCollectAttendeeDetailsOnQuickSaleCheckoutEnabled);
		const attendeeDetailsNotRequiredInRegularBoxOffice =
			yield select(isAttendeeDetailsNotRequiredInRegularBoxOfficeEnabled);
		const quickSale = yield select(isQuickSale);
		const { printTickets: printTicketsToggleSelectedFromFormValue = false, printReceipt:
			printReceiptToggleSelectedFromFormValue = false } = billingFormValue;
		const disablePrintTicketsTourSetting = yield select(getDisablePrintTickets);
		const sourceId = yield select(getSourceId);
		const sendTextEnabledToTrueInReservation = yield select(isSendTextEnabledToTrueInReservation) || false;
		const isPublicFacingWebsite = PUBLIC_FACING_WEBSITE.includes(sourceId);
		const isBoxOffice = sourceId === SOURCES.BOXOFFICE;
		let orderId;
		let email;
		let propertyId;
		let isShowReceiptInBocaTicket;
		let enablePrintMassTicketInQueue;
		let disablePrintReceiptFromServiceOrderPage = false;
		let companyId;
		let summary;
		let billing;
		let disablePrintTicketsOnConfirmationForSellOnBehalf;
		let enablePrintTicketsForUnpaidBookings;
		let enableDoNotPrintProducts;
		let printTicketsForEnableDoNotPrintProducts = true;
		let printTicketsInFrame;
		let items;
		let maybeNativePrint = false;
		let ticketsAlreadyTexted = false;
		let disablePrintTicketsOnCheckoutSelected = false;
		let bookingId;
		let adjustPrintTicketsIFrameHeight;
		const orderResult = yield select(getOrderResult);
		let orderDetailsPayload = {};
		if (orderResult.bookingId) {
			orderDetailsPayload = orderResult;
			disablePrintTicketsOnConfirmationForSellOnBehalf = isTrue(
				(propertyConfig().findSettingsById('disablePrintTicketsOnConfirmationForSellOnBehalf') || {}).value
			);
			enablePrintTicketsForUnpaidBookings = yield select(isPrintTicketsOverride);
			enableDoNotPrintProducts = isTrue(
				(propertyConfig().findSettingsById('enableDoNotPrintProducts') || {}).value
			);
			isShowReceiptInBocaTicket = isTrue((propertyConfig().findSettingsById('showReceiptInBocaTicket')
				|| {}).value || false);
			propertyId = yield select(getPropertyId);
			orderId = orderResult.orderId;
			email = orderResult.email;
			bookingId = orderResult.bookingId;
			companyId = orderResult.companyId;
			items = orderResult.items;
			summary = orderResult.summary;
			billing = orderResult.billing[0];
			printTicketsInFrame = yield select(shouldPrintTicketsInFrame);
			adjustPrintTicketsIFrameHeight = yield select(shouldAdjustPrintTicketsIFrameHeight);
			const payments = ((orderResult.confirmation || {}).payments || []);
			const showPrintTicketsInQuickSaleEnabled = yield select(isShowPrintTicketsInQuickSaleEnabled);
			const showPrintTicketsInBoxOfficeReservation = yield select(isShowPrintTicketsInBoxOfficeReservationEnabled);

			const disableAutoPrintTicketsOnCheckout = yield select(disableAutoPrintTicketsOnCheckoutSelector);

			if (quickSale && showPrintTicketsInQuickSaleEnabled && !printTicketsToggleSelectedFromFormValue) {
				disablePrintTicketsOnCheckoutSelected = true;
			}
			if (!quickSale && showPrintTicketsInBoxOfficeReservation && !printTicketsToggleSelectedFromFormValue) {
				disablePrintTicketsOnCheckoutSelected = true;
			}
			if (!showPrintTicketsInQuickSaleEnabled && !showPrintTicketsInBoxOfficeReservation &&
				disableAutoPrintTicketsOnCheckout) {
				disablePrintTicketsOnCheckoutSelected = true;
			}
			if (disablePrintTicketsTourSetting) {
				disablePrintTicketsOnCheckoutSelected = true;
			}
			maybeNativePrint = (payments[0] || {}).type !== PAYMENT_TYPES.NETEPAY;
		} else {
			const selectedOrder = yield select(getOrderToService);
			enablePrintMassTicketInQueue = yield select(getPrintSelectedOrderTicketsInBulk);
			orderDetailsPayload = selectedOrder;
			bookingId = selectedOrder.bookingId;
			orderId = selectedOrder.orderId;
			items = selectedOrder.items;
			email = selectedOrder.email;
			propertyId = selectedOrder.propertyId;
			companyId = selectedOrder.companyId;
			summary = selectedOrder.summary;
			billing = orderResult.billing;
			const selectedOrderPropertySettings = yield select(getSelectedOrderPropertySettings);
			isShowReceiptInBocaTicket = isTrue(selectedOrderPropertySettings.showReceiptInBocaTicket);
			disablePrintReceiptFromServiceOrderPage =
				isTrue(selectedOrderPropertySettings.disablePrintReceiptFromServiceOrderPage);
			disablePrintTicketsOnConfirmationForSellOnBehalf =
				isTrue(selectedOrderPropertySettings.disablePrintTicketsOnConfirmationForSellOnBehalf);
			enablePrintTicketsForUnpaidBookings = isTrue(selectedOrderPropertySettings.enablePrintTicketsForUnpaidBookings);
			enableDoNotPrintProducts =
				isTrue(selectedOrderPropertySettings.enableDoNotPrintProducts);
			printTicketsInFrame = isTrue(selectedOrderPropertySettings.printTicketsInFrame);
			adjustPrintTicketsIFrameHeight = isTrue(selectedOrderPropertySettings.adjustPrintTicketsIFrameHeight);
		}
		const { tickets: [{ qtys } = {}] = [] } = items || {};
		const attendeesEntered = (qtys || []).reduce((accum, { attendees = [] }) => accum + (attendees || []).length, 0);
		if (isCheckout && enableDoNotPrintProducts) {
			const ticketsData = yield select(getTicketsData);
			(qtys || []).forEach(({ ticketId }) => {
				const doNotPrintTicketsEnabledForProduct = (ticketsData || [])
					.filter(({ TicketId, productInfo }) => parseInt(TicketId) === parseInt(ticketId) &&
						isTrue((productInfo.settings || {}).doNotPrintTickets || 'false'));
				if (doNotPrintTicketsEnabledForProduct && doNotPrintTicketsEnabledForProduct.length) {
					printTicketsForEnableDoNotPrintProducts = false;
				}
			});
		}
		if (
			(
				(isCheckout && printBocaOnConfirmation)
				|| type === PRINT_TICKET
			)
			&& !(
				collectAttendeeDetails
				&& collectAttendeeDetailsOnQuickSaleCheckout
				&& (quickSale || kioskMode)
				&& isAttendeeModalOnCheckoutOpen
			)
			&& !(
				isCheckout
				&& attendeesEntered === 0
				&& attendeeDetailsNotRequiredInRegularBoxOffice
				&& !quickSale
				&& !kioskMode
			)
			&& !(payload && payload.printCartOrder && payload.cartOrderIdToPrint && payload.propertyId)
			&& printTicketsForEnableDoNotPrintProducts
		) {
			const locale = yield select(getLocaleRoot);
			const nodeId = yield select(getSellerNodeId);
			const nodeSettings = yield select(getSellerNodeSettings);
			const forceDisablePrintTicketsOnConfirmation = yield select(getForceDisablePrintTicketsOnConfirmation);
			const hidePrintDialogOnConfirmation = isTrue(nodeSettings.hidePrintDialogOnConfirmation);
			const useNativePrint = isTrue(nodeSettings.useNativePrint);
			const { sendText } = billingFormValue;
			const enableSendTicketEmailInKioskMode = yield select(getEnableSendTicketEmailInKiosk);
			if (sendText && email) {
				const { phoneNumber = '' } = (Array.isArray(billing) ? billing[0] : billing) || {};
				yield sendTicketTextApi({
					orderId, phoneNumber, email, locale
				});
				ticketsAlreadyTexted = true;
			}
			if (!forceDisablePrintTicketsOnConfirmation && !hidePrintDialogOnConfirmation && (kioskMode ||
				!disablePrintTicketsOnCheckoutSelected)) {
				if (orderResult.bookingId && quickSale && !kioskMode) {
					const resetDelayTime = parseInt((propertyConfig()
						.findSettingsById('quickSaleBackToCheckoutTimer') || {}).value || '30000');
					yield put(resetQuicksale({ resetDelay: resetDelayTime }));
				}
				const { balance = 0 } = (Array.isArray(summary) ? summary[0] : summary) || {};
				const isPrintTicketAfterPartialPayment = isTrue(
					(propertyConfig().findSettingsById('isPrintTicketAfterPartialPayment') || {}).value);
				const printDisabled = (disablePrintTicketsOnConfirmationForSellOnBehalf && isCheckout
					&& !!companyId) || ((balance > 0.05 && !enablePrintTicketsForUnpaidBookings)
					&& !isPrintTicketAfterPartialPayment);
				const allowPrintOnSendEmailInKiosk = (kioskMode ? !enableSendTicketEmailInKioskMode : true);
				if (!printDisabled) {
					if (printTicketsToggleSelectedFromFormValue || (!sendText && allowPrintOnSendEmailInKiosk)) {
						if (useNativePrint && maybeNativePrint && !printLuggageTags && indyBarcodesToPrint.length === 0) {
							yield doNativePrint({
								nodeId,
								propertyId,
								token,
								orderId
							});
						} else if (!isCheckout || !useNativePrint || printLuggageTags || indyBarcodesToPrint.length > 0) {
							const { printOnAnchorAppListener } = getGlobalProps();
							if (typeof printOnAnchorAppListener === 'function') {
								printOnAnchorAppListener(orderDetailsPayload);
							} else {
								if (printTicketsInFrame) {
									yield put(setInFlightAction({ [PRINTING_TICKETS]: true }));
								} else {
									yield put(loading({ message: 'preparingPrint' }));
								}
								const printQrCodeOnly = payload?.printQrCodeOnly || false;
								const forceRefresh = payload?.forceRefresh || false;
								const transactionId = payload?.transactionId || false;
								const apiParams = {
									orderId,
									propertyId,
									token,
									locale,
									printReceiptWithTicket: (isShowReceiptInBocaTicket && !disablePrintReceiptFromServiceOrderPage)
										|| printReceiptToggleSelectedFromFormValue,
									nodeId, printOnlyEnhancements, printSingleTicketForEntireGroup, printLuggageTags, indyBarcodesToPrint,
									printQrCodeOnly,
									forceRefresh,
									...transactionId && { transactionId }
								};
								const confirmationInfo = yield select(getOrderToServiceConfirmation);
								const checkoutEventType = yield select(getCheckoutEventType);
								const eventType = confirmationInfo.eventType;
								let primaryTicketsHTML = '';
								let secondaryTicketsHtml = '';
								const eventTypeCharter = eventType === 'charter' || checkoutEventType === 'charter';
								if (eventTypeCharter) {
									const [
										{ confirmation: { charterTicketsHTML: primaryTicketsHTMLLink } = {} },
										secondary
									] = yield all([
										orderPrintCharterTicketsApi(apiParams),
										secondaryOrderId && orderPrintCharterTicketsApi({
											...apiParams,
											orderId: secondaryOrderId
										})
									]);

									const { confirmation: { charterTicketsHTML: secondaryTicketsHtmlLink } = {} } = secondary || {};
									if (!printTicketsInFrame) {
										window.open(primaryTicketsHTMLLink || '');
										if (secondaryTicketsHtmlLink) {
											window.open(secondaryTicketsHtmlLink || '');
										}
									} else {
										primaryTicketsHTML = yield getTicketHTMLFromURL(primaryTicketsHTMLLink);
										if (secondaryTicketsHtmlLink) {
											secondaryTicketsHtml = yield getTicketHTMLFromURL(secondaryTicketsHtmlLink);
										}
										yield printInFrame((primaryTicketsHTML || '') + (secondaryTicketsHtml || ''));
										yield put(setInFlightAction({ [PRINTING_TICKETS]: false }));
									}
								} else {
									const { allowPrintMassTicketInQueue, totalChunksForPrint } = enablePrintMassTicketInQueue || {};
									if (allowPrintMassTicketInQueue && totalChunksForPrint &&
										!secondaryOrderId && printMassTicketsInQueue) {
										let ticketsInHtml;
										let status = '';
										const { confirmation: { massTicketsHTML: maybePrimaryMassTicketsHTML } = {} }
											= yield orderMassPrintTicketsApi(apiParams);
										const {
											status: _status, printingId, error, htmlsForTicket: _htmlsForTicket
										} = maybePrimaryMassTicketsHTML || {};
										status = _status;
										if (error) {
											throw new Error(error);
										}
										if (status === 'pending') {
											yield put(loading({ loading: false }));
											yield put(setInFlightAction({ [PRINTING_TICKETS]: true }));
											const { error: retryError, message, htmlsForTicket }
												= yield retry(100, 4000, requestProcessed, Object.assign({},
												apiParams, { ticketPrintingPrefix: printingId }));
											if (retryError) {
												throw new Error(message);
											}
											ticketsInHtml = htmlsForTicket;
										} else {
											ticketsInHtml = _htmlsForTicket;
										}
										yield put(updateOrderMassPrintTickets(ticketsInHtml));
									} else {
										const [
											{ confirmation: { ticketsHTML: primaryTicketsHTMLCode } = {} },
											secondary
										] = yield all([
											orderPrintTicketsApi(apiParams),
											secondaryOrderId && orderPrintTicketsApi({
												...apiParams,
												orderId: secondaryOrderId
											})
										]);
										const { confirmation: { ticketsHTML: secondaryTicketsHtmlCode } = {} } = secondary || {};
										primaryTicketsHTML = primaryTicketsHTMLCode;
										secondaryTicketsHtml = secondaryTicketsHtmlCode;
										if (!printTicketsInFrame) {
											let win;
											if (adjustPrintTicketsIFrameHeight) {
												const tempContainer = document.createElement('div');
												tempContainer.style.visibility = 'hidden';
												tempContainer.style.position = 'absolute';
												tempContainer.style.height = 'auto';
												tempContainer.style.width = '800px';
												tempContainer.innerHTML = primaryTicketsHTML || '';
												document.body.appendChild(tempContainer);
												const contentHeight = tempContainer.scrollHeight;
												document.body.removeChild(tempContainer);

												win = window.open('about:blank', '_blank',
													`width=800,height=${Math.min(contentHeight, screen.height - 100)}`);
												win.document.write((primaryTicketsHTML || '') + (secondaryTicketsHtml || ''));
											} else {
												win = window.open('about:blank', '_blank', 'width=800,height=800');
												win.document.write((primaryTicketsHTML || '') + (secondaryTicketsHtml || ''));
											}
											checkForPrintContent(win);
										}
									}
									if (printTicketsInFrame) {
										yield printInFrame((primaryTicketsHTML || '') + (secondaryTicketsHtml || ''));
										yield put(setInFlightAction({ [PRINTING_TICKETS]: false }));
									}
								}
							}
						}
					}
					if (!isCheckout) {
						yield put(selectOrderToService({ orderId }));
					}
					yield put(printTicket.success());
					yield put(loading({ loading: false }));
				}
				if (useNativePrint) {
					datadog('printTicketSaga', 'flushPrint', {
						printDisabled,
						disablePrintTicketsOnConfirmationForSellOnBehalf,
						isCheckout,
						companyId,
						balance,
						enablePrintTicketsForUnpaidBookings,
						printTicketsToggleSelectedFromFormValue,
						sendText,
						useNativePrint,
						maybeNativePrint,
						printLuggageTags,
						indyBarcodesToPrintLength: indyBarcodesToPrint.length,
						orderResult
					});
				}
				yield put(flushPrint());
			}
		} else if (isCheckout && enableDoNotPrintProducts &&
			!printTicketsForEnableDoNotPrintProducts && orderResult.bookingId && quickSale && !kioskMode) {
			yield put(printReceipt());
			yield put(resetQuicksale({ resetDelay: 30000 }));
		} else if (quickSale && isDockAccess) {
			yield put(resetQuicksale({ resetDelay: 3000 }));
		} else if (payload && payload.printCartOrder && payload.cartOrderIdToPrint && payload.propertyId) {
			let nodeId;
			if (payload.fromItineraryPage) {
				nodeId = yield select(getSellerNodeId);
			}
			const [
				{ confirmation: { ticketsHTML: primaryTicketsHTMLCode } = {} }
			] = yield all([
				orderPrintTicketsApi({
					orderId: payload.cartOrderIdToPrint,
					propertyId: payload.propertyId,
					token,
					locale: 'en',
					printReceiptWithTicket: false,
					printSingleTicketForEntireGroup,
					...payload?.fromItineraryPage && nodeId && { nodeId }
				})
			]);
			const primaryTicketsHTML = primaryTicketsHTMLCode;
			const win = window.open('about:blank', '_blank', 'width=800,height=800');
			win.document.write((primaryTicketsHTML || ''));
			checkForPrintContent(win);
			yield put(printTicket.success());
			yield put(flushPrint());
		}

		if (sendTextEnabledToTrueInReservation &&
			!quickSale &&
			!ticketsAlreadyTexted &&
			isCheckout &&
			email &&
			(isPublicFacingWebsite || isBoxOffice)) {
			const locale = yield select(getLocaleRoot);

			const { phoneNumber = '' } = (Array.isArray(billing) ? billing[0] : billing) || {};
			yield sendTicketTextApi({
				orderId, phoneNumber, email, locale
			});
		}

		if (isCheckout && kioskMode) {
			yield delay(15000);
			yield put(onKioskTransactionComplete());
		}

		if (isCheckIn) {
			yield call(checkinByBookingIdsApi, {
				propertyId,
				bookingIds: [bookingId],
				selectedOrderBarcodes: [],
				token
			});
		}
	} catch (err) {
		datadog('printTicketSaga', 'error', {
			err
		}, true);
		debug('error', err);
		const turnOffPrintTicketsViaDesktop = yield select(turnOffPrintTicketsViaDesktopInBoxOfficeSelctor);
		if (!turnOffPrintTicketsViaDesktop) {
			yield put(setAppAlert({ message: 'ticketsNotPrinted', variant: 'error' }));
		}
		yield put(printTicket.error(err));
		if (kioskMode) {
			yield put(setInFlightAction({ [PRINTING_TICKETS]: false }));
			yield delay(10000);
			yield put(onKioskTransactionComplete());
		}
		yield put(loading({ loading: false }));
	} finally {
		yield put(loading({ loading: false }));
		yield put(setInFlightAction({ [PRINTING_TICKETS]: false }));
	}
}

export default function*() {
	yield takeLatest([
		PRINT_TICKET,
		CONTINUE_TO_CONFIRMATION
	], printTicketSaga);
}
