import HeadBar from '@/components/head-bar';

export default function TransaksiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen w-full">
      <HeadBar title="Transaksi" backHref="/" />
      {children}
    </section>
  );
}
