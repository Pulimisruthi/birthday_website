document.addEventListener("DOMContentLoaded", () => {
  const text = "Welcome raa Annayya ❤️ to know more ...";
  const el = document.getElementById("welcomeText");
  const arrow = document.getElementById("arrow");
  let i = 0;

  function typeText() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(typeText, 60);
    } else {
      arrow.style.opacity = "1";
      arrow.style.pointerEvents = "auto";
    }
  }

  typeText();

  // 👉 When arrow clicked
  arrow.addEventListener("click", () => {
    localStorage.setItem("playMusic", "true"); // set flag
    window.location.href = "memories.html";
  });
});
