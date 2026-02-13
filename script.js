// --- Helpers ---
function $(id) { return document.getElementById(id); }
function rand(min, max) { return Math.random() * (max - min) + min; }

// --- Hearts background ---
const heartsWrap = document.querySelector(".hearts");

function spawnHearts(count = 18) {
  for (let i = 0; i < count; i++) {
    const h = document.createElement("div");
    h.className = "heart";
    h.style.left = `${Math.floor(rand(0, 100))}%`;
    h.style.animationDuration = `${rand(7, 14).toFixed(2)}s`;
    h.style.animationDelay = `${rand(0, 6).toFixed(2)}s`;
    h.style.opacity = `${rand(0.10, 0.22).toFixed(2)}`;
    const size = rand(10, 18);
    h.style.width = `${size}px`;
    h.style.height = `${size}px`;
    h.style.background = `rgba(255, ${Math.floor(rand(70,140))}, ${Math.floor(rand(160,220))}, 0.9)`;
    heartsWrap.appendChild(h);
  }
}
spawnHearts(22);

// --- Screens ---
const landing = $("screen-landing");
const main = $("screen-main");
const enterBtn = $("enterBtn");

const bgm = $("bgm");
const muteBtn = $("muteBtn");

function showMain() {
  landing.classList.remove("active");
  main.classList.add("active");
}

async function playMusic() {
  try {
    await bgm.play();
    muteBtn.textContent = "🔊";
  } catch (e) {
    // If browser blocks it (shouldn't after click), ignore gracefully.
    muteBtn.textContent = "🔇";
  }
}

enterBtn.addEventListener("click", async () => {
  showMain();
  await playMusic();
});

// Mute toggle
muteBtn.addEventListener("click", async () => {
  if (bgm.paused) {
    await playMusic();
  } else {
    bgm.pause();
    muteBtn.textContent = "🔇";
  }
});

// Scroll hint button (landing)
const scrollBtn = $("scrollBtn");
if (scrollBtn) {
  scrollBtn.addEventListener("click", () => {
    // when on main, scroll is not needed; keep as cute interaction
    $("status").textContent = "Okay okay… continue 😌";
  });
}

// --- Valentine question logic ---
const arena = $("arena");
const yesBtn = $("yesBtn");
const noBtn = $("noBtn");
const status = $("status");
const celebrate = $("celebrate");

let noAttempts = 0;

const funnyLines = [
  "Nice try 😏",
  "No button says: *absolutely not* 💨",
  "Hahahaha nope 😌",
  "You can’t break my heart (literally) 💔",
  "The universe said YES 🌌",
  "Try again… but like… don’t 😄"
];

function moveNoButton() {
  // Keep within the arena bounds
  const rect = arena.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const padding = 12;
  const maxX = rect.width - btnRect.width - padding;
  const maxY = rect.height - btnRect.height - padding;

  const x = rand(padding, Math.max(padding, maxX));
  const y = rand(padding, Math.max(padding, maxY));

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.right = "auto";
  noBtn.style.transform = "none";
}

function updateStatusForNo() {
  noAttempts++;
  const line = funnyLines[Math.min(funnyLines.length - 1, noAttempts - 1)];
  status.textContent = line;

  // Make it progressively harder
  const scale = Math.max(0.82, 1 - noAttempts * 0.03);
  noBtn.style.transform = `scale(${scale})`;
}

// Run away on hover AND click (mobile tap)
noBtn.addEventListener("mouseenter", () => {
  moveNoButton();
  updateStatusForNo();
});
noBtn.addEventListener("click", () => {
  moveNoButton();
  updateStatusForNo();
});

// YES = celebration + more hearts burst
yesBtn.addEventListener("click", () => {
  status.textContent = "Correct answer ✅";
  celebrate.hidden = false;

  // Quick heart “burst”
  for (let i = 0; i < 14; i++) {
    const h = document.createElement("div");
    h.className = "heart";
    h.style.left = `${Math.floor(rand(0, 100))}%`;
    h.style.animationDuration = `${rand(4.5, 7).toFixed(2)}s`;
    h.style.animationDelay = `${rand(0, 0.8).toFixed(2)}s`;
    h.style.opacity = `${rand(0.18, 0.30).toFixed(2)}`;
    const size = rand(12, 22);
    h.style.width = `${size}px`;
    h.style.height = `${size}px`;
    heartsWrap.appendChild(h);
  }

  // Remove the NO button so it can’t be “reconsidered”
  noBtn.style.display = "none";
});
