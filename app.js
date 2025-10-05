const timeDisplay = document.getElementById("timeDisplay");
const statusLabel = document.getElementById("statusLabel");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const themeToggleBtn = document.getElementById("themeToggleBtn");

let elapsedSeconds = 0;
let timerId = null;

function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
}


 // Updates the DOM with the current elapsed time.
function render() {
  timeDisplay.textContent = formatTime(elapsedSeconds);
}

function startTimer() {
  if (timerId !== null) {
    return;
  }
  statusLabel.textContent = "Running";
  timerId = setInterval(() => {
    elapsedSeconds += 1;
    render();
  }, 1000);
}

function stopTimer() {
  if (timerId === null) {
    return;
  }
  clearInterval(timerId);
  timerId = null;
  statusLabel.textContent = "Paused";
}

function resetTimer() {
  clearInterval(timerId);
  timerId = null;
  elapsedSeconds = 0;
  render();
  statusLabel.textContent = "Ready";
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);


themeToggleBtn.addEventListener("click", toggleTheme);


 // Toggles between light and dark themes.
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
}

render();
