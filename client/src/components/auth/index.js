import React from 'react';

import SignInModal from './sign-in';
import SignUpModal from './sign-up';


const Auth = props => (
 switch (props.currentModal) {
 	
 	case 'SIGN_IN':
 		return <SignInModal {...props} />;
 	
 	case 'SIGN_UP':
 		return <SignUp {..props} />;
 	
 	default: 
 		return null;
 
 }

export default Auth;