import React from 'react';
import { connect } from 'react-redux';
import { login, getUserData } from './Auth.redux';
import { Redirect } from 'react-router-dom';

@connect(
  state => state.auth,
  { login, getUserData }
)

class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {}
    };
  }
  componentDidMount () {
    this.props.getUserData();
    // axios.get('/data').then(res => {
    //   if (res.status === 200) {
    //     this.setState({ data: res.data });
    //   }
    // });
  }

  render () {
    return (
      <div>
        <h2>My Name：{ this.props.user }</h2>
        <h2>My Age：{ this.props.age }</h2>
        {this.props.isAuth ? <Redirect to='/dashboard'></Redirect> : null }
        <h2>Login</h2>
        <button onClick={ this.props.login }>登录</button>
      </div>
    );
  }
}

export default Auth;