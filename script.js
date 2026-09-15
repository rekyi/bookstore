let currentIndex = 0;

// localStorage
function saveToLocalStorage() {
  localStorage.setItem("imageArray", JSON.stringify(imageArray));
}

function getFromLocalStorage() {
  let savedData = JSON.parse(localStorage.getItem("imageArray")) ?? [];

  if (!savedData.length) return;

  for (let i = 0; i < imageArray.length; i++) {
    if (savedData[i]) {
      imageArray[i].likes = savedData[i].likes;
      imageArray[i].liked = savedData[i].liked;
      imageArray[i].favorite = savedData[i].favorite;
      imageArray[i].comments = savedData[i].comments;
    }
  }
}

// Render-Grid
function renderImgs() {
  const contentRef = document.getElementById("photo-grid");
  let htmlContent = "";

  for (let i = 0; i < imageArray.length; i++) {
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

  if (currentIndex >= imageArray.length) {
    currentIndex = 0;
  } else if (currentIndex < 0) {
    currentIndex = imageArray.length - 1;
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
  dialogImg.src = imageArray[currentIndex].src;
  dialogImg.alt = imageArray[currentIndex].alt;
  dialogImg.width = imageArray[currentIndex].width;
  dialogImg.height = imageArray[currentIndex].height;
}

function updateDialogInfo() {
  document.getElementById("dialog-caption").textContent = imageArray[currentIndex].title;
  document.getElementById("dialog-counter").textContent = `${currentIndex + 1} / ${imageArray.length} `;
  document.getElementById("dialog-price").innerText = "$" + imageArray[currentIndex].price;
}

// Favorite-Functions
function toggleFavorite() {
  imageArray[currentIndex].favorite = !imageArray[currentIndex].favorite;
  saveToLocalStorage();
}

function updateFavoriteDisplay() {
  const favBtn = document.getElementById("favorite-button");

  favBtn.classList.toggle("is-favorite", imageArray[currentIndex].favorite === true);
}

function renderFavorites() {
  const favBookRef = document.getElementById("favorites-grid");
  let htmlContent = "";

  for (let i = 0; i < imageArray.length; i++) {
    if (imageArray[i].favorite === true) {
      htmlContent += imgContentTemplate(i);
    }
  }
  favBookRef.innerHTML = htmlContent;
}

// Like-Functions
function toggleLike() {
  if (imageArray[currentIndex].liked === true) {
    imageArray[currentIndex].liked = false;
    imageArray[currentIndex].likes -= 1;
  } else {
    imageArray[currentIndex].liked = true;
    imageArray[currentIndex].likes += 1;
  }
  saveToLocalStorage();
}

function updateLikeDisplay() {
  const likeBtn = document.getElementById("like-button");
  const likeCountRef = document.getElementById("like-count");

  likeBtn.classList.toggle("is-liked", imageArray[currentIndex].liked === true);
  likeCountRef.innerText = imageArray[currentIndex].likes;
}

// Comment-Functions
function addComments() {
  let inputContent = document.getElementById("comment-input");
  let inputContentValue = inputContent.value.trim();
  let randomIndex = Math.floor(Math.random() * inputNames.length);

  if (!inputContentValue) return;

  imageArray[currentIndex].comments.unshift({ name: inputNames[randomIndex], comment: inputContentValue });

  inputContent.value = "";
  renderComments();
  saveToLocalStorage();
}

function renderComments() {
  let commentRef = document.getElementById("comments-list");
  commentRef.innerHTML = "";

  for (let i = 0; i < imageArray[currentIndex].comments.length; i++) {
    commentRef.innerHTML += commentsTemplate(i);
  }
}

// Event-Listener
function GridListeners() {
  document.getElementById("photo-grid").addEventListener("click", renderDialog);
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
