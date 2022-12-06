import Providers from "./providers";
import Header from "./Header";

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <Header />
        <main>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
