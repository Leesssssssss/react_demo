import React from 'react';
import { List, Grid } from 'antd-mobile';
import PropTypes from 'prop-types';

class AvatarSelector extends React.Component {
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  render () {
    const avatarList = ['one.png', 'two.png', 'three.png', 'four.png', 'five.png', 'six.png', 'seven.png', 'eight.png', 'nine.png', 'ten.png', 'eleven.png', 'twelve.png'].map(v => ({
      icon: require(`../imgs/${v}`),
      text: v.split('.')[0]
    }));
    console.log(avatarList,'avatarList');

    const gridHeader = this.state.icon ? (<div><span>已选择头像</span> <img style={ { width: '20px' } } src={ this.state.icon } alt="" /></div>) : '请选择头像';
    return (
      <div>
        <List renderHeader={ () => gridHeader }>
          <Grid data={ avatarList } activeStyle={ false } onClick={ element => { this.setState(element); this.props.selectAvatar(element.text); } } />
        </List>
      </div>
    );
  }
}

export default AvatarSelector;