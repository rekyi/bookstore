function imgContentTemplate(i) {
  return `<button class="img-btn" data-index="${i}" type="button">
    <h2 class="grid-img-title">${booksArray[i].title}</h2>
    <img src="${booksArray[i].src}" alt="${booksArray[i].alt}" width="${booksArray[i].width}" height="${booksArray[i].height}" loading="lazy" /> </button>`;
}

function commentsTemplate(i) {
  return `<li>
  <span>${booksArray[currentIndex].comments[i].name}: </span>
  <p> ${booksArray[currentIndex].comments[i].comment}</p>
   </li>`;
}
