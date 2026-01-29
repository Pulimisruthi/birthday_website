const revealBtn = document.getElementById("revealBtn");
const memoryCard = document.getElementById("memoryCard");

revealBtn.addEventListener("click", () => {
  revealBtn.style.display = "none";

  memoryCard.classList.remove("hidden");

  // slight delay for emotional pacing
  setTimeout(() => {
    memoryCard.classList.add("show");
  }, 200);
});
