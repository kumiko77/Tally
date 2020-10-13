<script>
export default {
	data:{
	globalData: {}	
	},
	onLaunch: function() {
		    wx.getSystemInfo({
		      success: e => {
		        this.globalData.statusBar = e.statusBarHeight; //状态栏高度
		        let custom = wx.getMenuButtonBoundingClientRect();//菜单按钮
		        this.globalData.custom = custom;
		        this.globalData.customBar = custom.bottom + custom.top - e.statusBarHeight;
				this.globalData.pixelRatio = e.pixelRatio
		        //计算得到定义的状态栏高度
		      }
		    })
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
@import "uview-ui/index.scss";
/* 解决头条小程序组件内引入字体不生效的问题 */
page,
.box{
	height: 100%;
}
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
