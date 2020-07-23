import React, { Component, Fragment } from 'react';

// Components
import Hero from '../components/Hero';
import Footer from '../components/Footer';

// Utilities
import background from '../utility/images/openRoad.jpg';

// MUI
import Container from '@material-ui/core/Container';

const styles = {
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url(${background})`,
  backgroundSize: 'cover',
  minHeight: '93.6vh',
};

export class Home extends Component {
  render() {
    return (
      <Fragment>
        <div style={styles}>
          <Container style={{ paddingTop: '50px' }}>
            <Hero />
          </Container>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

export default Home;
