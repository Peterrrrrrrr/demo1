<template>
  <div>
    <div class="userBar">
      <img src="/static/images/pig.jpg" />
    </div>
    <div class="container">
      <div class="content">
        <div class="textArea">
          <p>”年轻的心容易点燃，长久的不易熄灭“，忍不住上来冒第一个泡</p>
        </div>
        <div class="timeArea">
          <span class="date">2013年5月17日 01：28</span>
          <span class="delete">删除</span>
        </div>
      </div>
      <div class="content">
        <div class="textArea">
          <p>想说却还没说的，还很多</p>
        </div>
        <div class="timeArea">
          <span class="date">2013年5月17日 01：28</span>
          <span class="delete">删除</span>
        </div>
      </div>
      <div class="content">
        <div class="textArea">
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat nobis labore voluptatum illo est explicabo suscipit esse enim quia porro. Dignissimos, voluptatibus. Eum illo eveniet inventore necessitatibus magni aliquid nihil!</p>
        </div>
        <div class="timeArea">
          <span class="date">2013年5月17日 01：28</span>
          <span class="delete">删除</span>
        </div>
      </div>
      <div class="content">
        <div class="textArea">
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat nobis labore voluptatum illo est explicabo suscipit esse enim quia porro. Dignissimos, voluptatibus. Eum illo eveniet inventore necessitatibus magni aliquid nihil!</p>
        </div>
        <div class="timeArea">
          <span class="date">2013年5月17日 01：28</span>
          <span class="delete">删除</span>
        </div>
      </div>
      <div class="content">
        <div class="textArea">
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat nobis labore voluptatum illo est explicabo suscipit esse enim quia porro. Dignissimos, voluptatibus. Eum illo eveniet inventore necessitatibus magni aliquid nihil!</p>
        </div>
        <div class="timeArea">
          <span class="date">2013年5月17日 01：28</span>
          <span class="delete">删除</span>
        </div>
      </div>
      <div class="content">
        <div class="textArea">
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat nobis labore voluptatum illo est explicabo suscipit esse enim quia porro. Dignissimos, voluptatibus. Eum illo eveniet inventore necessitatibus magni aliquid nihil!</p>
        </div>
        <div class="timeArea">
          <span class="date">2013年5月17日 01：28</span>
          <span class="delete">删除</span>
        </div>
      </div>
      <div class="content">
        <div class="textArea">
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat nobis labore voluptatum illo est explicabo suscipit esse enim quia porro. Dignissimos, voluptatibus. Eum illo eveniet inventore necessitatibus magni aliquid nihil!</p>
        </div>
        <div class="timeArea">
          <span class="date">2013年5月17日 01：28</span>
          <span class="delete">删除</span>
        </div>
      </div>
    </div>
     <hr />
    <div class="home">
      <img src="/static/images/home.png" />
    </div>
    
  </div>
</template>

<script>
export default {};
</script>

<style>
.userBar {
  margin-top: 25px;
  width: 100%;
  height: 130px;
  position: relative;
  border-bottom: 1px dashed black;
}
.userBar img {
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.container {
  margin-top: 5px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
}
.content {
  margin-top: 20px;
  width: 225px;
  /* height: 63px; */
}
.textArea {
  background-color: #f8f8ff;
}
.timeArea {
  margin-top: 5px;
  font-size: 10px;
}
.delete {
  margin-left: 5px;
}
.date {
  color: #888888;
}
.home {
  position: fixed;
  bottom: 0;
  right: 0;
}
.home img {
  margin-bottom: 50px;
  margin-right: 30px;
  width: 30px;
  height: 30px;
}
hr {
  width: 70%;
  height: 1px;
  border: none;
  border-top: 1px dashed #696969;
  padding-bottom: 30px;
  margin:auto;
}
</style>