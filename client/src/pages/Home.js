import React, { Component, Fragment } from 'react';

// Components
import Hero from '../components/Hero';
import MainContent from '../components/MainContent';

export class Home extends Component {
  render() {
    return (
      <Fragment>
        <Hero />
        <MainContent />
      </Fragment>
    );
  }
}

export default Home;
