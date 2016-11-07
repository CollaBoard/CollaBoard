import React from 'react';
import store from '../../data/store';

class SignInLink extends React.Component {
	
	componentDidMount() {
		this.unsubscribe = store.subscribe( () => this.forceUpdate() );
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	render() {

		const props = this.props;
		const state = store.getState();
	
		const dispatchModalState = () => {
			console.log('log in clicked!')
			store.dispatch({
				type: 'SHOW_MODAL',
				currentModal: 'SIGN_IN'
			})
		}

		return (
			<li onClick={ dispatchModalState }>
				<a>Log In</a>
			</li>
		);
	
	}

};

export default SignInLink;