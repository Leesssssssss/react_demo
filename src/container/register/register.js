import React from 'react';
import { Redirect } from 'react-router-dom';
import Logo from '../../component/logo/logo';
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { register } from '../../redux/user.redux';

@connect(
  state => state.user,
  { register }
)

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);

    this.state = {
      user: '',
      password: '',
      repeatPassword: '',
      type: 'genius'  // genius牛人   boss招聘者
    };
  }

  login () {
    this.props.history.push('/login');
  }

  register () {
    this.props.register(this.state);
  }

  handleChange (key, val) {
    this.setState({
      [key]: val
    });
  }

  render () {
    const RadioItem = Radio.RadioItem;
    return <div>
      { this.props.redirectTo ? <Redirect to={ this.props.redirectTo }></Redirect> : null }
      <Logo></Logo>
      <h2 style={ { textAlign: 'center' } }>注册</h2>
      <WingBlank>
        <InputItem onChange={ v => { this.handleChange('user', v); } }>用户名</InputItem>
        <WhiteSpace />
        <InputItem onChange={ v => { this.handleChange('password', v); } } type='password'>密码</InputItem>
        <WhiteSpace />
        <InputItem onChange={ v => { this.handleChange('repeatPassword', v); } } type='password'>确认密码</InputItem>
        <WhiteSpace />
        <List>
          <RadioItem checked={ this.state.type === 'genius' } onChange={ () => { this.handleChange('type', 'genius'); } }>牛人</RadioItem>
          <RadioItem checked={ this.state.type === 'boss' } onChange={ () => { this.handleChange('type', 'boss'); } }>BOSS</RadioItem>
        </List>
        { this.props.msg ? <p className='error-msg'>{ this.props.msg }</p> : null }
        <WhiteSpace />
        <WhiteSpace />
        <Button type="primary" onClick={ this.register }>注册</Button>
        <WhiteSpace />
        <Button type="primary" onClick={ this.login }>登录</Button>
      </WingBlank>
    </div>;

  }
}

export default Register;