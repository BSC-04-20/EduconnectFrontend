import { createBrowserRouter } from "react-router-dom";
import LectureDashboard from "../screens/LectureDashboard";
import Construction from "../components/construction";

const routes = createBrowserRouter([
    {
        path:"/",
        element:<LectureDashboard/>
    },
    {
        path:"/events",
        element:<Construction/>
    },
    {
        path:"/mentorship",
        element:<Construction/>
    },
    {
        path:"/timetable",
        element:<Construction/>
    },
    
    {
        path:"/resources",
        element:<Construction/>
    },
    
    {
        path:"/ratings",
        element:<Construction/>
    },
    
    {
        path:"/classroom",
        element:<Construction/>
    }
])

export default routes;