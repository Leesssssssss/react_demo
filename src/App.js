import React from 'react';
import { Button, List } from 'antd-mobile';
import { connect } from 'react-redux';
import { addItem, reduceItem, addItemAsync } from './index.redux';

// App = connect(mapStateToProps, actionCreators)(App);
@connect(
  // state 属性 => props
  state => ({ num: state.counter }),
  // action 方法 (自动dispatch) => props
  { addItem, reduceItem, addItemAsync })

class App extends React.Component {
  render () {
    const boss = '小明';
    return (
      <div>
        <h1>{ boss }</h1>
        <h1>{ this.props.num }</h1>
        <button onClick={ this.props.addItem }>add</button>
        <button onClick={ this.props.reduceItem }>reduce</button>
        <button onClick={ this.props.addItemAsync }>addItemAsync</button>
        <One name='小红'></One>
        <Two name='小黄'></Two>
      </div>
    );
  }
}

function Two (props) {
  return <h2>{ props.name }</h2>;
}

class One extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: ['a', 'b', 'c']
    };

    // this.add = this.add.bind(this)
    console.log('组件初始化');
  }

  componentWillMount () {
    console.log('组件马上就要挂载了');
  }
  componentDidMount () {
    console.log('组件已经挂载了');
  }
  componentWillReceiveProps (nextProps) {
    console.log('组件要接收父组件的值了');
  }
  shouldComponentUpdate () {
    console.log('判断是不是要更新组件');
    return true;
  }
  componentWillUpdate () {
    console.log('组件马上就要更新了');
  }
  componentDidUpdate () {
    console.log('组件更新完了');
  }
  componentWillUnmount () {
    console.log('组件卸载了');
  }

  add () {
    this.setState({
      lists: [...this.state.lists, 'new' + Math.random()]
    });
  }
  render () {
    return (
      <div>
        <h1>{ this.props.name }</h1>
        <Button type="primary" onClick={ () => { this.add(); } }>Add</Button>
        <List renderHeader={ () => { '列表'; } }>
          { this.state.lists.map(item => {
            return (
              <List.Item key={ item }>
                {item }
              </List.Item>
            );
          }) }
        </List>
        <ul>{ this.state.lists.map(item => {
          return <li key={ item }>{ item }</li>;
        }) }</ul>
      </div>
    );
  }
}

export default App;