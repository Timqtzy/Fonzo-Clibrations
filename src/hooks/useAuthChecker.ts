import { useState, useEffect } from "react";
import supabase from "@/helper/supabaseClient";
import type { UserRole } from "@/types/roles";

export const useAuthChecker = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchUserRole = async (userId: string): Promise<UserRole> => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', userId)
          .maybeSingle();

        if (error) {
          console.error("Error fetching user role:", error.message);
          return 'viewer';
        }
        return (data?.role as UserRole) || 'viewer';
      } catch (err) {
        console.error("Error fetching user role:", err);
        return 'viewer';
      }
    };

    // Set up auth state listener FIRST (recommended by Supabase)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, !!session);

        if (!isMounted) return;

        if (session?.user) {
          setIsAuthenticated(true);
          // Use setTimeout to avoid Supabase deadlock issue
          setTimeout(async () => {
            if (isMounted) {
              const role = await fetchUserRole(session.user.id);
              if (isMounted) {
                setUserRole(role);
                setIsLoading(false);
              }
            }
          }, 0);
        } else {
          setIsAuthenticated(false);
          setUserRole(null);
          setIsLoading(false);
        }
      }
    );

    // Then check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", !!session);

      if (!isMounted) return;

      if (session?.user) {
        setIsAuthenticated(true);
        fetchUserRole(session.user.id).then((role) => {
          if (isMounted) {
            setUserRole(role);
            setIsLoading(false);
          }
        });
      } else {
        setIsAuthenticated(false);
        setUserRole(null);
        setIsLoading(false);
      }
    }).catch((err) => {
      console.error("Session check error:", err);
      if (isMounted) {
        setIsAuthenticated(false);
        setUserRole(null);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return { isLoading, isAuthenticated, userRole };
};
