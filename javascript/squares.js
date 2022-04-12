const squares = document.querySelector("div.squares");

for (let i = 0; i < 15; i++) {
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