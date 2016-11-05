import React from 'react';

class SplashContainer extends React.Component {
	render() {
		return (
			<div className="splash-container">
				<img src="http://bsnscb.com/data/out/22/27230051-blackboard-wallpapers.jpg" alt="Chalkboard" />
				<div className="splash-overlay">
					<div className="splash-overlay-title">CollaBoard</div>
					<div className="splash-overlay-subtitle">Innovate your teamwork</div>
				</div>
			</div>
		);
	}
}

export default SplashContainer;