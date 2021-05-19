import { List } from 'antd-mobile';
import React from 'react';
import { connect } from 'react-redux';

@connect(
  state => state
)
class Msg extends React.Component {
  getLast (arr) {
    return arr[arr.length - 1];
  }
  render () {
    if (!this.props.chat.chatmsg.length) {
      return null;
    }
    const Item = List.Item;
    const Brief = Item.Brief;
    const userid = this.props.user._id;
    const userinfo = this.props.chat.users;
    // 按照聊天用户分组，根据chat_id
    const msgGroup = {};
    this.props.chat.chatmsg.forEach(v => {
      msgGroup[v.chat_id] = msgGroup[v.chat_id] || [];
      msgGroup[v.chat_id].push(v);
    });
    const chatList = Object.values(msgGroup);
    return (
      <div>
        <List>
          { chatList.map(v => {
            const lastItem = this.getLast(v);
            const targetId = v[0].from === userid ? v[0].to : v[0].from;
            const name = userinfo[targetId] ? userinfo[targetId].name : '';
            const avatar = userinfo[targetId] ? userinfo[targetId].avatar : '';
            return (
              <Item key={ lastItem._id }>
                { lastItem.content }
                <Brief>{ name }</Brief>
              </Item>
            );
          }) }
        </List>
      </div>
    );
  }
}


export default Msg;