/* ---------- Background Hearts ---------- */
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

/* ---------- Elements ---------- */
const screen1 = document.getElementById("screen1");
const screen3 = document.getElementById("screen3");

const envelope = document.getElementById("envelope");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const result = document.getElementById("result");
const music = document.getElementById("bgMusic");

/* ---------- Teasing lines shown when she tries NO ---------- */
const noLines = [
  "Hi Babeee 😘",
  "Acha NO? 😌",
  "Today I will not irritate you…",
  "Okay small irritation only 😌",
  "Sometimes you act Bhonda",
  "But only I am allowed to say that 😤",
  "Maaar Padingla incoming...",
  "Wait wait not that type 😆",
  "Okay okay… serious now...",
  "Just press YES ❤️"
];

let noIndex = -1;

/* ---------- Screen transition ---------- */
function goToProposal(){
  screen1.classList.remove("active");
  screen3.classList.add("active");

  // place NO nicely near YES after layout is visible
  setTimeout(placeNoNearYes, 60);
}

/* ---------- iPhone Audio Unlock ---------- */
function openLetter(){
  envelope.classList.add("open");

  music.currentTime = 0;
  music.play().catch(()=>{});

  setTimeout(goToProposal, 850);
}
envelope.addEventListener("click", openLetter);
envelope.addEventListener("touchstart", openLetter, { passive:true });

/* ---------- NO Button Placement & Escape ---------- */
function placeNoNearYes(){
  const yesRect = yesBtn.getBoundingClientRect();
  if (!yesRect.width) {
    setTimeout(placeNoNearYes, 120);
    return;
  }

  const area = getSafeArea();

  let x = yesRect.right + 10;
  let y = yesRect.top;

  if (x > area.maxX) x = area.maxX;
  if (y > area.maxY) y = area.maxY;
  if (y < area.minY) y = area.minY;

  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
  noBtn.style.visibility = "visible";
}


function getSafeArea() {
  const safeTop = 20;                     // notch buffer
  const safeBottom = 90;                  // home bar buffer
  const safeSide = 16;

  const width = document.documentElement.clientWidth;
  const height = window.visualViewport
    ? window.visualViewport.height
    : window.innerHeight;

  return {
    minX: safeSide,
    maxX: width - 150 - safeSide,
    minY: safeTop,
    maxY: height - 120 - safeBottom
  };
}

function moveNo(){
  const area = getSafeArea();

  const x = area.minX + Math.random() * (area.maxX - area.minX);
  const y = area.minY + Math.random() * (area.maxY - area.minY);

  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
}


/* When she tries clicking NO: run away + show next line */
function handleNoAttempt(e){
  if (e) e.preventDefault();

  moveNo();

  noIndex++;
  if (noIndex >= noLines.length) noIndex = noLines.length - 1; // stick to last line

  result.innerHTML = `<div style="margin-top:8px;">${noLines[noIndex]}</div>`;
}

/* desktop + mobile */
noBtn.addEventListener("mouseover", moveNo);
noBtn.addEventListener("click", handleNoAttempt);
noBtn.addEventListener("touchstart", handleNoAttempt, { passive:false });

window.addEventListener("resize", () => {
  if (screen3.classList.contains("active")) placeNoNearYes();
});

/* ---------- Confetti ---------- */
function confettiBurst(){
  const n = 110;
  for (let i = 0; i < n; i++) {
    const s = document.createElement("div");
    s.style.position="fixed";
    s.style.left=(window.innerWidth/2)+"px";
    s.style.top=(window.innerHeight/2)+"px";
    s.style.width=(6+Math.random()*6)+"px";
    s.style.height=(8+Math.random()*10)+"px";
    s.style.borderRadius="3px";
    s.style.background="rgba(255,255,255,"+(0.55+Math.random()*0.4)+")";
    s.style.pointerEvents="none";
    s.style.boxShadow="0 12px 24px rgba(0,0,0,0.18)";
    s.style.zIndex="100";
    document.body.appendChild(s);

    const angle = Math.random() * Math.PI * 2;
    const dist = 140 + Math.random() * 260;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;

    s.animate(
      [
        { transform:`translate(0,0) rotate(0deg)`, opacity:1 },
        { transform:`translate(${dx}px, ${dy}px) rotate(${Math.random()*720}deg)`, opacity:0 }
      ],
      { duration: 1200 + Math.random()*900, easing:"cubic-bezier(.2,.7,.2,1)" }
    );

    setTimeout(()=> s.remove(), 2200);
  }
}

/* ---------- YES ---------- */
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
