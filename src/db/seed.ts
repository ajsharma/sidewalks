import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema.js';

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/sidewalks_dev',
});

const db = drizzle(pool, { schema });

// Using basic logic to avoid problems where Drizzle creating duplicate pairs of 
// unique values.
async function seedSimple() {
  console.log('🌱 Seeding database with simple controlled data...');

  try {
    // Seed users (IDs will be auto-generated)
    console.log('👥 Seeding users...');
    const users = await db.insert(schema.users).values([
      { name: 'Alex Johnson', email: 'alex@example.com', emailVerified: new Date() },
      { name: 'Maria Garcia', email: 'maria@example.com', emailVerified: new Date() },
      { name: 'David Chen', email: 'david@example.com', emailVerified: new Date() },
      { name: 'Sarah Williams', email: 'sarah@example.com', emailVerified: new Date() },
      { name: 'James Rodriguez', email: 'james@example.com', emailVerified: new Date() },
    ]).returning({ id: schema.users.id });
    
    console.log(`✅ Created ${users.length} users`);

    // Seed user profiles
    console.log('📝 Seeding user profiles...');
    await db.insert(schema.userProfiles).values([
      { userId: users[0].id, slug: 'alex-johnson' },
      { userId: users[1].id, slug: 'maria-garcia' },
      { userId: users[2].id, slug: 'david-chen' },
      { userId: users[3].id, slug: 'sarah-williams' },
      { userId: users[4].id, slug: 'james-rodriguez' },
    ]);
    console.log('✅ Created user profiles');

    // Seed activities
    console.log('🎯 Seeding activities...');
    const activities = await db.insert(schema.activities).values([
      {
        slug: 'golden-gate-park-walk',
        name: 'Golden Gate Park Nature Walk',
        description: 'Explore the beautiful trails and gardens of Golden Gate Park.',
        createdByUserId: users[0].id,
      },
      {
        slug: 'sf-museum-modern-art',
        name: 'SF Museum of Modern Art Visit',
        description: 'Discover contemporary and modern art at SFMOMA.',
        createdByUserId: users[1].id,
      },
      {
        slug: 'fishermans-wharf-seafood',
        name: 'Fisherman\'s Wharf Seafood Tour',
        description: 'Sample the best seafood at Fisherman\'s Wharf.',
        createdByUserId: users[2].id,
      },
      {
        slug: 'yoga-in-the-park',
        name: 'Morning Yoga in Dolores Park',
        description: 'Join a community yoga session in the beautiful Dolores Park.',
        createdByUserId: users[3].id,
      },
      {
        slug: 'alcatraz-island-tour',
        name: 'Alcatraz Island Audio Tour',
        description: 'Take the ferry to Alcatraz Island and explore the famous former prison.',
        createdByUserId: users[4].id,
      },
    ]).returning({ id: schema.activities.id });
    
    console.log(`✅ Created ${activities.length} activities`);

    // Seed playlists
    console.log('📋 Seeding playlists...');
    const playlists = await db.insert(schema.playlists).values([
      {
        slug: 'weekend-adventures',
        name: 'Weekend Adventures',
        description: 'Perfect activities for Saturday and Sunday exploration',
        createdByUserId: users[0].id,
      },
      {
        slug: 'cultural-experiences',
        name: 'Cultural Experiences',
        description: 'Museums, art galleries, and cultural sites',
        createdByUserId: users[1].id,
      },
      {
        slug: 'active-lifestyle',
        name: 'Active Lifestyle',
        description: 'Outdoor activities, fitness, and wellness experiences',
        createdByUserId: users[3].id,
      },
    ]).returning({ id: schema.playlists.id });
    
    console.log(`✅ Created ${playlists.length} playlists`);

    // Seed playlist activities (many-to-many) - ensuring no duplicates
    console.log('🔗 Seeding playlist activities...');
    await db.insert(schema.playlistActivities).values([
      { playlistId: playlists[0].id, activityId: activities[0].id }, // Weekend Adventures -> Golden Gate Park
      { playlistId: playlists[0].id, activityId: activities[4].id }, // Weekend Adventures -> Alcatraz
      { playlistId: playlists[1].id, activityId: activities[1].id }, // Cultural -> SFMOMA
      { playlistId: playlists[2].id, activityId: activities[0].id }, // Active -> Golden Gate Park
      { playlistId: playlists[2].id, activityId: activities[3].id }, // Active -> Yoga
    ]);
    console.log('✅ Created playlist activities');

    // Seed playlist watchers (ensuring no duplicates)
    console.log('👀 Seeding playlist watchers...');
    await db.insert(schema.playlistWatchers).values([
      { playlistId: playlists[0].id, userId: users[1].id, inviteStatus: 'accepted' }, // Maria watches Weekend Adventures
      { playlistId: playlists[0].id, userId: users[2].id, inviteStatus: 'accepted' }, // David watches Weekend Adventures
      { playlistId: playlists[1].id, userId: users[0].id, inviteStatus: 'accepted' }, // Alex watches Cultural
      { playlistId: playlists[2].id, userId: users[0].id, inviteStatus: 'pending' },  // Alex invited to Active
    ]);
    console.log('✅ Created playlist watchers');

    // Seed activity interest (ensuring no duplicates)
    console.log('⭐ Seeding activity interest...');
    await db.insert(schema.activityInterest).values([
      { activityId: activities[0].id, userId: users[0].id, interestLevel: 5 }, // Alex loves Golden Gate Park
      { activityId: activities[1].id, userId: users[1].id, interestLevel: 4 }, // Maria likes SFMOMA
      { activityId: activities[2].id, userId: users[2].id, interestLevel: 5 }, // David loves Seafood Tour
      { activityId: activities[3].id, userId: users[3].id, interestLevel: 5 }, // Sarah loves Yoga
      { activityId: activities[0].id, userId: users[1].id, interestLevel: 3 }, // Maria interested in Golden Gate Park
      { activityId: activities[1].id, userId: users[0].id, interestLevel: 4 }, // Alex likes SFMOMA
    ]);
    console.log('✅ Created activity interest ratings');

    // Seed activity participation
    console.log('📅 Seeding activity participation...');
    await db.insert(schema.activityParticipation).values([
      { activityId: activities[0].id, userId: users[0].id, participatedAt: new Date('2024-01-15') },
      { activityId: activities[1].id, userId: users[1].id, participatedAt: new Date('2024-01-20') },
      { activityId: activities[3].id, userId: users[3].id, participatedAt: new Date('2024-02-10') },
      { activityId: activities[0].id, userId: users[1].id, participatedAt: new Date('2024-02-15') },
    ]);
    console.log('✅ Created activity participation records');

    console.log('🎉 Database seeding completed successfully!');

    // Summary
    console.log('\n📊 Seeding Summary:');
    console.log(`   Users: ${users.length}`);
    console.log(`   User Profiles: ${users.length}`);
    console.log(`   Activities: ${activities.length}`);
    console.log(`   Playlists: ${playlists.length}`);
    console.log(`   Playlist Activities: 5`);
    console.log(`   Playlist Watchers: 4`);
    console.log(`   Activity Interest: 6`);
    console.log(`   Activity Participation: 4`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

// Run if called directly  
if (import.meta.url === `file://${process.argv[1]}`) {
  seedSimple()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

export { seedSimple };