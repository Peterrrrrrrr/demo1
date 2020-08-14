<template>
  <div>
    <div :class="{'unclear':isTrue}"
         :style="{height:screenHeight}">
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
          @markertap="markertap"
        ></map>
        <div class="write">
          <img src="/static/images/pen.png" @click="btnShare"/>
        </div>
        <div class="locationBtn">
          <img src="/static/images/location.png" />
        </div>
      </div>
    </div>
    <!-- 弹出文本信息 -->
    <div class="noteToggle">
      <note ref="note" @noteToggle="watchShare"></note>
    </div>
    <!-- 发布页面 -->
    <div class="boxToggle">
      <share ref="share" @boxToggle="watchShare"></share>
    </div>
  </div>
</template>

<script>
import share from '@/components/share'
import note from '@/components/note'
export default {
  components:{
    share,
    note
  },
  data() {
    return {
      screenHeight:0,
      isTrue:false,
      navHeight: 0,
      imgHeight: 0,
      imgtop: 0,
      imgleft: 0,
      longitude: "",
      latitude: "",
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
      ],
      
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
      that.screenHeight=systemInfo.screenHeight+"px";
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
    //点击用户小图标打开文本窗口
    markertap() {
        this.$refs.note.showText()
        this.isTrue = true
      },
    //点击pen显示分享页面
    btnShare(){
      this.$refs.share.showBox(),
      this.isTrue = true
    },
    //监听子组件属性
    watchShare(toggle){
      if(toggle == false){
        this.isTrue = false
      }
    }
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
.unclear{
  width: 100%;
  filter: blur(3px);
}
</style>