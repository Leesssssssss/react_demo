import React from 'react';
import { Redirect } from 'react-router-dom';
import Logo from '../../component/logo/logo';
import imoocForm from '../../component/imooc-form/imooc-form';
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { register } from '../../redux/user.redux';

@connect(
  state => state.user,
  { register }
)
@imoocForm
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount () {
    this.props.handleChange('type', 'genius');
  }

  login () {
    this.props.history.push('/login');
  }

  register () {
    this.props.register(this.props.state);
  }

  render () {
    const RadioItem = Radio.RadioItem;
    return <div>
      { this.props.redirectTo ? <Redirect to={ this.props.redirectTo }></Redirect> : null }
      <Logo></Logo>
      <h2 style={ { textAlign: 'center' } }>注册</h2>
      <WingBlank>
        <InputItem onChange={ v => { this.props.handleChange('user', v); } }>用户名</InputItem>
        <WhiteSpace />
        <InputItem onChange={ v => { this.props.handleChange('password', v); } } type='password'>密码</InputItem>
        <WhiteSpace />
        <InputItem onChange={ v => { this.props.handleChange('repeatPassword', v); } } type='password'>确认密码</InputItem>
        <WhiteSpace />
        <List>
          <RadioItem checked={ this.props.state.type === 'genius' } onChange={ () => { this.props.handleChange('type', 'genius'); } }>牛人</RadioItem>
          <RadioItem checked={ this.props.state.type === 'boss' } onChange={ () => { this.props.handleChange('type', 'boss'); } }>BOSS</RadioItem>
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