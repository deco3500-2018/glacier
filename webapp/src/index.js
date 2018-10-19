import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { List } from './App';
import NameForm from './components/NameForm';

ReactDOM.render(
  <Router>
      <div>
        <Route exact path="/" component={NameForm} />
        <Route path="/list" component={List} />
      </div>
  </Router>,
  document.getElementById('root')
);

serviceWorker.unregister();