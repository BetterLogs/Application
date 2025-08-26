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
import { createOrganization, validateSlug } from './helpers/orgs';

export default function CreateOrganizationModal() {
  const [organizationName, setOrganizationName] = useState('');
  const [organizationSlug, setOrganizationSlug] = useState('');
  const [organizationLogo, setOrganizationLogo] = useState('');
  const [manualSlug, setManualSlug] = useState(false);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

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
      setOpen(false);
      setLoading(true);

      try {
        const slugErrorMsg = await validateSlug(organizationSlug);
        if (slugErrorMsg) {
          toast.error(slugErrorMsg);
          return;
        }

        const createErrorMsg = await createOrganization({
          name: organizationName,
          slug: organizationSlug,
          logo: organizationLogo,
        });

        if (createErrorMsg) {
          toast.error(createErrorMsg);
          return;
        }

        toast.success('Organization created');
        setOrganizationName('');
        setOrganizationSlug('');
        setOrganizationLogo('');
        setManualSlug(false);
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
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full border">
            <svg
              className="stroke-zinc-800 dark:stroke-zinc-100"
              height="20"
              role="img"
              viewBox="0 0 24 24"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Organization icon</title>
              <path
                d="M16 14v6m-4-6v6m-4-6v6M6 10h12l-1-7H7l-1 7Z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              Create a new Organization
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              Set up your Organization in a few simple steps.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={'name'}>Organization name</Label>
              <Input
                id={'name'}
                onChange={(e) => setOrganizationName(e.target.value)}
                placeholder="My awesome organization"
                required
                type="text"
                value={organizationName}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={'slug'}>Organization slug</Label>
              <Input
                id={'slug'}
                onChange={(e) => {
                  setOrganizationSlug(e.target.value);
                  setManualSlug(true);
                }}
                placeholder="my-awesome-organization"
                required
                type="text"
                value={organizationSlug}
              />
              <p className="text-muted-foreground text-sm">
                Used in your Organization's URL. Generated automatically from
                the name.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor={'logo'}>Organization logo (URL)</Label>
              <Input
                id={'logo'}
                onChange={(e) => setOrganizationLogo(e.target.value)}
                placeholder="https://example.com/logo.png"
                type="url"
                value={organizationLogo}
              />
              <p className="text-muted-foreground text-sm">
                URL to your Organization's logo (optional).
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
