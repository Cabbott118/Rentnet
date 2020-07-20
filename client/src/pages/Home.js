import React, { Component, Fragment } from 'react';

// Components
import Hero from '../components/Hero';

// Utilities
import background from '../utility/images/bg1.jpg';

// MUI
import Container from '@material-ui/core/Container';

const styles = {
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.9)), url(${background})`,
  backgroundSize: 'cover',
  height: '93.6vh',
};

export class Home extends Component {
  render() {
    return (
      <div style={styles}>
        <Container style={{ paddingTop: '50px' }}>
          <Hero />
        </Container>
      </div>
    );
  }
}

export default Home;
