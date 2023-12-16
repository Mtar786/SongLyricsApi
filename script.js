'use strict';

(function() {
    function init() {
        document.getElementById('lyricsForm').addEventListener('submit', function(event) {
            event.preventDefault();
            getLyrics();
        });
    }

    async function getLyrics() {
        try {
            const songTitle = encodeURIComponent(document.getElementById('songTitle').value);
            const artist = encodeURIComponent(document.getElementById('artist').value);

            const apiKey = 'b23756515feccd0bc2782e471a981716'; // Replace with your actual API key

            const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const apiUrl = `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?apikey=${apiKey}&q_track=${songTitle}&q_artist=${artist}`;

            const response = await fetch(corsProxyUrl + apiUrl, {
                method: 'GET'
            });

            const data = await response.json();
            console.log(data);

            const lyricsContainer = document.getElementById('lyricsContainer');
            if (data.message.body.lyrics) {
                lyricsContainer.innerHTML = `<pre>${data.message.body.lyrics.lyrics_body}</pre>`;
            } else {
                lyricsContainer.innerHTML = `<p>Lyrics not found for this song.</p>`;
            }
        } catch (err) {
            console.log(err);
        }
    }

    // Call the initialization function
    init();
})();

