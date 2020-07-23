import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// MUI
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// MUI Icons
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

// Components
import LoadingSpinner from '../components/LoadingSpinner';

// Redux
import { connect } from 'react-redux';
import { loadUser } from '../redux/actions/authActions';
import { getItems } from '../redux/actions/itemActions';

const styles = (theme) => ({
  ...theme.spreadThis,
  container: {
    padding: '3rem 2rem',
  },
  table: {
    backgroundColor: '#eee',
  },
  tableHead: {
    backgroundColor: '#cecece',
  },
});

export class MyListings extends Component {
  componentDidMount() {
    this.props.loadUser();
    this.props.getItems();
  }

  render() {
    const {
      classes,

      auth: { user, isLoading },
      item: { items },
    } = this.props;

    if (!user) {
      return <LoadingSpinner loading={isLoading} />;
    } else {
      const userID = user._id;
      return (
        <Container className={classes.container}>
          <TableContainer component={Paper}>
            <Table className={classes.table} size='small'>
              <TableHead className={classes.tableHead}>
                <TableRow>
                  <TableCell>Trailer Type</TableCell>
                  <TableCell align='left'>Brand</TableCell>
                  <TableCell align='left'>Dimensions</TableCell>
                  <TableCell align='left'>Max Weight Cap.</TableCell>
                  <TableCell align='left'>Price ($)</TableCell>
                  <TableCell align='left'></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((trailer) => (
                  <TableRow key={trailer._id}>
                    {userID === trailer.owner_id ? (
                      <Fragment>
                        <TableCell component='th' scope='row'>
                          {trailer.trailer_type}
                        </TableCell>
                        <TableCell align='left'>{trailer.brand}</TableCell>
                        <TableCell align='left'>
                          {trailer.deck_dimensions}
                        </TableCell>
                        <TableCell align='left'>
                          {trailer.weight} lbs.
                        </TableCell>
                        <TableCell align='left'>${trailer.price}</TableCell>
                        <TableCell align='left'>
                          <EditIcon fontSize='small' color='action' />
                          <DeleteForeverIcon fontSize='small' color='error' />
                        </TableCell>
                      </Fragment>
                    ) : null}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      );
    }
  }
}

MyListings.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  getItems: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  item: state.item,
});

export default connect(mapStateToProps, { loadUser, getItems })(
  withStyles(styles)(MyListings)
);
