import React from 'react';

// MUI
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default function HostPaymentinfo(props) {
  const { values, handleChange } = props;

  return (
    <Container>
      <TextField
        label='Thing 4'
        name='inputFour'
        onChange={handleChange('inputFour')}
        defaultValue={values.inputFour}
        fullWidth
      />
      <TextField
        label='Thing 5'
        name='inputFive'
        onChange={handleChange('inputFive')}
        defaultValue={values.inputFive}
        fullWidth
      />
      <TextField
        label='Thing 6'
        name='inputSix'
        onChange={handleChange('inputSix')}
        defaultValue={values.inputSix}
        fullWidth
      />
    </Container>
  );
}
