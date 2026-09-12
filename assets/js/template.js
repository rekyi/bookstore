function imgContentTemplate(i) {
  return `<button class="img-btn" data-index="${i}" type="button">
    <img src="${imageArray[i].src}" alt="${imageArray[i].alt}" width="${imageArray[i].width}" height="${imageArray[i].height}" loading="lazy" /> </button>`;
}

function commentsTemplate(i) {
  return `<li>
  <span>${imageArray[currentIndex].comments[i].name}: </span>
  <p> ${imageArray[currentIndex].comments[i].comment}</p>
   </li>`;
}
