let currentIndex = 0;

function renderImgs() {
  const contentRef = document.getElementById("photo-grid");
  let htmlContent = "";

  for (let i = 0; i < imageArray.length; i++) {
    htmlContent += imgContentTemplate(i);
  }
  contentRef.innerHTML = htmlContent;
}

function updateDialogImage() {
  const dialogImg = document.getElementById("dialog-rendered");
  dialogImg.src = imageArray[currentIndex].src;
  dialogImg.alt = imageArray[currentIndex].alt;
  dialogImg.width = imageArray[currentIndex].width;
  dialogImg.height = imageArray[currentIndex].height;
}

function updateDialogInfo() {
  document.getElementById("dialog-caption").textContent = imageArray[currentIndex].alt;
  document.getElementById("dialog-counter").textContent = `${currentIndex + 1} / ${imageArray.length} `;
  document.getElementById("dialog-price").innerText = "$" + imageArray[currentIndex].price;
}

function updateDialogLikes() {
  const likeBtn = document.getElementById("like-button");
  const likeCountRef = document.getElementById("like-count");

  likeBtn.classList.toggle("is-liked", imageArray[currentIndex].liked === true);
  likeCountRef.innerText = imageArray[currentIndex].likes;
}

function updateDialogContent() {
  updateDialogImage();
  updateDialogInfo();
  updateDialogLikes();
  renderComments();
}

function toggleLike() {
  if (imageArray[currentIndex].liked === true) {
    imageArray[currentIndex].liked = false;
    imageArray[currentIndex].likes -= 1;
  } else {
    imageArray[currentIndex].liked = true;
    imageArray[currentIndex].likes += 1;
  }
}

function likeCounter() {
  toggleLike();
  updateDialogLikes();
}

function renderComments() {
  let commentRef = document.getElementById("comments-list");
  commentRef.innerHTML = "";

  for (let i = 0; i < imageArray[currentIndex].comments.length; i++) {
    commentRef.innerHTML += commentsTemplate(i);
  }
}

function addComments() {
  let inputContent = document.getElementById("comment-input");
  let inputContentValue = inputContent.value;

  imageArray[currentIndex].comments.push({ name: "Username", comment: inputContentValue });

  inputContent.value = "";
  renderComments();
}

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

function onBackdropClick(event) {
  const closeDialogOutside = document.getElementById("image-dialog");

  if (event.target === closeDialogOutside) {
    closeDialogOutside.close();
  }
}

function init() {
  renderImgs();
  document.getElementById("photo-grid").addEventListener("click", renderDialog);
  document.getElementById("dialog-back").addEventListener("click", () => changeDialog(-1));
  document.getElementById("dialog-next").addEventListener("click", () => changeDialog(1));
  document.getElementById("image-dialog").addEventListener("click", onBackdropClick);
}

init();
