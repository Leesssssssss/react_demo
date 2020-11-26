import React from 'react';
import PropTypes from 'prop-types';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';

class UserCard extends React.Component {
  static propTypes = {
    userlist: PropTypes.array.isRequired
  };
  render () {
    return (
      <WingBlank>
        <WhiteSpace></WhiteSpace>
        {this.props.userlist.map(v => (
          v.avatar ?
            <Card key={ v._id }>
              <Card.Header title={ v.user } thumb={ require(`../imgs/${v.avatar}.png`) } thumbStyle={ { width: '40px' } } extra={ <span>{ v.title }</span> }></Card.Header>
              <Card.Body>
                { v.type === 'boss' ? <div className="marginBottom10">公司：{ v.company }</div> : null }
                { v.type === 'boss' ? <div className="marginBottom10">薪资：{ v.money }</div> : null }
                要求：{ v.desc.split('\n').map(d => (
                  <div key={ d }>{ d }</div>
                )) }
              </Card.Body>
            </Card> : null
        ))
        }
      </WingBlank>
    );
  }
}


export default UserCard;