const React = require('react');
const page = require('page');

const Link = props => (
  <a
    {...props}
    onClick={
      (e) => {
        e.preventDefault();
        page(props.href || props.to);
      }
    }
  >{props.children ? props.children : ''}</a>
);

Link.propTypes = {
  href: React.PropTypes.string.isRequired,
  to: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default Link;
