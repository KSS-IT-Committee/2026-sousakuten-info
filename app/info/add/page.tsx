import { FloatingMenu } from "@/components/FloatingMenu";

import { AddInfoClient } from "./AddInfoClient";

/**
 * Server Component so <FloatingMenu> can gate internal-only entries. The form
 * itself lives in <AddInfoClient>; the menu is `position: fixed`, so hoisting
 * it out to this sibling changes nothing visually.
 */
export default function AddInfo() {
  return (
    <>
      <AddInfoClient />
      <FloatingMenu
        items={[
          { label: "クラスページ", href: "/" },
          { label: "お知らせを管理", href: "/info" },
        ]}
      />
    </>
  );
}
