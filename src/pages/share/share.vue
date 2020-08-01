<template>
  <div>
    <div class="banner">
      <div class="userNote">
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
            <span class="close">关闭</span>
          </div>
        </div>
      </div>
    </div>
    <div class="cover"></div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.banner {
  width: 100%;
  position: fixed;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
.cover {
  position: fixed;
  left: 0px;
  top: 0px;
  background: rgba(0, 0, 0, 0.4);
  width: 100%; 
  height: 100%;
  filter: alpha(opacity=60); /*设置透明度为60%*/
  opacity: 0.6; /*非IE浏览器下设置透明度为60%*/
  /* display: none; */
  z-index: 2;
}
.userNote {
  position: absolute;
  z-index: 1000;
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