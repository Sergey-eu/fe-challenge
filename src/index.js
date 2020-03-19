import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './scss/main.scss';
import NewUserPage from './pages/NewUserPage';
import HomePage from './pages/HomePage';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='mui-container'>
          <div className='mui-row'>
            <Switch>

              <Route exact path='/'>
                <HomePage />
              </Route>

              <Route path='/form'>
                <NewUserPage />
              </Route>
              
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

render(<App />, document.getElementById('root'));
