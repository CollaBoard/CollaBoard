// This file and the contents of this directory modified by the CollaBoard team
// (see package.json file for full list of names) from the original by Samy Pessé,
// https://github.com/SamyPesse, originally released under the Apache License, Version 2.0.
// See NOTICE in this directory for full license.
// There are minor modifications throughout to comply with AirBnB ESLint style.
// Substantive modifications are marked by comments beginning with 'COLLABOARD:'.

import Draft, {
  Editor,
  RichUtils,
} from 'draft-js';
import React from 'react';
// COLLABOARD: File structure changed to include lib directories
// from both draft-js-code and draft-js-prism
import CodeUtils from './codelib';
import PrismDraftDecorator from './prismlib';
import StyleButton from './StyleButton';


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

class TextEditor extends React.Component {
  constructor(props) {
    super(props);

    const decorator = new PrismDraftDecorator();
    this.state = {
      editorState: Draft.EditorState.createEmpty(decorator),
    };

    this.focus = () => this.editor.focus();
    this.onChange = editorState => this.setState({ editorState });

// COLLABOARD: original underscore-prefaced changed to i-prefaced to comply
// with AirBnB style, 'i' chosen here for 'immutable'
    this.handleKeyCommand = command => this.iHandleKeyCommand(command);
    this.keyBindingFn = e => this.iKeyBindingFn(e);
    this.toggleBlockType = type => this.iToggleBlockType(type);
    this.toggleInlineStyle = style => this.iToggleInlineStyle(style);
    this.onTab = e => this.iOnTab(e);
    this.onReturn = e => this.iOnReturn(e);
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

  iOnReturn(e) {
    const editorState = this.state.editorState;

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return;
    }

    this.onChange(
        CodeUtils.handleReturn(e, editorState)
    );
    return;
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

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div className="RichEditor-root">
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
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
const LANGUAGES = [
  { label: 'Javascript', style: 'language-Javascript' },
  { label: 'HTML', style: 'language-HTML' },
  { label: 'CSS', style: 'language-CSS' },
];
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
    { label: 'Code Block', style: 'code-block' },
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
    // COLLABOARD: adding language variable to track current language of code block
  // const lang = editorState
  //   .getCurrentContent()
  //   .getBlockForKey(selection.getStartKey())
  //   .getSyntax();

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
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
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

BlockStyleControls.propTypes = {
  editorState: React.PropTypes.node,
  onToggle: React.PropTypes.func,
};

InlineStyleControls.propTypes = {
  editorState: React.PropTypes.node,
  onToggle: React.PropTypes.func,
};

StyleButton.propTypes = {
  onToggle: React.PropTypes.func,
  active: React.PropTypes.bool,
  style: React.PropTypes.string,
  label: React.PropTypes.string,
};

TextEditor.propTypes = {
  active: React.PropTypes.bool,
  onToggle: React.PropTypes.func,
  editorState: React.PropTypes.node,
  style: React.PropTypes.string,
};

export default TextEditor;
