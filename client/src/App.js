import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// MUI
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

// Pages and Components
import Home from './pages/Home';
import Account from './pages/Account';
import Navbar from './components/Navbar';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUser } from './redux/actions/authActions';

// Utility
import themeFile from './utility/theme';

import './App.css';

const theme = createMuiTheme(themeFile);

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <div className='App'>
              <Route exact path='/' component={Home} />
              <Route exact path='/account' component={Account} />
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
