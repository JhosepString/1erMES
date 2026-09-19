/**
 * Playlist del mes 1 — Potona hermosa
 * Fotos: pon archivos en /photos y actualiza el campo `photo` de cada track.
 * Spotify: sí se reproduce dentro de la página vía embed oficial.
 */

const TRACKS = [
  {
    id: "piscanos",
    title: "Piscanos",
    artist: "Bipoxx",
    spotifyId: "59vvflqI2iomDwSwBGkazU",
    mood: "#e8918a",
    note: "La primera canción que compartimos más, y mis piscanos mi amor?, ojalá algún día Y.Y",
    photo: "photos/piscanos.png",
    cover:
      "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e026cae813cc7d69cf57aa58334",
  },
  {
    id: "corazon",
    title: "<3",
    artist: "Jean Paul Medroa",
    spotifyId: "2LQnAJYY3rBCIdBYdJhNSC",
    mood: "#d9b98c",
    note: "Lo que sentía por ti, esta canción representa lo que siempre quise decirte y no me atreví, pero lo hice y me encanta el resultado.",
    photo: "photos/corazon.png",
    cover:
      "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e029ef135820f2a23549ae5365a",
  },
  {
    id: "enigmatica",
    title: "Enigmática",
    artist: "Maldito Antisocial",
    spotifyId: "4kltjY5a3uCVw3W1Cd8T1B",
    mood: "#c45c5c",
    note: "Esta cancioncita, es too lo que siento por ti, eres una chica muy enigmática mi amor kasjfaj, me atraes mucho y siempre lo hiciste.",
    photo: "photos/enigmatica.png",
    cover:
      "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e025877123ed799c6d850c925d0",
  },
  {
    id: "enamorado",
    title: "Enamorado",
    artist: "Jean Paul Medroa",
    spotifyId: "2fDnKfgskKWW0VsDEjJBR4",
    mood: "#e8c4b8",
    note: "Enamorado es lo que estoy de ti mi amor, siempre lo he estado y siempre lo estaré. Me encantas mucho mi potona hermosa",
    photo: "photos/enamorado.png",
    objectPosition: "center 3%",
    cover:
      "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02a102aaba287a05a05d64b80b",
  },
  {
    id: "diferencia",
    title: "La diferencia",
    artist: "Enjambre",
    spotifyId: "5aJMHnC4f7OhXC4MQ6I9kU",
    mood: "#f0d6c0",
    note: "Tú eres la diferencia mi amor, eres lo que siempre soñé, te quiero para toa la vida, hasta llegar al altar contigo mi amor, okei?",
    photo: "photos/ladiferencia.png",
    cover:
      "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e028223065ca8da974cbebba101",
  },
];

const UNLOCK_AT = 3;
const HEART_TARGET = 7;

const state = {
  heard: new Set(JSON.parse(localStorage.getItem("mes1-heard") || "[]")),
  activeId: null,
  hearts: 0,
};

const els = {
  list: document.getElementById("track-list"),
  now: document.getElementById("now-playing"),
  cover: document.getElementById("track-cover"),
  title: document.getElementById("track-title"),
  artist: document.getElementById("track-artist"),
  note: document.getElementById("track-note"),
  embed: document.getElementById("spotify-embed"),
  heardCount: document.getElementById("heard-count"),
  totalCount: document.getElementById("total-count"),
  progressFill: document.getElementById("progress-fill"),
  progressBar: document.getElementById("progress-bar"),
  finaleLock: document.getElementById("finale-lock"),
  finaleOpen: document.getElementById("finale-open"),
  heartBtn: document.getElementById("heart-btn"),
  easterMsg: document.getElementById("easter-msg"),
};

els.totalCount.textContent = String(TRACKS.length);

function persistHeard() {
  localStorage.setItem("mes1-heard", JSON.stringify([...state.heard]));
}

function updateProgress() {
  const n = state.heard.size;
  els.heardCount.textContent = String(n);
  const pct = (n / TRACKS.length) * 100;
  els.progressFill.style.width = `${pct}%`;
  els.progressBar.setAttribute("aria-valuenow", String(n));

  document.querySelectorAll(".track").forEach((btn) => {
    btn.classList.toggle("is-heard", state.heard.has(btn.dataset.id));
    btn.classList.toggle("is-active", btn.dataset.id === state.activeId);
  });

  if (n >= UNLOCK_AT) {
    els.finaleLock.hidden = true;
    els.finaleOpen.hidden = false;
    els.finaleOpen.classList.add("is-unlocked");
  }
}

function markHeard(id) {
  state.heard.add(id);
  persistHeard();
  updateProgress();
}

function renderCover(track) {
  els.cover.innerHTML = "";
  const src = track.photo || track.cover;
  if (src) {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Portada de ${track.title}`;
    img.loading = "lazy";
    if (track.objectPosition) {
      img.style.objectPosition = track.objectPosition;
    }
    els.cover.appendChild(img);
    els.cover.dataset.photo = track.photo ? "custom" : "spotify";
  } else {
    const span = document.createElement("span");
    span.className = "cover-placeholder";
    span.textContent = "Foto pronto";
    els.cover.appendChild(span);
    els.cover.dataset.photo = "pending";
  }
}

function selectTrack(track) {
  state.activeId = track.id;
  markHeard(track.id);

  els.now.dataset.state = "active";
  els.now.classList.add("is-playing");
  document.getElementById("player-idle").hidden = true;
  document.getElementById("player-active").hidden = false;

  els.title.textContent = track.title;
  els.artist.textContent = track.artist;
  els.note.textContent = track.note;
  renderCover(track);

  els.embed.src = `https://open.spotify.com/embed/track/${track.spotifyId}?utm_source=generator&theme=0`;

  updateProgress();

  if (window.matchMedia("(max-width: 899px)").matches) {
    els.now.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

function buildList() {
  const frag = document.createDocumentFragment();

  TRACKS.forEach((track, index) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "track";
    btn.dataset.id = track.id;
    btn.setAttribute("aria-pressed", "false");
    btn.innerHTML = `
      <span class="track-num">${String(index + 1).padStart(2, "0")}</span>
      <span class="track-info">
        <strong>${track.title}</strong>
        <span>${track.artist}</span>
      </span>
      <span class="track-mood" style="background:${track.mood}" aria-hidden="true"></span>
    `;
    btn.addEventListener("click", () => {
      document.querySelectorAll(".track").forEach((b) => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
      selectTrack(track);
    });
    li.appendChild(btn);
    frag.appendChild(li);
  });

  els.list.appendChild(frag);
}

els.heartBtn.addEventListener("click", () => {
  state.hearts += 1;
  els.heartBtn.classList.remove("is-pop");
  void els.heartBtn.offsetWidth;
  els.heartBtn.classList.add("is-pop");
  els.heartBtn.textContent = state.hearts % 2 === 0 ? "♡" : "♥";

  if (state.hearts === 6) {
    els.easterMsg.textContent = "SIX. Mi amor, te amo mucho, demasiado, quiero que seas tú para toda la vida.";
    els.easterMsg.hidden = false;
    return;
  }

  if (state.hearts === 7) {
    els.easterMsg.textContent = "SEVEN. Son los saludos actuales que tenemos mi amor JASFKAJFSA, que bella mi potona hermosa.";
    els.easterMsg.hidden = false;
    return;
  }

  if (state.hearts === 8) {
    els.easterMsg.textContent = "676767676767. ERES EL SIX DE MI SEVEN MI AMOR, ERES EL BOSQUE DE MI SLENDERMAN JAJSFAFAJSFAJS, TE AMO MI AMOR";
    els.easterMsg.hidden = false;
    return;
  }

  if (state.hearts > 8) {
    els.easterMsg.textContent = "676767676767. ERES EL SIX DE MI SEVEN MI AMOR, ERES EL BOSQUE DE MI SLENDERMAN JAJSFAFAJSFAJS, TE AMO MI AMOR";
    els.easterMsg.hidden = false;
  }
});

buildList();
updateProgress();
