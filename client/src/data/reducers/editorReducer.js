const editor = (state = {}, action) => {
  switch (action.type) {
    case 'SERVE_TEXT':
      console.log('payload:', action.payload);
      return Object.assign({}, state, { editorState: action.payload });
    case 'TEXT_CHANGE':
      console.log('payload:', action.payload);
      return Object.assign({}, state, { editorState: action.payload });
    default:
      return state;
  }
};

export default editor;
