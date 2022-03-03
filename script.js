const cards = document.querySelectorAll(".card");
const time = document.querySelector(".timer");
const completeCardTag = document.querySelector(".cardsNumber");
const buttonRefresh = document.querySelector("#refresh");

const buttonAudio = document.querySelector("#audio");
const audio = document.querySelector("audio");

const imagePlay = document.getElementById("play");
const imagePause = document.getElementById("pause")

let timer = 30;
let timerFunc = timer;
let firstCard;
let secondCard;
let disableCards = false;
let count = 0;
let playGame = false;
let timerInterval;
let completeCard = 0;

let countAudio = 0;

function playAudio() {
    audio.play();
    countAudio = 1;
    audio.loop = true;

    imagePause.style.display = "none";
    imagePlay.style.display = "flex";
}

function playAndPause() {
    if(countAudio == 1) {
        audio.pause();
        audio.loop = false;
        audio.currentTime = 0;

        imagePause.style.display = "flex";
        imagePlay.style.display = "none";

        countAudio = 0;
    } else {
        playAudio();
    }
}

function moveCardTimer() {
    if(timerFunc <= 0) {
        return clearInterval(timerInterval);
    }

    timerFunc--;
    time.innerHTML = "Timer: " + timerFunc;
}

function moveCard(e) {
    if(!playGame) {
        playGame = true;

        timerInterval = setInterval(moveCardTimer, 1000);
    }
    let moveClick = e.target;

    if (moveClick !== firstCard && !disableCards && timerFunc > 0) {
        completeCard++;
        completeCardTag.innerHTML = "Cards: " + completeCard;
        moveClick.classList.add("move");
        if (!firstCard) {
            return firstCard = moveClick;
        }

        secondCard = moveClick;
        disableCards = true;
        let firstCardImg = firstCard.querySelector("img#back").src;
        let secondCardImg = secondCard.querySelector("img#back").src;

        setCards(firstCardImg, secondCardImg);
    }
}

function setCards(img1, img2) {
    if (img1 === img2) {
        count++;

        if (count == 8 && timerFunc > 0) {
            return clearInterval(timerInterval);
        }

        firstCard.removeEventListener("click", moveCard);
        secondCard.removeEventListener("click", moveCard);
        firstCard = secondCard = "";
        return disableCards = false;
    }

    setTimeout(() => {
        firstCard.classList.add("shake");
        secondCard.classList.add("shake");
    }, 400);

    setTimeout(() => {
        firstCard.classList.remove("shake", "move");
        secondCard.classList.remove("shake", "move");
        firstCard = secondCard = "";
        disableCards = false;
    }, 1200);
}

function upgradeDeck() {
    timerFunc = timer;
    time.innerHTML = "Timer: " + timerFunc;
    clearInterval(timerInterval);
    completeCard = 0;
    completeCardTag.innerHTML = "Cards: " + completeCard;
    count = 0;
    firstCard = secondCard = "";
    disableCards = false;
    playGame = false;

    let images = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    images.sort(() => Math.random() > 0.5 ? 1 : -1);

    let past = [1,2,3,4,5,6,7,8]
    past = Math.floor(Math.random() * past.length);

    let pastNumber = past === 0 ? 1 : past;

    cards.forEach((card, index) => {
        card.classList.remove("move");
        let img = card.querySelector("#back");
        img.src = `./assets/images_${pastNumber}/image_${images[index]}.png`;
        card.addEventListener("click", moveCard);
    });
}

upgradeDeck();

setTimeout (() => {playAudio()}, 500);

buttonRefresh.addEventListener("click", upgradeDeck);
buttonAudio.addEventListener("click", playAndPause);

cards.forEach((card) => {
    card.addEventListener("click", moveCard);
});