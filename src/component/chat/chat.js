import React from 'react';
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile';
import { connect } from 'react-redux';
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux';
import { getChatId } from '../../utils';
@connect(
  state => state,
  { getMsgList, sendMsg, recvMsg }
)
class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      msg: [],
      showEmoji: false
    };
  }

  componentDidMount () {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList();
      this.props.recvMsg();
    }
  }

  fixCarousel () {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }

  handleSubmit () {
    const from = this.props.user._id;
    const to = this.props.match.params.user;
    const msg = this.state.text;
    this.props.sendMsg({ from, to, msg });
    this.setState({ text: '' });
  }

  render () {
    const userid = this.props.match.params.user;
    const users = this.props.chat.users;
    if (!users[userid]) {
      return null;
    }
    const chat_id = getChatId(userid, this.props.user._id);
    const chatmsgs = this.props.chat.chatmsg.filter(v => v.chat_id === chat_id);
    const emoji = "😀 😁 😂 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 😇 😐 😑 😶 😏 😣 😥 😮 😯 😪 😫 😴 😌 😛 😜 😝 😒 😓 😔 😕 😲 😷 😖 😞 😟 😤 😢 😭 😦 😧 😨 😬 😰 😱 😳 😵 😡 😠 👦 👧 👨 👩 👴 👵 👶 👱 👮 👲 👳 👷 👸 💂 🎅 👰 👼 💆 💇 🙍 🙎 🙅 🙆 💁 🙋 🙇 🙌 🙏 💪 👈 👉 ☝ 👆 👇 ✌ ✋ 👌 👍 👎 ✊ 👊 👋 👏 👐 ✍ 👤 👥 🚶 🏃 👯 💃 👫 👬 👭 💏 💑 👪 👣 👀 👂 👃 👅 👄 💋 🙈 🙉 🙊 🐵 🐒 🐶 🐕 🐩 🐺 🐱 😺 😸 😹 😻 😼 😽 🙀 😿 😾 🌑 🌒 🌓 🌔 🌕 🌖 🌗 🌘 🌙 🌚 🌛 🌜 🌝 💘 ❤ 💓 💔 💕 💖 💗 💙 💚 💛 💜 💝 💞 💟".split(' ').filter(v => v).map(v => ({ text: v }));
    return (
      <div id='chat-page'>
        <NavBar mode='dark' icon={ <Icon type='left' /> } onLeftClick={ () => { this.props.history.goBack(); } }>{ users[userid].name }</NavBar>
        {chatmsgs.map(v => {
          const avatar = require(`../imgs/${users[v.from].avatar}.png`);
          return v.from === userid ? (
            <div className="msg-box-left">
              <img className="revc-ava" src={ avatar } alt="" />
              <span className="recv-msg" key={ v._id }>{ v.content }</span>
            </div>
          ) : (
              <div className="msg-box-right">
                <span className="send-msg" key={ v._id }>{ v.content }</span>
                <img className="send-ava" src={ avatar } alt="" />
              </div>);
        }) }
        <div className="chat-footer">
          <List>
            <InputItem placeholder='请输入' value={ this.state.text } onChange={ v => { this.setState({ text: v }); } } extra={
              <div className="send-btn">
                <span style={ { fontSize: '22px', marginRight: '10px' } } onClick={ () => { this.setState({ showEmoji: !this.state.showEmoji }); this.fixCarousel(); } }>☺</span>
                <span onClick={ () => this.handleSubmit() }>发送</span>
              </div> }></InputItem>
          </List >
          { this.state.showEmoji ? <Grid data={ emoji } columnNum={ 9 } carouselMaxRow={ 4 } isCarousel={ true } hasLine={ false } onClick={ el => { this.setState({ text: this.state.text + el.text }); } }></Grid> : null }

        </div >
      </div>
    );
  }
}

export default Chat;