import React, { Component, Fragment } from 'react';

// Components
import UnderConstruction from './UnderConstruction';

// MUI
import Typography from '@material-ui/core/Typography';

export class Listings extends Component {
  render() {
    return (
      <Fragment>
        <Typography variant='h6'>Listings Page</Typography>
        <UnderConstruction />
      </Fragment>
    );
  }
}

export default Listings;
