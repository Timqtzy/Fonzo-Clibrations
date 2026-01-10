import { useState, useEffect } from "react";
import supabase from "@/helper/supabaseClient";
import type { UserRole } from "@/types/roles";

export const useAuthChecker = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error("Error fetching user role:", error.message);
        return null;
      }
      return data?.role as UserRole || 'viewer';
    } catch (err) {
      console.error("Error fetching user role:", err);
      return null;
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error("Session error:", error.message);

      const isAuth = !!data.session;
      setIsAuthenticated(isAuth);

      if (isAuth && data.session?.user?.id) {
        const role = await fetchUserRole(data.session.user.id);
        setUserRole(role);
      } else {
        setUserRole(null);
      }

      setIsLoading(false);
    };

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setIsAuthenticated(!!session);
      if (session?.user?.id) {
        const role = await fetchUserRole(session.user.id);
        setUserRole(role);
      } else {
        setUserRole(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { isLoading, isAuthenticated, userRole };
};
