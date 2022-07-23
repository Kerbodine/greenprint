import { createContext, useContext, useState } from "react";

const ViewContext = createContext();

export function useView() {
  return useContext(ViewContext);
}

export function ViewProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [sideNav, setSideNav] = useState(false);

  const toggleSideNav = () => {
    if (sideNav) {
      setSideNav(false);
    } else {
      setSideNav(true);
    }
  };

  const value = {
    loading,
    setLoading,
    sideNav,
    toggleSideNav,
  };

  return <ViewContext.Provider value={value}>{children}</ViewContext.Provider>;
}
