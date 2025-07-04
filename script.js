const songs = [
  {
    name: "Godari Gattu",
    singer: "Ramana Gogula, Madhu Priya",
    director: "Bheems Ceciroleo",
    movie: "Sankranthiki Vasthunam",
    img: "godari.jpg",
    src: "Godari Gattu.mp3"
  },
  {
    name: "Kurchi Madathapetti",
    singer: "Sahiti Chaganti, Sri Krishna",
    director: "Thaman S",
    movie: "Guntur Kaaram",
    img: "kurchi.jpg",
    src: "Kurchi Madathapetti.mp3"
  },
  {
    name: "Prema Velluva",
    singer: "Sid Sriram",
    director: "Mickey J. Meyer",
    movie: "Hit 3",
    img: "prema.jpg",
    src: "Prema Velluva.mp3"
  }
];

let currentIndex = 0;
let isPlaying = false;

const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const cover = document.getElementById("cover");
const coverImg = document.getElementById("coverImg");
const songName = document.getElementById("songName");
const singer = document.getElementById("singer");
const director = document.getElementById("director");
const movie = document.getElementById("movie");
const currentTimeEl = document.getElementById("currentTime");
const totalTimeEl = document.getElementById("totalTime");
const progress = document.getElementById("progress");
const progressContainer = document.querySelector(".progress-container");

function loadSong(idx) {
  const s = songs[idx];
  songName.textContent = s.name;
  singer.textContent = "Singer: " + s.singer;
  director.textContent = "Music Director: " + s.director;
  movie.textContent = "Movie: " + s.movie;
  coverImg.src = s.img;
  audio.src = s.src;
}

function togglePlay() {
  if (isPlaying) {
    audio.pause();
    playBtn.textContent = "▶";
    cover.style.animationPlayState = "paused";
  } else {
    audio.play();
    playBtn.textContent = "⏸";
    cover.style.animationPlayState = "running";
  }
  isPlaying = !isPlaying;
}

function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
  resetAndPlay();
}

function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
  resetAndPlay();
}

function resetAndPlay() {
  audio.currentTime = 0;
  if (!isPlaying) togglePlay();
  else audio.play();
}

function formatTime(t) {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function updateProgress() {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${percent}%`;
  currentTimeEl.textContent = formatTime(audio.currentTime);
}

function setProgress(e) {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

function toggleTheme() {
  document.body.classList.toggle("light");
}

audio.addEventListener("loadedmetadata", () => {
  totalTimeEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", nextSong);

loadSong(currentIndex);
