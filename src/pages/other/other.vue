<template>
<div>
    <div class="userBar">
        <img :src="oneUserInfo[0].Avatar" />
    </div>
    <div class="container">
        <div class="content" v-for="(item,index) in oneUserInfo" :key="index">
            <div class="textArea">
                <p>{{item.content}}</p>
            </div>
            <div class="timeArea">
                <span class="date">{{item.date}}</span>
                <!-- <span class="delete">删除</span> -->
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
            openId:''
        }
    },
    methods: {
        //点击主页返回
        navToHome() {
            wx.navigateTo({
                url: '/pages/index/main'
            })
        },
        //获取用户信息
        gotOnelUser() {
            const that = this;
            wx.cloud.callFunction({
                    name: 'getoneuserinfo',
                    data: {
                        userId: that.openId
                    }
                })
                .then(res => {
                    // console.log('请求数据库获取单个用户内容', res);
                    that.oneUserInfo = res.result.data
                })
                .catch(err => {
                    console.log('请求数据库获取单个用户内容失败', err);
                })
        }
    },
    onLoad(options){
        const that = this;
        that.openId = options.openid;
        if(that.openId){
            that.gotOnelUser();
        }
    },
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
