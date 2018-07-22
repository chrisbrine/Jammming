import React from 'react';
import './Tracklist.css';

import Track from '../Track/Track';

class Tracklist extends React.Component {
	render() {
		return (
			<div className="TrackList">
				{this.props.tracks.map(track => {
					return <Track 
								key={track.id}  
								track={track} 
								action={this.props.action} 
								onClick={this.props.onClick} 
							/>;
				})}
			</div>
		);
	}
}

export default Tracklist;