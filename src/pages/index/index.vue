<template>
  <div>
    <div>
      <div class="navBar" :style="{height:navHeight}">
        <img
          :style="{height:imgHeight,width:imgHeight,top:imgtop,left:imgleft}"
          src="/static/images/pig.jpg"
        />
      </div>
      <div class="container">
        <map
          class="map"
          :longitude="longitude"
          :latitude="latitude"
          :markers="markers"
          scale="14"
          subkey="EFSBZ-NMA6D-MFH45-HZFGT-I5ATO-IWFP4"
          show-location
        ></map>
        <div class="write">
          <img src="/static/images/pen.png" />
        </div>
        <div class="locationBtn" @click="showText">
          <img src="/static/images/location.png" />
        </div>
      </div>
    </div>
    <!-- 弹出文本信息 -->
    <div class="banner" v-if="showCover" catchtap="closeText">
      <div class="userNote" ref="msk">
        <div class="userBar">
          <img src="/static/images/pig.jpg" />
        </div>
        <div class="content">
          <div class="textArea">
            <div>
              “熄灭第七根烟，现在凌晨三点半
              ,他早习惯加班，融入夜晚
              ,最初懵懂少年渴望大厦的阑珊
              ,比星光耀眼”
            </div>
          </div>
          <div class="timeArea">
            <span class="date">2013年5月17日 01：28</span>
            <span class="close" @click="closeText">关闭</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 遮罩层 -->
    <div class="cover" v-if="showCover"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navHeight: 0,
      imgHeight: 0,
      imgtop: 0,
      imgleft: 0,
      longitude: "",
      latitude: "",
      showCover:false,
      markers: [
        {
          iconPath: "/static/images/idea.png",
          id: 0,
          latitude: 30.5702,
          longitude: 104.06476,
          width: 30,
          height: 30
        },
        {
          iconPath: "/static/images/idea.png",
          id: 0,
          latitude: 30.5902,
          longitude: 104.06476,
          width: 30,
          height: 30
        }
      ]
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
    //弹出文本框
    showText(){
      this.showCover = true
    },
    //点击关闭弹出框
    closeText(e){
      console.log(111);
      console.log(e.currentTarget.dataset.id);
    },
  },
  created() {
    this.currentLocation();
    this.getProfile();
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
.banner {
  top: 0;
  width: 100%;
  position: fixed;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
}
.cover {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: #bdbaba;
  opacity: 0.5;
  z-index: 2;
}
.userNote {
  position: absolute;
  z-index: 3;
  width: 70%;
  background-color: #ffffff;
  border-radius: 10px;
}
.userBar {
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.userBar img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin: auto;
}
.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.textArea {
  font-size: 15px;
  width: 90%;
}
.timeArea {
  width: 90%;
  font-size: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.date {
  color: #888888;
  margin-left: 5px;
}
.close {
  margin-left: 5px;
}
</style>