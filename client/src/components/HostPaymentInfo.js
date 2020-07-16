import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  ...theme.spreadThis,
});

const HostPaymentInfo = (props) => {
  const { values, handleChange, classes } = props;

  return (
    <Container>
      <Typography variant='body2' align='center'>
        The provided Bank Account will be where earnings are deposited.
      </Typography>
      <TextField
        label='Bank Name'
        name='userBankName'
        variant='outlined'
        size='small'
        className={classes.textField}
        onChange={handleChange('userBankName')}
        defaultValue={values.userBankName}
        fullWidth
      />
      <TextField
        label='Bank Account Number'
        name='userAccountNumber'
        variant='outlined'
        size='small'
        className={classes.textField}
        onChange={handleChange('userAccountNumber')}
        defaultValue={values.userAccountNumber}
        fullWidth
      />
      <TextField
        label='Bank Routing Number'
        name='userRoutingNumber'
        variant='outlined'
        size='small'
        className={classes.textField}
        onChange={handleChange('userRoutingNumber')}
        defaultValue={values.userRoutingNumber}
        fullWidth
      />
    </Container>
  );
};
export default withStyles(styles)(HostPaymentInfo);
