"use client";
// https://youtu.be/EFucgPdjeNg?t=733 protected route
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";

// https://stackoverflow.com/a/74493127 from "next/navigation";
import { useRouter } from "next/navigation";

const page = () => {
  //   const session = useSession();
  const { status, data } = useSession();
  const router = useRouter();

  useEffect(() => {
    const redirectThunk = async () => {
      if (status === "unauthenticated") router.replace("/");
    };

    redirectThunk();
  }, [status]);

  console.log(status, data);
  if (status === "authenticated") return <div>To jest chriona strona</div>;
};

export default page;
