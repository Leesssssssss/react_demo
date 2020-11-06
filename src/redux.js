import { createStore } from 'redux';
// 新建store

function counter (state = 0, action) {
  switch (action.type) {
    case 1:
      return state + 1;
    case 2:
      return state - 1;
    default:
      return 10;
  }
}

const store = createStore(counter);

const init = store.getState();

console.log((init));

function listener () {
  const current = store.getState();
  console.log('current' + current);
}

// 订阅
store.subscribe(listener);

// 派发事件 传递action
store.dispatch({ type: 1 });
store.dispatch({ type: 1 });
store.dispatch({ type: 2 });