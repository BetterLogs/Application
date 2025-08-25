import { Button } from '@/components/ui/button';
export default function Dashboard() {
  return (
    <main aria-labelledby="dashboard-heading">
      <section
        aria-describedby="empty-description"
        className="mt-6 flex flex-col items-center justify-center gap-6 rounded-lg border border-dashed p-8"
      >
        <div className="text-center">
          <h2 className="font-bold font-mono text-xl">Create your team</h2>
          <p className="max-w-2xl leading-7 [&:not(:first-child)]:mt-6">
            Get started by creating a team to collaborate with your colleagues.
            You can invite members, assign roles, and configure settings.
          </p>
        </div>

        <div className="flex gap-3">
          <Button>Create a team</Button>
        </div>
      </section>
    </main>
  );
}
