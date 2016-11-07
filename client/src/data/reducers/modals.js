const modal = (state = {showModal: false}, action) => {
	switch (action.type) {
		case 'SHOW_MODAL': 
			return  Object.assign({}, state, {showModal: true});
		case 'HIDE_MODAL': 
			return  Object.assign({}, state, {showModal: false});
		default: 
			return state;
	}
}

export default modal;