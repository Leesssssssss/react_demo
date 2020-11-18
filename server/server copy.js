const express = require('express')
const mongoose = require('mongoose')
// 连接数据库
const DB_URL = 'mongodb://127.0.0.1:27017/imooc'
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('connected', () => {
  console.log('mongo connect success');
})

// 用户表
const User = mongoose.model('user', new mongoose.Schema({
  user: { type: String, require: true },
  age: { type: Number, require: true }
}))

// 新增
// User.create({
//   user: '美柔',
//   age: 18
// }, (err, doc) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(doc);
//   }
// })

// 删除
// User.remove({ user: 'imooc' }, (err, doc) => {
//   if (!err) {
//     console.log('delete success');
//   } else {
//     console.log(err);
//   }
// })

// 更新
// User.update({ user: '美柔' }, { '$set': { age: 20 } }, (err, doc) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(doc);
//   }
// })


const app = express()

app.get('/', (req, res) => {
  res.send('hello')
})

app.get('/data', (req, res) => {
  // User.find({}, (err, doc) => {
  //   res.json(doc)
  // })

  // 查到一条就返回，返回一条数据，不是一个数组
  User.findOne({ user: '美柔' }, (err, doc) => {
    res.json(doc)
  })
})


app.listen(9093, () => {
  console.log('start 9093');
})