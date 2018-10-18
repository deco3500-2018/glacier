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
const scopes =
  'user-read-playback-state user-modify-playback-state playlist-modify-public';
const playlist_id = '5canH0tddAJg0y1k5kNaAL';
const base_uri = 'https://api.spotify.com/v1';
const state = {
  queue: [],
  user: ''
};

const songs = [
  {
    name: 'Despacito',
    uris: 'spotify:track:7CUYHcu0RnbOnMz4RuN07w',
    user: 1
  },
  {
    name: 'Shape of You',
    uris: 'spotify:track:7qiZfU4dY1lWllzX7mPBI3',
    user: 1
  },
  {
    name: 'Girls Like You',
    uris: 'spotify:track:6FRLCMO5TUHTexlWo8ym1W',
    user: 1
  },
  {
    name: 'Something Just like this',
    uris: 'spotify:track:6RUKPb4LETWmmr3iAEQktW',
    user: 1
  },
  {
    name: 'Perfect',
    uris: 'spotify:track:0tgVpDi06FyKpA1z0VMD4v',
    user: 1
  },
  {
    name: 'Delicate',
    uris: 'spotify:track:6NFyWDv5CjfwuzoCkw47Xf',
    user: 1
  },
  {
    name: 'All you need is Love',
    uris: 'spotify:track:68BTFws92cRztMS1oQ7Ewj',
    user: 1
  },
  {
    name: 'I Got You Babe',
    uris: 'spotify:track:2SWBfqj1FrS8t8z56G55rP',
    user: 1
  },
  {
    name: 'Hearts of Glass',
    uris: 'spotify:track:0a4agFmqHXxcZl1nho1BxM',
    user: 1
  },
  {
    name: 'Macarena',
    uris: 'spotify:track:2df5QsXucx4VLiHNGusXD5',
    user: 1
  },
  {
    name: 'Hey Ya',
    uris: 'spotify:track:5WQ1hIc5d2EVbRQ8qsj8Uh',
    user: 1
  },
  {
    name: 'Take My Breath Away',
    uris: 'spotify:track:1AAEWUVZpew24mP6nC1IU5',
    user: 1
  }
];

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
  const getDevices = callApi('/me/player/devices')
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      print(err);
      return res.send('Error');
    });
});

//Pause song
app.put('/pause', (req, res) => {
  callApi('/me/player/pause', {
    method: 'PUT'
  }).then(response => {
    console.log('response', response);
    res.send(200);
  });
});

//Play song
app.put('/play', (req, res) => {
  callApi('/me/player/play', {
    method: 'PUT'
  }).then(response => {
    console.log('response', response);
    res.send(200);
  });
});

//Next song
app.post('/next', (req, res) => {
  callApi('/me/player/next', {
    method: 'POST'
  }).then(response => {
    console.log('response', response);
    res.send(200);
  });
});

//Previous song
app.post('/previous', (req, res) => {
  callApi('/me/player/previous', {
    method: 'POST'
  }).then(response => {
    console.log('response', response);
    res.send(200);
  });
});

//Get current song
app.get('/getCurrent', (req, res) => {
  const currentSong = callApi('/me/player', {
    method: 'GET'
  }).then(response => {
    console.log('response', response);
    res.send(response);
  });
});

//Add song to playlist for prototype
app.post('/addSong', (req, res) => {
  callApi(`/playlists/${playlist_id}/tracks`, {
    method: 'POST',
    body: JSON.stringify({
      uris: [
        'spotify:track:4iV5W9uYEdYUVa79Axb7Rh',
        'spotify:track:1301WleyT98MSxVHPZCA6M'
      ]
    })
  }).then(response => {
    console.log('response', response);
    res.send(200);
  });
});
//DELETE https://api.spotify.com/v1/playlists/{playlist_id}/tracks

//Delete song from playlist when user leaves
app.delete('/delete', (req, res) => {
  callApi(`/playlists/${playlist_id}/tracks`, {
    method: 'DELETE',
    body: JSON.stringify({
      uris: [
        'spotify:track:4iV5W9uYEdYUVa79Axb7Rh',
        'spotify:track:1301WleyT98MSxVHPZCA6M'
      ]
    })
  });
});
//Get songs during search
app.get('/searchSong', (req, res) => {
  callApi(base_uri + '/search', {
    method: 'GET'
  });
});

//

const callApi = (url, options) => {
  console.log('urlopts', options);
  return fetch(base_uri + url, {
    ...options,
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      ...(options && options.headers)
    }
  })
    .then(res => {
      console.log('res', res);
      return res.json();
    })
    .catch(err => {
      print(err);
      return res.send('Error');
    });
};

const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit();
  } else {
    if (key.name === "right") {
      callApi('/me/player/next', {
        method: 'POST'
      }).then(response => {
        console.log('response', response);
      });
    }
    if (key.name === "space") {
      callApi('/me/player/play', {
        method: 'PUT'
      }).then(response => {
        console.log('response', response);
      });
    }
  }
});

app.listen(3000, () => console.log(`App listening on port ${3000}!`));
