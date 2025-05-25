// script.js
document.addEventListener('DOMContentLoaded', () => {
    const audioForm = document.getElementById('audioForm');
    const audioSelect = document.getElementById('audioSelect');
    const podcastTitleInput = document.getElementById('podcastTitle');
    const podcastList = document.getElementById('podcastList');

    // Load existing podcasts from local storage
    loadPodcasts();

    // Event listener for the audio form submission
    audioForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        const selectedAudio = audioSelect.value;
        const title = podcastTitleInput.value.trim();

        if (selectedAudio && title) {
            const podcast = {
                title: title,
                audio: selectedAudio,
                thumbnail: "path/to/default/thumbnail.jpg" // Replace with a default thumbnail path
            };
            savePodcast(podcast);
            displayPodcast(podcast);
            podcastTitleInput.value = ''; // Clear the input field
            audioSelect.selectedIndex = 0; // Reset the select dropdown
        } else {
            alert('Please select an audio file and enter a title.');
        }
    });

    // Function to save podcast to local storage
    function savePodcast(podcast) {
        let musicFolder = JSON.parse(localStorage.getItem('music')) || [];
        musicFolder.push(podcast);
        localStorage.setItem('music', JSON.stringify(musicFolder));
    }

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
        li.innerHTML = `
            <strong>${podcast.title}</strong>
            <audio controls>
                <source src="${podcast.audio}" type="audio/mpeg">
                Your browser does not support the audio tag.
            </audio>
        `;
        podcastList.appendChild(li);
    }
});

// Search functionality
function searchPodcasts() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const podcastItems = document.querySelectorAll('.podcast-list-ul li');

    podcastItems.forEach(item => {
        const title = item.querySelector('strong').textContent.toLowerCase();
        if (title.includes(input)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

