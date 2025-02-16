import { createBrowserRouter } from "react-router-dom";
import LectureDashboard from "../screens/LectureDashboard";
import Construction from "../components/Lecture/construction";
import StudentConstruction from "../components/Student/construction";
import Events from "../screens/Events";
import Resources from "../screens/Resources";

const routes = createBrowserRouter([
    {
        path:"/",
        element:<LectureDashboard/>
    },
    {
        path:"/events",
        element:<Events/>
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
        element:<Resources/>
    },
    
    {
        path:"/ratings",
        element:<Construction/>
    },
    
    {
        path:"/classroom",
        element:<Construction/>
    },
    {path: "/student",
    children: [
        { path: "dashboard", element: <StudentConstruction /> },
        { path: "mentorship", element: <StudentConstruction /> },
        { path: "events", element: <StudentConstruction /> },
        { path: "timetable", element: <StudentConstruction /> },
        { path: "discussions", element: <StudentConstruction /> },
        { path: "resources", element: <StudentConstruction /> },
        { path: "ratings", element: <StudentConstruction /> },
        { path: "classroom", element: <StudentConstruction /> },
    ]},
])

export default routes;