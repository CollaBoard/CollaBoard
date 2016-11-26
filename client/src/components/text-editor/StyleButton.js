const React = require('react');

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }
  render() {
    let className = 'RichEditor-styleButton waves-effect waves-light btn';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }
    if (this.props.icon) {
      className += ' RichEditor-hasIcon';
    }
    if (this.props.icon) {
      return (
        <span className={className} onMouseDown={this.onToggle}>
          <span>{this.props.label}</span> <i className="material-icons">{this.props.icon}</i>
        </span>
      );
    } else { // eslint-disable-line
      return (
        <span className={className} onMouseDown={this.onToggle}>
          {this.props.label}
        </span>
      );
    }
  }
}

StyleButton.propTypes = {
  onToggle: React.PropTypes.func,
  active: React.PropTypes.bool,
  style: React.PropTypes.string,
  label: React.PropTypes.string,
  icon: React.PropTypes.string,
};

export default StyleButton;
