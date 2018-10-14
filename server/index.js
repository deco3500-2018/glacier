//Requires
const express = require('express');
const bodyParser = require('body-parser');
const btoa = require('btoa');
const fetch = require('node-fetch');

//Constants
const clientId = '';
const clientSecret = '';
const token = btoa(`${clientId}:${clientSecret}`);
const redirectUri = 'http://localhost:3000/authentication/success';
const scopes = 'user-read-playback-state user-modify-playback-state';
const state = {
  queue: [],
  user: ''
};

//Static routes
const app = express();
app.use(bodyParser.json());

let bearerToken = '';

app.get('/', (req, res) => {
  if (bearerToken.length === 0) {
    // Get URL to verify spotify oAUTH that calls /authentication/success
    res.redirect(
      `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${encodeURIComponent(
        scopes
      )}`
    );
  }
  res.redirect('/devices');
});

app.get('/authentication/success', (req, res) => {
  // Express GET callback endpoint that uses code to set bearerToken
  const code = req.query.code;
  if (code.length === 0) {
    res.send('No spotify code');
    return;
  }
  fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`
  })
    .then(response => response.json())
    .then(response => {
      console.log('callapires', response);
      console.log('bearerTOken', response.access_token);
      bearerToken = response.access_token ? response.access_token : '';
      res.redirect('/devices');
    });
});

app.get('/devices', (req, res) => {
  const getDevices = callApi('https://api.spotify.com/v1/me/player/devices')
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      print(err);
      return res.send('Error');
    });
});

//Play song
app.post('/play', (req, res) => {
  callApi('https://api.spotify.com/v1/me/player/play', {
    method: 'PUT'
    //body: { "uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"] }
  }).then(response => {
    console.log('response', response);
    res.send(200);
  });
});

//Add song to playlist for prototype
app.post('/addSong', (req, res) => {
  callApi(`/v1/playlists/${playlist_id}/tracks`, {
    method: 'POST'
  }).then(response => {
    console.log('response', response);
    res.send(200);
  });
});

//Get songs during search
app.get('/searchSong', (req, res) => {
  callApi('https://api.spotify.com/v1/search', {
    method: 'GET'
  });
});

const callApi = (url, options) => {
  console.log('urlopts', url, options, bearerToken);
  return fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      ...(options && options.headers)
    }
  }).then(res => {
    console.log('res', res);
    return res.json();
  });
};

app.listen(3000, () => console.log(`App listening on port ${3000}!`));
