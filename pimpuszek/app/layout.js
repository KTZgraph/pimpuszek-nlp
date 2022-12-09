import Providers from "./providers";
import Header from "./Header";

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
