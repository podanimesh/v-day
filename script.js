/* ---------- Background Hearts (behind everything) ---------- */
const heartsLayer = document.createElement("div");
heartsLayer.id = "hearts";
document.body.appendChild(heartsLayer);

function spawnHeart(){
  const h = document.createElement("div");
  h.className = "heart";

  const left = Math.random() * 100;
  const size = 10 + Math.random() * 18;
  const dur = 5 + Math.random() * 5;
  const delay = Math.random() * 0.4;

  h.style.left = left + "vw";
  h.style.width = size + "px";
  h.style.height = size + "px";
  h.style.animationDuration = dur + "s";
  h.style.animationDelay = delay + "s";
  h.style.opacity = (0.5 + Math.random() * 0.45).toFixed(2);

  heartsLayer.appendChild(h);
  setTimeout(() => h.remove(), (dur + delay) * 1000);
}
setInterval(spawnHeart, 220);

/* ---------- Screens ---------- */
const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");
const screen3 = document.getElementById("screen3");

const envelope = document.getElementById("envelope");
const teaseText = document.getElementById("teaseText");
const teaseSub = document.getElementById("teaseSub");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const result = document.getElementById("result");
const music = document.getElementById("bgMusic");

function goTo(from, to){
  from.classList.remove("active");
  to.classList.add("active");

  if (to === screen3) {
    // place buttons after layout is actually visible
    setTimeout(() => placeNoNearYes(), 50);
  }
}

/* ---------- Teasing Lines (slower so it doesn't feel like a video) ---------- */
const lines = [
  "Hi Babeee 😘",
  "Today I will not irritate you…",
  "Okay small irritation only 😌",
  "Bhonda",
  "But only I am allowed to say that 😤",
  "Maaar Padingla incoming...",
  "Wait wait not that type 😆",
  "Serious now...",
  "I love you ❤️"
];

let idx = 0;
let teasingTimer = null;

function startTeasing(){
  if (teasingTimer) return;

  idx = 0;
  teaseText.textContent = lines[idx];
  if (teaseSub) teaseSub.textContent = " ";

  teasingTimer = setInterval(() => {
    idx++;

    if (idx < lines.length) {
      teaseText.textContent = lines[idx];
    } else {
      clearInterval(teasingTimer);
      teasingTimer = null;

      // Pause before the proposal screen (so buttons don't feel abrupt)
      setTimeout(() => {
        goTo(screen2, screen3);
      }, 1800);
    }
  }, 2300);
}

/* ---------- iPhone Audio Unlock (Tap Envelope) ---------- */
function openLetter(){
  envelope.classList.add("open");

  music.currentTime = 0;
  music.play().catch(() => {});

  setTimeout(() => {
    goTo(screen1, screen2);
    startTeasing();
  }, 850);
}

envelope.addEventListener("click", openLetter);
envelope.addEventListener("touchstart", openLetter, { passive: true });

/* ---------- NO Button Placement & Escape ---------- */
function placeNoNearYes(){
  const yesRect = yesBtn.getBoundingClientRect();
  if (!yesRect.width || !yesRect.height) {
    setTimeout(placeNoNearYes, 120);
    return;
  }

  const x = Math.min(window.innerWidth - 160, Math.max(12, yesRect.right + 12));
  const y = Math.min(window.innerHeight - 110, Math.max(12, yesRect.top));
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
  noBtn.style.visibility = "visible";
}

function moveNo(){
  const pad = 12;
  const x = pad + Math.random() * (window.innerWidth - 180 - pad);
  const y = pad + Math.random() * (window.innerHeight - 130 - pad);
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
}

noBtn.addEventListener("mouseover", moveNo);
noBtn.addEventListener("touchstart", (e) => { e.preventDefault(); moveNo(); }, { passive: false });

window.addEventListener("resize", () => {
  if (screen3.classList.contains("active")) placeNoNearYes();
});

/* ---------- Confetti (no libraries) ---------- */
function confettiBurst(){
  const n = 110;
  for (let i = 0; i < n; i++) {
    const s = document.createElement("div");
    s.style.position = "fixed";
    s.style.left = (window.innerWidth / 2) + "px";
    s.style.top = (window.innerHeight / 2) + "px";
    s.style.width = (6 + Math.random() * 6) + "px";
    s.style.height = (8 + Math.random() * 10) + "px";
    s.style.borderRadius = "3px";
    s.style.background = "rgba(255,255,255," + (0.55 + Math.random() * 0.4) + ")";
    s.style.pointerEvents = "none";
    s.style.boxShadow = "0 12px 24px rgba(0,0,0,0.18)";
    s.style.zIndex = "100";
    document.body.appendChild(s);

    const angle = Math.random() * Math.PI * 2;
    const dist = 140 + Math.random() * 260;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;

    s.animate(
      [
        { transform: `translate(0,0) rotate(0deg)`, opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
      ],
      { duration: 1200 + Math.random() * 900, easing: "cubic-bezier(.2,.7,.2,1)" }
    );

    setTimeout(() => s.remove(), 2200);
  }
}

/* ---------- YES Result ---------- */
yesBtn.addEventListener("click", () => {
  confettiBurst();
  if (navigator.vibrate) navigator.vibrate([200,100,200,100,400]);

  result.innerHTML = `
    ❤️ Hehehe I knew it ❤️ <br><br>
    From today officially you are stuck with me forever.<br>
    Unlimited love.<br>
    Unlimited hugs.<br>
    And occasional...<br><br>
    <b>Maaar Padingla 😌</b>
  `;
});
