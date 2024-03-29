// 根据用户信息 返回跳转地址
// user.type    /boss      /genius
// user.avatar  /bossinfo  /geniusinfo
export function getRedirectPath ({ type, avatar }) {
  let url = (type === 'boss') ? '/boss' : '/genius';
  if (!avatar) {
    url += 'info';
  }
  return url;
}

export function getChatId (userId, targetId) {
  return [userId, targetId].sort().join('_');
}