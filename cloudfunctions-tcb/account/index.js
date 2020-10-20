'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const month = event.month;
	return await db.collection('account').where({
		year: event.year,
		month: event.month
	}).get()
	return event.month
};
