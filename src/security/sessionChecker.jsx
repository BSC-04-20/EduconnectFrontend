import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/**
 * Hook to check if the user is authorized. If not, redirect to login.
 */
export function useAuthGuard() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.authorizer.value.authorized); // Get authorization status from redux

  useEffect(() => {
    if (!authStatus) {
      navigate("/lecture/login"); // Redirect to login if not authorized
    }
  }, [authStatus, navigate]);
}
