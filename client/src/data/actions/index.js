/**
 *  This module contains functions that:
 *  Action Creators
 *
 */

// Action Types
  const TEXT_CHANGE = 'TEXT_CHANGE';
  const SERVE_TEXT = 'SERVE_TEXT';

// Actions object to export
  const actionCreators = {
    TEXT_CHANGE: (updatedText) => {
      console.log('updating text');
      socket.emit('serve text', updatedText);
      return {
        type: TEXT_CHANGE,
        payload: updatedText,
      };
    },
    SERVE_TEXT: otherEditorText => ({
      type: SERVE_TEXT,
      payload: otherEditorText,
    }),
  };

  export default actionCreators;
