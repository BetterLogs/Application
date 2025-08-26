'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { authClient } from '@/lib/auth-client';

import CreateTeamModal from './_components/create-team';
export default function Dashboard() {
  const { data: organizations } = authClient.useListOrganizations();

  return (
    <main aria-labelledby="dashboard-heading">
      {organizations?.length === 0 && (
        <section
          aria-describedby="empty-description"
          className="mx-4 mt-6 flex flex-col items-center justify-center gap-6 rounded-lg border border-dashed p-8"
        >
          <div className="text-center">
            <h2 className="font-bold font-mono text-xl">
              Create your Organization
            </h2>
            <p className="max-w-2xl leading-7 [&:not(:first-child)]:mt-6">
              Get started by creating an organization to collaborate with your
              colleagues. You can invite members, assign roles, and configure
              settings.
            </p>
          </div>
          <div className="flex gap-3">
            <CreateTeamModal />
          </div>
        </section>
      )}

      <div className="mx-4 mt-4">
        {organizations?.map((org) => (
          <Card className="w-full max-w-sm" key={org.slug}>
            <CardHeader>
              <CardTitle>{org.name} Organization</CardTitle>
              <CardDescription className="font-mono">
                /{org.slug}
              </CardDescription>
              <CardAction>
                <Avatar>
                  <AvatarImage src={org.logo ?? undefined} />
                  <AvatarFallback>
                    {org.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col gap-2">
              <Button className="w-full" type="submit">
                View
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
