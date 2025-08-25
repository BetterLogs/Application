import Link from 'next/link';
import { ModeToggle } from '../mode-toggle';
export default function Navbar() {
  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between p-4">
      <Link className="cursor-pointer" href="/">
        <h1 className="font-bold text-xl">BetterLogs</h1>
      </Link>
      <div className="flex items-center space-x-4">
        <ModeToggle />
      </div>
    </nav>
  );
}
