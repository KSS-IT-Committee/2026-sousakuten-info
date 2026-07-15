import { AuthGuard } from "@/components/AuthGuard";
import { MANAGE_ROLES } from "@/lib/authorize";

import AddInfoClient from "./AddInfoClient";

export default function AddInfo() {
  return (
    <AuthGuard role={MANAGE_ROLES}>
      <AddInfoClient />
    </AuthGuard>
  );
}
