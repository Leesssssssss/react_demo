import React from 'react';
import { Redirect } from 'react-router-dom';
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import AvatarSelector from '../../component/avatar-selector/avatar-selector';
import { connect } from 'react-redux';
import { update } from '../../redux/user.redux';

@connect(
  state => state.user,
  { update }
)

class BossInfo extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.state = {
      title: '',
      company: '',
      money: '',
      desc: '',
      avatar: ''
    };
  }
  update () {
    this.props.update(this.state);
  }
  handleChange (key, val) {
    this.setState({
      [key]: val
    });
  }
  render () {
    const path = this.props.location.pathname;
    const redirect = this.props.redirectTo;
    return (
      <div>
        {redirect && redirect !== path ? <Redirect to={ this.props.redirectTo }></Redirect> : null }
        <NavBar mode="dark" >BOSS完善信息</NavBar>
        <AvatarSelector selectAvatar={ (imgName) => {
          this.setState({
            avatar: imgName
          });
        } }></AvatarSelector>
        <InputItem onChange={ v => { this.handleChange('title', v); } }>招聘职位</InputItem>
        <InputItem onChange={ v => { this.handleChange('company', v); } }>公司名称</InputItem>
        <InputItem onChange={ v => { this.handleChange('money', v); } }>职位薪资</InputItem>
        <TextareaItem onChange={ v => { this.handleChange('desc', v); } } rows={ 3 } autoHeight title='职位要求'></TextareaItem>
        <div className="box"></div>
        <Button className="btn" type='primary' onClick={ this.update }>保存</Button>
      </div>
    );
  }
}

export default BossInfo;