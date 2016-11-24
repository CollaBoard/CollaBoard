const editor = (state = {}, action) => {
  switch (action.type) {
    case 'SERVE_TEXT':
      // console.log('payload:', action.payload);
      return Object.assign({}, state, {
        editorState: action.payload,
        textOrigin: 'remote',
      });
    case 'TEXT_CHANGE':
      // console.log('payload:', action.payload);
      return Object.assign({}, state, {
        editorState: action.payload,
        textOrigin: 'local',
      });
    default:
      return state;
  }
};

export default editor;
