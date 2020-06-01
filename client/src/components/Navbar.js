import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

export class Navbar extends Component {
  render() {
    return (
      <AppBar>
        <Toolbar>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;
