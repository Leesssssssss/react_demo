const express = require('express');
const userRouter = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const model = require('./model');
const Chat = model.getModel('chat');

// work with express
const server = require('http').Server(app);
const io = require('socket.io')(server, { cors: true });

io.on('connection', function (socket) {
  socket.on('sendMsg', function (data) {
    const { from, to, msg } = data;
    const chat_id = [from, to].sort().join('_');
    Chat.create({ chat_id, from, to, content: msg }, (err, d) => {
      io.emit('recvMsg', Object.assign({}, d._doc));
    });
  });
});

app.use(cookieParser());
app.use(bodyParser.json());

app.use('/user', userRouter);

// app 换成 server --- socket.io和express绑定
server.listen(9093, () => {
  console.log('start 9093');
});