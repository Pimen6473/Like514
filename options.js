document.getElementById("save").addEventListener("click", () => {
    const url = document.getElementById("videoUrl").value.trim();
    chrome.storage.sync.set({ targetUrl: url }, () => {
      document.getElementById("status").textContent = "保存しました";
      setTimeout(() => document.getElementById("status").textContent = "", 2000);
    });
  });
  