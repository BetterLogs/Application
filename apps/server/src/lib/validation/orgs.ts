import { z } from 'zod';

const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 64;
const SLUG_MIN_LENGTH = 2;
const SLUG_MAX_LENGTH = 64;

export const CreateOrgSchema = z.object({
  name: z
    .string()
    .min(NAME_MIN_LENGTH, {
      message: `Name must be at least ${NAME_MIN_LENGTH} characters.`,
    })
    .max(NAME_MAX_LENGTH, {
      message: `Name must be at most ${NAME_MAX_LENGTH} characters.`,
    }),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, {
      message:
        'Slug must contain only lowercase letters, numbers, and hyphens.',
    })
    .min(SLUG_MIN_LENGTH, {
      message: `Slug must be at least ${SLUG_MIN_LENGTH} characters.`,
    })
    .max(SLUG_MAX_LENGTH, {
      message: `Slug must be at most ${SLUG_MAX_LENGTH} characters.`,
    }),
  logo: z.string().optional(),
});
