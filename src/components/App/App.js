import React from 'react';
import './App.css';

import AppPlaylist from '../AppPlaylist/AppPlaylist';
import SearchBar from '../SearchBar/SearchBar';
import Spotify from '../../util/Spotify';

const defaultPlayListName = 'New PlayList';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            playList: [],
            playListName: defaultPlayListName,
        };
        this.onSearch = this.onSearch.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
    }
    onChangeName(playListName) {
        this.setState({
            playListName: playListName,
        });
    }
    onSearch(searchInput) {
        Spotify.search(searchInput).then(searchResults => this.setState({
            searchResults: searchResults,
        }));
    }
    onAdd(track) {
        if (!this.state.playList.find(playlistTrack => playlistTrack.id === track.id)) {
            console.log('Add it!');
            this.setState(prevState => ({
                playList: [...prevState.playList, track]
            }));
        }
    }
    onRemove(track) {
        this.setState({
            playList: this.state.playList.filter(playlistTrack => playlistTrack.id !== track.id)
        });
    }
    onSave() {
        const trackUris = this.state.playList.map(track => track.uri);
        Spotify.savePlaylist(this.state.playListName, trackUris)
        .then(() => {
            this.setState({
                searchResults: [],
                playList: [],
                playListName: defaultPlayListName,
            });
        });
    }
    render() {
        return (
            <div className="App">
                <SearchBar 
                    onClick={this.onSearch} 
                />
                <AppPlaylist 
                    searchResults={this.state.searchResults} 
                    playList={this.state.playList} 
                    playListName={this.state.playListName} 
                    onChangeName={this.onChangeName} 
                    onAdd={this.onAdd} 
                    onRemove={this.onRemove} 
                    onSave={this.onSave} 
                />
            </div>
    );
  }
}

export default App;
