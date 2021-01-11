import React from 'react';
import { List, InputItem, NavBar } from 'antd-mobile';
import { connect } from 'react-redux';
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux';

@connect(
  state => state,
  { getMsgList, sendMsg, recvMsg }
)
class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      msg: []
    };
  }

  componentDidMount () {
    this.props.getMsgList();
    this.props.recvMsg();
  }

  handleSubmit () {
    const from = this.props.user._id;
    const to = this.props.match.params.user;
    const msg = this.state.text;
    this.props.sendMsg({ from, to, msg });
    this.setState({ text: '' });
  }

  render () {
    const user = this.props.match.params.user;
    return (
      <div id='chat-page'>
        <NavBar mode='dark'>{ user }</NavBar>
        {this.props.chat.chatmsg.map(v => {
          return v.from === user ? (
            <div className="msg-box">
              <span className="recv-msg" key={ v._id }>对方发来的： { v.content }</span>
            </div>
          ) : (
              <div className="msg-box">
                <span className="send-msg" key={ v._id }>我发的： { v.content }</span>
              </div>);
        }) }
        <div className="chat-footer">
          <List>
            <InputItem placeholder='请输入' value={ this.state.text } onChange={ v => { this.setState({ text: v }); } } extra={ <span onClick={ () => this.handleSubmit() }>发送</span> }></InputItem>
          </List >
        </div >
      </div>
    );
  }
}

export default Chat;