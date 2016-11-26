const editor = (state = {}, action) => {
  switch (action.type) {
    case 'SERVE_TEXT':
      return Object.assign({}, state, {
        editorState: action.payload,
        textOrigin: 'remote',
      });
    case 'TEXT_CHANGE':
      return Object.assign({}, state, {
        editorState: action.payload,
        textOrigin: 'local',
      });
    default:
      return state;
  }
};

export default editor;
