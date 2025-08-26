import { authClient } from '@/lib/auth-client';

export const createOrganization = async (params: {
  name: string;
  slug: string;
  logo?: string;
}): Promise<string | null> => {
  const { error } = await authClient.organization.create({
    name: params.name,
    slug: params.slug,
    logo: params.logo || undefined,
    metadata: undefined,
    keepCurrentActiveOrganization: false,
  });

  return error ? (error.message ?? 'Failed to create organization') : null;
};

export const validateSlug = async (slug: string): Promise<string | null> => {
  const { error } = await authClient.organization.checkSlug({ slug });
  if (!error) {
    return null;
  }

  if (error.code === 'SLUG_IS_TAKEN') {
    return 'This slug is already taken.';
  }

  return error.message ?? 'Failed to check slug';
};
