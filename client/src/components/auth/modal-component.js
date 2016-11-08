import React, { Component, PropTypes } from 'react';

// TODO: Move ALL styles into sass. No css in javascript.
const styles = {
  back: {
    position: 'fixed',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.618)',
    zIndex: 5,
    cursor: 'default',
  },
  panelAboveSpacer: {
    flex: '2 0 auto',
  },
  panelBelowSpacer: {
    flex: '6 0 auto',
  },
};

class PageModalWrapper extends Component {
  constructor(props) {
    super(props);

    this.onKeyUp = this.onKeyUp.bind(this);
  }

  componentDidMount() {
    // this needs to be a listener on the window
    // rather than a listener on the div, because onKeyUp won't fire
    // unless an input is focused
    window.addEventListener('keyup', this.onKeyUp, false);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.onKeyUp, false);
  }

  onKeyUp(e) {
    if (e.keyCode === 27) {
      this.props.hideModal();
    }
  }

  render() {
    const { props } = this;

    const handleBackgroundClick = (e) => {
      if (e.target !== e.currentTarget) return;
      props.hideModal();
    };

    return (
      <div style={styles.back} onClick={handleBackgroundClick}>
        <div style={styles.panelAboveSpacer} />
        <div style={styles.panelBelowSpacer} />
      </div>
    );
  }
}

PageModalWrapper.propTypes = {
  // props
  // UNCOMMENT WHEN WE HAVE THIS DONE
  //
  // children: PropTypes.oneOfType([
  //   PropTypes.array,
  //   PropTypes.element,
  //   PropTypes.string,
  // ]).isRequired,

  // methods
  hideModal: PropTypes.func.isRequired,
};

export default PageModalWrapper;
