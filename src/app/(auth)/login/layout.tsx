export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="min-h-screen w-full">{children}</section>;
}
