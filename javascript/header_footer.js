// Menu Active Class add JS 
const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".desktop_menu ul li a").forEach(link => {
  let linkPage = link.getAttribute("href").split("/").pop();

  // normalize (handle trailing slash)
  if (linkPage === "") linkPage = "index.html";

  if (currentPage === linkPage) {
    link.parentElement.classList.add("active");
  }
});


// Responsive Menu JS 
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile_menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});

/* Optional: click menu item = close menu */
document.querySelectorAll(".mobile_menu li").forEach(item => {
  item.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
  });
});