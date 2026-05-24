"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error("Page error:", error.message);
  return (
    <div>
      <h1>エラー</h1>
      <p>エラーが発生しました。</p>
      <button onClick={reset}>再試行</button>
    </div>
  );
}
