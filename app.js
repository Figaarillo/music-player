// Selección de de los elementos del HTML
const songTitle = document.querySelector('.music-player h1')
const songArtits = document.querySelector('.music-player p')
const songPlay = document.querySelector('#song-play')
const progressBar = document.querySelector('#progress-bar')
const btnRewind = document.querySelector('.btn-rewind')
const btnPlayPause = document.querySelector('.btn-play-pause')
const btnForward = document.querySelector('.btn-forward')

/* LISTA DE CANCIONES */
const songs = [
  {
    title: 'On & On (feat. Daniel Levi)',
    artist: 'Cartoon',
    src: 'music/Cartoon - On & On (feat. Daniel Levi) [NCS Release].mp3',
  },
  {
    title: 'Make Me Move (feat. Karra)',
    artist: 'Culture Code',
    src: 'music/Culture Code - Make Me Move (feat. Karra) [NCS Release].mp3',
  },
  {
    title: 'Heroes Tonight (feat. Johnning)',
    artist: 'Janji',
    src: 'music/Janji - Heroes Tonight (feat. Johnning) [NCS Release].mp3',
  },
  {
    title: 'Power (feat. braev)',
    artist: 'N3WPORT',
    src: 'music/N3WPORT - Power (feat. braev) [NCS Release].mp3',
  },
  {
    title: 'Grateful',
    artist: 'NEFFEX',
    src: 'music/NEFFEX - Grateful [Copyright Free].mp3',
  },
];

// Index que usamos para saber cual cancion es la que se esta reproduciendo en el momento
let songIndex = 0

// Funcion para cargar un los metadatos de una cancion
const loadSong = () => {
  songTitle.textContent = songs[songIndex].title
  songArtits.textContent = songs[songIndex].artist
  songPlay.src = songs[songIndex].src
  songPlay.addEventListener('loadeddata', function(){})
}

btnPlayPause.addEventListener('click', () => {
  if (songPlay.paused) {
    playSong()
  } else {
    pauseSong()
  }
})

const playSong = () => {
  songPlay.play()
  btnPlayPause.innerHTML = '<i class="bi bi-play-fill"></i>';
}

const pauseSong = () => {
  songPlay.pause()
  btnPlayPause.innerHTML = '<i class="bi bi-pause-fill"></i>';
}

// Me permite settear los valores para la barra de progreso
songPlay.addEventListener('loadedmetada', () => {
  progressBar.max = playSong.duration
  progressBar.value = playSong.currentTime
})

// Funciones para actulizar la barra de progreso
progressBar.addEventListener('timeupdate', () => {
  progressBar.value = (songPlay.currentTime / songPlay.duration) * 100
})

progressBar.addEventListener("input", () => {
  songPlay.currentTime = (progressBar.value * songPlay.duration) / 100;
})

progressBar.addEventListener("change", () => {
  playSong()
})

btnRewind.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length
  loadSong(songIndex)
  playSong()
})

btnForward.addEventListener("click", () => {
  songIndex = (songIndex + 1 + songs.length) % songs.length;
  loadSong(songIndex)
  playSong()
})

loadSong(songIndex);

document.addEventListener("onload", ()=> {
  loadSong(songIndex)
})
