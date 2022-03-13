import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './router/Routes';
import Store from './Redux/Store/Store';
import { Provider } from 'react-redux';

class App extends Component {
  state = {
    collapseID: ''
  };
  render() {

    const { collapseID } = this.state;
    return (
      <Provider store={Store}>
        <Router>
          <div className='flyout'>
            {collapseID && overlay}
            <main style={{ marginTop: '4rem' }}>
              <Routes />
            </main>  
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
