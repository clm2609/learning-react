import React, { Component } from 'react';
import Header from './Header/Header.js';
import Main from './Main/Main.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Main />
      </div>

    );
  }
}

export default App;
