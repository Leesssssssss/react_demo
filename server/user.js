const { json } = require('express');
const express = require('express');
const utils = require('utility');
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');
const Chat = model.getModel('chat');
// 返回数据中不显示password && __v
const _filter = { 'password': 0, '__v': 0 };

Router.get('/list', (req, res) => {
  const { type } = req.query;
  User.find({ type }, (err, doc) => {
    return res.json({ code: 0, data: doc });
  });
});

// 完善信息
Router.post('/update', (req, res) => {
  const userid = req.cookies.userid;
  if (!userid) {
    return json.dumps({ code: 1 });
  }
  const body = req.body;
  User.findByIdAndUpdate(userid, body, (err, doc) => {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body);
    return res.json({ code: 0, data });
  });
});

// 登录
Router.post('/login', (req, res) => {
  const { user, password } = req.body;
  // { password: 0 } 
  User.findOne({ user, password: md5Pwd(password) }, _filter, (err, doc) => {
    if (!doc) {
      return res.json({ code: 1, msg: '用户名或密码错误' });
    }
    res.cookie('userid', doc._id);
    return res.json({ code: 0, data: doc });
  });
});

// 注册
Router.post('/register', (req, res) => {
  const { user, password, type } = req.body;
  User.findOne({ user }, (err, doc) => {
    if (doc) {
      return res.json({ code: 1, msg: '这个用户名有人用了！' });
    }
    const userModel = new User({ user, password: md5Pwd(password), type });
    userModel.save((e, d) => {
      if (e) {
        return res.json({ code: 1, msg: '服务器可能崩啦！' });
      }
      const { user, type, _id } = d;
      res.cookie('userid', _id);
      return res.json({ code: 0, data: { user, type, _id } });
    });
    // User.create拿不到用户_id
    // User.create({ user, password: md5Pwd(password), type }, (e, d) => {
    //   if (e) {
    //     return res.json({ code: 1, msg: '服务器可能崩啦！' });
    //   }
    //   return res.json({ code: 0 });
    // });
  });
});

// 获取用户信息
Router.get('/info', (req, res) => {
  const { userid } = req.cookies;
  if (!userid) {
    return res.json({ code: 1 });
  }
  User.findOne({ _id: userid }, _filter, (err, doc) => {
    if (err) {
      return res.json({ code: 1, msg: '服务器可能崩啦！' });
    }
    if (doc) {
      return res.json({ code: 0, data: doc });
    }
  });
});

// 获取聊天列表
Router.get('/getMsgList', (req, res) => {
  // const user = req.cookies.user;
  // '$or': [{ from: user, to: user }]
  Chat.find({}, (err, doc) => {
    if (!err) {
      {
        return res.json({ code: 0, msgs: doc });
      }
    }
  });
});

// 增加密码复杂度
function md5Pwd (password) {
  const salt = 'xiannv_is_beautiful_473875fjosdjf!@#$%HJKDOSJO';
  return utils.md5(utils.md5(password + salt));
}

module.exports = Router;