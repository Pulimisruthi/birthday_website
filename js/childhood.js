const cards = document.querySelectorAll(".memory-card");

cards.forEach(card => {
  card.addEventListener("click", () => {

    // Fade cards
    if (card.classList.contains("fade-card")) {
      card.classList.toggle("active");
      return;
    }

    // Flip cards
    if (card.classList.contains("flip-card")) {
      const text = card.querySelector(".card-back p");

      // reset typing
      text.style.animation = "none";
      text.offsetHeight; // force reflow
      text.style.animation = null;

      card.classList.toggle("flipped");
    }
  });
});
