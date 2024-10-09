import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const contacts = pgTable('contacts', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email'),
  phone: text('phone'),
  company: text('company'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const relationships = pgTable('relationships', {
  id: serial('id').primaryKey(),
  sourceId: serial('source_id').references(() => contacts.id),
  targetId: serial('target_id').references(() => contacts.id),
  type: text('type').notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
});