function createElementeHtml() {
    let divFront = `
        <div class="view front">
            <img src="./assets/front.png" alt="front" class="frontImage" />
        </div>
    `;

    let divBack = `
        <div class="view back">
            <img src="./assets/images_1/image_1.png" alt="image back" class="backImage"
            />
        </div>
    `;

    let li = `
        <li class="card">
            ${divFront}
            ${divBack}
        </li>
    `;

    let codeHtml = `
        ${li}${li}${li}${li}${li}${li}${li}${li}${li}${li}${li}${li}${li}${li}${li}${li}
    `;

    let ul = document.querySelector("ul");
    ul.innerHTML = codeHtml;
}

createElementeHtml();

const cards = document.querySelectorAll(".card");
const time = document.querySelector(".timer");
const completeCardTag = document.querySelector(".cardsNumber");
const buttonRefresh = document.getElementById("refresh");
const buttonAudio = document.querySelector("#buttonAudio");
const audio = document.querySelector("audio");
const imagePlay = document.getElementById("play");
const imagePause = document.getElementById("pause");

let timer = 30;
let timerAll = timer;
let firstCard;
let secondCard;
let disableCards = false;
let count = 0;
let playGame = false;
let timerInterval;
let completeCard = 0;
let countAudio = 0;

const cardFunction = {
    moveCardTimer() {
        if (timerAll <= 0) {
            return clearInterval(timerInterval);
        }
        timerAll--;
        time.innerHTML = "TEMPO: " + timerAll;
    },

    moveCard(e) {
        if (!playGame) {
            playGame = true;
            timerInterval = setInterval(cardFunction.moveCardTimer, 1000);
        }
        let moveClick = e.target;

        if (moveClick !== firstCard && !disableCards && timerAll > 0) {
            completeCard++;
            completeCardTag.innerHTML = "CLIQUES: " + completeCard;
            moveClick.classList.add("move");
            if (!firstCard) {
                return (firstCard = moveClick);
            }

            secondCard = moveClick;
            disableCards = true;
            let firstCardImg = firstCard.querySelector("img.backImage").src;
            let secondCardImg = secondCard.querySelector("img.backImage").src;

            cardValueImage.setCards(firstCardImg, secondCardImg);
        }
    },
};

const cardValueImage = {
    setCards(img1, img2) {
        if (img1 === img2) {
            count++;

            if (count == 8 && timerAll > 0) {
                return clearInterval(timerInterval);
            }

            firstCard.removeEventListener("click", cardFunction.moveCard);
            secondCard.removeEventListener("click", cardFunction.moveCard);
            firstCard = secondCard = "";
            return (disableCards = false);
        }

        setTimeout(() => {
            firstCard.classList.add("shake");
            secondCard.classList.add("shake");
        }, 100);

        setTimeout(() => {
            firstCard.classList.remove("shake", "move");
            secondCard.classList.remove("shake", "move");
            firstCard = secondCard = "";
            disableCards = false;
        }, 500);
    },
};

const actionsButtons = {
    playAndPause() {
        if (countAudio == 1) {
            audio.pause();
            countAudio = 0;
            audio.loop = false;
            audio.currentTime = 0;
            imagePause.style.display = "flex";
            imagePlay.style.display = "none";
        } else {
            audio.play();
            countAudio = 1;
            audio.loop = true;
            imagePause.style.display = "none";
            imagePlay.style.display = "flex";
        }
    },

    upgradeDeck() {
        timerAll = timer;
        time.innerHTML = "TEMPO: " + timerAll;
        clearInterval(timerInterval);
        completeCard = 0;
        completeCardTag.innerHTML = "CLIQUES: " + completeCard;
        count = 0;
        firstCard = secondCard = "";
        disableCards = false;
        playGame = false;

        let images = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
        images.sort(() => (Math.random() > 0.5 ? 1 : -1));

        let past = Math.floor(Math.random() * 9);
        let pastNumber = past === 0 ? 1 : past;

        cards.forEach((card, index) => {
            card.classList.remove("move");
            let img = card.querySelector(".backImage");
            img.src = `./assets/images_${pastNumber}/image_${images[index]}.png`;
            card.addEventListener("click", cardFunction.moveCard);
        });
    },
};

actionsButtons.upgradeDeck();

buttonRefresh.addEventListener("click", actionsButtons.upgradeDeck);
buttonAudio.addEventListener("click", actionsButtons.playAndPause);

cards.forEach((card) => {
    card.addEventListener("click", cardFunction.moveCard);
});

const squares = document.querySelector("div.squares");

for(let i = 0; i < 15; i++) {
    const div = document.createElement("div");

    const random = (min, max) => Math.random() * (max - min) + min;

    const size = Math.floor(random(10, 120));
    const position = random(1, 99);
    const delay = random(5, 0.1);
    const duration = random(24, 12)

    div.style.width = `${size}px`;
    div.style.height = `${size}px`;
    div.style.bottom = `-${size}px`;

    div.style.left = `${position}%`;

    div.style.animationDelay = `${delay}s`;
    div.style.animationDuration = `${duration}s`;
    div.style.animationTimingFunction = `cubic-bezier(${Math.random},${Math.random},${Math.random},${Math.random})`

    squares.appendChild(div);
}
