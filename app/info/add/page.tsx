import { FilterGuard } from "@/components/FilterGuard";

import { AddInfoClient } from "./AddInfoClient";

export default function AddInfo() {
  return (
    <FilterGuard filter={{ canManage: true }}>
      <AddInfoClient />
    </FilterGuard>
  );
}
