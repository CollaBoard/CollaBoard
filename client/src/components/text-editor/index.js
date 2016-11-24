// This file uses modules draft-js-code and draft-js-prism by Samy Pessé,
// https://github.com/SamyPesse, originally released under the Apache License, Version 2.0.
// See LICENSE in the module directory (added here as a module) for full license.
// There are minor modifications from original suggested configuration throughout
// to comply with AirBnB ESLint style.
// Substantive modifications are marked by comments beginning with 'COLLABOARD:'.

import Draft, {
  Editor,
  RichUtils,
  convertFromRaw,
  convertToRaw,
} from 'draft-js';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CodeUtils from 'draft-js-code';
// COLLABOARD: see forked repository https://github.com/CollaBoard/draft-js-prism for changes
import PrismDraftDecorator from 'draft-js-prism';
// COLLABOARD: Adding socket.io
// import io from 'socket.io-client';
import StyleButton from './StyleButton';
// import TextEditor from 'draft-js-code';
// import TextEditor from './../../../../draft-js-code/demo/main';
import actionCreators from '../../data/actions';

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

// COLLABOARD: initializing functions for text editor container
const mapStateToProps = state => ({
  editorState: state.editorState,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ TEXT_CHANGE: actionCreators.TEXT_CHANGE }, dispatch);

// COLLABOARD: initializing socket
// const socket = io();

class TextEditor extends React.Component {
  constructor(props) {
    super(props);

    const decorator = new PrismDraftDecorator();
    // COLLABOARD: check if
    // if (!this.props.editorState && this.props.editorState !== {}) {
    // console.log('creating new editor state');
    let newEditorState;
    if (this.props.editorState === null) {
      const empty = Draft.ContentState.createFromText('');
      newEditorState = Draft.EditorState.createWithContent(empty, decorator);
    } else {
      const contentParsed = convertFromRaw(JSON.parse(this.props.editorState.editorState));
      newEditorState = Draft.EditorState
        .createWithContent(contentParsed, decorator);
    }
    // if (typeof this.props.editorState === 'string') {
    //   console.log('editorstate string');
    //   contentParsed = JSON.parse(this.props.editorState);
    // } else if (this.props.editorState.editorState) {
    //   console.log('editorstate object:', this.props.editorState);
    //   contentParsed = JSON.parse(this.props.editorState.editorState);
    //   // contentParsed = JSON.parse(JSON.stringify(this.props.editorState));
    // } else {
    // contentParsed = this.props.editorState;
    // }

    // const newEditorState = Draft.EditorState.createEmpty(decorator);
    this.state = {
      editorState: newEditorState,
    };
    // this.props.TEXT_CHANGE(convertToRaw(newEditorState.getCurrentContent()), this.props.socket);
    // } else {
    //   this.state = {
    //     editorState: this.props.editorState,
    //   };
    //   this.props.TEXT_CHANGE(convertToRaw(this.state.editorState.getCurrentContent()));
    // }

    this.focus = () => this.editor.focus();
    // COLLABOARD: Emitting change event on editor change
    this.onChange = (editorState) => {
      // console.log(JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())));
      this.setState({ editorState },
        function emitChange() {
          this.props.TEXT_CHANGE(
          JSON.stringify(convertToRaw(editorState.getCurrentContent())),
          this.props.socket
        );
        });
        // console.log('text change');
        // socket.emit('text change', convertToRaw(this.state.editorState.getCurrentContent()));
      //
    // );
    };

// COLLABOARD: original underscore-prefaced changed to i-prefaced to comply
// with AirBnB style for no hanging underscores, 'i' chosen here for 'immutable'
    this.handleKeyCommand = command => this.iHandleKeyCommand(command);
    this.keyBindingFn = e => this.iKeyBindingFn(e);
    this.toggleBlockType = type => this.iToggleBlockType(type);
    this.toggleInlineStyle = style => this.iToggleInlineStyle(style);
    this.onTab = e => this.iOnTab(e);
    this.onReturn = e => this.iOnReturn(e);
  // COLLABOARD: Keeping same style for new functions like undo and redo
    this.onUndo = () => this.iOnUndo();
    this.onRedo = () => this.iOnRedo();

    // COLLABOARD: On mount should render redux saved
    this.componentDidMount = () => {
      // this.props.TEXT_CHANGE(JSON.stringify(convertToRaw(
      //   this.state.editorState.getCurrentContent())),
      //   this.props.socket
      // );
    //   $.ajax({
    //     type: 'POST',
    //     url: '/api/boards',
    //     data: {
    //       type: 'TextEditor',
    //     },
    //     contentType: 'JSON',
    //   }).then((board) => {
    //     const socketPath = `/${board.uid}`;
    //     const thisSocket = io(socketPath);
    //     thisSocket.on('serve text', (rawEditorState) => {
    //       const newContentState = convertFromRaw(rawEditorState);
    //       const editorStateToSet = Draft.EditorState.push(
    //        this.state.editorState,
    //        newContentState
    //       );
    //       this.setState({ editorState: editorStateToSet });
    //     });
    //   }).catch(() => {
    //     // console.log('Error creating namespace:', err);
    //   });
    };
  }

  // COLLABOARD: Setting the editor up to receive new editor state from redux
  componentWillReceiveProps(newProps) {
    // console.log('newProps:', newProps);
    if (newProps.editorState && newProps.editorState.textOrigin === 'remote') {
      const newContentState = convertFromRaw(JSON.parse(newProps.editorState.editorState));
      // console.log('newContentState:', newContentState);
      const focus = this.state.editorState.getSelection();
      // console.log('focus:', focus);
      const newState = Draft.EditorState
        .push(this.state.editorState, newContentState, 'update-state');
      // console.log('newState:', newState);
      const focusState = Draft.EditorState.forceSelection(newState, focus);
      // console.log('focusState:', focusState);
      this.setState({ editorState: focusState });
      // this.onChange(focusState);
    }
  }

  iOnTab(e) {
    const editorState = this.state.editorState;

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return;
    }

    this.onChange(
      CodeUtils.handleTab(e, editorState)
    );
  }

  // COLLABOARD: Defining undo and redo functions, to work on nav bar clicks
  iOnUndo() {
    const editorState = this.state.editorState;

    this.onChange(
      Draft.EditorState.undo(editorState)
    );
  }

  iOnRedo() {
    const editorState = this.state.editorState;

    this.onChange(
      Draft.EditorState.redo(editorState)
    );
  }

  iOnReturn(e) {
    const editorState = this.state.editorState;

    // COLLABOARD: Added false return to comply with AirBnB consistent return
    // Notice: do not delete the final 'true' return, or each return will break a text block
    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return false;
    }

    this.onChange(
        CodeUtils.handleReturn(e, editorState)
    );
    return true;
  }

  iToggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  iKeyBindingFn(e) {
    const editorState = this.state.editorState;
    let command;

    if (CodeUtils.hasSelectionInBlock(editorState)) {
      command = CodeUtils.getKeyBinding(e);
    }
    if (command) {
      return command;
    }

    return Draft.getDefaultKeyBinding(e);
  }

  iToggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  iHandleKeyCommand(command) {
    const { editorState } = this.state;
    let newState;

    if (CodeUtils.hasSelectionInBlock(editorState)) {
      newState = CodeUtils.handleKeyCommand(editorState, command);
    }

    if (!newState) {
      newState = RichUtils.handleKeyCommand(editorState, command);
    }

    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  render() {
    const { editorState } = this.state;
    // console.log(editorState);

    let className = 'RichEditor-editor';
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    const selection = editorState.getSelection();
    // console.log('selection:', selection);
    // console.log('content:', contentState);
    const block = contentState
      .getBlockForKey(selection.getStartKey());
    // console.log('block:', block);
    const blockType = block.getType();
    // console.log('blockType:', blockType);

    const inlineStyle = editorState.getCurrentInlineStyle();
    const activeStyles = {
      BOLD: inlineStyle.has('BOLD'),
      ITALIC: inlineStyle.has('ITALIC'),
      UNDERLINE: inlineStyle.has('UNDERLINE'),
      CODE: inlineStyle.has('CODE'),
    };

    return (
      <div className="RichEditor-root">
        <BlockStyleControls
          selection={selection}
          blockType={blockType}
          onToggle={this.toggleBlockType}
          onRedo={this.onRedo}
          onUndo={this.onUndo}
        />
        <InlineStyleControls
          activeStyles={activeStyles}
          onToggle={this.toggleInlineStyle}
        />
        <div className={className}>
          <Editor
            onClick={this.focus}
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.keyBindingFn}
            onChange={this.onChange}
            placeholder="Tell a story..."
            ref={(ref) => { this.editor = ref; }}
            spellCheck
            handleReturn={this.onReturn}
            onTab={this.onTab}
          />
        </div>
      </div>
    );
  }
}

// COLLABOARD: languages array
// const LANGUAGES = [
//   { label: 'Javascript', style: 'language-Javascript' },
//   { label: 'HTML', style: 'language-HTML' },
//   { label: 'CSS', style: 'language-CSS' },
// ];
// COLLABOARD: language button component
// class CodeButtons extends React.Component {
//   constructor() {
//     super();
//     this.onChange = (e) => {
//       e.preventDefault();
//       this.props.onChange(this.props.style);
//     };
//   }
//
//   render() {
//     let className = 'RichEditor-styleButton LanguageButtons';
//     if (this.props.active) {
//       className += ' RichEditor-activeButton';
//     }
//
//     return (
//       <div className={className}>
//         languages.map()
//
//       </div>
//     );
//   }
// }

const BLOCK_TYPES = [
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' },
    { label: 'H5', style: 'header-five' },
    { label: 'H6', style: 'header-six' },
    { label: 'Blockquote', style: 'blockquote' },
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
    { label: 'JS Code Block', style: 'code-block' },
];

const BlockStyleControls = (props) => {
  const { blockType } = props;

    // COLLABOARD: adding language variable to track current language of code block
  // const lang = editorState
  //   .getCurrentContent()
  //   .getBlockForKey(selection.getStartKey());
  // console.log(lang);

// COLLABOARD: mapping language buttons next to block types
  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map(type =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
      {LANGUAGES.map(type =>
        <StyleButton
          key={type.label}
          active={type.syntax === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
      <StyleButton
        key="Undo"
        label="Undo"
        onToggle={props.onUndo}
      />
      <StyleButton
        key="Redo"
        label="Redo"
        onToggle={props.onRedo}
      />
    </div>
  );
};
// {LANGUAGES.map(type =>
//   <StyleButton
//     key={type.label}
//     active={type.syntax === blockType}
//     label={type.label}
//     onToggle={props.onToggle}
//     style={type.style}
//   />
// )}

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];

const InlineStyleControls = (props) => {
  const activeStyles = props.activeStyles;
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={activeStyles[type.style]}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

// class StyleButton extends React.Component {
//   constructor() {
//     super();
//     this.onToggle = (e) => {
//       e.preventDefault();
//       this.props.onToggle(this.props.style);
//     };
//   }
//
//   render() {
//     let className = 'RichEditor-styleButton';
//     if (this.props.active) {
//       className += ' RichEditor-activeButton';
//     }
//
//     return (
//       <span className={className} onMouseDown={this.onToggle}>
//         {this.props.label}
//       </span>
//     );
//   }
// }

// COLLABOARD: Proptype validations to prevent unexpected props and to follow AirBnB style
BlockStyleControls.propTypes = {
  blockType: React.PropTypes.string,
  onToggle: React.PropTypes.func,
  onUndo: React.PropTypes.func,
  onRedo: React.PropTypes.func,
};

InlineStyleControls.propTypes = {
  activeStyles: React.PropTypes.objectOf(React.PropTypes.bool),
  onToggle: React.PropTypes.func,
};

// StyleButton.propTypes = {
//   onToggle: React.PropTypes.func,
//   active: React.PropTypes.bool,
//   style: React.PropTypes.string,
//   label: React.PropTypes.string,
// };

TextEditor.propTypes = {
  // active: React.PropTypes.bool,
  // onToggle: React.PropTypes.func,
  editorState: React.PropTypes.string,   // eslint-disable-line react/forbid-prop-types
  socket: React.PropTypes.object,    // eslint-disable-line react/forbid-prop-types
  TEXT_CHANGE: React.PropTypes.func,
  // style: React.PropTypes.string,
};

// COLLABOARD: Redux container component for text editor
export default connect(mapStateToProps, mapDispatchToProps)(TextEditor);
