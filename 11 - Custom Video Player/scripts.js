// Get the elements of the video player.

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Build out the functionality

// Toggles the player when clicked.
function togglePlay() {
  
  // Paused is a property on the video.
  const method = video.paused ? 'play' : 'pause';
  video[method]();

  // Can also be done this way.
  // if (video.paused) {
    //   video.play();
    // } else {
      //   video.pause(); 
      // }     
}

// Updates the play + pause button.
function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
  console.log('update button', icon)
}

// Adds functionality for each of the two skip buttons.
function skip() {
  console.log('skipping', this.dataset.skip); // Logs the button values when clicked.
  // currentTime property gives the current playback time in seconds. 
  video.currentTime += parseFloat(this.dataset.skip); // Converts the string into a number.
}

function handleRangeUpdate() {
  video[this.name] = this.value;
  // console.log(this.name)
  // console.log(this.value);
}




// Hook up event listeners

video.addEventListener('click', togglePlay); // Toggles the video when player is clicked.

toggle.addEventListener('click', togglePlay); // The button will also play or pause the video.

video.addEventListener('play', updateButton); // Toggles the video when player is clicked.

video.addEventListener('pause', updateButton); // Toggles the video when player is clicked.


skipButtons.forEach(button => button.addEventListener('click', skip)); // Each skip button will function when clicked.

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate)); // On a change, the ranges will update.

ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate)); // Will change as the slider is moved.