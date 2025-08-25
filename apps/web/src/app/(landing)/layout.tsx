import Navbar from '@/components/navigation/navbar';

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="container mx-auto max-w-7xl">{children}</main>
    </>
  );
}
