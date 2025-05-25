// view.js
document.addEventListener('DOMContentLoaded', () => {
    const podcastList = document.getElementById('podcastList');
    let currentlyPlayingAudio = null; // Track the currently playing audio element

    // Load podcasts from local storage
    loadPodcasts();

    // Function to load podcasts from local storage
    function loadPodcasts() {
        const musicFolder = JSON.parse(localStorage.getItem('music')) || [];
        musicFolder.forEach(podcast => {
            displayPodcast(podcast);
        });
    }

    // Function to display a podcast in the list
    function displayPodcast(podcast) {
        const li = document.createElement('li');
        li.classList.add('podcast-item');
        li.innerHTML = `
            <strong>${podcast.title}</strong>
            <audio controls class="audio-player">
                <source src="${podcast.audio}" type="audio/mpeg">
                Your browser does not support the audio tag.
            </audio>
        `;

        // Add event listener to the audio element
        const audioElement = li.querySelector('.audio-player');
        audioElement.addEventListener('play', () => {
            if (currentlyPlayingAudio && currentlyPlayingAudio !== audioElement) {
                currentlyPlayingAudio.pause(); // Pause the currently playing audio
                currentlyPlayingAudio.parentElement.classList.remove('playing'); // Remove playing class
            }
            currentlyPlayingAudio = audioElement; // Update the currently playing audio
            li.classList.add('playing'); // Add playing class to the current item
        });

        audioElement.addEventListener('pause', () => {
            li.classList.remove('playing'); // Remove playing class when paused
        });

        podcastList.appendChild(li);
    }
});

