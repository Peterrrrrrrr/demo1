<template>
<div class="test">
  <div class="shareBox">
    <div class="shareContainer">
      <div class="text">
        <textarea name="" id="" cols="30" rows="10"></textarea>
      </div>
      <div class="shareBtn">
        <p>发布</p>
      </div>
    </div>
    <div class="shareCancel">
      <img src="/static/images/cancel.png"/>
    </div>
  </div>
</div>
  
</template>

<script>
export default {
  data(){
    return{
      
    }
  },
  methods:{
    
  }
}
</script>

<style>
.test{
  top: 0;
  width: 100%;
  position: fixed;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background:#bdbaba;
}
.shareBox {
  width: 85%;
  height: 500px;
  position: relative;
  display: flex;
  justify-content: center;
}
.shareContainer{
  position: absolute;
  width: 100%;
  height: 400px;
  background-color: #ffffff;
  border-radius: 15px;
  display: flex;
  justify-content: center;
}
.shareContainer .text{
  position: absolute;
  top: 10px;
  width: 90%;
  height: 300px;
  background-color: #f7f7f7;
  border-radius: 5px;
}
.shareContainer .shareBtn{
  bottom: 20px;
  position: absolute;
  width:40%;
  height: 35px;
  border-radius: 999px;
  background-color:#18c3aa;
  text-align: center;
}
.shareContainer .shareBtn p{
  line-height: 35px;
  color:#ffffff
}
.shareCancel{
  bottom: 0px;
  display: block;
  position: absolute;
  width: 100%;
  height: 45px;
}
.shareCancel img{
  display: block;
  width: 45px;
  height: 45px;
  margin: auto;
}
</style>