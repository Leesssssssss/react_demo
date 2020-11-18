const mongoose = require('mongoose');
// 连接数据库
const DB_URL = 'mongodb://127.0.0.1:27017/imooc';
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
  console.log('mongo connect success');
});

const models = {
  user: {
    'user': { type: String, require: true },
    'password': { type: String, require: true },
    'type': { type: String, require: true },
    'avatar': { type: String },   // 头像
    'desc': { type: String },     // 个人简介
    'title': { type: String },    // 职位名
    'company': { type: String },  // 公司 (boss)
    'money': { type: String },    // 薪酬 (boss)
  },
  chat: {}
};

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
  getModel: (name) => {
    return mongoose.model(name);
  }
};