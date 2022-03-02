const cards = document.querySelectorAll(".card");

let firstCard;
let secondCard;

let disableCards = false;

let count = 0;

function moveCard(e) {
    let moveClick = e.target;
    if (moveClick !== firstCard && !disableCards) {
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

        if (count == 8) {
            setTimeout(() => {
                return upgradeDeck();
            }, 1000);
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
    count = 0;
    firstCard = secondCard = "";
    disableCards = false;

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => {
        card.classList.remove("move");
        let img = card.querySelector("#back");
        img.src = `./assets/image_${arr[index]}.png`;
        card.addEventListener("click", moveCard);
    });
}

upgradeDeck();

cards.forEach((card) => {
    card.addEventListener("click", moveCard);
});
