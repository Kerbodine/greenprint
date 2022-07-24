import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import MainView from "../components/MainView";
import PrivateRoute from "../components/PrivateRoute";
import PublicRoute from "../components/PublicRoute";
import { AuthProvider } from "../contexts/AuthContext";
import { ViewProvider } from "../contexts/ViewContext";
import "../styles/globals.css";
import Username from "./username";

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
          <ViewProvider>
            {router.pathname === "/username" ? (
              <Username />
            ) : (
              <MainView>
                <Component {...pageProps} />
              </MainView>
            )}
            <Toaster />
          </ViewProvider>
        </PrivateRoute>
      )}
    </AuthProvider>
  );
}

export default MyApp;
