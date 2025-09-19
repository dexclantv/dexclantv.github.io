// ---- Bridge helpers for the iOS WebToolView ----

// Send progress updates (0.0 → 1.0)
function sendProgress(pct) {
  try {
    const v = Math.max(0, Math.min(1, Number(pct)));
    window.webkit?.messageHandlers?.clipper?.postMessage({
      type: "progress",
      value: v
    });
  } catch (e) {
    console.warn("sendProgress error:", e);
  }
}

// Send the final downloadable file URL
function sendResult(url) {
  try {
    if (!url || typeof url !== "string") return;
    window.webkit?.messageHandlers?.clipper?.postMessage({
      type: "result",
      url
    });
  } catch (e) {
    console.warn("sendResult error:", e);
  }
}

// --- OPTIONAL: demo driver so you can verify the iOS UI ---
// Remove this block in production.
(function demoProgress() {
  if (!/demo=1/.test(location.search)) return; // only runs when ?demo=1
  let p = 0;
  const timer = setInterval(() => {
    p += 0.1;
    sendProgress(p);
    if (p >= 1) {
      clearInterval(timer);
      // Dummy file for testing preview flow
      sendResult("https://file-examples.com/storage/fe0b1c7a5e8b7b2f20f1a5a/2017/04/file_example_MP4_480_1_5MG.mp4");
    }
  }, 300);
})();
