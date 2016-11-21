import React from 'react';
import API from '../lib/api';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { name: 'First Last',
        avatar: 'https://robohash.org/CollaBoard' },
    };
  }

  componentDidMount() {
    API.getMeTest()
    .then((res) => {
      console.log(res);
      this.setState({
        user: { name: res.name,
          avatar: res.avatar },
      });
    }).catch(console.err);
  }

  render() {
    return (
      <div>Hello</div>

    );
  }

}

Dashboard.propTypes = {
  uid: React.PropTypes.string,
};

export default Dashboard;
