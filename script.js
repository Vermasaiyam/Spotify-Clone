console.log("Welcome");

//Initialize the variables
let songIndex = 0;
let progress = 0;
let audioElement = new Audio('Songs/song1.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName('songItem'));

//Song Banner JS
let marquee = document.getElementById("marquee");
let songBannerImage = document.getElementsByClassName("songBannerImage")[0];
let singer = document.getElementsByClassName("singer")[0];
let movie = document.getElementById("movie");

let songs = [
    { songName: 'KALAASTAR - Honey 3.0 - Yo Yo Honey Singh', filePath: 'Songs/song1.mp3', coverPath: 'Covers/1.jpg', singer: "Yo Yo Honey Sngh", movie: "N/A" },
    { songName: 'Tujhe Kitna Chahne Lage - Kabir Singh', filePath: 'Songs/song2.mp3', coverPath: 'Covers/2.jpg', singer: "Mithoon Feat. Arijit Singh", movie: "Kabir Singh" },
    { songName: 'Kaun Tujhe - M.S. Dhoni - The Untold Story', filePath: 'Songs/song3.mp3', coverPath: 'Covers/3.jpg', singer: "Palak Muchhal, Amaal Mallik", movie: "M.S. Dhoni - The Untold Story" },
    { songName: 'Jab Tak - M.S. Dhoni - The Untold Story', filePath: 'Songs/song4.mp3', coverPath: 'Covers/4.jpg', singer: "Armaan Malik", movie: "M.S. Dhoni - The Untold Story" },
    { songName: 'Shayad - Love Aaj Kal', filePath: 'Songs/song5.mp3', coverPath: 'Covers/5.jpg', singer: "Arijit Singh, Pritam Chakraborty, Madhubanti Bagchi", movie: "Love Aaj Kal" },
    { songName: 'Dil Sambhal Ja Jara - Murder 2', filePath: 'Songs/song6.mp3', coverPath: 'Covers/6.jpeg', singer: "Arijit Singh", movie: "Murder 2" },
    { songName: 'Aankhon Se Batana Reply - Swati Mishra', filePath: 'Songs/song7.mp3', coverPath: 'Covers/7.jpeg', singer: "Swati Mishra", movie: "N/A" },
    { songName: 'Bekhayali - Kabir Singh', filePath: 'Songs/song8.mp3', coverPath: 'Covers/8.jpeg', singer: "Sachet Tandon", movie: "Kabir Singh" }
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    // element.getElementsByClassName("timestamp")[0].innerText = audioElement.duration;
})

//Handle Play/Pause click (play songs from Mater Play)
masterPlay.addEventListener('click', () => {

    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-circle-play');
        document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-circle-pause');
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        marquee.innerText = songs[songIndex].songName;
        songBannerImage.src = songs[songIndex].coverPath;
        singer.innerText = songs[songIndex].singer;
        movie.innerText = songs[songIndex].movie;

    }
    else {
        audioElement.pause();
        document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-circle-pause');
        document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-circle-play');
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

//event listeners
audioElement.addEventListener('timeupdate', () => {
    //update seek bar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
    if (progress == 100) {
        console.log("done")
        if (songIndex < 7) {
            songIndex += 1;
        }
        else {
            songIndex = 0;
        }
        audioElement.src = `Songs/song${songIndex + 1}.mp3`;
        makeAllPlays();
        audioElement.play();
        document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-circle-play');
        document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-circle-pause');
        masterSongName.innerText = songs[songIndex].songName;

        marquee.innerText = songs[songIndex].songName;
        songBannerImage.src = songs[songIndex].coverPath;
        singer.innerText = songs[songIndex].singer;
        movie.innerText = songs[songIndex].movie;
    }
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
})


const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}


//play songs from song Items List
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener('click', (e) => {

        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.currentTime = 0;
            songIndex = parseInt(e.target.id)
            audioElement.src = `Songs/song${songIndex + 1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            makeAllPlays();
            audioElement.play();
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
            marquee.innerText = songs[songIndex].songName;
            songBannerImage.src = songs[songIndex].coverPath;
            singer.innerText = songs[songIndex].singer;
            movie.innerText = songs[songIndex].movie;
        }
        else {
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity = 0;
        }
    })
})


//Next Song
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 7) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `Songs/song${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    makeAllPlays();
    document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-circle-play');
    document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-circle-pause');

    marquee.innerText = songs[songIndex].songName;
    songBannerImage.src = songs[songIndex].coverPath;
    singer.innerText = songs[songIndex].singer;
    movie.innerText = songs[songIndex].movie;
})


//Previous Song
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `Songs/song${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    makeAllPlays();
    document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-circle-play');
    document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-circle-pause');

    marquee.innerText = songs[songIndex].songName;
    songBannerImage.src = songs[songIndex].coverPath;
    singer.innerText = songs[songIndex].singer;
    movie.innerText = songs[songIndex].movie;
})



//My playlist aka liked songs
localStorage.clear();
Array.from(document.getElementsByClassName("songLiked")).forEach((element) => {
    element.addEventListener('click', (e) => {
        likedIndex = e.target.id;
        e.target.classList.remove("fa-regular");
        e.target.classList.add("fa-solid");
        likedSongName = songs[likedIndex].songName;
        likedSongPath = songs[likedIndex].filePath;
        likedSongCover = songs[likedIndex].coverPath;


        if (localStorage.getItem('itemsJson') == null) {
            itemJsonArray = [];
            itemJsonArray.push([likedSongName, likedSongPath, likedSongCover]);
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
        }

        else {
            itemJsonArraystr = localStorage.getItem('itemsJson');
            itemJsonArray = JSON.parse(itemJsonArraystr);
            itemJsonArray.push([likedSongName, likedSongPath, likedSongCover]);
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
            // console.log(itemJsonArray.length)
            for (i = 0; i < itemJsonArray.length; i++) {
                if ([likedSongName, likedSongPath, likedSongCover] == itemJsonArray[i]) {
                    itemJsonArray.pop();
                    alert("Song Repeated");
                    return;
                }
                else {
                    itemJsonArray.push([likedSongName, likedSongPath, likedSongCover]);
                }
                localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
            }


        }


        //populate the playlist
        tableBody = document.getElementById("tablebody");
        let str = "";
        itemJsonArray.forEach((element, index) => {
            str += `
            <tr>
                    <th>${index + 1}.</th>
                    <td><img src="${element[2]}" class="likedImage"></td>
                    <td>${element[0]}</td>
                    <td><i id="${index}" class="fa-solid songItemPlay fa-circle-play"></i></td>
            </tr>`
        })
        tableBody.innerHTML = str;
    })
})



//LOGIN JS
// let uname;
// let login = document.getElementById("login");
// let div = document.getElementById("buttons");
// login.addEventListener("click", () => {
//     let username = prompt("Enter Your Username");
//     let password = prompt("Enter Your Password");
//     if (username == "saiyam05" && password == "123456") {
//         uname = username;
//         console.log("matched");
//         alert("You are Logged In.");
//         document.getElementById("login").remove();
//         div.innerHTML = "Welcome!!!  Saiyam05";
//         div.style.fontSize = "24px";
//         div.style.fontWeight = "600";
//     }
//     else {
//         console.log("not matched");
//         alert("Your Username and Password is Incorrect");
//     }

// })



