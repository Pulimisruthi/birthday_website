const giftRows = document.querySelectorAll(".gift-row");
const tapBox = document.getElementById("tapBox");
const giftsContainer = document.getElementById("giftsContainer");

// assign left / right animation
giftRows.forEach((row, index) => {
  if (index % 2 === 0) {
    row.classList.add("from-left");
  } else {
    row.classList.add("from-right");
  }
});

let revealed = false;

tapBox.addEventListener("click", () => {
  if (revealed) return;

  revealed = true;
  giftsContainer.style.display = "flex";

  giftRows.forEach((row, index) => {
    setTimeout(() => {
      row.classList.add("show");
    }, index * 1000);
  });
});
