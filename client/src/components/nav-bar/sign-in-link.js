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
    // const props = this.props;
    // const state = store.getState();
    const dispatchModalState = () => {
      // prompt('Please enter your login credentials');
      store.dispatch({
        type: 'SHOW_MODAL',
        currentModal: 'SIGN_IN',
      });
    };
    return (
      <li>
        <a onClick={dispatchModalState} className="nav-button">Log In</a>
      </li>
    );
  }
}


export default SignInLink;

