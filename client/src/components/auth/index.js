// Only include React in CONTAINER if you are rendering to Virtual DOM
import React from 'react';
import { connect } from 'react-redux';
import { showModal, hideModal } from '../../data/actions/';
import SignInModal from './sign-in';

// passing pieces of state to container
const mapStateToProps = (state, ownProps) => {
  console.log(state);
  console.log(ownProps);
  return { showModal: state.showModal };
};

// passing action creators to props
const mapDispatchToProps = dispatch =>
 ({
   showModal: () => {
     dispatch(showModal());
   },
   hideModal: () => {
     dispatch(hideModal());
   },
 })
;

const Auth = () => <SignInModal />;

// switch (props.currentModal) {
//   case 'SIGN_IN':
//     return <SignInModal {...props} />;
//   default:
//     return null;
// }

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
