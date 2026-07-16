import Link from "next/link";

import type { Filter } from "@/lib/access";

import { Internal } from "../Internal";
import styles from "./floating.module.css";
import { FloatingMenuShell } from "./FloatingMenuShell";

export type FloatingMenuItem = {
  label: string;
  href: string;
  /** Render only for logged-in internal (student / teacher) users. */
  isInternal?: boolean;
  /**
   * Narrow an internal entry with an access filter (see lib/access). Only
   * meaningful next to `isInternal`; without it the entry falls back to
   * `{ isInternal: true }` (students / teachers).
   */
  filter?: Filter;
};

type FloatingMenuProps = {
  items: FloatingMenuItem[];
};

function FloatingMenuLink({ item }: { item: FloatingMenuItem }) {
  return (
    <Link href={item.href} className={styles.link}>
      {item.label}
    </Link>
  );
}

/**
 * Chooses which links exist, then hands them to the client shell as children.
 * Entries flagged `isInternal` are wrapped in <Internal>, which resolves the
 * shared session cookie on the server — so the menu follows login state without
 * the browser ever learning what it was not allowed to see. The wrapper always
 * passes a filter: the item's own, or `{ isInternal: true }` when the item
 * names none.
 *
 * An item hidden this way leaves no trace in the HTML; <Internal> renders null.
 * Every call site therefore wants at least one ungated entry, or a logged-out
 * visitor opens an empty menu.
 */
export function FloatingMenu({ items }: FloatingMenuProps) {
  return (
    <FloatingMenuShell>
      {items.map((item) =>
        item.isInternal ? (
          <Internal
            key={item.href}
            filter={item.filter ?? { isInternal: true }}
          >
            <FloatingMenuLink item={item} />
          </Internal>
        ) : (
          <FloatingMenuLink key={item.href} item={item} />
        ),
      )}
    </FloatingMenuShell>
  );
}
