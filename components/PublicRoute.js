import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function PublicRoute({ children }) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = router.pathname;

  const authPages = ["/login", "/signup", "/reset-password"];

  useEffect(() => {
    if (user && authPages.includes(pathname)) {
      router.push("/dashboard");
    }
  }, [router, user]);

  return <>{children}</>;
}
