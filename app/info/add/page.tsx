import { AuthGuard } from "@/components/AuthGuard";

import AddInfoClient from "./AddInfoClient";

export default function AddInfo() {
  return (
    <AuthGuard filter={{ canManage: true }}>
      <AddInfoClient />
    </AuthGuard>
  );
}
