//Only include React in CONTAINER if you are rendering to Virtual DOM
// import React from 'react';
import { connect } from 'react-redux';
import { showModal, hideModal } from '../../data/actions/';
import SignInModal from './sign-in';

//passing pieces of state to container
const mapStateToProps = (state, ownProps) => {
	console.log(state);
	console.log(props);
	return { showModal: state.showModal };
}

// passing action creators to props
const mapDispatchToProps = (dispatch) => {
	return {
		showModal: () => {
			dispatch( showModal() );
		},
		hideModal: () => {
			dispatch( hideModal() );
		}
	}
}

const Auth = props => {
 // switch (props.currentModal) {
 	
 	// case 'SIGN_IN':
 		// return <SignInModal {...props} />;
	return <SignInModal />
 	
 	// default: 
 		// return null;
 
 // }

};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
