import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  return (
    <section className="py-32">
      <div className="container mx-auto text-center">
        <div className="mx-auto flex flex-col gap-6">
          <h1 className="text-3xl lg:text-6xl">
            Your logs deserve better than the console. Meet BetterLogs.
          </h1>
          <p className="text-balance text-muted-foreground lg:text-lg">
            BetterLogs will be <i>(I hope so)</i> a developer-first logging
            solution designed to replace the traditional console.log with an
            easy-to-use system. The goal is to make logging more readable.
          </p>
        </div>
        <Link href="/signup">
          <Button className="mt-2">Sign up</Button>
        </Link>
      </div>
    </section>
  );
};
