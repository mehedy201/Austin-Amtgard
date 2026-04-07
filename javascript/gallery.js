const images = document.querySelectorAll(".gallery_img"),
  lightbox = document.getElementById("lightbox"),
  lightboxImg = document.querySelector(".lightbox_img"),
  closeBtn = document.querySelector(".close"),
  prevBtn = document.querySelector(".prev"),
  nextBtn = document.querySelector(".next");

let currentIndex = 0;

/* Open Lightbox */
images.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    lightboxImg.src = images[currentIndex].src;
    lightbox.classList.add("show");
  });
});

/* Fade Image */
function showImage() {
  lightboxImg.classList.add("fade-out");
  setTimeout(() => {
    lightboxImg.src = images[currentIndex].src;
    lightboxImg.classList.remove("fade-out");
  }, 200);
}

function closeLightbox() {
  lightbox.classList.remove("show");
  lightbox.classList.add("hide");
  /* remove hide class after animation */
  setTimeout(() => {
    lightbox.classList.remove("hide");
  }, 300);
}

closeBtn.addEventListener("click", closeLightbox);

/* Next */
nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex >= images.length) currentIndex = 0;
  showImage();
});

/* Prev */
prevBtn.addEventListener("click", () => {
  currentIndex--;
  if (currentIndex < 0) currentIndex = images.length - 1;
  showImage();
});

/* Keyboard */
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("show")) return;
  if (e.key === "ArrowRight") nextBtn.click();
  if (e.key === "ArrowLeft") prevBtn.click();
  if (e.key === "Escape") closeLightbox();
});

/* Outside Click Close */
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
