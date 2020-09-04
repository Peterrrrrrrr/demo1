<template>
<div>
    <div :class="{'unclear':isTrue}" :style="{height:screenHeight}">
        <div class="navBar" :style="{height:navHeight}">
            <img :style="{height:imgHeight,width:imgHeight,top:imgtop,left:imgleft}" :src="Avatar" @click="toMe"/>
        </div>
        <div class="container">
            <map class="map" :longitude="longitude" :latitude="latitude" :markers="markers" scale="14" subkey="EFSBZ-NMA6D-MFH45-HZFGT-I5ATO-IWFP4" show-location @markertap="markertap"></map>
            <div class="write">
                <img src="/static/images/pen.png" @click="login" />
            </div>
            <div class="locationBtn">
                <img src="/static/images/location.png" @click="moveToMe"/>
            </div>
        </div>
    </div>
    <!-- 弹出文本信息 -->
    <div class="noteToggle">
        <note ref="note" @noteToggle="watchShare"></note>
    </div>
    <!-- 发布页面 -->
    <div class="boxToggle">
        <share ref="share" @boxToggle="watchShare" @click="test"></share>
    </div>
</div>
</template>

<script>
import share from '@/components/share'
import note from '@/components/note'
export default {
    components: {
        share,
        note
    },
    data() {
        return {
            Avatar: "",
            showLogin: false,
            showWrite: false,
            content: "",
            userInfo: {},
            openId: '',
            nickName: '',
            allUserInfo: {},
            writeLocation: {},
            screenHeight: 0,
            isTrue: false,
            navHeight: 0,
            imgHeight: 0,
            imgtop: 0,
            imgleft: 0,
            longitude: "",
            latitude: "",
            markers: [],
        };
    },
    methods: {
        //获取导航栏高度
        getProfile() {
            let that = this;
            //获取按钮信息
            const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
            //获取用户手机信息
            const systemInfo = wx.getSystemInfoSync();
            that.screenHeight = systemInfo.screenHeight + "px";
            that.navHeight =
                (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 +
                menuButtonInfo.height +
                systemInfo.statusBarHeight +
                "px";
            that.imgHeight = menuButtonInfo.height + "px";
            that.imgtop = menuButtonInfo.top + "px";
            that.imgleft = systemInfo.screenWidth - menuButtonInfo.right + "px";
        },
        //获取当前位置
        currentLocation() {
            let that = this;
            wx.getLocation({
                type: "wgs84",
                success(res) {
                    const maplatitude = res.latitude;
                    const maplongitude = res.longitude;
                    that.latitude = maplatitude;
                    that.longitude = maplongitude;
                    console.log(res);
                },
                fail(res) {
                    wx.showToast({
                        title: "获取位置失败",
                        icon: "none"
                    });
                }
            });
        },
        //定位至当前位置
        moveToMe(){
            console.log(11);
            const that = this;
            that.currentLocation()
        },
        //点击用户小图标打开文本窗口
        markertap(e) {
            let id = e.mp.markerId;
            this.$refs.note.showText(id)
            this.isTrue = true
        },
        //点击pen显示分享页面
        btnShare() {
            this.$refs.share.showBox(),
                this.isTrue = true
        },
        //监听子组件属性
        watchShare(toggle) {
            if (toggle == false) {
                this.isTrue = false
            }
        },
        //登录方法
        login() {
            const that = this;
            const ui = wx.getStorageSync('ui');
            if (!ui.openId) {
                let height = that.screenHeight;
                wx.navigateTo({
                    url: '/pages/getlogin/main?height='+height
                })
            } else {
                this.btnShare()
            }
        },
        //获取缓存用户信息
        getUserInfo() {
            const ui = wx.getStorageSync('ui');
            if (ui.openId) {
                this.Avatar = ui.avatarUrl
            } else {
                this.Avatar = "/static/images/user.png"
            }
        },
        //请求数据库获取所有用户内容
        gotAllUser() {
            console.log("被调用");
            const that = this;
            wx.cloud.callFunction({
                    name: 'getalluserinfo'
                })
                .then(res => {
                    that.allUserInfo = res.result.data;
                    // console.log(that.allUserInfo);
                    that.setMarkers();
                })
                .catch(err => {
                    console.log('请求数据库获取所有用户内容失败', err);
                })
        },
        //展示用户点
        setMarkers() {
            const that = this;
            let allUserMarkers = [];
            for (const item of that.allUserInfo) {
                var oneUserMarkes = {
                    iconPath: "/static/images/idea.png",
                    id: item._id,
                    latitude: item.latitude,
                    longitude: item.longitude,
                    width: 30,
                    height: 30
                };
                allUserMarkers.push(oneUserMarkes)
            }
            this.markers = allUserMarkers;
        },
        //跳转到我的页面
        toMe(){
            wx.navigateTo({
                url: '/pages/me/main'
            })
        }
    },
    created() {
        this.currentLocation();
        this.getProfile();
        this.getUserInfo();
        this.gotAllUser();
    },
    onShow() {
        this.getUserInfo();
    }

}
</script>

<style>
.navBar {
    width: 100%;
    display: flex;
    align-items: center;
}

.navBar img {
    border-radius: 50%;
    position: absolute;
    z-index: 9999;
}

.container {
    position: fixed;
    top: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    z-index: 1;
}

.write {
    width: 65px;
    height: 65px;
    background-color: #ffffff;
    border-radius: 12px;
    position: fixed;
    bottom: 0;
    margin-bottom: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.write img {
    color: #ffffff;
    width: 45px;
    height: 45px;
}

.map {
    position: absolute;
    width: 100%;
    height: 100%;
}

.locationBtn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: white;
    position: fixed;
    bottom: 0;
    right: 0;
    margin-right: 23px;
    margin-bottom: 195px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.locationBtn img {
    width: 20px;
    height: 20px;
}

.mapZone {
    filter: blur(10px);
    opacity: 0.8;
    width: 100%;
    position: fixed;
    height: 100%;
}

.unclear {
    width: 100%;
    filter: blur(3px);
}
</style>
