'use client';
import { useEffect, useId, useState } from 'react';

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

export default function CreateTeamModal() {
  const id = useId();
  const [teamName, setTeamName] = useState('');
  const [teamSlug, setTeamSlug] = useState('');
  const [teamLogo, setTeamLogo] = useState('');

  useEffect(() => {
    const slug = teamName
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    setTeamSlug(slug);
  }, [teamName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle team creation
    // Handle team creation logic here
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Team</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <div
            aria-hidden="true"
            className="flex size-11 shrink-0 items-center justify-center rounded-full border"
          >
            <svg
              aria-hidden="true"
              className="stroke-zinc-800 dark:stroke-zinc-100"
              height="20"
              viewBox="0 0 24 24"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
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
              Create a new team
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              Set up your team in a few simple steps.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`${id}-name`}>Team name</Label>
              <Input
                id={`${id}-name`}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="My awesome team"
                required
                type="text"
                value={teamName}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${id}-slug`}>Team slug</Label>
              <Input
                id={`${id}-slug`}
                onChange={(e) => setTeamSlug(e.target.value)}
                placeholder="my-awesome-team"
                required
                type="text"
                value={teamSlug}
              />
              <p className="text-muted-foreground text-sm">
                Used in your team's URL. Generated automatically from the name.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${id}-logo`}>Team logo (URL)</Label>
              <Input
                id={`${id}-logo`}
                onChange={(e) => setTeamLogo(e.target.value)}
                placeholder="https://example.com/logo.png"
                type="url"
                value={teamLogo}
              />
              <p className="text-muted-foreground text-sm">
                URL to your team's logo (optional).
              </p>
            </div>
          </div>

          <Button className="w-full" type="submit">
            Create team
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
