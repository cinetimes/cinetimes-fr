var WebTorrent = require('webtorrent');

var client = new WebTorrent();

// Movie Magnet uri (string) or torrent file (buffer) or info hash (hex string or buffer) or parsed torrent (from parse-torrent) or http/https url to a torrent file (string);
var torrentId = document.getElementById("magnet").textContent;

client.add(torrentId, function (torrent) {
  // Torrents can contain many files. Let's use the .mp4 file
  var file = torrent.files.find(function (file) {
    return file.name.endsWith('.mp4');
  });
  // Display the file by adding it to the DOM.
  // Supports video, audio, image files, and more!
  file.appendTo('#video_webtorrent',{autoplay:false});
});
