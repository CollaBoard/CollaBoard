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
import StyleButton from './StyleButton';
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

class TextEditor extends React.Component {
  constructor(props) {
    super(props);

    const decorator = new PrismDraftDecorator();
    // COLLABOARD: creating new editor state based on Redux store
    let newEditorState;
    if (this.props.editorState === null) {
      const empty = Draft.ContentState.createFromText('');
      newEditorState = Draft.EditorState.createWithContent(empty, decorator);
    } else {
      const contentParsed = convertFromRaw(JSON.parse(this.props.editorState.editorState));
      newEditorState = Draft.EditorState
        .createWithContent(contentParsed, decorator);
    }
    this.state = {
      editorState: newEditorState,
    };

    this.focus = () => this.editor.focus();
    // COLLABOARD: Emitting change event on editor change
    this.onChange = (editorState) => {
      this.setState({ editorState },
        function emitChange() {
          this.props.TEXT_CHANGE(
          JSON.stringify(convertToRaw(editorState.getCurrentContent())),
          this.props.socket
        );
        });
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
  }

  // COLLABOARD: Setting the editor up to receive new editor state from redux
  componentWillReceiveProps(newProps) {
    if (newProps.editorState && newProps.editorState.textOrigin === 'remote') {
      const newContentState = convertFromRaw(JSON.parse(newProps.editorState.editorState));
      const newState = Draft.EditorState
        .push(this.state.editorState, newContentState, 'update-state');
      // const focusState = Draft.EditorState.forceSelection(newState, focus);
      this.setState({ editorState: newState });
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

    let className = 'RichEditor-editor';
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    const selection = editorState.getSelection();
    const block = contentState
      .getBlockForKey(selection.getStartKey());
    const blockType = block.getType();

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

TextEditor.propTypes = {
  editorState: React.PropTypes.string,   // eslint-disable-line react/forbid-prop-types
  socket: React.PropTypes.object,    // eslint-disable-line react/forbid-prop-types
  TEXT_CHANGE: React.PropTypes.func,
};

// COLLABOARD: Redux container component for text editor
export default connect(mapStateToProps, mapDispatchToProps)(TextEditor);
