import axios from "axios";

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';

const initState = {
  isAuth: '',
  msg: '',
  user: '',
  password: '',
  type: ''
};

// reducer
export function user (state = initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return { ...state, msg: '', isAuth: true, ...action.payload };
    case ERROR_MSG:
      return { ...state, msg: action.msg, isAuth: false };
    default:
      return state;
  }
}

function registerSuccess (data) {
  return { type: REGISTER_SUCCESS, payload: data };
}

function errorMsg (msg) {
  return { msg, type: ERROR_MSG };
}

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
        dispatch(registerSuccess({ user, password, type }));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
};