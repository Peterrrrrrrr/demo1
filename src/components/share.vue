<template>
  <div v-if="toggleShare">
    <div class="box" @click="closeText($event)" id="boxId">
      <div class="shareBox" id="shareId">
        <div class="shareContainer">
          <div class="text">
            <textarea name id cols="30" rows="10"></textarea>
          </div>
          <div class="shareBtn">
            <p>发布</p>
          </div>
        </div>
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
  data(){
    return{
      toggleShare:false
    }
  },
  methods:{
    //点击pen弹出分享框
    showBox(){
        this.toggleShare = true
    },
    //点击遮罩关闭弹出框
    closeText(e){
      if(e.target.id === "shareId"||e.target.id === "boxId"){
        this.toggleShare = false;
        this.toFather()
      }
    },
    //点击按钮关闭弹出框
    btnClose(){
      this.toggleShare = false;
      this.toFather()
    },
    //向父组件传值
    toFather(){
      let toggle = this.toggleShare;
      this.$emit('boxToggle',toggle) 
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
  justify-content: center;
}
.shareContainer {
  position: absolute;
  width: 100%;
  height: 400px;
  background-color: #ffffff;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  z-index: 10;
}
.shareContainer .text {
  position: absolute;
  top: 10px;
  width: 90%;
  height: 300px;
  background-color: #f7f7f7;
  border-radius: 5px;
}
.shareContainer .shareBtn {
  bottom: 20px;
  position: absolute;
  width: 40%;
  height: 35px;
  border-radius: 999px;
  background-color: #18c3aa;
  text-align: center;
}
.shareContainer .shareBtn p {
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