const getPropertyConfig = require('../../../src/util/getPropertyConfig');
const { isTrue } = require('../../../src/util/booleanCheck');
const getTourSetting = require('../../../src/util/getTourSetting');
const { getTour, getToursByBookingId } = require('../../../src/db/tours');
const transformIdValue = require('../../../src/util/transforms/idValue');
const { getItineraryById } = require('../../../src/db/itineraries');
const { getExcursionsByPropertyId } = require('../../../src/db/excursions');
const { batchGetProducts } = require('../../../src/db/products');
const getProductSetting = require('../../../src/util/getProductSetting');
const path = require('path');
const fs = require('fs');
const projection = require('../../../src/db/util/projection');
const { getEventsByPropertyIdAndTourId } = require('../../../src/db/events');
const { getEventDefInfoByEventIdAndVersion } = require('../../../src/db/eventDefInfo');

const membershipSetupChecker = async({ propertyId, membershipToursToValidate, membershipProductsCheck }, { correlationId }) => {
	const propertyConfig = await getPropertyConfig({ propertyId, forceRefresh: true });
	const checkerLogs = { tours: [], membershipProducts: [], productsEligibleInMembership: [], eventBuild: [] };
	const enableMembership = isTrue(propertyConfig.findSettingsById('enableMembership')?.value);
	const bookingTypeIdForMembership = isTrue(propertyConfig.findSettingsById('bookingTypeIdForMembership')?.value);
	const showMembershipBookingsFromBookingsTab = isTrue(propertyConfig.findSettingsById('showMembershipBookingsFromBookingsTab')?.value);
	const enableMembershipAsPackage = isTrue(propertyConfig.findSettingsById('enableMembershipAsPackage')?.value);
	if (!enableMembership) {
		checkerLogs['Membership Not Enabled In Property'] = 'Please turn on enableMembership in PCM';
	}

	const membershipTourIds = [];
	// tour
	// eslint-disable-next-line no-restricted-syntax
	for (let tid = 0;tid < membershipToursToValidate.length;tid++) {
		const { id, type, bookingTypeId: _bookingTypeId } = membershipToursToValidate[tid];
		console.log(`start-tour-${id || _bookingTypeId}-${type}-${tid}`);
		// eslint-disable-next-line no-await-in-loop
		const [tour] = _bookingTypeId ?
			(await getToursByBookingId({
				propertyId, bookingTypeId: _bookingTypeId
			}, {
				correlationId, projection: projection('settings', 'bookingTypeId', 'propertyId', 'tourId')
			})) :
			[await getTour(id, {
				projection: projection('bookingTypeId', 'settings', 'propertyId', 'tourId')
			})];
		const tourChecker = {};
		if (tour) {
			const { settings: _settings, bookingTypeId, tourId } = tour;
			const settings = transformIdValue(_settings);
			if (type === 'Membership') {
				const membershipTour = isTrue(settings.membershipTour);
				membershipTourIds.push(tourId);
				const shippingAddressRequiredTour = isTrue(settings.shippingAddressRequiredTour);
				const requireLoginCheckout = isTrue(settings.requireLoginCheckout); // Require customer create account before purchase membership
				if (!membershipTour) {
					tourChecker['Membership Tour Not Enabled'] = 'Please Enable Membership Tour in Tour setting';
				}
			} else if (type === 'giftMembership') {
				console.log('need function enableGiftMembership checker');
				membershipTourIds.push(id);
				const enableGiftMembership = isTrue(settings.enableGiftMembership); // gift membership, need to check with kyeong if possible
				if (!enableGiftMembership) {
					tourChecker['Gift Membership Not Enabled'] = 'Please Enable Gift a Membership in Tour setting';
				}
			} else {
				const allowCheckoutForMembersOnly = isTrue(settings.allowCheckoutForMembersOnly);
				const hideMembershipValidation = isTrue(settings.hideMembershipValidation);
				const allowUpgradeNonMembershipTourToMembership = isTrue(settings.allowUpgradeNonMembershipTourToMembership);
			}

			if (Object.keys(tourChecker).length) {
				checkerLogs.tours.push({ id, type, bookingTypeId, tourId, ...tourChecker });
			} else {
				tourChecker.allGood = true;
				checkerLogs.tours.push({ id, type, bookingTypeId, tourId, allGood: true });
			}
		}
	}
	// product
	const membershipProductIds = membershipProductsCheck.map(ticketId => `${propertyId}.${ticketId}`);
	const membershipProducts = await batchGetProducts({ productIds: membershipProductIds }, { correlationId, propertyId });
	// this will be fulfilled from membership product setting when as product or from membership package from event build
	const productsIncludedInMembership = {};

	// check cost rate if enabled in event build
	const membershipCostRateWithProduct = {};

	// Check Membership Main Product
	// eslint-disable-next-line no-restricted-syntax
	for (let pidx = 0;pidx < membershipProducts.length;pidx++) {
		const product = membershipProducts[pidx];
		// eslint-disable-next-line no-await-in-loop
		const { settings: _settings, productId } = product;
		console.log(`start-product-${productId}-${pidx}`);
		const settings = transformIdValue(_settings);
		const passType = settings.passType;
		const isMembershipProduct = passType === 'memberShipPass';
		const isMembershipParking = passType === 'membershipParkingPass';
		const isPackage = isTrue(settings.isPackage);
		const productChecker = {};
		if (isMembershipProduct) {
			// membership product settings
			// Must have no matter as product/as package
			const associatedCostRate = settings.associatedCostRate; // must have, cannot be null/undefined
			const validDaysForMembership = parseInt(settings.validDaysForMembership); // must have, cannot be null/undefined/0
			membershipCostRateWithProduct[productId] = associatedCostRate || 'tbd';
			if (!associatedCostRate) {
				productChecker['Membership associate cost rate missing'] = 'Please fill out \'Associated Cost Rate\' in Product Page, it\'s required';
			}
			if (!validDaysForMembership) {
				productChecker['Membership valid days missing'] = '\'Membership Valid Days\' Need Actual Number and cannot be 0 in Product Page, it\'s required';
			}
			if (enableMembershipAsPackage && !isPackage) {
				productChecker['Membership Product Should Be Package'] = 'Since Enable Membership As Package in the Property, Please Change Type as Package NOT Product';
				continue;
			}

			if (!enableMembershipAsPackage) {
				if (isPackage) {
					productChecker['Membership Product Cannot Be Package'] = 'Since Doesn\'t Enable Membership As Package in the Property, Please Change Type as Product NOT Package';
				}
				// Must have when not enableMembershipAsPackage and must not as a package
				const noOfAdultsForMembership = parseInt(settings.noOfAdultsForMembership || '0');
				const membershipAdultTicket = parseInt(settings.membershipAdultTicket);

				const noOfSeniorsForMembership = parseInt(settings.noOfSeniorsForMembership || '0');
				const membershipSeniorTicket = parseInt(settings.membershipSeniorTicket);

				const noOfStudentsForMembership = parseInt(settings.noOfStudentsForMembership || '0');
				const membershipStudentTicket = parseInt(settings.membershipStudentTicket);

				const noOfChildrenForMembership = parseInt(settings.noOfChildrenForMembership || '0');
				const membershipChildTicket = parseInt(settings.membershipChildTicket);
				if (membershipAdultTicket) {
					productsIncludedInMembership[membershipAdultTicket] = { productId: membershipAdultTicket, type: 'adult' };
				}
				if (membershipSeniorTicket) {
					productsIncludedInMembership[membershipSeniorTicket] = { productId: membershipSeniorTicket, type: 'senior' };
				}
				if (membershipStudentTicket) {
					productsIncludedInMembership[membershipStudentTicket] = {
						productId: membershipStudentTicket,
						type: 'student'
					};
				}
				if (membershipChildTicket) {
					productsIncludedInMembership[membershipChildTicket] = { productId: membershipChildTicket, type: 'child' };
				}
				// setup membership as product not as package
				const isMemberAdultSetup = noOfAdultsForMembership ? !!membershipAdultTicket : false;
				const isMemberSeniorSetup = noOfSeniorsForMembership ? !!membershipSeniorTicket : false;
				const isMemberStudentSetup = noOfStudentsForMembership ? !!membershipStudentTicket : false;
				const isMemberChildSetup = noOfChildrenForMembership ? !!membershipChildTicket : false;
				const isMemberTixSetupCorrect = isMemberAdultSetup || isMemberSeniorSetup || isMemberStudentSetup || isMemberChildSetup;
				if (!isMemberTixSetupCorrect) {
					productChecker['Membership Product Does Not Setup Correctly'] = 'At least one product need to be include in the Membership Product, for now no number of tickets are fill out';
				}
				if (isMembershipParking) {
					const noOfParkingPassForMembership = parseInt(settings.noOfParkingPassForMembership || '0');
					const membershipParkingPassTicket = parseInt(settings.membershipParkingPassTicket);
					productsIncludedInMembership[membershipParkingPassTicket] = {
						productId: membershipParkingPassTicket,
						type: 'parking'
					};
					const isMemberParkingSetup = noOfParkingPassForMembership ? !!membershipParkingPassTicket : false;
					if (!isMemberParkingSetup) {
						productChecker['Membership Parking Does Not Setup Correctly'] = 'At least one product need to be include in the Membership Parking Pass, for now no number of tickets are fill out';
					}
				}
			}
		}
		if (Object.keys(productChecker).length) {
			checkerLogs.membershipProducts.push({ productId, ...productChecker });
		} else {
			checkerLogs.membershipProducts.push({ productId, allGood: true });
		}
	}

// Input: s = "3[a]2[bc]"
// Output: "aaabcbc"
// Example 2:
//
// Input: s = "3[a2[c]]"
// Output: "accaccacc"
// Example 3:
//
// Input: s = "2[abc]3[cd]ef"
// Output: "abcabccdcdcdef"

	// Check Membership Product As Package In Event Build
	if (enableMembershipAsPackage) {
		// we also need to check event build and go through each package see if all product included in the package are added into event build
		const eventIds = {};
		// event builder
		for (let tid = 0;tid < membershipTourIds.length;tid++) {
			await getEventsByPropertyIdAndTourId({ propertyId, selectedTourId: membershipTourIds[tid] }, {
				correlationId,
				projection: projection(
					'eventId',
					'publishTime',
					'version',
					'selectedTourId',
					'propertyId'
				),
				onChunk: chunks => {
					console.log('pp check chunks', chunks);
					chunks.forEach(chunk => {
						const { eventId, version } = chunk;
						if (!eventIds[eventId]) {
							eventIds[eventId] = 0;
						}
						eventIds[eventId] = version > eventIds[eventId] ? version : eventIds[eventId];
					});
				}
			});
		}
		console.log('pp check eventIds', JSON.stringify(eventIds, 0, 2));
		await Promise.all(Object.entries(eventIds).map(async([eventId, version]) => {
			const [products, packages] = await Promise.all([
				getEventDefInfoByEventIdAndVersion({ eventId, version, type: 'products' }, { correlationId }),
				getEventDefInfoByEventIdAndVersion({ eventId, version, type: 'packages' }, { correlationId })
			]);
			const eventBuildChecker = {};
			// Package Membership
			packages.forEach(({ packageProductId, pricing, products: packageProducts, deleted }) => {
				const [propertyID, packageId] = packageProductId.split('.');
				const packageMembershipCostRate = membershipCostRateWithProduct[packageId];
				if (packageMembershipCostRate) {
					if (!eventBuildChecker[packageId]) {
						eventBuildChecker[packageId] = { type: 'Package', error: false };
					}
					if (deleted) {
						eventBuildChecker[packageId]['Package Deleted'] = 'Package is deleted from build';
						eventBuildChecker[packageId].error = true;
						return;
					}
					if (!pricing?.length) {
						eventBuildChecker[packageId]['Pricing Missing'] = 'Package Price did not setup correctly.';
						eventBuildChecker[packageId].error = true;

						return;
					}
					if (!packageProducts?.length) {
						eventBuildChecker[packageId]['Products In Package Missing'] = 'Package Product did not setup correctly.';
						eventBuildChecker[packageId].error = true;

						return;
					}
					if (!pricing?.[0]?.pricing[packageMembershipCostRate]) {
						if (packageMembershipCostRate === 'tbd') {
							eventBuildChecker[packageId]['No Cost Rate'] = 'Cost rate missing in membership product settings.';
							eventBuildChecker[packageId].error = true;
						} else {
							eventBuildChecker[packageId]['Cost Rate Missing'] = `Membership Cost Rate ${packageMembershipCostRate} Not Toggle In the Build`;
							eventBuildChecker[packageId].error = true;
						}
					}
					// loop product in the package into productsIncludedInMembership to check
					packageProducts.forEach(({ productId: _productId }) => {
						const [propertyID, productId] = _productId.split('.');
						console.log('packageProducts before process', { packageId, productId, productsIncludedInMembership });
						if (!productsIncludedInMembership[productId]) {
							productsIncludedInMembership[productId] = {
								// might need to update this to exact Type
								productId, type: 'tbd', costRates: {}
							};
						}
						productsIncludedInMembership[productId].costRates[packageMembershipCostRate] = true;
					});
				}
			});
			// start to check product included in membership package by using productsIncludedInMembership as data source
			products.forEach(({ pricing, selectedProductId, deleted }) => {
				console.log('pp check go here');
				const [propertyID, productId] = selectedProductId.split('.');
				const packageIncludedProduct = productsIncludedInMembership[productId];
				if (packageIncludedProduct) {
					if (!eventBuildChecker[productId]) {
						eventBuildChecker[productId] = { type: 'Product', error: false };
					}
					if (deleted) {
						eventBuildChecker[productId]['Product Deleted'] = 'Product is deleted from build';
						eventBuildChecker[productId].error = true;
						return;
					}
					if (!pricing?.length) {
						eventBuildChecker[productId]['Pricing Missing'] = 'Product Price did not setup correctly.';
						eventBuildChecker[productId].error = true;
						return;
					}
					const { costRates } = packageIncludedProduct;
					console.log(`pp check costRates - ${productId}`, JSON.stringify(costRates, 0, 2));
					Object.keys(costRates).forEach(costRate => {
						const enabledCostRates = pricing?.[0]?.priceConfig?.enabledCostRates;
						if (!enabledCostRates[costRate]) {
							eventBuildChecker[productId]['Cost Rate Missing'] = `Membership Cost Rate ${costRate} Not Toggle In the Build`;
							eventBuildChecker[productId].error = true;
						}
					});
				}
			});
			if (Object.keys(eventBuildChecker).length) {
				checkerLogs.eventBuild.push({ eventId, ...eventBuildChecker });
			}
		}));
	}

	// Check Product Included In Membership is Correct or Not
	const productsIncludedInMembershipMap = Object.values(productsIncludedInMembership);
	for (let pindex = 0;pindex < productsIncludedInMembershipMap.length;pindex++) {
		const { productId, type } = productsIncludedInMembershipMap[pindex];
		// eslint-disable-next-line no-await-in-loop
		const ticketType = await getProductSetting({
			correlationId,
			settingId: 'ecTicketTypes',
			propertyId,
			productId
		});
		console.log('pp check ticketType', { productId, ticketType });
		if (!ticketType || (ticketType.toLowerCase() !== type)) {
			checkerLogs.productsEligibleInMembership.push({ productId, ['Ticket Type Not Setup Correctly']: `Ticket Type Need to setup as ${type}, Now is ${ticketType}` });
		} else {
			checkerLogs.productsEligibleInMembership.push({ productId, allGood: true });
		}
	}

	// manual renew
	// upgrade
	const defaultMembershipCheckinBookingType = isTrue(propertyConfig.findSettingsById('defaultMembershipCheckinBookingType')?.value);

	// auto renew
	const fname = path.join(__dirname, 'checkerLogs.js');
	fs.writeFileSync(fname, `module.exports = ${JSON.stringify(checkerLogs, 0, 2)};`);

	return checkerLogs;
};

module.exports = membershipSetupChecker;

const f = async() => {
	const propertyId = 'linzoo';
	const correlationId = 'membership-setup-api-checker';
	const membershipToursToValidate = [
		{
			type: 'Membership',
			id: '96544b36-0597-49b1-b6a3-d7e32d03a516',
			bookingTypeId: '1112801'
		}
	];
	const membershipProductsCheck = [
		160985,
		160986,
		160987,
		160988,
		160990,
		168059,
		160992,
		160993,
		160994,
		160967,
		160991,
		160995,
		168060,
		160997,
		160996,
		160998,
		160999,
		161000,
		160673,
		160682,
		160674,
		160675,
		160676,
		160677,
		160678,
		160679,
		160680,
		160671,
		160672,
		160658,
		160659,
		160670,
		160681
	];
	await membershipSetupChecker({ propertyId, membershipToursToValidate, membershipProductsCheck }, { correlationId });
	// console.log(JSON.stringify(logs, 0, 2));
};
f().then();
