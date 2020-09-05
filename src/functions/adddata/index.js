// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    db.collection('demo1').add({
      data:{
        date:event.time,
        userId:event.userId,
        name:event.name,
        Avatar:event.Avatar,
        content:event.content,
        latitude:event.latitude,
        longitude:event.longitude,
      }
    })
}