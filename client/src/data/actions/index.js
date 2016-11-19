/**
 *  This module contains functions that:
 *  Action Creators
 *
 */

// Action Types
  const TEXT_CHANGE = 'TEXT_CHANGE';

// Actions object to export
  const actionCreators = {
    TEXT_CHANGE: (updatedText) => {
      console.log('updating text');
      return {
        type: TEXT_CHANGE,
        payload: updatedText,
      };
    },
  };

  export default actionCreators;
