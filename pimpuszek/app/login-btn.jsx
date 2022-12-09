"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function NextAuthLoginButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        {/* <button onClick={() => signOut("myCredetials", { redirect: false })}> */}
        <button onClick={() => signOut()}>Sign out</button>
        {/* https://youtu.be/EFucgPdjeNg?t=579 */}
        {/* <button onClick={() => signOut("credentials", {})}>Sign out</button> */}
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
