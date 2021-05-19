import axios from 'axios';
import io from 'socket.io-client';
const socket = io('ws://localhost:9093');

// 获取聊天列表
const MSG_LIST = 'MSG_LIST';
// 读取信息
const MSG_RECV = 'MSG_RECV';
// 标识已读
const MSG_READ = 'MSG_READ';

const initState = {
  chatmsg: [],
  users: {},
  unread: 0
};

export function chat (state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return { ...state, users: action.payload.users, chatmsg: action.payload.msgs, unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.user_id).length };
    case MSG_RECV:
      const new_unread = action.payload.to === action.payload.user_id ? 1 : 0;
      return { ...state, chatmsg: [...state.chatmsg, action.payload.msg], unread: state.unread + new_unread };
    // case MSG_READ:
    default:
      return state;
  }
}

function msgList (msgs, users, user_id) {
  return { type: MSG_LIST, payload: { msgs, users, user_id } };
}

function msgRecv (msg, user_id) {
  return { type: MSG_RECV, payload: { msg, user_id } };
}

// 获取聊天列表
export function getMsgList () {
  return (dispatch, getState) => {
    axios.get('/user/getMsgList').then(res => {
      const user_id = getState().user._id;
      if (res.status === 200 && res.data.code === 0) {
        dispatch(msgList(res.data.msgs, res.data.users, user_id));
      }
    });
  };
}

// 发送消息
export function sendMsg ({ from, to, msg }) {
  return dispatch => {
    socket.emit('sendMsg', { from, to, msg });
  };
}

// 接收消息
export function recvMsg () {
  return (dispatch, getState) => {
    socket.on('recvMsg', (data) => {
      const user_id = getState().user._id;
      dispatch(msgRecv(data, user_id));
    });
  };
}