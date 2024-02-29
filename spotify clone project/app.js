<script>
document.addEventListener('DOMContentLoaded', function () {
    const audioPlayer = document.createElement('audio');
    audioPlayer.id = 'audioPlayer';
    document.body.appendChild(audioPlayer);

    const playButtons = document.querySelectorAll('.play-button');
    const progressBar = document.querySelector('.progress-bar');
    const currTime = document.querySelector('.curr-time');
    const totTime = document.querySelector('.tot-time');
    const playerControls = document.querySelector('.player-controls');
    let isPlaying = false;

    playButtons.forEach(button => {
        button.addEventListener('click', function () {
            const songContainer = button.closest('.card');
            const songTitle = songContainer.querySelector('.card-title').innerText;
            const songSrc = songContainer.querySelector('.card-img').src;

            if (!isPlaying) {
                audioPlayer.src = songSrc;
                audioPlayer.play();
                isPlaying = true;
                updatePlayButtonState();
                updateSongInfo(songTitle);
            } else {
                audioPlayer.pause();
                isPlaying = false;
                updatePlayButtonState();
            }
        });
    });

    audioPlayer.addEventListener('timeupdate', function () {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;
        const progressPercentage = (currentTime / duration) * 100;

        currTime.innerText = formatTime(currentTime);
        progressBar.value = progressPercentage;

        if (duration) {
            totTime.innerText = formatTime(duration);
        }
    });

    progressBar.addEventListener('input', function () {
        const seekTime = (progressBar.value / 100) * audioPlayer.duration;
        audioPlayer.currentTime = seekTime;
    });

    function updatePlayButtonState() {
        const playIcons = playerControls.querySelectorAll('.fa-play');
        const pauseIcons = playerControls.querySelectorAll('.fa-pause');

        if (isPlaying) {
            playIcons.forEach(icon => icon.classList.add('hide'));
            pauseIcons.forEach(icon => icon.classList.remove('hide'));
        } else {
            playIcons.forEach(icon => icon.classList.remove('hide'));
            pauseIcons.forEach(icon => icon.classList.add('hide'));
        }
    }

    function updateSongInfo(title) {
        // You can customize this part to display the current playing song info
        // For example, you can update a div with the song title
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }
});
</script>