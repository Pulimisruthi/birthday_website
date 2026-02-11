const errorText = document.getElementById("errorToast");

const backgrounds = [
  { img: "assets/images/pink_red.png", desktop: "35% 45%", mobile: "50% 60%" },
  { img: "assets/images/blue_dress.png", desktop: "35% 60%", mobile: "50% 80%" },
  { img: "assets/images/pink_dress.png", desktop: "50% 40%", mobile: "60% 40%" },
  { img: "assets/images/red_dress.png", desktop: "50% 30%", mobile: "50% 40%" },
  { img: "assets/images/pink_dress(2).png", desktop: "50% 30%", mobile: "center" }
];

const correctAnswers = {
  0: "reddy",
  1: "30-01-2026",
  2: "my birthday",
  username: "koteswara reddy",
  password: "annayya"
};

function playSound(type = "click") {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  if (type === "error") osc.frequency.value = 180;
  else if (type === "success") osc.frequency.value = 600;
  else osc.frequency.value = 350;

  osc.type = "sine";
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  osc.start();
  osc.stop(ctx.currentTime + 0.15);
}

let bgIndex = 0;
let step = 0;

const questions = [
  { text: "What’s your nickname? 💫", placeholder: "Type it here...", hint: "Hint: Something fun & crazy 🤪" },
  { text: "What’s your birthday date? 📅", placeholder: "Ex: 01-01-2026", hint: "" },
  { text: "What makes previous day special? ✨", placeholder: "Just 2 words", hint: "" },
  { text: "Too many questions, right? 😜 Let’s login now!", placeholder: "", hint: "" }
];

const hintText = document.getElementById("hintText");
const questionText = document.getElementById("questionText");
const inputArea = document.getElementById("inputArea");
const answerInput = document.getElementById("answerInput");
const submitBtn = document.getElementById("submitBtn");
const cardTitle = document.getElementById("cardTitle");
const progressBar = document.getElementById("progressBar");

function applyBackground() {
  const bg = backgrounds[bgIndex];
  const isMobile = window.innerWidth <= 768;
  document.body.style.backgroundImage = `url('${bg.img}')`;
  document.body.style.backgroundPosition = isMobile ? bg.mobile : bg.desktop;
}

window.addEventListener("DOMContentLoaded", () => {
  applyBackground();
  loadQuestion();
  window.addEventListener("resize", applyBackground);
});

function loadQuestion() {
  const q = questions[step];
  const card = document.querySelector(".card");

  card.classList.remove("animate");
  void card.offsetWidth;
  card.classList.add("animate");

  questionText.textContent = q.text;

  if (step === 0) {
    cardTitle.textContent = "Welcome 🎉";
    cardTitle.style.display = "block";
  } else {
    cardTitle.style.display = "none";
  }

  if (q.placeholder) {
    answerInput.style.display = "block";
    answerInput.placeholder = q.placeholder;
    answerInput.value = "";
  } else {
    answerInput.style.display = "none";
  }

  if (q.hint) {
    hintText.textContent = q.hint;
    hintText.style.display = "block";
  } else {
    hintText.style.display = "none";
  }

submitBtn.textContent = step === questions.length - 1 ? "Let's go 🚀" : "Submit";
  updateProgress();
}

submitBtn.addEventListener("click", validateStep);

answerInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") validateStep();
});

function validateStep() {
  playSound("click");

  if (step < questions.length - 1) {
    const userValue = answerInput.value.trim().toLowerCase();
    const correctValue = correctAnswers[step].toLowerCase();
    if (userValue.length === 0) {
        showError("This field is required ❤️");
        return;
    }
    if (userValue !== correctValue) {
        showError(`Wrong answer 😜 Try again!`);
        return;
    }
    showSuccessEffect();
    bgIndex = (bgIndex + 1) % (backgrounds.length - 1);
    applyBackground();
    step++;
    loadQuestion();
    return;
  }

  if (step === questions.length - 1) {
    bgIndex = backgrounds.length - 1;
    applyBackground();
    questionText.textContent = "Login to continue 🎁";
    hintText.style.display = "none";

    inputArea.innerHTML = `
      <input type="text" id="username" placeholder="Username" required>
      <input type="password" id="password" placeholder="Password" required>
    `;

    submitBtn.textContent = "Login";
    step++;
    updateProgress();
    return;
  }

  const username = document.getElementById("username").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim().toLowerCase();

  if (!username || !password) {
    showError("Username and password are required 🔒");
    return;
  }

  if (username !== correctAnswers.username || password !== correctAnswers.password) {
    showError("Wrong login credentials 😜");
    return;
  }
  showSuccessEffect();
  cinematicSuccess();
  setTimeout(() => {
    window.location.href = "welcome.html";
  }, 2000);
}

function showError(message) {
  errorText.textContent = message;
  errorText.classList.add("show");

  playSound("error");

  const card = document.querySelector(".card");
  card.classList.remove("success-glow");
  card.classList.add("shake", "error-glow");

  setTimeout(() => {
    card.classList.remove("shake", "error-glow");
    errorText.classList.remove("show");
  }, 1400);
}

function showSuccessEffect() {
  const card = document.querySelector(".card");
  playSound("success");
  card.classList.remove("shake", "error-glow");
  card.classList.add("success-glow");

  setTimeout(() => {
    card.classList.remove("success-glow");
  }, 700);
}

function updateProgress() {
  const totalSteps = questions.length; // 4
  let percent = (step / totalSteps) * 100;

  if (percent > 100) percent = 100;

  progressBar.style.width = `${percent}%`;
}
function cinematicSuccess() {
  const card = document.querySelector(".card");
  const flash = document.getElementById("flash");

  // Glow
  card.classList.add("success-glow");

  // Screen flash
  flash.style.display = "block";
  setTimeout(() => {
    flash.style.display = "none";
  }, 400);

  // Confetti
  confetti({
    particleCount: 200,
    spread: 80,
    origin: { y: 0.6 }
  });

  // Change text
  questionText.textContent = "Welcome back ❤️";
  hintText.style.display = "none";
  inputArea.style.display = "none";
  submitBtn.style.display = "none";

  // Zoom out effect
  setTimeout(() => {
    card.style.transform = "scale(1.1)";
    card.style.opacity = "0";
  }, 1200);
}

