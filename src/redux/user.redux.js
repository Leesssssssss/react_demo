import axios from "axios";
import { getRedirectPath } from '../utils';

const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const LOGOUT = 'LOGOUT';

const initState = {
  redirectTo: '',
  msg: '',
  user: '',
  type: ''
};

// reducer
export function user (state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload };
    case LOAD_DATA:
      return { ...state, ...action.payload };
    case ERROR_MSG:
      return { ...state, msg: action.msg, isAuth: false };
    case LOGOUT:
      return { ...initState, redirectTo: '/login' };
    default:
      return state;
  }
}

function authSuccess (obj) {
  // 过滤掉password
  const { password, ...data } = obj;
  return { type: AUTH_SUCCESS, payload: data };
}

function errorMsg (msg) {
  return { msg, type: ERROR_MSG };
}

export function loadData (user_info) {
  return { type: LOAD_DATA, payload: user_info };
}

export function logoutSubmit () {
  return { type: LOGOUT };
}

// 注册
export function register ({ user, password, repeatPassword, type }) {
  if (!user || !password || !type) {
    return errorMsg('请输入用户名和密码');
  }
  if (password !== repeatPassword) {
    return errorMsg('两次密码输入不一致');
  }
  return dispatch => {
    axios.post('/user/register', { user, password, type }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess({ user, password, type }));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
};

// 登录
export function login ({ user, password }) {
  if (!user || !password) {
    return errorMsg('请输入用户名和密码');
  }
  return dispatch => {
    axios.post('/user/login', { user, password }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
};

// 完善信息
export function update (data) {
  return dispatch => {
    axios.post('/user/update', data).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}