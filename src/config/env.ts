import 'dotenv/config';
import { z } from 'zod';

// Define the schema for your environment variables
const envSchema = z.object({
  // Require GH_ACCESS_TOKEN. If missing, Zod will throw an error immediately.
  GH_ACCESS_TOKEN: z.string().min(1, 'GH_ACCESS_TOKEN is required in your .env file'),

  // Example of how you would add more variables later:
  // NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  // API_BASE_URL: z.string().url().optional(),
});

// Parse the environment variables. This throws an error if it's invalid.
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:');
  console.error(parsedEnv.error.format());
  throw new Error('Invalid environment variables');
}

// Export the perfectly typed env object!
export const env = parsedEnv.data;
