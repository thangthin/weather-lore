import React, { Component } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Forecast from './components/Forecast';
import DetailedForecast from './components/DetailedForecast';
import history from './components/History';
import { Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Route render={() => <Header/>}/>
          <Route path="/" exact component={Main} />
          <Route path="/forecast" component={Forecast} />
          <Route path="/details" component={DetailedForecast} />
        </div>
      </Router>
    );
  }
}

export default App;
