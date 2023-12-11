console.log("Welcome");

//Initialize the variables
let songIndex = 0;
let progress = 0;
let audioElement = new Audio('song1.mp3');
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
    { songName: 'KALAASTAR - Honey 3.0 - Yo Yo Honey Singh', filePath: 'song1.mp3', coverPath: '1.jpg', singer: "Yo Yo Honey Sngh", movie: "N/A" },
    { songName: 'Tujhe Kitna Chahne Lage - Kabir Singh', filePath: 'song2.mp3', coverPath: '2.jpg', singer: "Mithoon Feat. Arijit Singh", movie: "Kabir Singh" },
    { songName: 'Kaun Tujhe - M.S. Dhoni - The Untold Story', filePath: 'song3.mp3', coverPath: '3.jpg', singer: "Palak Muchhal, Amaal Mallik", movie: "M.S. Dhoni - The Untold Story" },
    { songName: 'Jab Tak - M.S. Dhoni - The Untold Story', filePath: 'song4.mp3', coverPath: '4.jpg', singer: "Armaan Malik", movie: "M.S. Dhoni - The Untold Story" },
    { songName: 'Shayad - Love Aaj Kal', filePath: 'song5.mp3', coverPath: '5.jpg', singer: "Arijit Singh, Pritam Chakraborty, Madhubanti Bagchi", movie: "Love Aaj Kal" },
    { songName: 'Dil Sambhal Ja Jara - Murder 2', filePath: 'song6.mp3', coverPath: '6.jpeg', singer: "Arijit Singh", movie: "Murder 2" },
    { songName: 'Aankhon Se Batana Reply - Swati Mishra', filePath: 'song7.mp3', coverPath: '7.jpeg', singer: "Swati Mishra", movie: "N/A" },
    { songName: 'Bekhayali - Kabir Singh', filePath: 'song8.mp3', coverPath: '8.jpeg', singer: "Sachet Tandon", movie: "Kabir Singh" },
    { songName: 'Tere Jaane Se - Anurag Vashisht', filePath: 'song9.mp3', coverPath: '9.jpg', singer: "Anurag Vashisht", movie: "N/A" },
    { songName: 'Ek Raat - Vilen', filePath: 'song10.mp3', coverPath: '10.jpeg', singer: "Vilen", movie: "N/A" },
    { songName: 'Faasle - Aditya Rikhari', filePath: 'song11.mp3', coverPath: '11.jpg', singer: "Aditya Rikhari", movie: "N/A" },
    { songName: 'Sach Keh Raha Hai Deewana - Mayank Maurya', filePath: 'song12.mp3', coverPath: '12.jpeg', singer: "Mayank Maurya", movie: "Rehna Hai Tere Dil Mein" },
    { songName: 'Baarishein - Anuv Jain', filePath: 'song13.mp3', coverPath: '13.jpg', singer: "Anuv Jain", movie: "N/A" },
    { songName: 'Chidiya - Vilen', filePath: 'song14.mp3', coverPath: '14.jpg', singer: "Vilen", movie: "N/A" },
    { songName: 'Uska Hi Banana - Arijit Singh', filePath: 'song15.mp3', coverPath: '15.jpg', singer: "Arijit Singh", movie: "1920 Evil Returns" },
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
        audioElement.src = `song${songIndex + 1}.mp3`;
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
            audioElement.src = `song${songIndex + 1}.mp3`;
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
    audioElement.src = `song${songIndex + 1}.mp3`;
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
    audioElement.src = `song${songIndex + 1}.mp3`;
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
            // console.log(itemJsonArraystr)
            itemJsonArray = JSON.parse(itemJsonArraystr);
            let entry = JSON.stringify([likedSongName, likedSongPath, likedSongCover]);
            if (itemJsonArraystr.includes(entry)){
                // e.target.classList.remove("fa-solid");
                // e.target.classList.add("fa-regular");
                alert("Already added!!!");
                return;
            }
            itemJsonArray.push([likedSongName, likedSongPath, likedSongCover]);
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
        }

        // console.log(itemJsonArray)

        //populate the playlist
        tableBody = document.getElementsByClassName("liked-song")[0];
        let str = "";
        itemJsonArray.forEach((element, index) => {
            str += `
                <tr>
                    <th>${index+1}.)</th>
                    <th><img class="img" src="${element[2]}" style="width: 50px; border-radius: 50%; margin: 0 23px;"></th>
                    <th>${element[0]}</th>
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



