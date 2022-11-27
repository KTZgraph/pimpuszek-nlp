import NavBar from "./NavBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <NavBar />
        <div>{children}</div>
      </body>
    </html>
  );
}
