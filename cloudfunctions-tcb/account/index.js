'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const month = event.month;
	return await db.collection('account').where({
		month: event.month
	}).get()
	return event.month
};
