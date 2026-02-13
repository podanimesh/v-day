const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");
const screen3 = document.getElementById("screen3");
const envelope = document.getElementById("envelope");

const teaseText = document.getElementById("teaseText");
const nextBtn = document.getElementById("nextBtn");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const result = document.getElementById("result");
const music = document.getElementById("bgMusic");

/* Unlock audio + open envelope */
envelope.addEventListener("click", openLetter);
envelope.addEventListener("touchstart", openLetter);

function openLetter(){
    envelope.classList.add("open");

    // audio now allowed
    music.currentTime = 0;
    music.play().catch(()=>{});

    setTimeout(()=>{
        screen1.classList.remove("active");
        screen2.classList.add("active");
        startTeasing();
    }, 900);
}

/* Teasing */

const lines = [
    "Hi Babeee 😘",
    "Aaj kam Bhonda lag rahi ho ❤️",
    "But still Bhonda 😌",
    "Maar padingla loading...",
    "Spanking prepared 😏",
    "Okay serious now...",
    "I love you ❤️"
];

let index = 0;

function startTeasing(){
    setInterval(()=>{
        index++;
        if(index < lines.length){
            teaseText.innerText = lines[index];
        }
    }, 2000);
}

nextBtn.onclick = () => {
    screen2.classList.remove("active");
    screen3.classList.add("active");
};

/* Runaway NO */

function moveNo(){
    const x = Math.random() * (window.innerWidth - 120);
    const y = Math.random() * (window.innerHeight - 80);
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
}

noBtn.addEventListener("touchstart", moveNo);
noBtn.addEventListener("mouseover", moveNo);

/* YES */

yesBtn.onclick = () => {
    result.innerText = "YAYYY ❤️ I knew it Babeee 😌";
};
