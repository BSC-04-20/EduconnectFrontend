import { createBrowserRouter } from "react-router-dom";
import LectureDashboard from "../screens/LectureDashboard";

const routes = createBrowserRouter([
    {
        path:"/",
        element:<LectureDashboard/>
    }
])

export default routes;