// https://youtu.be/EFucgPdjeNg?t=712

// BUG - styl eimportowane tutaj nie zadziałają
// import "../styles/globals.css";

// import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    // <SessionProvider session={session}>
    <Component {...pageProps} />
    // </SessionProvider>
  );
}
