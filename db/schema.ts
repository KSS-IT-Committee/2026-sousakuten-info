import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

import { CLASSNAMES } from "@/lib/classes";

export const classEnum = pgEnum("class_name", CLASSNAMES);

// 減点クラスDB — per-class deductions (issue #3)
export const deductions = pgTable("deductions", {
  id: serial("id").primaryKey(),
  className: classEnum("class_name").notNull(),
  content: text("content").notNull(),
  points: integer("points").notNull(),
  occurredAt: timestamp("occurred_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// 伝達内容DB — announcement bodies (issue #3)
export const announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// 伝達クラスDB — junction linking announcements to the classes they target (issue #3)
export const announcementClasses = pgTable(
  "announcement_classes",
  {
    id: serial("id").primaryKey(),
    announcementId: integer("announcement_id")
      .notNull()
      .references(() => announcements.id, { onDelete: "cascade" }),
    className: classEnum("class_name").notNull(),
  },
  (table) => [unique().on(table.announcementId, table.className)],
);

export const announcementsRelations = relations(announcements, ({ many }) => ({
  classes: many(announcementClasses),
}));

export const announcementClassesRelations = relations(
  announcementClasses,
  ({ one }) => ({
    announcement: one(announcements, {
      fields: [announcementClasses.announcementId],
      references: [announcements.id],
    }),
  }),
);

export type Deduction = typeof deductions.$inferSelect;
export type NewDeduction = typeof deductions.$inferInsert;
export type Announcement = typeof announcements.$inferSelect;
export type NewAnnouncement = typeof announcements.$inferInsert;
export type AnnouncementClass = typeof announcementClasses.$inferSelect;
export type NewAnnouncementClass = typeof announcementClasses.$inferInsert;
