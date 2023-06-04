// Get DOM elements
const breakDecrementBtn = document.getElementById("break-decrement");
const breakIncrementBtn = document.getElementById("break-increment");
const sessionDecrementBtn = document.getElementById("session-decrement");
const sessionIncrementBtn = document.getElementById("session-increment");
const breakLengthEl = document.getElementById("break-length");
const sessionLengthEl = document.getElementById("session-length");
const timerLabelEl = document.getElementById("timer-label");
const timeLeftEl = document.getElementById("time-left");
const startStopBtn = document.getElementById("start_stop");
const resetBtn = document.getElementById("reset");
const beepSound = document.getElementById("beep");

// Initialize variables
let breakLength = 5;
let sessionLength = 25;
let isSession = true;
let timerRunning = false;
let timer;

// Update UI
function updateUI() {
  breakLengthEl.textContent = breakLength;
  sessionLengthEl.textContent = sessionLength;
  timeLeftEl.textContent = formatTime(sessionLength * 60);
  timerLabelEl.textContent = isSession ? "Session" : "Break";
}

// Format time in mm:ss format
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// Update break length
breakDecrementBtn.addEventListener("click", () => {
  if (breakLength > 1 && !timerRunning) {
    breakLength--;
    updateUI();
  }
});

breakIncrementBtn.addEventListener("click", () => {
  if (breakLength < 60 && !timerRunning) {
    breakLength++;
    updateUI();
  }
});

// Update session length
sessionDecrementBtn.addEventListener("click", () => {
  if (sessionLength > 1 && !timerRunning) {
    sessionLength--;
    updateUI();
  }
});

sessionIncrementBtn.addEventListener("click", () => {
  if (sessionLength < 60 && !timerRunning) {
    sessionLength++;
    updateUI();
  }
});

// Start/Stop timer
startStopBtn.addEventListener("click", () => {
  if (timerRunning) {
    clearInterval(timer);
    timerRunning = false;
    startStopBtn.textContent = "Start";
  } else {
    timerRunning = true;
    startStopBtn.textContent = "Stop";
    if (isSession) {
      timer = setInterval(runSessionTimer, 1000);
    } else {
      timer = setInterval(runBreakTimer, 1000);
    }
  }
});

// Reset timer
resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  timerRunning = false;
  isSession = true;
  breakLength = 5;
  sessionLength = 25;
  updateUI();
  startStopBtn.textContent = "Start";
  beepSound.pause();
  beepSound.currentTime = 0;
});

// Run session timer
function runSessionTimer() {
  const timeLeft = sessionLength * 60;
  if (timeLeft > 0) {
    timeLeftEl.textContent = formatTime(timeLeft - 1);
  } else {
    beepSound.play();
    isSession = false;
    timerLabelEl.textContent = "Break";
    timer = setInterval(runBreakTimer, 1000);
  }
}

// Run break timer
function runBreakTimer() {
  const timeLeft = breakLength * 60;
  if (timeLeft > 0) {
    timeLeftEl.textContent = formatTime(timeLeft - 1);
  } else {
    beepSound.play();
    isSession = true;
    timerLabelEl.textContent = "Session";
    timer = setInterval(runSessionTimer, 1000);
  }
}

// Initialize UI
updateUI();
