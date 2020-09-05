<template>
  <div>
    <div class="userBar">
      <img :src="avatar" />
    </div>
    <div class="container">
      <div class="content" v-for="(item,index) in oneUserInfo" :key="index">
        <div class="textArea">
          <p>{{item.content}}</p>
        </div>
        <div class="timeArea">
          <span class="date">{{item.date}}</span>
          <span class="delete" :id="item._id" @click="removeData">删除</span>
        </div>
      </div>
    </div>
    <hr />
    <div class="home">
      <img src="/static/images/home.png" @click="navToHome" />
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            oneUserInfo: {},
            avatar: ''
        }
    },
    methods: {
        //点击主页返回
        navToHome() {
            wx.navigateBack({
                delta: 1
            })
        },
        //获取用户信息
        getData() {
            const that = this;
            wx.cloud.callFunction({
                    name: 'getoneuserinfo',
                    data: {
                        userId: that.openId
                    }
                })
                .then(res => {
                    that.oneUserInfo = res.result.data
                })
                .catch(err => {
                    console.log('请求数据库获取单个用户内容失败', err);
                })
        },
        //缓存中获取openId
        getOpenId() {
            const that = this;
            const ui = wx.getStorageSync('ui');
            that.avatar = ui.avatarUrl;
            that.openId = ui.openId;
            that.getData();
        },
        //删除语句
        removeData(e) {
            const that = this;
            wx.cloud.callFunction({
                    name: 'removedata',
                    data: {
                        id: e.target.id
                    }
                })
                .then(res => {
                    console.log('删除成功');
                    wx.showToast({
                            title: '已删除',
                            icon: 'success',
                        })
                    that.getData();
                })
                .catch(err => {
                    console.log('删除失败', err);
                })
        }
    },
    onLoad() {
        this.getOpenId();
    }
};
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
  margin: auto;
}
</style>
