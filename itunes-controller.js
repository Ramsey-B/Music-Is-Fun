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
            <li><a onclick="app.controllers.itunesCtrl.pauseAll(${[i]})">Artist: ${song.artist}</a></li>
            <li>Title: ${song.title}</li>
            <li>
                <img src="${song.albumArt}" alt="">
            </li>
            <li>Collection: ${song.collection}</li>
            <li>Price: ${song.price}</li>
            <li>
                <audio id="audio${[i]}" controls>
                    <source src="${song.preview}" type="audio/mp3">
                </audio>
            </li>`
      }
    }
    document.getElementById('songs-list').innerHTML = template
  }

  this.pauseAll = function pauseAll(num) {
    var sounds = document.getElementsByTagName('audio');
    for (var i = 0; i < sounds.length; i++) {
      sounds[i].pause()
    }
    document.getElementById("audio" + num).play();
  }
}



