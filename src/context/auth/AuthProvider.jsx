import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { apiPath } from "../../app/utils/api";
import { getRoleDashboard } from "../../app/enums/links";

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [userLoading, setUserLoading] = useState(false);

   // paths that don't need user fetching
   const publicPaths = [
      "/auth",
      "/auth/reset-password",
      "/auth/forgot-password",
   ];

   const signinUser = async (
      email,
      password,
      remember,
      setErrorFn = null,
      setLoadingFn = null,
      navigateToDashboardFn = null
   ) => {
      setUserLoading(true);
      if (setErrorFn) setErrorFn("");
      if (setLoadingFn) setLoadingFn(true);

      try {
         const res = await fetch(apiPath("/auth/signin"), {
         method: "POST",
         credentials: "include",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ email, password, remember }),
         });
         const data = await res.json();

         // toggle loading
         setUserLoading(false);
         if (setLoadingFn) setLoadingFn(false);

         if (res.ok) {
         const userData = data.data.user;

         setUser(userData);
         if (navigateToDashboardFn)
            navigateToDashboardFn(getRoleDashboard(userData.role));
         } else {
         throw new Error(data.detail ?? "Login failed");
         }
      } catch (e) {
         console.error(e);

         if (setLoadingFn) setLoadingFn(false);
         if (setErrorFn) setErrorFn(e.message);
      }
   };

   const signoutUser = async (navigateToLoginFn) => {
      try {
         const res = await fetch(apiPath("/auth/signout"), {
            method: 'POST',
            credentials: 'include'
         })
         const data = await res.json()

         if (res.ok) {
            setUser(null)
            navigateToLoginFn('/auth')
         } else {
            throw new Error(data.detail ?? 'Failed to signout.')
         }
      } catch (e) {
         console.error(e)
      }
   }

   const getUser = async (navigateToDashboardFn = null) => {
      setUserLoading(true);
      try {
         const res = await fetch(apiPath("/user"), { credentials: "include" });
         const data = await res.json();

         setUserLoading(false);

         if (res.ok) {
         setUser(data.data.user);

         // navigate to the user's dashboard if navigate function was provided
         if (navigateToDashboardFn)
            navigateToDashboardFn(getRoleDashboard(data.data.user.role));
         } else {
         throw new Error(data.detail ?? "Failed to fetch user");
         }
      } catch (e) {
         console.error(e);
         setUser(null);
      }
   }

   useEffect(() => {
      if (publicPaths.includes(location.pathname)) return;
      getUser();
   }, []);

   const value = {
      user,
      setUser,
      signinUser,
      signoutUser,
      getUser,
   };

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
