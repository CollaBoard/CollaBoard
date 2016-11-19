const editor = (state = {}, action) => {
  switch (action.type) {
    case 'SERVE_TEXT':
      return Object.assign({}, state, { editorState: action.payload });
    default:
      return state;
  }
};

export default editor;
