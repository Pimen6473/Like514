const DefaultURL = "https://www.youtube.com/watch?v=" + "niKAylKNIEI";

const targetUrl = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("targetUrl", (data) => {
      if (data.targetUrl) {
        resolve(data.targetUrl);
      } else {
        resolve(DefaultURL);
      }
    });
  });
};

// YouTubeはSPA（シングルページアプリ）なので遅延に注意！
window.addEventListener("yt-page-data-updated", () => {
  targetUrl()
    .then((url) => {
      // 非同期で取得した`url`を使って現在のURLと一致するかチェック
      if (window.location.href === url) {
        console.log("対象動画一致！いいね処理を開始します");
        setTimeout(clickLikeButton, 1500); // ページ遷移後にちょっと待って実行
      } else {
        console.log("対象動画ではありません。処理をスキップします。");
      }
    })
});

function clickLikeButton() {
  // ボタンを特定（YouTubeのDOM構造に依存するため微調整必要）
  const likeButton = document.querySelectorAll('#like-button .yt-spec-button-shape-next');
  if (likeButton.length === 0) {
    console.log("⚠️ いいねボタンが見つかりませんでした");
    Retry();
    return;
  }
  likeButton.forEach(likeButton => {
    const isPressed = likeButton.getAttribute('aria-pressed');
    if (likeButton && isPressed !== 'true') {
      likeButton.click();
      console.log("👍 いいねを自動で押しました！");
      Retry();
    } else {
      console.log("✅ すでに押してるか、ボタンが見つからない");
      Retry();
    };
  })
}

function Retry(){
  setTimeout(clickLikeButton, 1500);
}