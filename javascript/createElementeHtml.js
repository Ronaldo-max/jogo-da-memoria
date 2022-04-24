function createElementHtml() {
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

createElementHtml();
