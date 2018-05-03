function ItunesController() {
  var itunesService = new ItunesService()
  //Do Not Modify the getMusic function
  this.getMusic = function getMusic(e) {
    e.preventDefault();
    var artist = e.target.artist.value;
    itunesService.getMusicByArtist(artist).then(draw);
    document.getElementById("searchForm").reset(); //after get music by artist returns what are you doing with the objects?
  }

  //Start coding here
  function draw(results) {
    var template = ''
    for (let i = 0; i < results.length; i++) {
      const song = results[i];
      if (song.kind == 'song') {
        template += `
        <div class="card col-md-3 col-xs-12 songs-box">
            <a onclick="app.controllers.itunesCtrl.pauseAll(${[i]})"><h4>${song.title}</h4></a>
            <h5>${song.artist}</h5>
            <div class="img-container" style="background-image: url(${song.albumArt});">
              <a onclick="app.controllers.itunesCtrl.pauseAll(${[i]})"><img class="play-img" src="http://simpleicon.com/wp-content/uploads/play1.png"></a>
            </div>
            <p class="mt-2">Collection: ${song.collection}</p>
            <h6>Price: $${song.price}</h6>
            <audio id="audio${[i]}" class="audio-player" controls>
              <source src="${song.preview}" type="audio/mp3">
            </audio>
            <a href="${song.trackUrl}" target="_blank" class="btn btn-outline-success mt-2">Purchase</a>
        </div>`
      }
    }
    document.getElementById('songs-list').innerHTML = template
  }

var playing = 0;

//public
  this.pauseAll = function pauseAll(num) {
    var sounds = document.getElementsByTagName('audio');
    for (var i = 0; i < sounds.length; i++) {
      if (sounds[i] == sounds[num]) {
        if (playing == num) {
          sounds[i].pause()
          playing = -1
        } else {
          sounds[i].play()
          playing = num
        }
      } else {
        sounds[i].pause()
      }
    } 
  }
}



