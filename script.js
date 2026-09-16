let currentIndex = 0;

// localStorage
function saveToLocalStorage() {
  localStorage.setItem("booksArray", JSON.stringify(booksArray));
}

function getFromLocalStorage() {
  let savedData = JSON.parse(localStorage.getItem("booksArray")) ?? [];

  if (!savedData.length) return;

  for (let i = 0; i < booksArray.length; i++) {
    if (savedData[i]) {
      booksArray[i].likes = savedData[i].likes;
      booksArray[i].liked = savedData[i].liked;
      booksArray[i].favorite = savedData[i].favorite;
      booksArray[i].comments = savedData[i].comments;
    }
  }
}

// Render-Grid
function renderImgs() {
  const contentRef = document.getElementById("photo-grid");
  let htmlContent = "";

  for (let i = 0; i < booksArray.length; i++) {
    htmlContent += imgContentTemplate(i);
  }
  contentRef.innerHTML = htmlContent;
}

// Dialog-Functions
function renderDialog(event) {
  const target = event.target.closest("button");

  if (target && target.hasAttribute("data-index")) {
    currentIndex = Number(target.getAttribute("data-index"));
    updateDialogContent();
    document.getElementById("image-dialog").showModal();
  }
}

function changeDialog(step) {
  currentIndex += step;

  if (currentIndex >= booksArray.length) {
    currentIndex = 0;
  } else if (currentIndex < 0) {
    currentIndex = booksArray.length - 1;
  }
  updateDialogContent();
}

function getDialogs() {
  const closeMainDialog = document.getElementById("image-dialog");
  const closeFavDialog = document.getElementById("favorites-dialog");

  closeMainDialog.addEventListener("click", onBackdropClick);
  closeFavDialog.addEventListener("click", onBackdropClick);
}

function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    event.currentTarget.close();
  }
}

function updateDialogContent() {
  updateDialogImage();
  updateDialogInfo();
  updateFavoriteDisplay();
  updateLikeDisplay();
  renderComments();
}

function updateDialogImage() {
  const dialogImg = document.getElementById("dialog-rendered");
  dialogImg.src = booksArray[currentIndex].src;
  dialogImg.alt = booksArray[currentIndex].alt;
  dialogImg.width = booksArray[currentIndex].width;
  dialogImg.height = booksArray[currentIndex].height;
}

function updateDialogInfo() {
  document.getElementById("dialog-caption").textContent = booksArray[currentIndex].title;
  document.getElementById("dialog-counter").textContent = `${currentIndex + 1} / ${booksArray.length} `;
  document.getElementById("dialog-price").innerText = "$" + booksArray[currentIndex].price;
}

// Favorite-Functions
function toggleFavorite() {
  booksArray[currentIndex].favorite = !booksArray[currentIndex].favorite;
  saveToLocalStorage();
}

function updateFavoriteDisplay() {
  const favBtn = document.getElementById("favorite-button");

  favBtn.classList.toggle("is-favorite", booksArray[currentIndex].favorite === true);
}

function renderFavorites() {
  const favBookRef = document.getElementById("favorites-grid");
  let htmlContent = "";

  for (let i = 0; i < booksArray.length; i++) {
    if (booksArray[i].favorite === true) {
      htmlContent += imgContentTemplate(i);
    }
  }
  favBookRef.innerHTML = htmlContent;
}

// Like-Functions
function toggleLike() {
  if (booksArray[currentIndex].liked) {
    booksArray[currentIndex].liked = false;
    booksArray[currentIndex].likes -= 1;
  } else {
    booksArray[currentIndex].liked = true;
    booksArray[currentIndex].likes += 1;
  }
  saveToLocalStorage();
}

function updateLikeDisplay() {
  const likeBtn = document.getElementById("like-button");
  const likeCountRef = document.getElementById("like-count");

  likeBtn.classList.toggle("is-liked", booksArray[currentIndex].liked === true);
  likeCountRef.innerText = booksArray[currentIndex].likes;
}

// Comment-Functions
function addComments() {
  let inputContent = document.getElementById("comment-input");
  let inputContentValue = inputContent.value.trim();
  let randomIndex = Math.floor(Math.random() * inputNames.length);

  if (!inputContentValue) return;

  booksArray[currentIndex].comments.unshift({ name: inputNames[randomIndex], comment: inputContentValue });

  inputContent.value = "";
  renderComments();
  saveToLocalStorage();
}

function renderComments() {
  let commentRef = document.getElementById("comments-list");
  commentRef.innerHTML = "";

  for (let i = 0; i < booksArray[currentIndex].comments.length; i++) {
    commentRef.innerHTML += commentsTemplate(i);
  }
}

// Event-Listener
function GridListeners() {
  document.getElementById("photo-grid").addEventListener("click", renderDialog);
  document.getElementById("favorites-grid").addEventListener("click", renderDialog);
  document.getElementById("show-favorites").addEventListener("click", () => {
    renderFavorites();
    document.getElementById("favorites-dialog").showModal();
  });
}

function DialogNavListeners() {
  document.getElementById("dialog-back").addEventListener("click", () => changeDialog(-1));
  document.getElementById("dialog-next").addEventListener("click", () => changeDialog(1));
}

function FavoriteListener() {
  document.getElementById("favorite-button").addEventListener("click", () => {
    toggleFavorite();
    updateFavoriteDisplay();
  });
}

function LikeListener() {
  document.getElementById("like-button").addEventListener("click", () => {
    toggleLike();
    updateLikeDisplay();
  });
}

function CommentListener() {
  document.getElementById("comment-form").addEventListener("submit", (event) => {
    event.preventDefault();
    addComments();
  });
}

function EventListeners() {
  GridListeners();
  DialogNavListeners();
  FavoriteListener();
  LikeListener();
  CommentListener();
}

// Setup
function init() {
  getFromLocalStorage();
  renderImgs();
  EventListeners();
  getDialogs();
}

init();
