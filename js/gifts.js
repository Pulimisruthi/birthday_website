document.addEventListener("DOMContentLoaded", () => {

  const gifts = document.querySelectorAll('.gift-item');

  // Show first 2 cards immediately
  gifts.forEach((gift, index) => {
    if (index < 2) {
      gift.classList.add('show');
    }
  });

  const revealOnScroll = () => {
    gifts.forEach((gift, index) => {
      if (index < 2) return;

      const top = gift.getBoundingClientRect().top;
      if (top < window.innerHeight - 120) {
        gift.classList.add('show');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();
});
