document.addEventListener("DOMContentLoaded", () => {
  const bgMusic = document.getElementById("bgMusic");
  const carousel = document.querySelector(".carousel");
  const shouldPlay = localStorage.getItem("playMusic");

  let userStartedMusic = false;

  if (shouldPlay === "true") {
    setTimeout(() => {
      alert("Tap OK to start the music ❤️");

      bgMusic.play().then(() => {
        userStartedMusic = true;
        bgMusic.loop = true;
        localStorage.removeItem("playMusic");
        setupObserver();
      }).catch(err => console.log("Blocked:", err));
    }, 500);
  }

  function setupObserver() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!userStartedMusic) return;

        if (entry.isIntersecting) {
          bgMusic.play().catch(() => {});
        } else {
          bgMusic.pause();
        }
      });
    }, { threshold: 0.5 });

    observer.observe(carousel);
  }
});

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");


const images = [
  {
    desktopSrc: "assets/images/rakhi.jpeg",
    mobileSrc: "assets/images/rakhi(2).jpeg",
    text: "A small thread… holding a lifetime of love,where i can forward that day through out my life ❤️",
    desktopPos: "center 25%",
    mobilePos: "55% center"
  },
  {
    desktopSrc: "assets/images/tomandjerry_pic.jpeg",
    mobileSrc: "assets/images/tomandjerry_pic.jpeg",
    text: "You are my tom & i am your jerry,i don't like fighting with you but that is the thing I do the most 😂😂",
    desktopPos: "center 65%",
    mobilePos: "center"
  },
  {
    desktopSrc: "assets/images/anna_birthday.jpeg",
    mobileSrc: "assets/images/anna_birthday.jpeg",
    text: "Some bonds very special like ours,fights and misunderstands may increase gap btw each other but doesnot decrease the love ❤️🤍",
    desktopPos: "center 35%",
    mobilePos: "45% center"
  },
  {
    desktopSrc: "assets/images/naa_birthday.png",
    mobileSrc: "assets/images/naa_birthday.png",
    text: "Where my memories began — with you and one of the best birthday for me 💛❤️",
    desktopPos: "center",
    mobilePos: "50% center"
  },
  {
    desktopSrc: "assets/images/selfie(2).jpeg",
    mobileSrc: "assets/images/first_selfie.jpeg",
    text: "Our selfie,Captured together, forever.Not perfect, but perfectly ours.❤️✨✨",
    desktopPos: "100% center",
    mobilePos: "30% top"
  }
];

let index = 0;
const imageEl = document.getElementById("carouselImage");
const captionEl = document.getElementById("captionText");

function isMobile() {
  return window.innerWidth <= 768;
}

// Preload all images (prevents blank flashes)
images.forEach(img => {
  const d = new Image();
  d.src = img.desktopSrc;
  const m = new Image();
  m.src = img.mobileSrc;
});

function showImage() {
  const mobile = isMobile();
  const current = images[index];
  const newSrc = mobile ? current.mobileSrc : current.desktopSrc;

  imageEl.style.opacity = 0;
  captionEl.classList.remove("show");

  setTimeout(() => {
    imageEl.src = newSrc;
    imageEl.style.objectFit = "cover";
    imageEl.style.objectPosition = mobile
      ? current.mobilePos
      : current.desktopPos;

    captionEl.textContent = current.text;

    imageEl.style.opacity = 1;
    captionEl.classList.add("show");
  }, 500);
}

function nextImage() {
  index = (index + 1) % images.length;
  showImage();
}

showImage();
setInterval(nextImage, 7000);
///caroudsal buttons
window.addEventListener("resize", showImage);
if (nextBtn && prevBtn) {
  nextBtn.addEventListener("click", () => {
    index = (index + 1) % images.length;
    showImage();
  });

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + images.length) % images.length;
    showImage();
  });
}

function openPage(page) {
  window.location.href = page;
}
const blocks = document.querySelectorAll(".memory-card-vertical");
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

blocks.forEach(b => revealObserver.observe(b));
const PASSWORD = "thammudu"; 
const targetPage = "unsaid_words.html"; // The page to open

function handleLockedCard(card) {
  console.log("Opening Modal... ✅");
  // Show the custom modal instead of a prompt
  document.getElementById("passwordModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("passwordModal").style.display = "none";
  document.getElementById("passwordInput").value = "";
}

function unlockCard() {
  const input = document.getElementById("passwordInput").value;

  if (input === PASSWORD) {
    alert("Correct password 🎉");
    window.location.href = targetPage;
  } else {
    // Error feedback
    alert("Wrong password ❌ Try again, heart!");
    document.getElementById("passwordInput").value = "";
    document.getElementById("passwordInput").focus();
  }
}

// Optional: Allow "Enter" key to submit password
document.getElementById("passwordInput")?.addEventListener("keypress", (e) => {
  if (e.key === "Enter") unlockCard();
});




