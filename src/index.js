import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './container/login/login';
import Register from './container/register/register';
import reducers from './reducer';
import AuthRoute from './component/authroute/authroute';
import './config';

const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : () => { };
const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  reduxDevtools
));

ReactDOM.render(
  (<Provider store={ store }>
    <BrowserRouter>
      <div>
        <AuthRoute></AuthRoute>
        <Route path='/login' component={ Login }></Route>
        <Route path='/register' component={ Register }></Route>
      </div>
      {/* <Switch>
        <Route path='/login' exact component={ Auth }></Route>
        <Route path='/dashboard' component={ Dashboard }></Route>
        <Redirect to='/dashboard'></Redirect>
      </Switch> */}

      {/* exact 完全匹配路由 */ }
      {/* Switch只命中第一个匹配的路由 */ }
      {/* <Switch>
          <Route path='/' exact component={ App }></Route>
          <Route path='/one' component={ One }></Route>
          <Route path='/two' component={ Two }></Route>
        </Switch> */}
      {/* <Redirect to='two'></Redirect> */ }
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
);

// const render = () => {
//   ReactDOM.render(
//     <React.StrictMode>
//       <App store={ store } addItem={ addItem } reduceItem={ reduceItem } addItemAsync={ addItemAsync } />
//     </React.StrictMode>,
//     document.getElementById('root')
//   );
// };
// render();
// store.subscribe(render);

serviceWorker.unregister();
