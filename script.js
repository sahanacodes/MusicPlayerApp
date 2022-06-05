console.log("On Top of the World");

let songIndex = 0;
let masterPlay = document.getElementById('master-play');
let audioElement = new Audio('songs/1.mp3');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
let masterSongName = document.getElementById('masterSongName');


let songs = [
    {songName:'On Top of the World', filePath:'audio/1.mp3', coverPath:'cover/1.jpg'},
    {songName:'After Midnight', filePath:'audio/2.mp3', coverPath:'cover/2.jpg'},
    {songName:'Better - Square a Saw', filePath:'audio/3.mp3', coverPath:'cover/3.jpg'},
    {songName:'Seeing Dreams', filePath:'audio/4.mp3', coverPath:'cover/4.jpg'},
    {songName:'Vibin', filePath:'audio/5.mp3', coverPath:'cover/5.jpg'},
    {songName:'Happy Anywhere', filePath:'audio/6.mp3', coverPath:'cover/6.jpg'}
];

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
        
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;

        makeAllPlays();
    }
});

audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;
})

songItems.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play'); 
    })
}

songItemPlay.forEach((element) => {
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterSongName.innerText = songs[songIndex].songName;
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    })
})

document.getElementById('previous').addEventListener('click', ()=>{
    makeAllPlays();

    if(songIndex>0)
    {
        songIndex -= 1;
    }
    else
    {
        songIndex = 6;
    }

    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    gif.style.opacity = 1;
});

document.getElementById('next').addEventListener('click', ()=>{
    makeAllPlays();
    
    if(songIndex<5)
    {
        songIndex += 1;
    }
    else
    {
        songIndex = 0;
    }

    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    gif.style.opacity = 1;
});