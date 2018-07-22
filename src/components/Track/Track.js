import React from 'react';
import './Track.css';

import TrackAction from '../TrackAction/TrackAction';
import TrackInformation from '../TrackInformation/TrackInformation';

class Track extends React.Component {
	render() {
		return (
			<div className="Track">
				<TrackInformation 
					track={this.props.track} 
				/>
				<TrackAction 
					track={this.props.track} 
					action={this.props.action} 
					onClick={this.props.onClick} 
				/>
			</div>
		);
	}
}

export default Track;