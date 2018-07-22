import React from 'react';
import './Playlist.css';

import Tracklist from '../Tracklist/Tracklist';
import PlaylistSave from '../PlaylistSave/PlaylistSave';

const defaultPlaylist = 'New Playlist';

class Playlist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			playlistName: defaultPlaylist,
		};
		this.onChange = this.onChange.bind(this);
	}
	onChange(event) {
		this.props.onChangeName(event.target.value);
	}
	render() {
		return (
         	<div className="Playlist">
         		<input 
         			onChange={this.onChange} 
         			value={this.props.playListName} 
         		/>
	            <Tracklist 
	            	tracks={this.props.tracks} 
	            	action="add" 
	            	onClick={this.props.onClick} 
	            />
	            <PlaylistSave 
	            	playlistName={this.state.playlistName} 
	            	onClick={this.props.onSave} 
	            />
         	</div>
		);
	}
}

export default Playlist;