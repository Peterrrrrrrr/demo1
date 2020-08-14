<template>
  <div v-if="showBox">
    <div class="noteBox" @click="closeText($event)" id="bannerId">
      <div class="userNote" id="userNoteId">
        <div class="userBar">
          <img src="/static/images/pig.jpg" @click="navToUser" />
        </div>
        <div class="content" id="contentId">
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
            <span class="close" @click="btnClose">关闭</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 遮罩层 -->
    <div class="cover"></div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            showBox:false
        }
    },
    methods:{
        //弹出文本框
    showText(){
      this.showBox = true;
      console.log(111);
    },
    //点击遮罩关闭弹出框
    closeText(e){
      console.log(e);
      if(e.target.id === "bannerId"){
        this.showBox = false;
        this.toFather()
      }
    },
    //点击按钮关闭弹出框
    btnClose(){
      this.showBox = false;
      this.toFather()
    },
    //点击用户头像跳转到用户首页
    navToUser(){
      wx.navigateTo({
        url:'/pages/me/main'
      })
    },
    //向父组件传值
    toFather(){
      let toggle = this.showBox;
      this.$emit('noteToggle',toggle) 
    }
    }
}
</script>

<style>
.noteBox {
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
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 2;
}
.userNote {
  position: absolute;
  width: 70%;
  background-color: #ffffff;
  border-radius: 10px;
  z-index: 10;
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