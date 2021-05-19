import React from 'react';
import PropTypes from 'prop-types';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
@withRouter
class UserCard extends React.Component {
  static propTypes = {
    userlist: PropTypes.array.isRequired
  };
  handleClick (v) {
    this.props.history.push(`/chat/${v._id}`);
  }
  render () {
    return (
      <WingBlank>
        <WhiteSpace></WhiteSpace>
        {this.props.userlist.map(v => (
          v.avatar ?
            (<div>
              <WhiteSpace></WhiteSpace>
              <Card key={ v._id } onClick={ () => this.handleClick(v) }>
                <Card.Header title={ v.user } thumb={ require(`../imgs/${v.avatar}.png`) } thumbStyle={ { width: '40px', borderRadius: '5px' } } extra={ <span>{ v.title }</span> }></Card.Header>
                <Card.Body>
                  { v.type === 'boss' ? <div className="marginBottom10">公司：{ v.company }</div> : null }
                  { v.type === 'boss' ? <div className="marginBottom10">薪资：{ v.money }</div> : null }
                要求：{ v.desc.split('\n').map(d => (
                    <div key={ d + Math.random() }>{ d }</div>
                  )) }
                </Card.Body>
              </Card>
            </div>) : null
        ))
        }
      </WingBlank>
    );
  }
}


export default UserCard;