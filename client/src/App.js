import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// MUI
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

// Pages and Components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Account from './pages/Account';
import AddListingForm from './pages/AddListingForm';
import MyListings from './pages/MyListings';
import HostInfo from './pages/HostInfo';
import Listings from './pages/Listings';
import AboutUs from './pages/AboutUs';
import Success from './pages/Success';
import EditUser from './pages/EditUser';
import UnderConstruction from './pages/UnderConstruction';
import TrailerPage from './pages/TrailerPage';

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
              <Route exact path='/addlisting' component={AddListingForm} />
              <Route exact path='/mylistings' component={MyListings} />
              <Route exact path='/hostinfo' component={HostInfo} />
              <Route exact path='/search' component={Listings} />
              <Route exact path='/search/:trailer_city' component={Listings} />
              <Route
                exact
                path='/search/:trailer_city/:id'
                component={TrailerPage}
              />
              <Route exact path='/aboutus' component={AboutUs} />
              <Route exact path='/success' component={Success} />
              <Route exact path='/edituser' component={EditUser} />
              <Route
                exact
                path='/underconstruction'
                component={UnderConstruction}
              />
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
