import React from 'react';
import App from './App';
import { Link, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from './Auth.redux';

function One () {
  return <h1>One</h1>;
}
function Two () {
  return <h1>Two</h1>;
}

@connect(
  state => state.auth,
  { logout }
)

class Dashboard extends React.Component {
  render () {
    const match = this.props.match;
    const redirectToLogin = <Redirect to='/login'></Redirect>;
    const app = (
      <div>
        {this.props.isAuth ? <button onClick={ this.props.logout }>登出</button> : null }
        <ul>
          <li><Link to={ `${match.url}` }>0</Link></li>
          <li><Link to={ `${match.url}/one` }>1</Link></li>
          <li><Link to={ `${match.url}/two` }>2</Link></li>
        </ul>
        <Route path={ `${match.url}` } exact component={ App }></Route>
        <Route path={ `${match.url}/one` } component={ One }></Route>
        <Route path={ `${match.url}/two` } component={ Two }></Route>
      </div>
    );
    return this.props.isAuth ? app : redirectToLogin;
  }
}

export default Dashboard;