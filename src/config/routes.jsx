import { createBrowserRouter } from "react-router-dom";
import LectureDashboard from "../screens/LectureDashboard";
import Construction from "../components/Lecture/construction";
import StudentConstruction from "../components/Student/construction";
import LectureClassrooms from "../components/Lecture/classrooms/LectureClasses";
import StudentDashboard from "../screens/StudentDashboard";
import StudentLearningMaterials from "../screens/StudentLearningMaterials";
import StudentSideBar from "../components/Student/SideBar";
import HomeNavBar from "../components/HomeNavBar";
import FileUpload from "../FileUpload";
import CourseMaterialType from "../components/Student/resources/CoursesMaterialType"



const routes = createBrowserRouter([
    {
        path:"/",
        element:<StudentLearningMaterials/>
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
        { path: "ratings", element: <StudentConstruction /> },
        { path: "classroom", element: <StudentConstruction/> },
    ]},
])

export default routes;