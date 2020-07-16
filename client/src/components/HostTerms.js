import React from 'react';

// MUI
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

export default function HostTerms(props) {
  return (
    <Container>
      <Typography variant='body2'>Terms and Conditions here</Typography>
      <Typography variant='body2'>
        I'll have a checkbox here to enable continue button
      </Typography>
    </Container>
  );
}
