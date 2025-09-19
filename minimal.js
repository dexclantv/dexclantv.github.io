// ---- Bridge helpers for the iOS WebToolView ----
function sendProgress(pct) {
  const v = Math.max(0, Math.min(1, Number(pct)));
  try {
    if (window?.webkit?.messageHandlers?.clipper) {
      window.webkit.messageHandlers.clipper.postMessage({ type: "progress", value: v });
    } else {
      // Browser fallback for testing
      console.debug("[fallback] progress:", v);
    }
  } catch (e) {
    console.warn("sendProgress error:", e);
  }
}

function sendResult(url) {
  try {
    if (!url || typeof url !== "string") return;
    if (window?.webkit?.messageHandlers?.clipper) {
      window.webkit.messageHandlers.clipper.postMessage({ type: "result", url });
    } else {
      // Browser fallback for testing
      console.debug("[fallback] result url:", url);
    }
  } catch (e) {
    console.warn("sendResult error:", e);
  }
}

// --- OPTIONAL demo (enable with ?demo=1)
(function demoProgress() {
  if (!/(\?|&)demo=1(\b|&|$)/.test(location.search)) return;
  let p = 0;
  const timer = setInterval(() => {
    p = Math.min(1, p + 0.1);
    sendProgress(p);
    if (p >= 1) {
      clearInterval(timer);
      sendResult("https://file-examples.com/storage/fe0b1c7a5e8b7b2f20f1a5a/2017/04/file_example_MP4_480_1_5MG.mp4");
    }
  }, 300);
})();
