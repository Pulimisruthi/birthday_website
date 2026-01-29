const slides = document.querySelectorAll(".slide");
let currentSlide = 0;
const duration = 2500; // 3 seconds

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

// show first slide
showSlide(currentSlide);

setInterval(() => {
  currentSlide++;

  if (currentSlide < slides.length) {
    showSlide(currentSlide);
  }
}, duration);

// redirect button
function goToLogin() {
  window.location.href = "login.html";
}
