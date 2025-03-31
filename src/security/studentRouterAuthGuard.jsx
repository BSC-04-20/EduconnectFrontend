import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
 * Protects routes by checking authentication status.
 * If not authenticated, redirects to the login page.
 */
export default function StudentRouterAuthGuard({ children }) {
  const token = useSelector((state) => state.studentAuthorizer.value.studToken); // Get authorization status from redux

  console.log(token)
  if (!token) {
    return <Navigate to="/student/login" replace />; // Redirect to login
  }

  return children; // Render the protected page if authorized
}
