import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// MUI
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// MUI Icons
import EditIcon from '@material-ui/icons/Edit';

// Components
import LoadingSpinner from '../components/LoadingSpinner';
import ConfirmDelete from '../components/ConfirmDelete';

// Redux
import { connect } from 'react-redux';
import { loadUser } from '../redux/actions/authActions';
import { getItems, deleteItem } from '../redux/actions/itemActions';

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
  tableHeadText: {
    fontWeight: 'bold',
  },
});

export class MyListings extends Component {
  componentDidMount() {
    this.props.loadUser();
    this.props.getItems();
  }

  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  };

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
                  <TableCell className={classes.tableHeadText}>
                    Trailer Type
                  </TableCell>
                  <TableCell align='left' className={classes.tableHeadText}>
                    Brand
                  </TableCell>
                  <TableCell align='left' className={classes.tableHeadText}>
                    Dimensions
                  </TableCell>
                  <TableCell align='left' className={classes.tableHeadText}>
                    Max Weight Cap.
                  </TableCell>
                  <TableCell align='left' className={classes.tableHeadText}>
                    Price ($)
                  </TableCell>
                  <TableCell
                    align='left'
                    className={classes.tableHeadText}
                  ></TableCell>
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
                        <TableCell align='right'>
                          <Button>
                            <EditIcon fontSize='small' color='action' />
                          </Button>

                          <ConfirmDelete trailer={trailer} />
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

export default connect(mapStateToProps, { loadUser, getItems, deleteItem })(
  withStyles(styles)(MyListings)
);
