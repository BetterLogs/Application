import type { User } from 'better-auth/types';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Navbar from '@/components/navigation/dashboard/navbar';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // TODO: Find a better way to get the session using auth.api.getSession() / I didn't manage to make it working
  const headersList = await headers();
  const cookies = headersList.get('cookie') || '';

  let user: User | null = null;

  const response = await fetch('http://localhost:3000/api/auth/get-session', {
    method: 'GET',
    headers: {
      Cookie: cookies,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (response.ok) {
    const data = await response.json();
    user = data.user;
  }

  if (!user) {
    redirect('/');
  }

  return (
    <>
      <Navbar user={user} />
      <main className="container mx-auto max-w-7xl">{children}</main>
    </>
  );
}
