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
            <div class="img-container" id="imgBox${[i]}" style="background-image: url(${song.albumArt});">
              <a onclick="app.controllers.itunesCtrl.play(${[i]})"><img class="play-img" src="pics/play.png"></a>
            </div>
            <p class="mt-2">Collection: ${song.collection}</p>
            <h6>Price: $${song.price}</h6>
            <audio id="audio${[i]}" class="audio-player" controls style="width: 80%;">
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
  this.play = function(i) {
    document.getElementById('audio' +i).play()
    document.getElementById('imgBox' +i).innerHTML = `<a onclick="app.controllers.itunesCtrl.pause(${i})"><img class="play-img" src="pics/pause.png"></a>`
  }

  this.pause = function(i) {
    document.getElementById('audio' +i).pause()
    document.getElementById('imgBox' +i).innerHTML = `<a onclick="app.controllers.itunesCtrl.play(${i})"><img class="play-img" src="pics/play.png"></a>`
  }
  
  document.addEventListener('play', function (e) {
    var audios = document.getElementsByTagName('audio');
    for (var i = 0; i < audios.length; i++) {
      if (audios[i] != e.target) {
        audios[i].pause();
        audios[i].innerHTML = `<a onclick="app.controllers.itunesCtrl.play(${i})"><img class="play-img" src="pics/play.png"></a>`
      }
    }
  }, true);
}



