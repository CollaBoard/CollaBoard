import React from 'react';
import store from '../../data/store';

class SignInLink extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    // const state = store.getState();
    const dispatchModalState = () => {
      console.log('log in clicked!');
      store.dispatch({
        type: 'SHOW_MODAL',
        currentModal: 'SIGN_IN',
      });
    };
    return (
      <li>
        <a onClick={dispatchModalState}>Log In</a>
      </li>
    );
  }
}

export default SignInLink;
