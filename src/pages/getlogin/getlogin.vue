<template>
  <div class="container" :style="{height:screenHeight}">
    <div>
      <div class="text">
        <p>这大城里</p>
        <p>小小的你</p>
        <p>...</p>
      </div>
      <div>
        <button
          type="primary"
          open-type="getUserInfo"
          lang="zh_CN"
          @getuserinfo="onGotUserInfo"
        >授权登录</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            content: "",
            userInfo: {},
            openId: '',
            screenHeight: 0
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
                    wx.showToast({
                            title: '登录成功',
                            icon: 'success',
                        })
                        .then(res => {
                            setTimeout(() => {
                            wx.navigateBack({
                                delta: 1
                            })  
                            }, 500);
                        });

                })
                .catch(err => {
                    console.log('无法获取用户信息', err);
                })
        },
    },
    onLoad(options) {
        const that = this;
        that.screenHeight = options.height
    }
}
</script>

<style>
.container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.text {
  margin-bottom: 10px;
}
</style>
