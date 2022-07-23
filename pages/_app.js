import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "../components/PrivateRoute";
import PublicRoute from "../components/PublicRoute";
import { AuthProvider } from "../contexts/AuthContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const noAuthPages = ["/", "/login", "/signup", "/reset-password"];

  return (
    <AuthProvider>
      {noAuthPages.includes(router.pathname) ? (
        <PublicRoute>
          <Component {...pageProps} />
        </PublicRoute>
      ) : (
        <PrivateRoute>
          <Component {...pageProps} />
          <Toaster />
        </PrivateRoute>
      )}
    </AuthProvider>
  );
}

export default MyApp;
