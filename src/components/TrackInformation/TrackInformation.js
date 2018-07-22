import React from 'react';
import './TrackInformation.css';

class TrackInformation extends React.Component {
	render() {
		return (
			<div className="TrackInformation">
				<h3>{this.props.track.name}</h3>
				<p>{this.props.track.artist} | {this.props.track.album}</p>
			</div>
		);
	}
}

export default TrackInformation;