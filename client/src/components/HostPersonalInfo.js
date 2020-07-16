import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

const styles = (theme) => ({
  ...theme.spreadThis,
});

const HostPersonalInfo = (props) => {
  const { values, handleChange, classes } = props;

  return (
    <Container>
      <TextField
        label='Address'
        name='userAddress'
        variant='outlined'
        size='small'
        className={classes.textField}
        onChange={handleChange('userAddress')}
        defaultValue={values.userAddress}
        fullWidth
      />
      <TextField
        label='City'
        name='userCity'
        variant='outlined'
        size='small'
        className={classes.textField}
        onChange={handleChange('userCity')}
        defaultValue={values.userCity}
        fullWidth
      />
      <TextField
        label='State'
        name='userState'
        variant='outlined'
        size='small'
        className={classes.textField}
        onChange={handleChange('userState')}
        defaultValue={values.userState}
        fullWidth
      />
      <TextField
        label='Zip Code'
        name='userZip'
        variant='outlined'
        size='small'
        className={classes.textField}
        onChange={handleChange('userZip')}
        defaultValue={values.userZip}
        fullWidth
      />
    </Container>
  );
};
export default withStyles(styles)(HostPersonalInfo);
