import React from 'react';
import { connect } from 'react-redux';
import { Result } from 'antd-mobile';

@connect(
  state => state.user
)

class User extends React.Component {
  render () {
    const props = this.props;
    return props.user ? (
      <div>
        <Result img={ <img style={ { width: '50px' } } src={ require(`../imgs/${props.avatar}.png`) } alt=""></img> } title={ props.user } message={ props.type === 'boss' ? props.company : null }></Result>
      </div>
    ) : null;
  }
}


export default User;