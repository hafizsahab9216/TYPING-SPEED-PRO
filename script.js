/* -------------------------------------------------------------
   TypeSpeed Pro - Ultra High Performance & High FPS Typing Engine
   ------------------------------------------------------------- */

// Comprehensive English word bank
const COMMON_WORDS = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "i", "it", "for", "not", "on", "with",
  "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
  "or", "an", "will", "my", "one", "all", "would", "there", "their", "what", "so", "up", "out", "if",
  "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time", "no", "just", "him",
  "know", "take", "people", "into", "year", "your", "good", "some", "could", "them", "see", "other",
  "than", "then", "now", "look", "only", "come", "its", "over", "think", "also", "back", "after", "use",
  "two", "how", "our", "work", "first", "well", "way", "even", "new", "want", "because", "any", "these",
  "give", "day", "most", "us", "great", "between", "need", "large", "under", "system", "program", "code",
  "speed", "focus", "learn", "world", "skill", "quick", "clean", "smart", "keyboard", "practice", "develop",
  "future", "power", "screen", "typing", "better", "fast", "simple", "create", "action", "change", "light",
  "energy", "master", "result", "drive", "build", "growth", "stream", "design", "logic", "habit", "boost"
];

const PUNCTUATION_LIST = [",", ".", "!", "?", ";", ":", "-", "\"", "'"];

// Keyboard Layout Configuration
const KEYBOARD_ROWS = [
  [
    { key: "`", shift: "~", finger: "f-pinky" },
    { key: "1", shift: "!", finger: "f-pinky" },
    { key: "2", shift: "@", finger: "f-ring" },
    { key: "3", shift: "#", finger: "f-middle" },
    { key: "4", shift: "$", finger: "f-index" },
    { key: "5", shift: "%", finger: "f-index" },
    { key: "6", shift: "^", finger: "f-index" },
    { key: "7", shift: "&", finger: "f-index" },
    { key: "8", shift: "*", finger: "f-middle" },
    { key: "9", shift: "(", finger: "f-ring" },
    { key: "0", shift: ")", finger: "f-pinky" },
    { key: "-", shift: "_", finger: "f-pinky" },
    { key: "=", shift: "+", finger: "f-pinky" },
    { key: "Backspace", label: "Bksp", finger: "f-pinky", wide: "key-wide" }
  ],
  [
    { key: "Tab", label: "Tab", finger: "f-pinky", wide: "key-wide" },
    { key: "q", shift: "Q", finger: "f-pinky" },
    { key: "w", shift: "W", finger: "f-ring" },
    { key: "e", shift: "E", finger: "f-middle" },
    { key: "r", shift: "R", finger: "f-index" },
    { key: "t", shift: "T", finger: "f-index" },
    { key: "y", shift: "Y", finger: "f-index" },
    { key: "u", shift: "U", finger: "f-index" },
    { key: "i", shift: "I", finger: "f-middle" },
    { key: "o", shift: "O", finger: "f-ring" },
    { key: "p", shift: "P", finger: "f-pinky" },
    { key: "[", shift: "{", finger: "f-pinky" },
    { key: "]", shift: "}", finger: "f-pinky" },
    { key: "\\", shift: "|", finger: "f-pinky" }
  ],
  [
    { key: "CapsLock", label: "Caps", finger: "f-pinky", wide: "key-wide" },
    { key: "a", shift: "A", finger: "f-pinky" },
    { key: "s", shift: "S", finger: "f-ring" },
    { key: "d", shift: "D", finger: "f-middle" },
    { key: "f", shift: "F", finger: "f-index" },
    { key: "g", shift: "G", finger: "f-index" },
    { key: "h", shift: "H", finger: "f-index" },
    { key: "j", shift: "J", finger: "f-index" },
    { key: "k", shift: "K", finger: "f-middle" },
    { key: "l", shift: "L", finger: "f-ring" },
    { key: ";", shift: ":", finger: "f-pinky" },
    { key: "'", shift: "\"", finger: "f-pinky" },
    { key: "Enter", label: "Enter", finger: "f-pinky", wide: "key-wide" }
  ],
  [
    { key: "ShiftLeft", label: "Shift", finger: "f-pinky", wide: "key-extra-wide" },
    { key: "z", shift: "Z", finger: "f-pinky" },
    { key: "x", shift: "X", finger: "f-ring" },
    { key: "c", shift: "C", finger: "f-middle" },
    { key: "v", shift: "V", finger: "f-index" },
    { key: "b", shift: "B", finger: "f-index" },
    { key: "n", shift: "N", finger: "f-index" },
    { key: "m", shift: "M", finger: "f-index" },
    { key: ",", shift: "<", finger: "f-middle" },
    { key: ".", shift: ">", finger: "f-ring" },
    { key: "/", shift: "?", finger: "f-pinky" },
    { key: "ShiftRight", label: "Shift", finger: "f-pinky", wide: "key-extra-wide" }
  ],
  [
    { key: "ControlLeft", label: "Ctrl", finger: "f-pinky", wide: "key-wide" },
    { key: "AltLeft", label: "Alt", finger: "f-thumb" },
    { key: " ", label: "Space", finger: "f-thumb", wide: "key-space" },
    { key: "AltRight", label: "Alt", finger: "f-thumb" },
    { key: "ControlRight", label: "Ctrl", finger: "f-pinky", wide: "key-wide" }
  ]
];

// App State
const state = {
  mode: "time", // "time" | "words" | "practice" | "custom"
  timeLimit: 30,
  wordLimit: 25,
  includePunctuation: false,
  includeNumbers: false,
  customText: "",

  words: [],
  currentWordIndex: 0,
  currentCharIndex: 0,
  
  isTestRunning: false,
  isTestFinished: false,
  startTime: null,
  timerInterval: null,
  timeRemaining: 30,
  timeElapsed: 0,

  totalKeystrokes: 0,
  correctKeystrokes: 0,
  incorrectKeystrokes: 0,
  correctChars: 0,
  incorrectChars: 0,

  soundEnabled: true,
  virtualKbVisible: true
};

// Fast Key Element Map for O(1) Lookups
const keyElementMap = new Map();
let currentTargetKeyEl = null;

// Lightweight Web Audio
let audioCtx = null;
function playKeyClickSound(isSpace = false, isError = false) {
  if (!state.soundEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const now = audioCtx.currentTime;

    if (isError) {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(140, now);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
      return;
    }

    const freq = isSpace ? 320 : (520 + Math.random() * 60);
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.linearRampToValueAtTime(80, now + 0.035);

    gain.gain.setValueAtTime(0.09, now);
    gain.gain.linearRampToValueAtTime(0.001, now + 0.035);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.04);
  } catch (e) {
    // Non-critical
  }
}

// DOM Element References
const wordsContainer = document.getElementById("wordsContainer");
const wordsWrapper = document.getElementById("wordsWrapper");
const caret = document.getElementById("caret");
const hiddenInput = document.getElementById("hiddenInput");
const typingArena = document.getElementById("typingArena");
const restartBtn = document.getElementById("restartBtn");

// Live Stat Elements
const liveWpm = document.getElementById("liveWpm");
const liveAccuracy = document.getElementById("liveAccuracy");
const liveTimer = document.getElementById("liveTimer");
const liveCpm = document.getElementById("liveCpm");
const liveErrors = document.getElementById("liveErrors");
const timerLabel = document.getElementById("timerLabel");

// Control Panel Elements
const mainModeGroup = document.getElementById("mainModeGroup");
const timeOptions = document.getElementById("timeOptions");
const wordOptions = document.getElementById("wordOptions");
const modPunctuation = document.getElementById("modPunctuation");
const modNumbers = document.getElementById("modNumbers");

// Modal Elements
const resultsModal = document.getElementById("resultsModal");
const resWpm = document.getElementById("resWpm");
const resAccuracy = document.getElementById("resAccuracy");
const resRawWpm = document.getElementById("resRawWpm");
const resChars = document.getElementById("resChars");
const resErrors = document.getElementById("resErrors");
const resTime = document.getElementById("resTime");
const speedRankBadge = document.getElementById("speedRankBadge");
const meterFill = document.getElementById("meterFill");
const feedbackMessage = document.getElementById("feedbackMessage");
const modalRestartBtn = document.getElementById("modalRestartBtn");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const modalShareBtn = document.getElementById("modalShareBtn");

// Custom Text Modal
const customTextModal = document.getElementById("customTextModal");
const customTextInput = document.getElementById("customTextInput");
const customTextApplyBtn = document.getElementById("customTextApplyBtn");
const customTextCancelBtn = document.getElementById("customTextCancelBtn");

// History Modal
const historyModal = document.getElementById("historyModal");
const historyBtn = document.getElementById("historyBtn");
const closeHistoryBtn = document.getElementById("closeHistoryBtn");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");
const historyTableBody = document.getElementById("historyTableBody");
const histHighestWpm = document.getElementById("histHighestWpm");
const histAvgAcc = document.getElementById("histAvgAcc");
const histTotalTests = document.getElementById("histTotalTests");

// Visual Keyboard & Toggles
const virtualKeyboard = document.getElementById("virtualKeyboard");
const keyboardSection = document.getElementById("keyboardSection");
const kbToggle = document.getElementById("kbToggle");
const soundToggle = document.getElementById("soundToggle");
const themeBtn = document.getElementById("themeBtn");
const themeDropdown = document.querySelector(".theme-dropdown");
const toast = document.getElementById("toast");

/* ---------------- Initialization ---------------- */
function init() {
  renderVirtualKeyboard();
  loadPreferences();
  setupEventListeners();
  resetTest();
}

/* ---------------- Virtual Keyboard Rendering with Fast Map ---------------- */
function renderVirtualKeyboard() {
  virtualKeyboard.innerHTML = "";
  keyElementMap.clear();

  KEYBOARD_ROWS.forEach(row => {
    const rowEl = document.createElement("div");
    rowEl.className = "kb-row";

    row.forEach(item => {
      const keyEl = document.createElement("div");
      keyEl.className = `kb-key ${item.finger || ""} ${item.wide || ""}`;
      keyEl.textContent = item.label || item.key;

      const lowerKey = item.key.toLowerCase();
      keyElementMap.set(lowerKey, keyEl);
      if (item.shift) {
        keyElementMap.set(item.shift.toLowerCase(), keyEl);
      }

      rowEl.appendChild(keyEl);
    });

    virtualKeyboard.appendChild(rowEl);
  });
}

function highlightExpectedKey(char) {
  if (!state.virtualKbVisible) return;
  if (currentTargetKeyEl) {
    currentTargetKeyEl.classList.remove("target-key");
    currentTargetKeyEl = null;
  }
  if (!char) return;

  const searchChar = char === " " ? " " : char.toLowerCase();
  const el = keyElementMap.get(searchChar);
  if (el) {
    el.classList.add("target-key");
    currentTargetKeyEl = el;
  }
}

function flashActiveKey(keyName) {
  if (!state.virtualKbVisible) return;
  const el = keyElementMap.get(keyName.toLowerCase());
  if (el) {
    el.classList.add("active-key");
    setTimeout(() => el.classList.remove("active-key"), 90);
  }
}

/* ---------------- Words Generator ---------------- */
function generateWords() {
  let count = 100;
  if (state.mode === "words") {
    count = state.wordLimit;
  } else if (state.mode === "custom" && state.customText.trim()) {
    return state.customText.trim().split(/\s+/);
  }

  const generated = [];
  for (let i = 0; i < count; i++) {
    let word = COMMON_WORDS[Math.floor(Math.random() * COMMON_WORDS.length)];

    if (state.includeNumbers && Math.random() < 0.12) {
      word = String(Math.floor(Math.random() * 900) + 10);
    }

    if (state.includePunctuation && Math.random() < 0.2) {
      const p = PUNCTUATION_LIST[Math.floor(Math.random() * PUNCTUATION_LIST.length)];
      if (Math.random() < 0.5) {
        word = word.charAt(0).toUpperCase() + word.slice(1);
      }
      word += p;
    }

    generated.push(word);
  }
  return generated;
}

/* ---------------- Render Words to DOM ---------------- */
function renderWords() {
  const frag = document.createDocumentFragment();
  wordsContainer.innerHTML = "";
  wordsContainer.style.transform = "translate3d(0, 0, 0)";

  state.words.forEach((wordStr, wIndex) => {
    const wordEl = document.createElement("div");
    wordEl.className = "word";
    wordEl.dataset.index = wIndex;

    wordStr.split("").forEach((char, cIndex) => {
      const charEl = document.createElement("span");
      charEl.className = "char";
      charEl.textContent = char;
      charEl.dataset.index = cIndex;
      wordEl.appendChild(charEl);
    });

    frag.appendChild(wordEl);
  });

  wordsContainer.appendChild(frag);
  updateCaretPosition();

  const firstWord = state.words[0];
  if (firstWord && firstWord.length > 0) {
    highlightExpectedKey(firstWord[0]);
  }
}

/* ---------------- High FPS Hardware-Accelerated Caret Position ---------------- */
let currentLineOffset = 0;
function updateCaretPosition() {
  const currentWordEl = wordsContainer.children[state.currentWordIndex];
  if (!currentWordEl) return;

  const currentChars = currentWordEl.children;
  let caretX = 0;
  let caretY = currentWordEl.offsetTop;

  if (state.currentCharIndex < currentChars.length) {
    const targetChar = currentChars[state.currentCharIndex];
    caretX = currentWordEl.offsetLeft + targetChar.offsetLeft;
  } else {
    // Caret at end of word
    const lastChar = currentChars[currentChars.length - 1];
    if (lastChar) {
      caretX = currentWordEl.offsetLeft + lastChar.offsetLeft + lastChar.offsetWidth;
    } else {
      caretX = currentWordEl.offsetLeft;
    }
  }

  // Smooth scroll container lines if caret moves past line 1
  if (caretY > 40) {
    if (currentLineOffset !== caretY - 8) {
      currentLineOffset = caretY - 8;
      wordsContainer.style.transform = `translate3d(0, -${currentLineOffset}px, 0)`;
    }
  } else {
    if (currentLineOffset !== 0) {
      currentLineOffset = 0;
      wordsContainer.style.transform = "translate3d(0, 0, 0)";
    }
  }

  caret.style.transform = `translate3d(${caretX}px, ${caretY - currentLineOffset}px, 0)`;
}

/* ---------------- Test Reset & Setup ---------------- */
function resetTest() {
  clearInterval(state.timerInterval);
  state.isTestRunning = false;
  state.isTestFinished = false;
  state.startTime = null;
  state.timeRemaining = state.timeLimit;
  state.timeElapsed = 0;

  state.totalKeystrokes = 0;
  state.correctKeystrokes = 0;
  state.incorrectKeystrokes = 0;
  state.correctChars = 0;
  state.incorrectChars = 0;

  state.currentWordIndex = 0;
  state.currentCharIndex = 0;
  currentLineOffset = 0;

  state.words = generateWords();
  renderWords();

  // Reset stats display
  liveWpm.textContent = "0";
  liveAccuracy.textContent = "100%";
  liveCpm.textContent = "0";
  liveErrors.textContent = "0";

  if (state.mode === "time") {
    timerLabel.textContent = "TIME";
    liveTimer.textContent = `${state.timeLimit}s`;
  } else if (state.mode === "words") {
    timerLabel.textContent = "WORDS";
    liveTimer.textContent = `0 / ${state.wordLimit}`;
  } else {
    timerLabel.textContent = "TIME";
    liveTimer.textContent = "0s";
  }

  focusInput();
}

function startTest() {
  state.isTestRunning = true;
  state.startTime = Date.now();
  caret.classList.add("typing");

  state.timerInterval = setInterval(() => {
    state.timeElapsed = Math.floor((Date.now() - state.startTime) / 1000);

    if (state.mode === "time") {
      state.timeRemaining = state.timeLimit - state.timeElapsed;
      liveTimer.textContent = `${Math.max(0, state.timeRemaining)}s`;

      if (state.timeRemaining <= 0) {
        finishTest();
        return;
      }
    } else {
      liveTimer.textContent = `${state.timeElapsed}s`;
    }

    updateLiveStats();
  }, 1000);
}

// Throttled stats update
let statsScheduled = false;
function scheduleLiveStats() {
  if (statsScheduled) return;
  statsScheduled = true;
  requestAnimationFrame(() => {
    updateLiveStats();
    statsScheduled = false;
  });
}

function updateLiveStats() {
  const elapsedMinutes = Math.max((Date.now() - (state.startTime || Date.now())) / 60000, 0.008);
  
  const netWpm = Math.max(0, Math.round((state.correctChars / 5) / elapsedMinutes));
  const rawWpm = Math.max(0, Math.round((state.totalKeystrokes / 5) / elapsedMinutes));
  const accuracy = state.totalKeystrokes > 0 
    ? Math.round((state.correctKeystrokes / state.totalKeystrokes) * 100) 
    : 100;

  liveWpm.textContent = netWpm;
  liveCpm.textContent = rawWpm;
  liveAccuracy.textContent = `${accuracy}%`;
  liveErrors.textContent = state.incorrectChars;
}

/* ---------------- Ultra-Fast Typing Handler ---------------- */
function handleKeyInput(e) {
  if (state.isTestFinished) return;

  // Ignore navigation & modifier keys
  if (["Control", "Alt", "Meta", "Shift", "CapsLock", "Escape", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
    return;
  }

  if (e.key === "Tab") {
    e.preventDefault();
    return;
  }

  if (!state.isTestRunning) {
    startTest();
  }

  flashActiveKey(e.key);

  const currentWordEl = wordsContainer.children[state.currentWordIndex];
  if (!currentWordEl) return;

  const currentTargetWord = state.words[state.currentWordIndex] || "";
  const charElements = currentWordEl.children;

  // BACKSPACE
  if (e.key === "Backspace") {
    playKeyClickSound(false, false);
    if (state.currentCharIndex > 0) {
      state.currentCharIndex--;
      const targetChar = charElements[state.currentCharIndex];
      if (targetChar.classList.contains("extra")) {
        targetChar.remove();
      } else {
        targetChar.className = "char";
      }
    } else if (state.currentWordIndex > 0) {
      state.currentWordIndex--;
      const prevWordEl = wordsContainer.children[state.currentWordIndex];
      state.currentCharIndex = prevWordEl.children.length;
    }

    updateCaretPosition();
    highlightExpectedKey(getNextTargetChar());
    return;
  }

  // SPACEBAR
  if (e.key === " ") {
    e.preventDefault();
    if (state.currentCharIndex === 0) return;

    playKeyClickSound(true, false);
    state.totalKeystrokes++;
    
    if (state.currentCharIndex < currentTargetWord.length) {
      for (let i = state.currentCharIndex; i < currentTargetWord.length; i++) {
        charElements[i].classList.add("incorrect");
        state.incorrectChars++;
      }
    } else {
      state.correctKeystrokes++;
    }

    state.currentWordIndex++;
    state.currentCharIndex = 0;

    if (state.mode === "words") {
      liveTimer.textContent = `${state.currentWordIndex} / ${state.wordLimit}`;
      if (state.currentWordIndex >= state.wordLimit) {
        finishTest();
        return;
      }
    }

    // Stream more words if needed
    if (state.currentWordIndex >= state.words.length - 8) {
      const extraWords = generateWords();
      state.words.push(...extraWords);
      const frag = document.createDocumentFragment();
      extraWords.forEach((wordStr, i) => {
        const wIdx = state.words.length - extraWords.length + i;
        const wEl = document.createElement("div");
        wEl.className = "word";
        wEl.dataset.index = wIdx;
        wordStr.split("").forEach((c, ci) => {
          const cEl = document.createElement("span");
          cEl.className = "char";
          cEl.textContent = c;
          cEl.dataset.index = ci;
          wEl.appendChild(cEl);
        });
        frag.appendChild(wEl);
      });
      wordsContainer.appendChild(frag);
    }

    updateCaretPosition();
    highlightExpectedKey(getNextTargetChar());
    scheduleLiveStats();
    return;
  }

  // STANDARD CHARACTER INPUT
  if (e.key.length === 1) {
    state.totalKeystrokes++;

    if (state.currentCharIndex < currentTargetWord.length) {
      const expectedChar = currentTargetWord[state.currentCharIndex];
      const charEl = charElements[state.currentCharIndex];

      if (e.key === expectedChar) {
        charEl.className = "char correct";
        state.correctChars++;
        state.correctKeystrokes++;
        playKeyClickSound(false, false);
      } else {
        charEl.className = "char incorrect";
        state.incorrectChars++;
        state.incorrectKeystrokes++;
        playKeyClickSound(false, true);
      }
      state.currentCharIndex++;
    } else {
      if (charElements.length < currentTargetWord.length + 8) {
        const extraChar = document.createElement("span");
        extraChar.className = "char incorrect extra";
        extraChar.textContent = e.key;
        currentWordEl.appendChild(extraChar);
        state.incorrectChars++;
        state.incorrectKeystrokes++;
        state.currentCharIndex++;
        playKeyClickSound(false, true);
      }
    }

    updateCaretPosition();
    highlightExpectedKey(getNextTargetChar());
    scheduleLiveStats();

    if (state.mode === "words" && state.currentWordIndex === state.wordLimit - 1 && state.currentCharIndex >= currentTargetWord.length) {
      finishTest();
    }
  }
}

function getNextTargetChar() {
  const curWord = state.words[state.currentWordIndex];
  if (!curWord) return " ";
  if (state.currentCharIndex < curWord.length) {
    return curWord[state.currentCharIndex];
  }
  return " ";
}

/* ---------------- Test Completion & Results ---------------- */
function finishTest() {
  clearInterval(state.timerInterval);
  state.isTestRunning = false;
  state.isTestFinished = true;
  caret.classList.remove("typing");

  const totalTimeSeconds = Math.max(state.timeElapsed || 1, 1);
  const minutes = totalTimeSeconds / 60;

  const finalWpm = Math.max(0, Math.round((state.correctChars / 5) / minutes));
  const finalRawWpm = Math.max(0, Math.round((state.totalKeystrokes / 5) / minutes));
  const finalAccuracy = state.totalKeystrokes > 0
    ? Math.round((state.correctKeystrokes / state.totalKeystrokes) * 100)
    : 100;

  resWpm.textContent = finalWpm;
  resAccuracy.textContent = `${finalAccuracy}%`;
  resRawWpm.textContent = `${finalRawWpm} WPM`;
  resChars.textContent = `${state.correctChars} / ${state.totalKeystrokes}`;
  resErrors.textContent = state.incorrectChars;
  resTime.textContent = `${totalTimeSeconds}s`;

  let rank = "Beginner 🐢";
  let msg = "Keep practicing every day! Focus on accuracy and key locations.";
  let meterPct = Math.min(100, (finalWpm / 120) * 100);

  if (finalWpm >= 110) {
    rank = "Keyboard God ⚡🚀";
    msg = "Insane speed! You are in the top 0.1% of global typists!";
  } else if (finalWpm >= 85) {
    rank = "Pro Typist 🏆";
    msg = "Outstanding! Lightning fast fingers with solid precision.";
  } else if (finalWpm >= 60) {
    rank = "Advanced Typist 🎯";
    msg = "Great pace! You are typing faster than 80% of computer users.";
  } else if (finalWpm >= 40) {
    rank = "Intermediate ⭐";
    msg = "Good speed! Work on home row placement to reach 60+ WPM.";
  }

  speedRankBadge.textContent = rank;
  feedbackMessage.textContent = msg;
  meterFill.style.width = `${meterPct}%`;

  saveTestRecord({
    date: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
    mode: state.mode === "time" ? `${state.timeLimit}s Time` : state.mode === "words" ? `${state.wordLimit} Words` : "Practice",
    wpm: finalWpm,
    rawWpm: finalRawWpm,
    acc: finalAccuracy,
    errors: state.incorrectChars
  });

  resultsModal.classList.add("active");
}

/* ---------------- Local Storage History ---------------- */
function getHistory() {
  return JSON.parse(localStorage.getItem("typeSpeed_history") || "[]");
}

function saveTestRecord(record) {
  const history = getHistory();
  history.unshift(record);
  if (history.length > 50) history.pop();
  localStorage.setItem("typeSpeed_history", JSON.stringify(history));
}

function renderHistoryModal() {
  const history = getHistory();
  historyTableBody.innerHTML = "";

  if (history.length === 0) {
    historyTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color: var(--text-muted); padding: 24px;">No tests completed yet. Take your first test!</td></tr>`;
    histHighestWpm.textContent = "0";
    histAvgAcc.textContent = "0%";
    histTotalTests.textContent = "0";
    return;
  }

  let highestWpm = 0;
  let totalAcc = 0;

  history.forEach(item => {
    if (item.wpm > highestWpm) highestWpm = item.wpm;
    totalAcc += item.acc;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.date}</td>
      <td><span class="badge-tag" style="padding: 2px 8px; font-size: 0.72rem;">${item.mode}</span></td>
      <td style="font-weight: 700; color: var(--accent-color); font-family: var(--font-mono);">${item.wpm}</td>
      <td style="font-family: var(--font-mono);">${item.rawWpm}</td>
      <td style="font-family: var(--font-mono);">${item.acc}%</td>
      <td style="color: var(--color-incorrect); font-family: var(--font-mono);">${item.errors}</td>
    `;
    historyTableBody.appendChild(row);
  });

  histHighestWpm.textContent = highestWpm;
  histAvgAcc.textContent = `${Math.round(totalAcc / history.length)}%`;
  histTotalTests.textContent = history.length;
}

/* ---------------- Focus & Preferences ---------------- */
function focusInput() {
  typingArena.classList.add("focused");
  hiddenInput.focus();
}

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

function loadPreferences() {
  const savedTheme = localStorage.getItem("typeSpeed_theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  document.querySelectorAll(".theme-opt").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.theme === savedTheme);
  });

  const savedSound = localStorage.getItem("typeSpeed_sound");
  if (savedSound !== null) {
    state.soundEnabled = savedSound === "true";
    soundToggle.innerHTML = state.soundEnabled ? '<i class="fa-solid fa-volume-high"></i>' : '<i class="fa-solid fa-volume-xmark"></i>';
  }

  const savedKb = localStorage.getItem("typeSpeed_kb");
  if (savedKb !== null) {
    state.virtualKbVisible = savedKb === "true";
    keyboardSection.style.display = state.virtualKbVisible ? "block" : "none";
  }
}

/* ---------------- Event Listeners Setup ---------------- */
function setupEventListeners() {
  typingArena.addEventListener("click", focusInput);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      resetTest();
      return;
    }
    if (!resultsModal.classList.contains("active") && 
        !customTextModal.classList.contains("active") && 
        !historyModal.classList.contains("active")) {
      handleKeyInput(e);
    }
  });

  restartBtn.addEventListener("click", resetTest);
  modalRestartBtn.addEventListener("click", () => {
    resultsModal.classList.remove("active");
    resetTest();
  });
  modalCloseBtn.addEventListener("click", () => {
    resultsModal.classList.remove("active");
  });

  modalShareBtn.addEventListener("click", () => {
    const summary = `⚡ TypeSpeed Pro Result:\n🚀 Speed: ${resWpm.textContent} WPM\n🎯 Accuracy: ${resAccuracy.textContent}\n⏱️ Mode: ${state.mode}\n🏆 Rank: ${speedRankBadge.textContent}`;
    navigator.clipboard.writeText(summary).then(() => {
      showToast("Results copied to clipboard!");
    });
  });

  mainModeGroup.querySelectorAll(".mode-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      mainModeGroup.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const mode = btn.dataset.mode;
      state.mode = mode;

      timeOptions.classList.toggle("hidden", mode !== "time");
      wordOptions.classList.toggle("hidden", mode !== "words");

      if (mode === "custom") {
        customTextModal.classList.add("active");
        customTextInput.value = state.customText;
        customTextInput.focus();
      } else {
        resetTest();
      }
    });
  });

  timeOptions.querySelectorAll(".sub-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      timeOptions.querySelectorAll(".sub-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.timeLimit = parseInt(btn.dataset.value, 10);
      resetTest();
    });
  });

  wordOptions.querySelectorAll(".sub-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      wordOptions.querySelectorAll(".sub-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.wordLimit = parseInt(btn.dataset.value, 10);
      resetTest();
    });
  });

  modPunctuation.addEventListener("click", () => {
    state.includePunctuation = !state.includePunctuation;
    modPunctuation.classList.toggle("active", state.includePunctuation);
    resetTest();
  });

  modNumbers.addEventListener("click", () => {
    state.includeNumbers = !state.includeNumbers;
    modNumbers.classList.toggle("active", state.includeNumbers);
    resetTest();
  });

  customTextApplyBtn.addEventListener("click", () => {
    state.customText = customTextInput.value;
    customTextModal.classList.remove("active");
    resetTest();
  });

  customTextCancelBtn.addEventListener("click", () => {
    customTextModal.classList.remove("active");
    if (!state.customText.trim()) {
      mainModeGroup.querySelector('[data-mode="time"]').click();
    }
  });

  historyBtn.addEventListener("click", () => {
    renderHistoryModal();
    historyModal.classList.add("active");
  });

  closeHistoryBtn.addEventListener("click", () => {
    historyModal.classList.remove("active");
  });

  clearHistoryBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear your typing history?")) {
      localStorage.removeItem("typeSpeed_history");
      renderHistoryModal();
      showToast("History cleared");
    }
  });

  soundToggle.addEventListener("click", () => {
    state.soundEnabled = !state.soundEnabled;
    localStorage.setItem("typeSpeed_sound", state.soundEnabled);
    soundToggle.innerHTML = state.soundEnabled ? '<i class="fa-solid fa-volume-high"></i>' : '<i class="fa-solid fa-volume-xmark"></i>';
    showToast(state.soundEnabled ? "Sound enabled" : "Sound muted");
  });

  kbToggle.addEventListener("click", () => {
    state.virtualKbVisible = !state.virtualKbVisible;
    localStorage.setItem("typeSpeed_kb", state.virtualKbVisible);
    keyboardSection.style.display = state.virtualKbVisible ? "block" : "none";
    showToast(state.virtualKbVisible ? "Virtual keyboard shown" : "Virtual keyboard hidden");
  });

  themeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    themeDropdown.classList.toggle("open");
  });

  document.addEventListener("click", () => {
    themeDropdown.classList.remove("open");
  });

  document.querySelectorAll(".theme-opt").forEach(btn => {
    btn.addEventListener("click", () => {
      const theme = btn.dataset.theme;
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("typeSpeed_theme", theme);
      document.querySelectorAll(".theme-opt").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      themeDropdown.classList.remove("open");
      showToast(`Theme changed to ${btn.textContent.trim()}`);
    });
  });

  window.addEventListener("resize", () => {
    updateCaretPosition();
  });
}

document.addEventListener("DOMContentLoaded", init);
