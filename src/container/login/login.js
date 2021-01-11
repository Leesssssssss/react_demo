import React from 'react';
import { Redirect } from 'react-router-dom';
import Logo from '../../component/logo/logo';
import imoocForm from '../../component/imooc-form/imooc-form';
import { InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { login } from '../../redux/user.redux';

// 属性代理
// function WrapperHello (Comp) {
//   class WrapComp extends React.Component {
//     render () {
//       return (
//         <div>
//           <p>高阶组件</p>
//           <Comp { ...this.props }></Comp>
//         </div>
//       );
//     }
//   }
//   return WrapComp;
// }
// @WrapperHello
// class Hello extends React.Component {
//   render () {
//     return <h1>Hello</h1>;
//   }
// }

@connect(
  state => state.user,
  { login }
)
@imoocForm
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  login () {
    this.props.login(this.props.state);
  }

  register () {
    this.props.history.push('/register');
  }

  render () {
    return (
      <div>
        {/* <Hello></Hello> */ }
        { this.props.redirectTo && this.props.redirectTo !== '/login' ? <Redirect to={ this.props.redirectTo }></Redirect> : null }
        <Logo></Logo>
        <h2 style={ { textAlign: 'center' } }>登录</h2>
        <WingBlank>
          <InputItem onChange={ v => { this.props.handleChange('user', v); } }>用户</InputItem>
          <WhiteSpace />
          <InputItem onChange={ v => { this.props.handleChange('password', v); } } type='password'>密码</InputItem>
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