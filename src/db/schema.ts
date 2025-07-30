import { pgTable, bigserial, varchar, text, timestamp, bigint, integer, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table
export const users = pgTable('users', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
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
  playlistId: bigint('playlist_id', { mode: 'number' }).references(() => playlists.id).notNull(),
  activityId: bigint('activity_id', { mode: 'number' }).references(() => activities.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Playlist Watchers (users who can view a playlist)
export const playlistWatchers = pgTable('playlist_watchers', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  playlistId: bigint('playlist_id', { mode: 'number' }).references(() => playlists.id).notNull(),
  userId: bigint('user_id', { mode: 'number' }).references(() => users.id).notNull(),
  inviteStatus: varchar('invite_status', { length: 20 }).notNull().default('pending'), // pending, accepted, archived
  createdAt: timestamp('created_at').defaultNow().notNull(),
  modifiedAt: timestamp('modified_at').defaultNow().notNull(),
});

// Activity Interest (users rating activities 1-5)
export const activityInterest = pgTable('activity_interest', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  activityId: bigint('activity_id', { mode: 'number' }).references(() => activities.id).notNull(),
  userId: bigint('user_id', { mode: 'number' }).references(() => users.id).notNull(),
  interestLevel: integer('interest_level').notNull(), // 1-5 scale
  createdAt: timestamp('created_at').defaultNow().notNull(),
  modifiedAt: timestamp('modified_at').defaultNow().notNull(),
});

// Google Calendar Integration
export const googleCalendarEvents = pgTable('google_calendar_events', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  userId: bigint('user_id', { mode: 'number' }).references(() => users.id).notNull(),
  activityId: bigint('activity_id', { mode: 'number' }).references(() => activities.id).notNull(),
  googleEventId: varchar('google_event_id', { length: 255 }).notNull(),
  calendarId: varchar('calendar_id', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Activity Participation History
export const activityParticipation = pgTable('activity_participation', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  activityId: bigint('activity_id', { mode: 'number' }).references(() => activities.id).notNull(),
  userId: bigint('user_id', { mode: 'number' }).references(() => users.id).notNull(),
  participatedAt: timestamp('participated_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  activities: many(activities),
  playlists: many(playlists),
  playlistWatchers: many(playlistWatchers),
  activityInterest: many(activityInterest),
  googleCalendarEvents: many(googleCalendarEvents),
  activityParticipation: many(activityParticipation),
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