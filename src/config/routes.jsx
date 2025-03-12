import { createBrowserRouter } from "react-router-dom";
import LectureDashboard from "../screens/LectureDashboard";
// import StudentDashboard from "../screens/StudentDashboard";
import Construction from "../components/Lecture/construction";
import StudentConstruction from "../components/Student/construction";
import Events from "../screens/Events";
import Resources from "../screens/Resources";
import LectureClassrooms from "../components/Lecture/classrooms/LectureClasses";
import StudentDashboard from "../screens/StudentDashboard";
import StudentLearningMaterials from "../screens/StudentLearningMaterials";
import StudentSideBar from "../components/Student/SideBar";

import StudentRating from "../screens/StudentRating";
import StudentDiscussions from "../screens/StudentDiscussions";
import HomeScreen from "../screens/Home";

const routes = createBrowserRouter([
    {
        path:"/",
        element: <HomeScreen/>
    },
    {
        path:"/dashboard",
        element: <LectureDashboard/>
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
        element:<LectureClassrooms/>
    },
    {path: "/student",
    children: [
        { path: "dashboard", element: <StudentConstruction /> },
        { path: "mentorship", element: <StudentConstruction /> },
        { path: "events", element: <StudentConstruction /> },
        { path: "timetable", element: <StudentConstruction /> },
        { path: "discussions", element: <StudentConstruction /> },
        { path: "resources", element: <StudentLearningMaterials /> },
        { path: "classroom", element: <StudentConstruction/> },
        { path: "ratings", element: <StudentRating /> },
    ]},
])

export default routes;