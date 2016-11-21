import React from 'react';
import page from 'page';

import LandingPage from './landing-page';
import Dashboard from './dashboard';
import Board from './board';

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

    page('/dashboard', () => {
      this.setState({ component: <Dashboard /> });
    });

    page('/boards', () => {
      this.setState({ component: <Board /> });
    });

    page('/boards/:uid', (ctx) => {
      this.setState({ component: <Board uid={ctx.params.uid} /> });
    });
    page.start();
  }

  render() {
    return this.state.component;
  }
}

export default App;
