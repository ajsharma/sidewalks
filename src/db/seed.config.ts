import type { SeedConfig } from 'drizzle-seed';

export const seedConfig: SeedConfig = {
  // Use deterministic seed for reproducible data
  seed: 12345,
  
  // Database connection
  connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/sidewalks_dev',
  
  // Seeding options
  verbose: true,
  reset: true, // Clear database before seeding
  
  // Custom data for specific use cases
  customData: {
    sanFranciscoActivities: [
      'Golden Gate Park Nature Walk',
      'SF Museum of Modern Art Visit',
      'Fisherman\'s Wharf Seafood Tour',
      'Morning Yoga in Dolores Park',
      'Alcatraz Island Audio Tour',
      'Chinatown Food Walking Tour',
      'Crissy Field to Golden Gate Bridge Bike Ride',
      'Mission District Mural Art Walk'
    ],
    playlistTypes: [
      'Weekend Adventures',
      'Cultural Experiences',
      'Foodie Favorites',
      'Active Lifestyle',
      'Tourist Must-Sees'
    ],
    userSlugs: [
      'alex-johnson',
      'maria-garcia', 
      'david-chen',
      'sarah-williams',
      'james-rodriguez'
    ]
  }
};