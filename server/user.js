const express = require('express');
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');

Router.get('/list', (req, res) => {
  User.find({}, (err, doc) => {
    return res.json(doc);
  });
});

Router.post('/register', (req, res) => {
  const { user, password, type } = req.body;
  User.findOne({ user: user }, (err, doc) => {
    if (doc) {
      return res.json({ code: 1, msg: '这个用户名有人用了！' });
    }
    User.create({ user, password, type }, (e, d) => {
      if (e) {
        return res.json({ code: 1, msg: '服务器可能崩啦！' });
      }
      return res.json({ code: 0 });
    });
  });
});

Router.get('/info', (req, res) => {
  return res.json({ code: 1 });
});

module.exports = Router;