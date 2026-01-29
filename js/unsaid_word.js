const text =
"Some feelings stay unspoken...\nNot because they are small, but because they are deep.";

let index = 0;
const speed = 45;
const typeEl = document.getElementById("typewriter");

function typeWriter() {
  if (index < text.length) {
    typeEl.innerHTML +=
      text.charAt(index) === "\n" ? "<br>" : text.charAt(index);
    index++;
    setTimeout(typeWriter, speed);
  }
}

typeWriter();
function revealMessage() {
  const hiddenMessage = document.getElementById("hiddenMessage");
  const btn = document.getElementById("revealBtn");

  const isVisible = hiddenMessage.style.display === "block";

  if (isVisible) {
    // HIDE
    hiddenMessage.style.display = "none";
    btn.innerHTML = "Tap to reveal more ✨";

    // optional: scroll back slightly for better UX
    card.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    // SHOW
    hiddenMessage.style.display = "block";
    btn.innerHTML = "Hide the words 🤍";
  }
}

const card = document.getElementById("card");
const heart = document.getElementById("scrollHeart");

// FIXED HEART SCROLL LOGIC (NO INITIAL JUMP)
card.addEventListener("scroll", () => {
  const scrollTop = card.scrollTop;
  const maxScroll = card.scrollHeight - card.clientHeight;

  if (maxScroll <= 0) return;

  const progress = scrollTop / maxScroll;

  const heartHeight = heart.offsetHeight;

  // Real visible scroll area inside the card
  const topLimit = 0;
  const bottomLimit = card.clientHeight - heartHeight;

  const translateY = progress * (bottomLimit - topLimit);

  heart.style.transform = `translateY(${translateY}px)`;
});





