import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { seed } from 'drizzle-seed';
import * as schema from './schema.js';

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/sidewalks_dev',
});

const db = drizzle(pool, { schema });

async function seedDrizzle() {
  console.log('🌱 Seeding database with Drizzle Seed...');

  try {
    await seed(db, schema, { seed: 12345 }).refine((funcs) => ({
      // Seed users first
      users: {
        count: 5,
        columns: {
          id: funcs.sequential({ prefix: 'user_' }),
          name: funcs.fullName(),
          email: funcs.email(),
          emailVerified: funcs.date({ minDate: new Date('2024-01-01'), maxDate: new Date('2024-02-01') }),
          image: funcs.url(),
        },
      },

      // User profiles
      userProfiles: {
        count: 5,
        columns: {
          slug: funcs.valuesFromArray({
            values: ['alex-johnson', 'maria-garcia', 'david-chen', 'sarah-williams', 'james-rodriguez']
          }),
          createdAt: funcs.date({ minDate: new Date('2024-01-01'), maxDate: new Date('2024-02-20') }),
          modifiedAt: funcs.date({ minDate: new Date('2024-01-01'), maxDate: new Date('2024-02-20') }),
        },
      },

      // Activities
      activities: {
        count: 8,
        columns: {
          slug: funcs.valuesFromArray({
            values: [
              'golden-gate-park-walk',
              'sf-museum-modern-art', 
              'fishermans-wharf-seafood',
              'yoga-in-the-park',
              'alcatraz-island-tour',
              'chinatown-food-walk',
              'crissy-field-bike-ride',
              'mission-district-murals'
            ]
          }),
          name: funcs.valuesFromArray({
            values: [
              'Golden Gate Park Nature Walk',
              'SF Museum of Modern Art Visit',
              'Fisherman\'s Wharf Seafood Tour',
              'Morning Yoga in Dolores Park',
              'Alcatraz Island Audio Tour',
              'Chinatown Food Walking Tour',
              'Crissy Field to Golden Gate Bridge Bike Ride',
              'Mission District Mural Art Walk'
            ]
          }),
          description: funcs.loremIpsum({ sentencesCount: 2 }),
          links: funcs.json(),
          schedule: funcs.json(),
          maxFrequencyDays: funcs.int({ min: 1, max: 30 }),
          createdAt: funcs.date({ minDate: new Date('2024-01-15'), maxDate: new Date('2024-02-25') }),
          modifiedAt: funcs.date({ minDate: new Date('2024-01-15'), maxDate: new Date('2024-02-25') }),
        },
      },

      // Playlists
      playlists: {
        count: 5,
        columns: {
          slug: funcs.valuesFromArray({
            values: [
              'weekend-adventures',
              'cultural-experiences', 
              'foodie-favorites',
              'active-lifestyle',
              'tourist-must-sees'
            ]
          }),
          name: funcs.valuesFromArray({
            values: [
              'Weekend Adventures',
              'Cultural Experiences',
              'Foodie Favorites', 
              'Active Lifestyle',
              'Tourist Must-Sees'
            ]
          }),
          description: funcs.loremIpsum({ sentencesCount: 1 }),
          createdAt: funcs.date({ minDate: new Date('2024-01-16'), maxDate: new Date('2024-02-16') }),
          modifiedAt: funcs.date({ minDate: new Date('2024-01-16'), maxDate: new Date('2024-02-16') }),
        },
      },

      // Playlist Activities (many-to-many)
      playlistActivities: {
        count: 20,
        columns: {
          createdAt: funcs.date({ minDate: new Date('2024-01-16'), maxDate: new Date('2024-02-16') }),
        },
      },

      // Playlist Watchers
      playlistWatchers: {
        count: 12,
        columns: {
          inviteStatus: funcs.weightedRandom([
            { weight: 0.7, value: 'accepted' },
            { weight: 0.2, value: 'pending' },
            { weight: 0.1, value: 'archived' }
          ]),
          createdAt: funcs.date({ minDate: new Date('2024-01-16'), maxDate: new Date('2024-02-19') }),
          modifiedAt: funcs.date({ minDate: new Date('2024-01-17'), maxDate: new Date('2024-02-19') }),
        },
      },

      // Activity Interest
      activityInterest: {
        count: 20,
        columns: {
          interestLevel: funcs.int({ min: 1, max: 5 }),
          createdAt: funcs.date({ minDate: new Date('2024-01-15'), maxDate: new Date('2024-02-25') }),
          modifiedAt: funcs.date({ minDate: new Date('2024-01-15'), maxDate: new Date('2024-02-25') }),
        },
      },

      // Activity Participation
      activityParticipation: {
        count: 15,
        columns: {
          participatedAt: funcs.date({ minDate: new Date('2024-01-16'), maxDate: new Date('2024-02-26') }),
          createdAt: funcs.date({ minDate: new Date('2024-01-16'), maxDate: new Date('2024-02-26') }),
        },
      },

      // Google Calendar Events
      googleCalendarEvents: {
        count: 7,
        columns: {
          googleEventId: funcs.sequential({ prefix: 'event_' }),
          calendarId: funcs.default('primary'),
          createdAt: funcs.date({ minDate: new Date('2024-01-16'), maxDate: new Date('2024-02-26') }),
        },
      },
    }));

    console.log('🎉 Database seeded successfully with Drizzle Seed!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDrizzle()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

export { seedDrizzle };