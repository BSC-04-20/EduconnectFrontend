import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
 * Protects routes by checking authentication status.
 * If not authenticated, redirects to the login page.
 */
export default function RouterAuthGuard({ children }) {
  const token = useSelector((state) => state.authorizer.value.token); // Get authorization status from redux

  if (!token) {
    return <Navigate to="/lecture/login" replace />; // Redirect to login
  }

  return children; // Render the protected page if authorized
}
