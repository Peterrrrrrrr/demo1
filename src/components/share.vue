<template>
  <div v-if="toggleShare">
    <div class="box" @click="closeText($event)" id="boxId">
      <div class="shareBox" id="shareId">
        <form class="shareContainer" @submit="addData">
          <textarea placeholder="form 中的 textarea" name="textarea" />
          <button form-type="submit">发布</button>
        </form>
        <div class="shareCancel">
          <img src="/static/images/cancel.png" @click="btnClose" />
        </div>
      </div>
    </div>
    <!-- 遮罩层 -->
    <div class="cover"></div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            toggleShare: false,
            userInfo:{},
            writeLocation:{},
            time:'',
        }
    },
    methods: {
        //点击pen弹出分享框
        showBox() {
            this.toggleShare = true
        },
        //点击遮罩关闭弹出框
        closeText(e) {
            if (e.target.id === "shareId" || e.target.id === "boxId") {
                this.btnClose()
            }
        },
        //点击按钮关闭弹出框
        btnClose() {
            this.toggleShare = false;
            this.toFather()
        },
        //向父组件传值
        toFather() {
            let toggle = this.toggleShare;
            this.$emit('boxToggle', toggle)
        },
        //写入方法
        addData(e) {
            //获取textarea内容
            this.content = e.target.value.textarea
            //获取位置信息+写入数据库
            this.getLocation()
        },
        //写入数据库方法
        setData() {
            const that = this
            that.timeformat();
            wx.cloud.callFunction({
                    name: 'adddata',
                    data: {
                        userId: that.userInfo.openId,
                        name: that.userInfo.nickName,
                        Avatar: that.userInfo.avatarUrl,
                        content: that.content,
                        latitude: that.writeLocation.latitude,
                        longitude: that.writeLocation.longitude,
                        time:that.time,
                    }
                })
                .then(res => {
                    console.log('写入数据库成功');
                    that.btnClose()
                })
                .catch(err => {
                    console.log('写入数据库失败', err);
                })
        },
        //获取用户位置
        getLocation() {
            const that = this;
            wx.getLocation({
                    type: 'wgs84',
                })
                .then(res => {
                    that.writeLocation = res;
                    that.getUserInfo();
                    that.setData();
                })
                .catch(err => {
                    console.log("获取位置信息失败", err);
                })
        },
        //从缓存中读取用户信息
        getUserInfo(){
          const ui = wx.getStorageSync('ui')
          this.userInfo = ui
        },
         //时间格式化
        timeformat(){
            const that = this
            var util = require('../utils/index.js');
            that.time = util.formatTime(new Date());
        }
    },
    
}
</script>

<style>
.box {
  top: 0;
  width: 100%;
  position: fixed;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
}

.shareBox {
  width: 85%;
  height: 500px;
  position: relative;
  display: flex;
  /* justify-content: center; */
}

.shareContainer {
  position: absolute;
  width: 100%;
  height: 400px;
  background-color: #ffffff;
  border-radius: 15px;
  z-index: 10;
  display: flex;
  justify-content: center;
}

.shareContainer textarea {
  top: 10px;
  height: 300px;
  background-color: #f7f7f7;
  border-radius: 5px;
}

.shareContainer button {
  margin-top: 30px;
  width: 50%;
  display: block;
  border-radius: 20px;
  background-color: #18c3aa;
  color: #ffffff;
  text-align: center;
}

.shareContainer .shareBtn button {
  line-height: 35px;
  color: #ffffff;
}

.shareCancel {
  bottom: 0px;
  display: block;
  position: absolute;
  width: 100%;
  height: 45px;
}

.shareCancel img {
  display: block;
  width: 45px;
  height: 45px;
  margin: auto;
}

.cover {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 2;
}
</style>
