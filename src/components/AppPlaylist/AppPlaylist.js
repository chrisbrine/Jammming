import React from 'react';
import './AppPlaylist.css';

import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResults';

class AppPlaylist extends React.Component {
	render() {
		return (
        	<div className="AppPlaylist">
        		<SearchResults 
        			onClick={this.props.onAdd} 
        			tracks={this.props.searchResults} 
        		/>
        		<Playlist 
        			onSave={this.props.onSave} 
        			onClick={this.props.onRemove} 
                    onChangeName={this.props.onChangeName} 
        			tracks={this.props.playList} 
                    playListName={this.props.playListName} 
        		/>
        	</div>
   		);
	}
}

export default AppPlaylist;