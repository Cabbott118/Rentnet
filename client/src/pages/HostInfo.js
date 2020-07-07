import React, { Component, Fragment } from 'react';

// Components
import UnderConstruction from './UnderConstruction';

// MUI
import Typography from '@material-ui/core/Typography';

export class HostInfo extends Component {
  render() {
    return (
      <Fragment>
        <Typography variant='h6'>Host Info Page</Typography>
        <UnderConstruction />
      </Fragment>
    );
  }
}

export default HostInfo;
