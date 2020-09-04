<template>
  <div>
      test
      <p>***</p>
    <p>***</p>
    <p>***</p>
    <p>***</p>
    <p>***</p>
    <p>***</p>
    <p>***</p>
    <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">授权登录</button>
  </div>
</template>

<script>
export default {
    data() {
        return {
            content: "",
            userInfo: {},
            openId: '',
        }
    },
    methods: {
        //调用云函数获取用户信息
        onGotUserInfo: function (e) {
            const that = this;
            wx.cloud.callFunction({
                    name: 'getopenid'
                })
                .then(res => {
                    console.log('e', e);
                    that.openId = res.result.openid;
                    that.userInfo = e.target.userInfo;
                    that.userInfo.openId = that.openId;
                    wx.setStorageSync('ui', that.userInfo);
                    wx.navigateBack({
                        delta: 1
                    })
                })
                .catch(err => {
                    console.log('无法获取用户信息', err);
                })
        },
    }
}
</script>

<style>

</style>