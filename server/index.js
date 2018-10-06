var express = require('express')
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.json());

const state = {
    queue: []
}

app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.post('/queueSong', function(req, res) {
    console.log("hello", req.body);
    const song = { id: req.body.songId }
    state.queue = [song, ...state.queue];
    console.log('state', state);
    res.send("mottatt");
})

app.listen(3000)