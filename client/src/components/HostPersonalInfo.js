import React from 'react';

// MUI
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default function HostPersonalInfo(props) {
  const { values, handleChange } = props;

  return (
    <Container>
      <TextField
        label='Thing 1'
        name='inputOne'
        onChange={handleChange('inputOne')}
        defaultValue={values.inputOne}
        fullWidth
      />
      <TextField
        label='Thing 2'
        name='inputTwo'
        onChange={handleChange('inputTwo')}
        defaultValue={values.inputTwo}
        fullWidth
      />
      <TextField
        label='Thing 3'
        name='inputThree'
        onChange={handleChange('inputThree')}
        defaultValue={values.inputThree}
        fullWidth
      />
    </Container>
  );
}
