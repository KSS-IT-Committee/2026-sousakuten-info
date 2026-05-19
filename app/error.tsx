"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h1>エラー</h1>
      <p>エラーが発生しました。</p>
      <pre>{error.message}</pre>
      <button onClick={reset}>再試行</button>
    </div>
  );
}
