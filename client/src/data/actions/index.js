/**
 *  This module contains functions that:
 *  Action Creators
 *
 */

// import store from '../store.js';

export const showModal = modal => ({
  type: 'SHOW_MODAL',
  modal,
});

export const hideModal = () => ({
  type: 'HIDE_MODAL',
});
