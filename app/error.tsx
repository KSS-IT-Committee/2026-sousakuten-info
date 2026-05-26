"use client";
import { useEffect } from "react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div>
      <h1>エラー</h1>
      <p>エラーが発生しました。</p>
      <button onClick={unstable_retry}>再試行</button>
    </div>
  );
}
