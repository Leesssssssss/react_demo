import React from 'react';
import { Redirect } from 'react-router-dom';
import Logo from '../../component/logo/logo';
import { InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { login } from '../../redux/user.redux';

@connect(
  state => state.user,
  { login }
)

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);

    this.state = {
      user: '',
      password: ''
    };
  }

  login () {
    this.props.login(this.state);
  }

  register () {
    this.props.history.push('/register');
  }

  handleChange (key, val) {
    this.setState({
      [key]: val
    });
  }

  render () {
    return (
      <div>
        { this.props.redirectTo ? <Redirect to={ this.props.redirectTo }></Redirect> : null }
        <Logo></Logo>
        <h2 style={ { textAlign: 'center' } }>登录</h2>
        <WingBlank>
          <InputItem onChange={ v => { this.handleChange('user', v); } }>用户</InputItem>
          <WhiteSpace />
          <InputItem onChange={ v => { this.handleChange('password', v); } }>密码</InputItem>
          { this.props.msg ? <p className='error-msg'>{ this.props.msg }</p> : null }
          <WhiteSpace />
          <WhiteSpace />
          <Button type="primary" onClick={ this.login }>登录</Button>
          <WhiteSpace />
          <Button type="primary" onClick={ this.register }>注册</Button>
        </WingBlank>
      </div>
    );
  }
}

export default Login;