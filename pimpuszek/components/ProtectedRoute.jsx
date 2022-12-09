// "use client";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContex";
import { useRouter } from "next/navigation";

// https://youtu.be/ZmpO65DhRN0?t=1755
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [router.push, user]);

  return <>{user ? children : null}</>;
};

export default ProtectedRoute;
