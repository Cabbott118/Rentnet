import React, { Component, Fragment } from 'react';
// import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';

// MUI Dialog Specific
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

// Components
import LoadingSpinner from './LoadingSpinner';

// Redux
import { connect } from 'react-redux';
import { loadUser } from '../redux/actions/authActions';
import { getItems } from '../redux/actions/itemActions';

const styles = (theme) => ({
  ...theme.spreadThis,

  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  image: {
    margin: '1rem',
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '90% !important', // Overrides inline-style
      height: 150,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export class TrailerCard extends Component {
  state = {
    open: false,
    id: '',
    trailer: {},
  };

  componentDidMount() {
    this.props.loadUser();
    this.props.getItems();
  }

  handleOpenClick = (id) => {
    const {
      item: { items },
    } = this.props;
    for (let i = 0; i < items.length; i++) {
      if (id === items[i]._id) {
        this.setState({
          trailer: items[i],
        });
      }
    }

    this.setState({
      open: true,
      id,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      id: '',
    });
  };

  render() {
    const {
      classes,
      item: { items, loading },
    } = this.props;

    const {
      brand,
      date,
      deck_dimensions,
      price,
      trailer_type,
      weight,
      item_location,
    } = this.state.trailer;

    if (loading) {
      return <LoadingSpinner loading={loading} />;
    }

    const listings = (
      <Grid container direction='column' justify='flex-start'>
        {items.map(
          ({
            _id,
            brand,
            trailer_type,
            item_location,
            date,
            deck_dimensions,
            price,
          }) => (
            <Grid item xs={12} sm={12} md={6} key={_id}>
              <ButtonBase
                focusRipple
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                onClick={this.handleOpenClick.bind(this, _id)}
                style={{
                  width: '300px',
                }}
              >
                <span
                  className={classes.imageSrc}
                  style={{
                    backgroundImage: 'url(https://via.placeholder.com/250x150)',
                  }}
                />
                <span className={classes.imageBackdrop} />
                <span className={classes.imageButton}>
                  <Typography
                    component='span'
                    variant='h6'
                    color='inherit'
                    className={classes.imageTitle}
                  >
                    {trailer_type}
                    <span className={classes.imageMarked} />
                  </Typography>
                </span>
              </ButtonBase>
            </Grid>
          )
        )}
      </Grid>
    );

    return (
      <Fragment>
        {listings}

        {/* Dialog only appears when a trailer is clicked. ID is passed through onOpenClick handler */}

        <Dialog
          fullWidth
          maxWidth='sm'
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <DialogTitle style={{ alignContent: 'center' }}>
            {trailer_type} trailer in {item_location}
          </DialogTitle>

          <Container>
            <Typography variant='h6' color='textSecondary' align='center'>
              {brand}
            </Typography>

            <Typography variant='h6' color='textSecondary' align='center'>
              {deck_dimensions}
            </Typography>

            <Typography variant='h6' color='textSecondary' align='center'>
              Capacity of {weight} lbs
            </Typography>

            <Typography variant='h6' color='textSecondary' align='center'>
              ${price}/Day
            </Typography>

            <Typography variant='h6' color='textSecondary' align='center'>
              {date}
            </Typography>
          </Container>
        </Dialog>
      </Fragment>
    );
  }
}

TrailerCard.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  getItems: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  item: state.item,
});

export default connect(mapStateToProps, { loadUser, getItems })(
  withStyles(styles)(TrailerCard)
);
