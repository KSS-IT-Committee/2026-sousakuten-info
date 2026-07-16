import { HomeClient } from "./HomeClient";

// The interactive body lives in <HomeClient>; the site-wide <FloatingMenu>
// is rendered by the root layout.
export default function Home() {
  return <HomeClient />;
}
