"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/Button";

import { deleteAnnouncementAction } from "./action";
import styles from "./DeleteAnnouncementButton.module.css";

export function DeleteAnnouncementButton({ id }: { id: number }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteAnnouncement = async () => {
    if (
      !confirm(
        "本当にお知らせを削除しますか？\nこの操作は取り消すことができません",
      )
    ) {
      return;
    }
    try {
      setIsLoading(true);
      await deleteAnnouncementAction(id);
      alert("お知らせを削除しました");
      router.push("/info");
    } catch {
      alert("お知らせの削除に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Button
        className={styles.button}
        title="このお知らせを削除"
        disabled={isLoading}
        onClick={deleteAnnouncement}
      >
        {isLoading ? "処理中…" : "削除"}
      </Button>
    </div>
  );
}
