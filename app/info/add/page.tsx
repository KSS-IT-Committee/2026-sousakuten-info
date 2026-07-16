import { AuthGuard } from "@/components/AuthGuard";

import { AddInfoClient } from "./AddInfoClient";

// The form lives in <AddInfoClient>; the site-wide <FloatingMenu> is
// rendered by the root layout.
export default function AddInfo() {
  return (
    <AuthGuard filter={{ canManage: true }}>
      <AddInfoClient />
    </AuthGuard>
  );
}
