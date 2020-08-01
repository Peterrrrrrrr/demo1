<script>
export default {
  data() {
    return {
      globalData: {
        navHeight: 0
      }
    };
  },
  onLaunch() {
    //获取用户手机信息
    wx.getSystemInfo({
      success: res => {
        //导航高度
        this.globalData.navHeight = res.statusBarHeight + 48;
        // console.log(res.statusBarHeight);
        // console.log(this.globalData.navHeight);
      },
      fail(err) {
        console.log(err);
      }
    });
  }
};
</script>

<style>
page {
  height: 100%;
  background: #ffffff;
}
</style>
