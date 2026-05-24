"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div>
      <h1>エラー</h1>
      <p>エラーが発生しました。</p>
      <button onClick={reset}>再試行</button>
    </div>
  );
}
