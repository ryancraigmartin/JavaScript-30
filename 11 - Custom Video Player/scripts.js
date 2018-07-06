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

// Allows for the volume and speed of playback to change.
function handleRangeUpdate() {
  video[this.name] = this.value;
  // console.log(this.name)
  // console.log(this.value);
}

// Moves the progress bar along as time passes.
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`
}

// Allows the user to scrub playback.
function scrubPlayback(event) {
  const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  console.log(event)
}


// Hook up event listeners

video.addEventListener('click', togglePlay); // Toggles the video when player is clicked.

toggle.addEventListener('click', togglePlay); // The button will also play or pause the video.

video.addEventListener('play', updateButton); // Toggles the video when player is clicked.

video.addEventListener('pause', updateButton); // Toggles the video when player is clicked.

video.addEventListener('timeupdate', handleProgress); // Moves the progress bar along as time passes.

skipButtons.forEach(button => button.addEventListener('click', skip)); // Each skip button will function when clicked.

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate)); // On a change, the ranges will update.

ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate)); // Will change as the slider is moved.

let mouseDown = false;
progress.addEventListener('click', scrubPlayback); // Allows user to move from one time to another on the progress bar.
progress.addEventListener('mousemove', (event) => mouseDown && scrubPlayback(event)); // Current time changes based on mouse movement with the passed event.
progress.addEventListener('mousedown', () => mouseDown = true)
progress.addEventListener('mouseup', () => mouseDown = false)