import React, { Component, Fragment } from 'react';

// Components
import Hero from '../components/Hero';
import MainContent from '../components/MainContent';

// Utilities
import background from '../utility/images/openRoad.jpg';

const styles = {
  backgroundImage: `url(${background})`,
  height: '95vh',
};

export class Home extends Component {
  render() {
    return (
      <Fragment>
        <div style={styles}>
          <Hero />
        </div>
        <MainContent />
      </Fragment>
    );
  }
}

export default Home;
