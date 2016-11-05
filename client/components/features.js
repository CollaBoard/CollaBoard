import React from 'react';

class Features extends React.Component {
	render() {
		return (
			<div>
				<h3 className="features-title">
					Start getting more done in less time
				</h3>
				<p className="features-subtitle"> Manage taska nd projects anywhere with CollaBoard. At home. At school. At work. And on virtually any device </p>
				<div className="productivity-icons">  
					
					<div className="icon-access-anywhere"> 
						<img src="../img/cloud-icon.png"/>
					</div>
					
					<div className="icon-collab">
						<img src="../img/cloud-icon.png"/>
					</div>
					
					<div className="icon-distraction-free">
						<img src="../img/cloud-icon.png"/>
					</div>
				
				</div>
			</div>

		);
	}
}

export default Features;