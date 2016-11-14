import React, { PropTypes } from 'react';
import page from 'page';

import Board from './board';
import LandingPage from './landing-page';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      component: <div />,
    };
  }

  componentDidMount() {
    page('/', () => {
      this.setState({ component: <LandingPage /> });
    });

    page('/boards', () => {
      this.setState({ component: <Board /> });
    });
    page('/boards/:uid', (ctx) => {
      this.setState({ component: <Board uid={ctx.params.uid} /> });
    });
    page(() => {
      page('/');
    });
    page.start();
  }

  render() {
    return this.state.component;
  }
}

export default App;
