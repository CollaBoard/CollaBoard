import React from 'react';
import page from 'page';

import LandingPage from './landing-page';
import Dashboard from './dashboard';
import Board from './board';
// import API from '../lib/api';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      component: <div />,
    };
  }

  componentDidMount() {
    // page((ctx, next) => {
    //   API.getMe().then((user) => {
    //     ctx.user = user;
    //     next();
    //   }).catch(() => {
    //     next();
    //   });
    // });

    page('/', (ctx) => {
      this.setState({ component: <LandingPage user={ctx.user} /> });
    });

    page('/dashboard', (ctx) => {
      // if (!ctx.user) {
      //   return page('/');
      // }
      this.setState({ component: <Dashboard user={ctx.user} /> });
      return null;
    });

    page('/boards', (ctx) => {
      this.setState({ component: <Board user={ctx.user} /> });
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
