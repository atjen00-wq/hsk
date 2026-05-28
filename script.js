// ------------------- DATABASE (HSK 1,2,3,4) -------------------
const hskData = {
  1: [
    { hanzi: "一", pinyin: "yī", meaning: "one", strokes: "1 stroke", strokeOrder: "Single horizontal line from left to right", customImg: "https://picsum.photos/id/116/200/140" },
    { hanzi: "二", pinyin: "èr", meaning: "two", strokes: "2 strokes", strokeOrder: "Upper horizontal, then lower horizontal", customImg: "https://picsum.photos/id/22/200/140" },
    { hanzi: "三", pinyin: "sān", meaning: "three", strokes: "3 strokes", strokeOrder: "Three horizontals: top, middle, bottom", customImg: "https://picsum.photos/id/26/200/140" },
    { hanzi: "人", pinyin: "rén", meaning: "person", strokes: "2 strokes", strokeOrder: "Left-falling then right-falling", customImg: "https://picsum.photos/id/169/200/140" },
    { hanzi: "口", pinyin: "kǒu", meaning: "mouth", strokes: "3 strokes", strokeOrder: "Vertical left, top+right, bottom horizontal", customImg: "https://picsum.photos/id/133/200/140" },
    { hanzi: "山", pinyin: "shān", meaning: "mountain", strokes: "3 strokes", strokeOrder: "Vertical, left vertical-right, bottom horizontal", customImg: "https://picsum.photos/id/104/200/140" }
  ],
  2: [
    { hanzi: "吃", pinyin: "chī", meaning: "to eat", strokes: "6 strokes", strokeOrder: "口 radical + 乞 (left to right)", customImg: "https://picsum.photos/id/108/200/140" },
    { hanzi: "喝", pinyin: "hē", meaning: "to drink", strokes: "12 strokes", strokeOrder: "口 + 曷, radical order", customImg: "https://picsum.photos/id/145/200/140" },
    { hanzi: "大", pinyin: "dà", meaning: "big", strokes: "3 strokes", strokeOrder: "Horizontal, left-falling, right-falling", customImg: "https://picsum.photos/id/155/200/140" },
    { hanzi: "小", pinyin: "xiǎo", meaning: "small", strokes: "3 strokes", strokeOrder: "Vertical hook, left dot, right dot", customImg: "https://picsum.photos/id/36/200/140" },
    { hanzi: "水", pinyin: "shuǐ", meaning: "water", strokes: "4 strokes", strokeOrder: "Central vertical + left/right strokes", customImg: "https://picsum.photos/id/143/200/140" }
  ],
  3: [
    { hanzi: "天气", pinyin: "tiān qì", meaning: "weather", strokes: "8 strokes", strokeOrder: "天 (4) + 气 (4) – radical order", customImg: "https://picsum.photos/id/58/200/140" },
    { hanzi: "电影", pinyin: "diàn yǐng", meaning: "movie", strokes: "10 strokes", strokeOrder: "电 (5) + 影 (5) – left to right", customImg: "https://picsum.photos/id/20/200/140" },
    { hanzi: "高兴", pinyin: "gāo xìng", meaning: "happy", strokes: "10 strokes", strokeOrder: "高 (6) + 兴 (4)", customImg: "https://picsum.photos/id/94/200/140" },
    { hanzi: "电脑", pinyin: "diàn nǎo", meaning: "computer", strokes: "13 strokes", strokeOrder: "电 + 脑 (月+凵)", customImg: "https://picsum.photos/id/0/200/140" },
    { hanzi: "老师", pinyin: "lǎo shī", meaning: "teacher", strokes: "11 strokes", strokeOrder: "老 (6) + 师 (5)", customImg: "https://picsum.photos/id/132/200/140" }
  ],
  4: [
    { hanzi: "保护", pinyin: "bǎo hù", meaning: "to protect", strokes: "15 strokes", strokeOrder: "保 (9) + 护 (6) – left to right", customImg: "https://picsum.photos/id/29/200/140" },
    { hanzi: "环境", pinyin: "huán jìng", meaning: "environment", strokes: "16 strokes", strokeOrder: "环 (8) + 境 (8)", customImg: "https://picsum.photos/id/96/200/140" },
    { hanzi: "发展", pinyin: "fā zhǎn", meaning: "development", strokes: "12 strokes", strokeOrder: "发 (5) + 展 (7)", customImg: "https://picsum.photos/id/48/200/140" }
  ]
};

// Helper: fallback image URL
function getImageUrl(wordObj) {
  let seed = 0;
  for(let i = 0; i < wordObj.hanzi.length; i++) seed += wordObj.hanzi.charCodeAt(i);
  const picId = (seed % 200) + 10;
  return `https://picsum.photos/id/${picId}/200/140`;
}

// Build card HTML
function buildCardHTML(wordObj) {
  const imageUrl = wordObj.customImg || getImageUrl(wordObj);
  return `
    <div class="chinese-card" data-hanzi="${wordObj.hanzi}">
      <div class="card-media">
        <img class="card-image" src="${imageUrl}" alt="visual for ${wordObj.meaning}" loading="lazy" 
             onerror="this.src='https://picsum.photos/id/1/200/140'">
        <div class="stroke-preview">✍️ ${wordObj.strokes}</div>
      </div>
      <div class="card-content">
        <div class="chinese-word">${wordObj.hanzi}</div>
        <div class="pinyin">${wordObj.pinyin}</div>
        <div class="meaning">${wordObj.meaning}</div>
        <div class="stroke-order">
          <span class="stroke-label">📐 stroke order:</span>
          <span class="stroke-list">${wordObj.strokeOrder}</span>
        </div>
        <div class="small-note">✨ tap to review stroke sequence</div>
      </div>
    </div>
  `;
}

// Toast notification system
const toast = document.createElement('div');
toast.style.position = 'fixed';
toast.style.bottom = '20px';
toast.style.left = '50%';
toast.style.transform = 'translateX(-50%)';
toast.style.backgroundColor = '#0f172a';
toast.style.color = '#f1f5f9';
toast.style.padding = '12px 24px';
toast.style.borderRadius = '60px';
toast.style.fontWeight = '500';
toast.style.zIndex = '999';
toast.style.backdropFilter = 'blur(12px)';
toast.style.background = 'rgba(15,23,42,0.95)';
toast.style.boxShadow = '0 12px 20px -8px rgba(0,0,0,0.3)';
toast.style.transition = 'opacity 0.2s';
toast.style.opacity = '0';
toast.style.pointerEvents = 'none';
document.body.appendChild(toast);

let toastTimeout;
function showToast(message) {
  if (toastTimeout) clearTimeout(toastTimeout);
  toast.textContent = message;
  toast.style.opacity = '1';
  toastTimeout = setTimeout(() => { toast.style.opacity = '0'; }, 2200);
}

// Card click handler
function cardClickHandler(e) {
  const strokeDiv = this.querySelector('.stroke-list');
  const hanziElem = this.querySelector('.chinese-word');
  const strokeText = strokeDiv ? strokeDiv.innerText : "stroke order info";
  const hanzi = hanziElem ? hanziElem.innerText : "";
  showToast(`📖 ${hanzi} • ${strokeText.substring(0, 100)}`);
  this.style.transform = 'scale(0.98)';
  setTimeout(() => { if(this) this.style.transform = ''; }, 150);
}

function attachCardEvents() {
  document.querySelectorAll('.chinese-card').forEach(card => {
    card.removeEventListener('click', cardClickHandler);
    card.addEventListener('click', cardClickHandler);
  });
}

// Render cards by level
let currentLevel = '1';
const container = document.getElementById('cardsContainer');

function renderLevel(level) {
  if (!hskData[level]) {
    container.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:3rem;">✨ more HSK words coming soon ✨</div>`;
    return;
  }
  const words = hskData[level];
  container.innerHTML = words.map(word => buildCardHTML(word)).join('');
  attachCardEvents();
}

// Tab switching
function initTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const level = btn.getAttribute('data-level');
      if (level === currentLevel) return;
      currentLevel = level;
      tabs.forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      renderLevel(currentLevel);
    });
  });
}

// Initial load
if (document.getElementById('cardsContainer')) {
  renderLevel('1');
  initTabs();
}

// MutationObserver for dynamic content
const observer = new MutationObserver(() => attachCardEvents());
if (container) observer.observe(container, { childList: true, subtree: false });
