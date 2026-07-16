import Link from "next/link";

import { Internal } from "@/components/Internal";
import { Filter } from "@/lib/access";

import styles from "./floating.module.css";
import { FloatingMenuShell } from "./FloatingMenuShell";

export type FloatingMenuItem = {
  label: string;
  href: string;
  filter?: Filter;
};

type FloatingMenuProps = {
  items: FloatingMenuItem[];
};

export function FloatingMenu({ items }: FloatingMenuProps) {
  return (
    <FloatingMenuShell>
      {items.map((item) => (
        <Internal key={item.href} filter={item.filter ?? { isInternal: true }}>
          <FloatingMenuLink item={item} />
        </Internal>
      ))}
    </FloatingMenuShell>
  );
}

function FloatingMenuLink({ item }: { item: FloatingMenuItem }) {
  return (
    <Link href={item.href} className={styles.link}>
      {item.label}
    </Link>
  );
}
