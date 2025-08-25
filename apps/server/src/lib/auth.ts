import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '../db';
import * as schema from '../db/schema/auth';
import { validator } from "validation-better-auth";
import { z } from "zod";

const SignupSchema = z.object({
  name: z.string()
    .min(2)
    .max(50)
    .regex(/^[A-Za-z0-9]+$/),
  email: z.email(),
  password: z.string()
    .min(12)
    .max(128)
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
    },
  },
   plugins: [
    validator([
      { path: "/sign-up/email", schema: SignupSchema },
    ]),
  ],
});
