// 93. Restore IP Addresses
//  A valid IP address consists of exactly four integers separated by single dots. Each integer is between 0 and 255 (inclusive) and cannot have leading zeros.
// 	For example, "0.1.2.201" and "192.168.1.1" are valid IP addresses, but "0.011.255.245", "192.168.1.312" and "192.168@1.1" are invalid IP addresses.
// 	Given a string s containing only digits, return all possible valid IP addresses that can be formed by inserting dots into s.
// 	You are not allowed to reorder or remove any digits in s. You may return the valid IP addresses in any order.
//
// 	Example 1:
// Input: s = "25525511135"
// Output: ["255.255.11.135","255.255.111.35"]
//
// Example 2:
// Input: s = "0000"
// Output: ["0.0.0.0"]
//
// Example 3:
// Input: s = "101023"
// Output: ["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]

/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
	const ips = [];
	let ip = [];
	let count = 0;
	const dfs = (ipPosition, idx) => {
		if (ipPosition === 4) return null;
		for (let i = idx; i < s.length; i++) {
			const ipVal = s.slice(idx, i + 1);
			if (parseInt(ipVal) > 255) continue;
			if (ipVal.length > 1 && ipVal.startsWith('0')) continue;
			ip.push(ipVal);
			count = count + ipVal.length;
			dfs(ipPosition+1, i+1);
			if (ip.length === 4 && count === s.length) {
				ips.push([...ip]);
			}
			const pop = ip.pop();
			count = count - pop.length;
		}
	}
	dfs(0, 0);

	return ips.map(each => each.join('.'));
};

console.log(restoreIpAddresses('25525511135'));
