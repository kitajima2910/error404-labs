(() => {
  "use strict";

  const STORAGE_KEY = "j2me_game_library_v1";
  const SCREEN_SIZE_KEY = "j2me_screen_size_v1";
  const RUNNER_PATH = "vendor/freej2me-web/web/run.html";
  const SCREEN_PRESETS = {
    "240x320": { w: 240, h: 320, label: "240x320 (Dọc)" },
    "320x240": { w: 320, h: 240, label: "320x240 (Ngang)" },
    "176x220": { w: 176, h: 220, label: "176x220 (Dọc)" },
    "220x176": { w: 220, h: 176, label: "220x176 (Ngang)" },
    "128x160": { w: 128, h: 160, label: "128x160 (Dọc)" },
    "160x128": { w: 160, h: 128, label: "160x128 (Ngang)" },
  };

  const screenEl = document.getElementById("game-screen");
  const viewportEl = document.getElementById("game-viewport");
  const statusEl = document.getElementById("status-text");
  const showKeypadBtn = document.getElementById("show-keypad-btn");
  const screenSizeSelectEl = document.getElementById("screen-size-select");
  const gameListEl = document.getElementById("game-list");
  const fileInputEl = document.getElementById("jar-input");
  const dropzoneEl = document.getElementById("dropzone");
  const hideKeypadBtn = document.getElementById("hide-keypad-btn");
  const urlInputEl = document.getElementById("url-input");
  const urlAddBtn = document.getElementById("url-add-btn");

  const library = new Map();
  const uploadBlobUrlCache = new Map();

  let touchMode = false;
  let currentGame = null;
  let selectedScreenSize = localStorage.getItem(SCREEN_SIZE_KEY) || "240x320";

  function setStatus(message) {
    statusEl.textContent = message;
  }

  function getSelectedPreset() {
    return SCREEN_PRESETS[selectedScreenSize] || SCREEN_PRESETS["240x320"];
  }

  function layoutViewport() {
    const preset = getSelectedPreset();
    const bounds = screenEl.getBoundingClientRect();
    const maxW = Math.max(1, Math.floor(bounds.width));
    const maxH = Math.max(1, Math.floor(bounds.height));

    const scale = Math.min(maxW / preset.w, maxH / preset.h);
    const width = Math.max(1, Math.floor(preset.w * scale));
    const height = Math.max(1, Math.floor(preset.h * scale));

    viewportEl.style.width = `${width}px`;
    viewportEl.style.height = `${height}px`;
  }

  function nowId(prefix) {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  }

  function normalizeFileName(name) {
    const clean = String(name || "game.jar").split("?")[0].split("#")[0];
    const leaf = clean.split("/").pop() || "game.jar";
    return leaf.toLowerCase().endsWith(".jar") ? leaf : `${leaf}.jar`;
  }

  function readLibraryStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = JSON.parse(raw || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveLibraryStorage() {
    const payload = Array.from(library.values()).map((g) => ({
      id: g.id,
      name: g.name,
      fileName: g.fileName,
      sourceType: g.sourceType,
      source: g.source,
      dataUrl: g.dataUrl || null,
      createdAt: g.createdAt,
      isBuiltin: !!g.isBuiltin,
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }

  async function toDataUrl(file) {
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    let binary = "";
    const chunkSize = 0x8000;
    for (let i = 0; i < bytes.length; i += chunkSize) {
      binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
    }
    return `data:application/java-archive;base64,${btoa(binary)}`;
  }

  async function dataUrlToBlob(dataUrl) {
    const response = await fetch(dataUrl);
    return await response.blob();
  }

  function restoreLibrary() {
    const items = readLibraryStorage();
    for (const item of items) {
      if (!item || !item.id || !item.fileName) continue;
      library.set(item.id, {
        id: item.id,
        name: item.name || item.fileName.replace(/\.jar$/i, ""),
        fileName: item.fileName,
        sourceType: item.sourceType || "url",
        source: item.source,
        dataUrl: item.dataUrl || null,
        createdAt: Number(item.createdAt) || Date.now(),
        isBuiltin: !!item.isBuiltin,
      });
    }
  }

  function buildGameCard(game) {
    const card = document.createElement("article");
    card.className = "game-card";

    const icon = document.createElement("div");
    icon.className = "game-icon";
    icon.textContent = "J2ME";

    const name = document.createElement("div");
    name.className = "game-name";
    name.textContent = game.name;

    const source = document.createElement("small");
    source.style.color = "#9db0c7";
    source.textContent = game.sourceType === "upload" ? "Tải lên" : game.isBuiltin ? "Tích hợp /games" : "URL";

    const actions = document.createElement("div");
    actions.className = "card-actions";

    const playBtn = document.createElement("button");
    playBtn.className = "play-btn";
    playBtn.type = "button";
    playBtn.textContent = "CHƠI";
    playBtn.addEventListener("click", () => runGame(game));

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.type = "button";
    removeBtn.textContent = "XÓA";
    removeBtn.addEventListener("click", () => {
      library.delete(game.id);
      if (uploadBlobUrlCache.has(game.id)) {
        URL.revokeObjectURL(uploadBlobUrlCache.get(game.id));
        uploadBlobUrlCache.delete(game.id);
      }
      saveLibraryStorage();
      renderGameList();
    });

    actions.append(playBtn, removeBtn);
    card.append(icon, name, source, actions);
    return card;
  }

  function renderGameList() {
    gameListEl.innerHTML = "";
    const games = Array.from(library.values()).sort((a, b) => b.createdAt - a.createdAt);

    if (!games.length) {
      const empty = document.createElement("article");
      empty.className = "game-card";
      empty.textContent = "Chưa có game. Hãy tải lên file .jar hoặc thêm bằng URL.";
      gameListEl.appendChild(empty);
      return;
    }

    for (const game of games) {
      gameListEl.appendChild(buildGameCard(game));
    }
  }

  async function resolveJarUrl(game) {
    if (game.sourceType === "upload") {
      if (uploadBlobUrlCache.has(game.id)) {
        return uploadBlobUrlCache.get(game.id);
      }
      if (!game.dataUrl) throw new Error("Game tải lên thiếu dữ liệu.");
      const blob = await dataUrlToBlob(game.dataUrl);
      const blobUrl = URL.createObjectURL(blob);
      uploadBlobUrlCache.set(game.id, blobUrl);
      return blobUrl;
    }

    return new URL(game.source, window.location.href).href;
  }

  async function runGame(game) {
    try {
      currentGame = game;
      setStatus(`Đang chuẩn bị chạy ${game.name}...`);
      const jarUrl = await resolveJarUrl(game);
      const runnerUrl = new URL(RUNNER_PATH, window.location.href);
      runnerUrl.searchParams.set("jarUrl", jarUrl);
      runnerUrl.searchParams.set("fractionScale", "1");
      runnerUrl.searchParams.set("fit", "contain");
      runnerUrl.searchParams.set("t", String(Date.now()));

      layoutViewport();
      viewportEl.innerHTML = "";
      const frame = document.createElement("iframe");
      frame.id = "game-runner-frame";
      frame.title = `Trình chạy game: ${game.name}`;
      frame.src = runnerUrl.toString();
      frame.setAttribute("allow", "autoplay");
      frame.style.width = "100%";
      frame.style.height = "100%";
      frame.style.border = "0";
      frame.style.background = "#000";
      frame.addEventListener("load", () => {
        setStatus(`Đang chơi: ${game.name}`);
      });
      viewportEl.appendChild(frame);
    } catch (error) {
      console.error(error);
      setStatus(`Lỗi chạy game: ${error.message || error}`);
    }
  }

  function addGameToLibrary(game, autoRun = false) {
    const exists = Array.from(library.values()).some(
      (g) => g.sourceType === game.sourceType && g.source === game.source && g.fileName === game.fileName
    );

    if (!exists) {
      library.set(game.id, game);
      saveLibraryStorage();
      renderGameList();
    }

    if (autoRun) {
      const actual = Array.from(library.values()).find(
        (g) => g.sourceType === game.sourceType && g.source === game.source && g.fileName === game.fileName
      );
      if (actual) runGame(actual);
    }
  }

  async function addUploadedFiles(files) {
    const jarFiles = files.filter((file) => file.name.toLowerCase().endsWith(".jar"));
    if (!jarFiles.length) {
      setStatus("Không tìm thấy file .jar hợp lệ.");
      return;
    }

    for (const file of jarFiles) {
      const dataUrl = await toDataUrl(file);
      addGameToLibrary(
        {
          id: nowId("upload"),
          name: file.name.replace(/\.jar$/i, ""),
          fileName: file.name,
          sourceType: "upload",
          source: file.name,
          dataUrl,
          createdAt: Date.now(),
          isBuiltin: false,
        },
        false
      );
    }

    setStatus(`Đã thêm ${jarFiles.length} game từ máy.`);
  }

  function addUrlGame(url, autoRun = false, isBuiltin = false) {
    const cleanUrl = String(url || "").trim();
    if (!cleanUrl) return;

    const fileName = normalizeFileName(cleanUrl);
    addGameToLibrary(
      {
        id: nowId("url"),
        name: fileName.replace(/\.jar$/i, ""),
        fileName,
        sourceType: "url",
        source: cleanUrl,
        dataUrl: null,
        createdAt: Date.now(),
        isBuiltin,
      },
      autoRun
    );
  }

  function initUploadInput() {
    fileInputEl.addEventListener("change", async (event) => {
      const selected = Array.from(event.target.files || []);
      await addUploadedFiles(selected);
      fileInputEl.value = "";
    });
  }

  function initDragDrop() {
    ["dragenter", "dragover"].forEach((eventName) => {
      dropzoneEl.addEventListener(eventName, (event) => {
        event.preventDefault();
        dropzoneEl.classList.add("drag-over");
      });
    });

    ["dragleave", "drop"].forEach((eventName) => {
      dropzoneEl.addEventListener(eventName, (event) => {
        event.preventDefault();
        if (eventName !== "drop") {
          dropzoneEl.classList.remove("drag-over");
        }
      });
    });

    dropzoneEl.addEventListener("drop", async (event) => {
      dropzoneEl.classList.remove("drag-over");
      const files = Array.from(event.dataTransfer?.files || []);
      await addUploadedFiles(files);
    });
  }

  function initUrlLoader() {
    const onAdd = () => {
      const url = urlInputEl.value.trim();
      if (!url) return;
      addUrlGame(url, false, /^games\//i.test(url) || /\/games\//i.test(url));
      urlInputEl.value = "";
      setStatus("Đã thêm game từ URL.");
    };

    urlAddBtn.addEventListener("click", onAdd);
    urlInputEl.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        onAdd();
      }
    });
  }

  async function loadGamesFolderList() {
    try {
      const response = await fetch("games/index.json", { cache: "no-store" });
      if (!response.ok) return;
      const entries = await response.json();
      if (!Array.isArray(entries)) return;

      for (const entry of entries) {
        if (typeof entry !== "string" || !entry.toLowerCase().endsWith(".jar")) continue;
        const url = entry.startsWith("http") ? entry : `games/${entry.replace(/^games\//i, "")}`;
        addUrlGame(url, false, true);
      }

      setStatus("Đã nạp danh sách game từ games/index.json.");
    } catch {
      // ignore silently if games/index.json does not exist
    }
  }

  function handleQueryGameAutoRun() {
    const params = new URLSearchParams(window.location.search);
    const game = params.get("game");
    if (!game) return;
    addUrlGame(game, true, /^games\//i.test(game) || /\/games\//i.test(game));
  }

  function setTouchMode(enabled) {
    touchMode = enabled;
    document.body.classList.toggle("touch-mode", touchMode);
    showKeypadBtn.hidden = !touchMode;
    layoutViewport();
    setStatus(touchMode ? "Đã ẩn bàn phím." : "Đã hiện bàn phím.");
  }

  function initTouchMode() {
    hideKeypadBtn.addEventListener("click", () => {
      setTouchMode(true);
    });

    showKeypadBtn.addEventListener("click", () => {
      setTouchMode(false);
    });
  }

  function initScreenSizeControl() {
    if (!SCREEN_PRESETS[selectedScreenSize]) {
      selectedScreenSize = "240x320";
    }
    screenSizeSelectEl.value = selectedScreenSize;
    layoutViewport();
    requestAnimationFrame(layoutViewport);

    screenSizeSelectEl.addEventListener("change", () => {
      selectedScreenSize = screenSizeSelectEl.value;
      localStorage.setItem(SCREEN_SIZE_KEY, selectedScreenSize);
      layoutViewport();

      if (currentGame) {
        runGame(currentGame);
      } else {
        const preset = getSelectedPreset();
        setStatus(`Đã chọn màn hình ${preset.label}.`);
      }
    });

    window.addEventListener("resize", () => {
      layoutViewport();
    });
  }

  function mapVirtualKey(keyValue) {
    switch (keyValue) {
      case "SoftLeft":
        return { code: "F1", key: "F1" };
      case "SoftRight":
        return { code: "F2", key: "F2" };
      case "*":
        return { code: "NumpadAsterisk", key: "*" };
      case "#":
        return { code: "NumpadDivide", key: "#" };
      case "0":
        return { code: "Digit0", key: "0" };
      case "1":
        return { code: "Digit1", key: "1" };
      case "2":
        return { code: "Digit2", key: "2" };
      case "3":
        return { code: "Digit3", key: "3" };
      case "4":
        return { code: "Digit4", key: "4" };
      case "5":
        return { code: "Digit5", key: "5" };
      case "6":
        return { code: "Digit6", key: "6" };
      case "7":
        return { code: "Digit7", key: "7" };
      case "8":
        return { code: "Digit8", key: "8" };
      case "9":
        return { code: "Digit9", key: "9" };
      default:
        return { code: keyValue, key: keyValue };
    }
  }

  function emitKeyToRunner(keyValue) {
    const frame = document.getElementById("game-runner-frame");
    if (!frame || !frame.contentWindow || !frame.contentWindow.document) return;

    const mapped = mapVirtualKey(keyValue);
    const doc = frame.contentWindow.document;
    const target = doc.getElementById("display") || doc.activeElement || doc.body;

    const down = new KeyboardEvent("keydown", {
      key: mapped.key,
      code: mapped.code,
      bubbles: true,
      cancelable: true,
    });
    const up = new KeyboardEvent("keyup", {
      key: mapped.key,
      code: mapped.code,
      bubbles: true,
      cancelable: true,
    });

    target.focus?.();
    target.dispatchEvent(down);
    target.dispatchEvent(up);
  }

  function initKeypad() {
    const buttons = document.querySelectorAll(".key[data-key]");
    buttons.forEach((button) => {
      const press = () => {
        const key = button.getAttribute("data-key") || "";
        button.classList.add("pressed");
        emitKeyToRunner(key);
        setTimeout(() => button.classList.remove("pressed"), 120);
      };

      button.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        press();
      });
      button.addEventListener("click", (event) => event.preventDefault());
    });
  }

  async function init() {
    restoreLibrary();
    renderGameList();

    initUploadInput();
    initDragDrop();
    initUrlLoader();
    initScreenSizeControl();
    initTouchMode();
    initKeypad();

    await loadGamesFolderList();
    handleQueryGameAutoRun();

    setStatus("Sẵn sàng. Tải game lên hoặc bấm CHƠI.");
  }

  init();
})();
