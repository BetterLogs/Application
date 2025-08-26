'use client';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreateOrgSchema } from '../../../../../../server/src/lib/validation/orgs';
import { createOrganization, validateSlug } from './helpers/orgs';
import OrganizationImage from './team-image';

function getFieldErrors(result: ReturnType<typeof CreateOrgSchema.safeParse>) {
  const fieldErrors: { name?: string; slug?: string } = {};
  if (Array.isArray(result.error?.issues)) {
    for (const err of result.error.issues) {
      if (err.path[0] === 'name') {
        fieldErrors.name = err.message;
      }
      if (err.path[0] === 'slug') {
        fieldErrors.slug = err.message;
      }
    }
  }
  return fieldErrors;
}

async function tryCreateOrganization({
  name,
  slug,
  logo,
}: {
  name: string;
  slug: string;
  logo: string;
}) {
  const slugErrorMsg = await validateSlug(slug);
  if (slugErrorMsg) {
    toast.error(slugErrorMsg);
    return false;
  }

  const createErrorMsg = await createOrganization({ name, slug, logo });
  if (createErrorMsg) {
    toast.error(createErrorMsg);
    return false;
  }

  toast.success('Organization created');
  return true;
}

export default function CreateOrganizationModal() {
  const [organizationName, setOrganizationName] = useState('');
  const [organizationSlug, setOrganizationSlug] = useState('');
  const [organizationLogo, setOrganizationLogo] = useState('');
  const [manualSlug, setManualSlug] = useState(false);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [errors, setErrors] = useState<{ name?: string; slug?: string }>({});

  useEffect(() => {
    if (manualSlug) {
      return;
    }

    const slug = organizationName
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    setOrganizationSlug(slug);
  }, [organizationName, manualSlug]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      const result = CreateOrgSchema.safeParse({
        name: organizationName,
        slug: organizationSlug,
        logo: organizationLogo,
      });

      if (!result.success) {
        setErrors(getFieldErrors(result));
        setLoading(false);
        return;
      }
      setErrors({});

      try {
        const created = await tryCreateOrganization({
          name: organizationName,
          slug: organizationSlug,
          logo: organizationLogo,
        });

        if (created) {
          setOrganizationName('');
          setOrganizationSlug('');
          setOrganizationLogo('');
          setManualSlug(false);
          setOpen(false);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    },
    [organizationName, organizationSlug, organizationLogo]
  );

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button>Create Organization</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <OrganizationImage />
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              Create a new Organization
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              Set up your Organization in a few simple steps.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5" noValidate onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Organization name</Label>
              <Input
                aria-describedby={errors.name ? 'org-name-error' : undefined}
                aria-invalid={!!errors.name}
                id="name"
                maxLength={21}
                minLength={2}
                onChange={(e) => setOrganizationName(e.target.value)}
                placeholder="My awesome organization"
                required
                type="text"
                value={organizationName}
              />
              {errors.name && (
                <p className="text-destructive text-sm" id="org-name-error">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Organization slug</Label>
              <Input
                aria-describedby={errors.slug ? 'org-slug-error' : undefined}
                aria-invalid={!!errors.slug}
                id="slug"
                maxLength={21}
                minLength={2}
                onChange={(e) => {
                  setOrganizationSlug(e.target.value);
                  setManualSlug(true);
                }}
                placeholder="my-awesome-organization"
                required
                type="text"
                value={organizationSlug}
              />
              {errors.slug && (
                <p className="text-destructive text-sm" id="org-slug-error">
                  {errors.slug}
                </p>
              )}
              <p className="text-muted-foreground text-sm">
                Used in your Organization&apos;s URL. Generated automatically
                from the name.
              </p>
            </div>
          </div>

          <Button className="w-full" disabled={loading} type="submit">
            {loading ? 'Creating…' : 'Create Organization'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
