/** biome-ignore-all lint/style/noMagicNumbers: <Later> */
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { organization } from 'better-auth/plugins';
import { validator } from 'validation-better-auth';
import { z } from 'zod';
import { db } from '../db';
import * as schema from '../db/schema/auth';
import { CreateOrgSchema } from './validation/orgs';

const SignupSchema = z.object({
  name: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[A-Za-z0-9]+$/),
  email: z.email(),
  password: z.string().min(12).max(128),
});

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  trustedOrigins: [process.env.CORS_ORIGIN || ''],
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    defaultCookieAttributes: {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
      partitioned: true,
    },
  },
  plugins: [
    validator([
      { path: '/sign-up/email', schema: SignupSchema },
      {
        path: 'organization/create',
        schema: CreateOrgSchema,
      },
    ]),
    organization({
      organizationLimit: 1,
    }),
  ],
});
