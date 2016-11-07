/**
* This module contains functions that: 
*	Action Creators
* 
*/

// import store from '../store.js';


// export function showModal(modal) {
//   store.dispatch({
//     type: ACTIONS.SHOW_MODAL,
//     modal,
//   });
// }

// export function hideModal() {
//   store.dispatch({
//     type: ACTIONS.HIDE_MODAL,
//   });
// }


export const showModal = (modal) => {
	return {
		type: 'SHOW_MODAL',
		modal: modal
	};
}

export const hideModal = () => {
	return {
		type: 'HIDE_MODAL'
	};
}
