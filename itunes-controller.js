function ItunesController() {
  var itunesService = new ItunesService()
  //Do Not Modify the getMusic function
  this.getMusic = function getMusic(e) {
    e.preventDefault();
    var artist = e.target.artist.value;
    itunesService.getMusicByArtist(artist).then(draw);
    document.getElementById("myForm").reset(); //after get music by artist returns what are you doing with the objects?
  }

  //Start coding here
  function draw(results) {
    var template = ''
    for (let i = 0; i < results.length; i++) {
      const song = results[i];
      if (song.kind == 'song') {
        template += `
        <div class="col-3">
            <a onclick="app.controllers.itunesCtrl.pauseAll(${[i]})"><h2>Title: ${song.title}</h2></a>
            <h3>Artist: ${song.artist}</h4>
            <img src="${song.albumArt}" alt="">
            <h4>Collection: ${song.collection}</h4>
            <h4>Price: ${song.price}</h4>
            <audio id="audio${[i]}" controls>
              <source src="${song.preview}" type="audio/mp3">
            </audio>
        </div>`
      }
    }
    document.getElementById('songs-list').innerHTML = template
  }

//public
  this.pauseAll = function pauseAll(num) {
    var sounds = document.getElementsByTagName('audio');
    for (var i = 0; i < sounds.length; i++) {
      sounds[i].pause()
    }
    document.getElementById("audio" + num).play();
  }
}



