import { pgTable, bigserial, varchar, text, timestamp, bigint, integer, boolean, primaryKey, unique, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import type { AdapterAccount } from '@auth/core/adapters';
import * as t from "drizzle-orm/pg-core";

// NextAuth.js Tables
export const users = pgTable('users', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull(),
  emailVerified: timestamp('email_verified', { mode: 'date' }),
  image: varchar('image', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  modifiedAt: timestamp('modified_at').defaultNow().notNull(),
  archivedAt: timestamp('archived_at'),
})

export const accounts = pgTable(
  'accounts',
  {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    userId: bigint('user_id', { mode: 'number' })
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: varchar('type', { length: 255 })
      .$type<AdapterAccount['type']>()
      .notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('provider_account_id', { length: 255 }).notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: varchar('token_type', { length: 255 }),
    scope: varchar('scope', { length: 255 }),
    id_token: text('id_token'),
    session_state: varchar('session_state', { length: 255 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    modifiedAt: timestamp('modified_at').defaultNow().notNull(),
    archivedAt: timestamp('archived_at'),
  },
  (account) => ({
    uniqueProviderAccount: unique().on(account.provider, account.providerAccountId),
  })
)

export const sessions = pgTable('sessions', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  sessionToken: varchar('session_token', { length: 255 }).notNull().unique(),
  userId: bigint('user_id', { mode: 'number' })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  modifiedAt: timestamp('modified_at').defaultNow().notNull(),
  archivedAt: timestamp('archived_at'),
})

export const verificationTokens = pgTable(
  'verification_tokens',
  {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    identifier: varchar('identifier', { length: 255 }).notNull(),
    token: varchar('token', { length: 255 }).notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    modifiedAt: timestamp('modified_at').defaultNow().notNull(),
    archivedAt: timestamp('archived_at'),
  },
  (vt) => ({
    uniqueIdentifierToken: unique().on(vt.identifier, vt.token),
  })
)

// Sidewalks-specific user extensions
export const userProfiles = pgTable('user_profiles', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  userId: bigint('user_id', { mode: 'number' }).notNull().references(() => users.id, { onDelete: 'cascade' }),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  modifiedAt: timestamp('modified_at').defaultNow().notNull(),
  archivedAt: timestamp('archived_at'),
});

// Activities table
export const activities = pgTable('activities', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  links: text('links'), // JSON array of links
  schedule: text('schedule'), // JSON object for schedule details
  maxFrequencyDays: integer('max_frequency_days'), // frequency in days (null for never)
  deadline: timestamp('deadline'), // for activities that expire
  createdByUserId: bigint('created_by_user_id', { mode: 'number' }).references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  modifiedAt: timestamp('modified_at').defaultNow().notNull(),
  archivedAt: timestamp('archived_at'),
});

// Playlists table
export const playlists = pgTable('playlists', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  createdByUserId: bigint('created_by_user_id', { mode: 'number' }).references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  modifiedAt: timestamp('modified_at').defaultNow().notNull(),
  archivedAt: timestamp('archived_at'),
});

// Playlist Activities (many-to-many relationship)
export const playlistActivities = pgTable('playlist_activities', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  playlistId: bigint('playlist_id', { mode: 'number' }).references(() => playlists.id, { onDelete: 'cascade' }).notNull(),
  activityId: bigint('activity_id', { mode: 'number' }).references(() => activities.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  uniquePlaylistActivity: unique().on(table.playlistId, table.activityId),
}));

// Playlist Watchers (users who can view a playlist)
export const playlistWatchers = pgTable('playlist_watchers', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  playlistId: bigint('playlist_id', { mode: 'number' }).references(() => playlists.id, { onDelete: 'cascade' }).notNull(),
  userId: bigint('user_id', { mode: 'number' }).references(() => users.id, { onDelete: 'cascade' }).notNull(),
  inviteStatus: varchar('invite_status', { length: 20 }).notNull().default('pending'), // pending, accepted, archived
  createdAt: timestamp('created_at').defaultNow().notNull(),
  modifiedAt: timestamp('modified_at').defaultNow().notNull(),
}, (table) => ({
  uniquePlaylistUser: unique().on(table.playlistId, table.userId),
}));

// Activity Interest (users rating activities 1-5)
export const activityInterest = pgTable('activity_interest', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  activityId: bigint('activity_id', { mode: 'number' }).references(() => activities.id, { onDelete: 'cascade' }).notNull(),
  userId: bigint('user_id', { mode: 'number' }).references(() => users.id, { onDelete: 'cascade' }).notNull(),
  interestLevel: integer('interest_level').notNull(), // 1-5 scale
  createdAt: timestamp('created_at').defaultNow().notNull(),
  modifiedAt: timestamp('modified_at').defaultNow().notNull(),
}, (table) => ({
  uniqueActivityUser: unique().on(table.activityId, table.userId),
}));

// Google Calendar Integration
export const googleCalendarEvents = pgTable('google_calendar_events', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  userId: bigint('user_id', { mode: 'number' }).references(() => users.id, { onDelete: 'cascade' }).notNull(),
  activityId: bigint('activity_id', { mode: 'number' }).references(() => activities.id, { onDelete: 'cascade' }).notNull(),
  googleEventId: varchar('google_event_id', { length: 255 }).notNull(),
  googleCalendarId: varchar('google_calendar_id', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Activity Participation History
export const activityParticipation = pgTable('activity_participation', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  activityId: bigint('activity_id', { mode: 'number' }).references(() => activities.id, { onDelete: 'cascade' }).notNull(),
  userId: bigint('user_id', { mode: 'number' }).references(() => users.id, { onDelete: 'cascade' }).notNull(),
  participatedAt: timestamp('participated_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many, one }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  // Direct relations to user-created content
  activities: many(activities),
  playlists: many(playlists),
  playlistWatchers: many(playlistWatchers),
  activityInterest: many(activityInterest),
  googleCalendarEvents: many(googleCalendarEvents),
  activityParticipation: many(activityParticipation),
}));

export const userProfilesRelations = relations(userProfiles, ({ one }) => ({
  user: one(users, {
    fields: [userProfiles.userId],
    references: [users.id],
  }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const activitiesRelations = relations(activities, ({ one, many }) => ({
  createdByUser: one(users, {
    fields: [activities.createdByUserId],
    references: [users.id],
  }),
  playlistActivities: many(playlistActivities),
  activityInterest: many(activityInterest),
  googleCalendarEvents: many(googleCalendarEvents),
  activityParticipation: many(activityParticipation),
}));

export const playlistsRelations = relations(playlists, ({ one, many }) => ({
  createdByUser: one(users, {
    fields: [playlists.createdByUserId],
    references: [users.id],
  }),
  playlistActivities: many(playlistActivities),
  playlistWatchers: many(playlistWatchers),
}));

export const playlistActivitiesRelations = relations(playlistActivities, ({ one }) => ({
  playlist: one(playlists, {
    fields: [playlistActivities.playlistId],
    references: [playlists.id],
  }),
  activity: one(activities, {
    fields: [playlistActivities.activityId],
    references: [activities.id],
  }),
}));

export const playlistWatchersRelations = relations(playlistWatchers, ({ one }) => ({
  playlist: one(playlists, {
    fields: [playlistWatchers.playlistId],
    references: [playlists.id],
  }),
  user: one(users, {
    fields: [playlistWatchers.userId],
    references: [users.id],
  }),
}));

export const activityInterestRelations = relations(activityInterest, ({ one }) => ({
  activity: one(activities, {
    fields: [activityInterest.activityId],
    references: [activities.id],
  }),
  user: one(users, {
    fields: [activityInterest.userId],
    references: [users.id],
  }),
}));

export const googleCalendarEventsRelations = relations(googleCalendarEvents, ({ one }) => ({
  user: one(users, {
    fields: [googleCalendarEvents.userId],
    references: [users.id],
  }),
  activity: one(activities, {
    fields: [googleCalendarEvents.activityId],
    references: [activities.id],
  }),
}));

export const activityParticipationRelations = relations(activityParticipation, ({ one }) => ({
  activity: one(activities, {
    fields: [activityParticipation.activityId],
    references: [activities.id],
  }),
  user: one(users, {
    fields: [activityParticipation.userId],
    references: [users.id],
  }),
}));