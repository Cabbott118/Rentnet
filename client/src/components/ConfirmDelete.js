import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';

// MUI Icons
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

// Redux
import { connect } from 'react-redux';
import { deleteItem } from '../redux/actions/itemActions';
import { Typography } from '@material-ui/core';

const styles = (theme) => ({
  ...theme.spreadThis,
  cancelButton: {
    color: '#777',
    textTransform: 'none',
    marginRight: '1rem',
  },
  deleteButton: {
    color: '#fff',
    textTransform: 'none',
  },
  buttonGroup: {
    margin: '2rem 0 1rem',
  },
  progressSpinner: {
    position: 'absolute',
  },
});

class ConfirmDelete extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  };

  render() {
    const { classes, trailer } = this.props;
    if (!trailer) {
      return null;
    } else {
      return (
        <Fragment>
          <Button onClick={this.handleOpen}>
            <DeleteForeverIcon fontSize='small' color='error' />
          </Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            fullWidth
            maxWidth='xs'
          >
            <DialogContent>
              <Grid
                container
                direction='row'
                justify='center'
                alignItems='center'
                spacing={2}
              >
                <Grid item>
                  <Typography variant='body2'>
                    Are you sure you want to delete your {trailer.trailer_type}{' '}
                    {trailer.brand}?
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='body2' color='error'>
                    This action cannot be undone.
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                direction='row'
                justify='flex-end'
                alignItems='center'
                className={classes.buttonGroup}
              >
                <Grid item>
                  <Button
                    variant='outlined'
                    color='default'
                    className={classes.cancelButton}
                    onClick={this.handleClose}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant='contained'
                    color='primary'
                    className={classes.deleteButton}
                    onClick={this.onDeleteClick.bind(this, trailer._id)}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
        </Fragment>
      );
    }
  }
}

ConfirmDelete.propTypes = {
  deleteItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { deleteItem })(
  withStyles(styles)(ConfirmDelete)
);
