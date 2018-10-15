# Server documentation

We use Spotify API to add songs to a playlist, get current playing song, and delete songs in playlist when user leaves.

### Endpoints

* Pause current playing song: "localhost:3000/pause"
  * Example from terminal you can write: curl -X PUT localhost:3000/pause
  * (https://developer.spotify.com/documentation/web-api/reference/player/pause-a-users-playback/)
* Play current playing song: "localhost:3000/play"
  * Example from terminal you can write: curl -X PUT localhost:3000/play
  * (https://developer.spotify.com/documentation/web-api/reference/player/start-a-users-playback/)
* Next song: "localhost:3000/next"
  * Example from terminal you can write: curl -X POST localhost:3000/next
  * (https://developer.spotify.com/documentation/web-api/reference/player/skip-users-playback-to-next-track/)
* Previous song: "localhost:3000/previous"
  * Example from terminal you can write: curl -X POST localhost:3000/previous
  * (https://developer.spotify.com/documentation/web-api/reference/player/skip-users-playback-to-previous-track/)
* Get current playing song: "localhost:3000/getCurrent"
  * Example from terminal you can write: curl -X GET localhost:3000/getCurrent
  * (https://developer.spotify.com/documentation/web-api/reference/player/get-information-about-the-users-current-playback/)
* Add songs to playlist: "localhost:3000/addSong"
  * Needs URL of songs to add
  * (https://developer.spotify.com/documentation/web-api/reference/playlists/add-tracks-to-playlist/)
* Remove songs from playlist: "localhost:3000/removeSong"
  * Needs URL of songs to remove
  * (https://developer.spotify.com/documentation/web-api/reference/playlists/remove-tracks-playlist/)
