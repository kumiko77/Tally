export default async (name, data) => {
	uni.showLoading()
	try{
		let res = await uniCloud.callFunction({
			name, // 云函数名字
			data // 传输数据
		})
		return res
	} catch(e) {
		return e
	} finally{
		uni.hideLoading()
	}
}