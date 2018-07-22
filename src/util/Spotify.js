let accessToken;
const clientId = 'ff849ec3ff2b4426ba3a90f95ff6409f';
const redirectUri = 'http://localhost:3000/';
const spotifyUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=playlist-modify-public`;

let Spotify = {

  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const tokenUrl = window.location.href.match(/access_token=([^&]*)/);
    let expiresIn = window.location.href.match(/expires_in=([^&]*)/);

    if(tokenUrl && expiresIn) {
      accessToken = tokenUrl[1];
      expiresIn = expiresIn[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      window.location = spotifyUrl;
    } return accessToken;

  },

  search(term) {
    const accessToken = this.getAccessToken();
    this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if(jsonResponse) {
        console.log(jsonResponse);
        return jsonResponse.tracks.items.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          };
        });
      }
    });
  },

  savePlaylist(playlistName, trackUris) {
    if(!playlistName || !trackUris) {
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const userUrl = 'https://api.spotify.com/v1/me';
    let userId;
    let playlistId;

    // make a request that returns the user's spotify username
    return fetch(userUrl, {headers: headers})
    // convert the response to json
    .then(response => {
      return response.json();
    })
    // set userId to returned Id
    .then(jsonResponse => {
      return userId = jsonResponse.id;
    })
    // create new playlist in user's spotify account
    .then(() => {
      const createPlaylistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
      return fetch(createPlaylistUrl, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({
          name: playlistName
        })
      });
    })
    // convert response to json
    .then(response => {return response.json();})
    // save response id to variable
    .then(jsonResponse => {return playlistId = jsonResponse.id;})
    // post tracks to playlist
    .then(() => {
      const postPlaylistUrl = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
      return fetch(postPlaylistUrl, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({
          uris: trackUris
        })
      });
    })
  }
}

export default Spotify;