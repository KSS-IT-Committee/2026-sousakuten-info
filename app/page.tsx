import { FloatingMenu } from "@/components/FloatingMenu";

import { HomeClient } from "./HomeClient";

/**
 * Server Component so <FloatingMenu> can gate internal-only entries. The
 * page's interactive body lives in <HomeClient>; the menu is `position: fixed`,
 * so hoisting it out to this sibling changes nothing visually.
 */
export default function Home() {
  return (
    <>
      <HomeClient />
      <FloatingMenu
        items={[
          { label: "お知らせを管理", href: "/info" },
          { label: "お知らせを追加", href: "/info/add" },
        ]}
      />
    </>
  );
}
