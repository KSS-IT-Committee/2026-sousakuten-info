"use client";

export default function Error({
  unstable_retry,
}: {
  unstable_retry: () => void;
}) {
  return (
    <div>
      <h1>エラー</h1>
      <p>エラーが発生しました。</p>
      <button type="button" onClick={() => unstable_retry()}>
        再試行
      </button>
    </div>
  );
}
