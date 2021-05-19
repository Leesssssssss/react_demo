import React from 'react';
import { connect } from 'react-redux';
import { Result, List, WhiteSpace, Modal } from 'antd-mobile';
import browserCookie from 'browser-cookies';
import { logoutSubmit } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';

@connect(
  state => state.user,
  { logoutSubmit }
)

class User extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout () {
    const alert = Modal.alert;
    alert('提醒', '确定要退出登录？', [
      { text: '返回', onPress: () => console.log('cancel') },
      {
        text: '确定', onPress: () => {
          browserCookie.erase('userid');
          this.props.logoutSubmit();
        }
      },
    ]);

  }

  render () {
    const props = this.props;
    const Item = List.Item;
    const Brief = Item.Brief;
    return props.user ? (
      <div>
        <Result img={ <img style={ { width: '50px', borderRadius: '5px' } } src={ require(`../imgs/${props.avatar}.png`) } alt=""></img> } title={ props.user } message={ props.type === 'boss' ? props.company : null }></Result>
        <List renderHeader={ () => { '简介'; } }>
          <Item wrap>
            { props.title }
            { props.desc.split('\n').map(v => <Brief key={ v }> { v }</Brief>) }
            { props.money ? <Brief> 薪资：{ props.money }</Brief> : null }
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <Item onClick={ this.logout }>退出登录</Item>
        </List>
      </div>
    ) : <Redirect to={ props.redirectTo }></Redirect>;
  }
}


export default User;