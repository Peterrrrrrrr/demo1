<template>
<div class="container" :style="{height:screenHeight}">
    <div>
        <div class="text">
            <p>" 哪有你</p>
            <p>&nbsp;&nbsp;这样你</p>
            <p>&nbsp;&nbsp;... ”</p>
        </div>
        <div>
            <button type="primary" open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">授权登录</button>
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
            screenHeight: 0,
            Avatar:''
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
                    that.openId = res.result.openid;
                    that.userInfo = e.target.userInfo;
                    that.Avatar = that.userInfo.avatarUrl;
                    that.userInfo.openId = that.openId;
                    wx.setStorageSync('ui', that.userInfo);
                    wx.showToast({
                            title: '登录成功',
                            icon: 'success',
                        })
                        .then(res => {
                            setTimeout(() => {
                                wx.navigateTo({
                                    url: '/pages/index/main?avatar=' + that.Avatar
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
  font-size: 20px;
  font-family: "宋体";
}
</style>
