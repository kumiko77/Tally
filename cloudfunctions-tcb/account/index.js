'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const month = event.month;
	const params = {}
	event.year && (params.year = event.year)
	event.month && (params.month = event.month)
	event.accountType && (params.accountType = event.accountType)
	return await db.collection('account').where(params).get()
};
