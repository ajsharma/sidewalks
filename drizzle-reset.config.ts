// drizzle-reset.config.ts
// https://github.com/drizzle-team/drizzle-orm/discussions/3906#discussioncomment-13908792
// 
// Used to as a clean slate to reset the entire database
import type { Config } from 'drizzle-kit';

export default {
  schema: "./src/db/schema-empty.ts",
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgresql://localhost:5432/sidewalks_dev',
  },
} satisfies Config;