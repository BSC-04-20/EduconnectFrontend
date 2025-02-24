import { createBrowserRouter } from "react-router-dom";
import LectureDashboard from "../screens/LectureDashboard";
import Construction from "../components/Lecture/construction";
import StudentConstruction from "../components/Student/construction";
import LectureEvents from "../screens/LectureEvents";
import LectureResources from "../screens/LectureResources";
import LectureClassroomScreen from "../screens/LectureClassrooms";
import StudentDashboard from "../screens/StudentDashboard";
import StudentDiscussionsScreen from "../screens/StudentDiscussions";
import StudentRatingsScreen from "../screens/StudentRating";
import LecturerSignup from "../components/Lecture/signup";
import LecturerLoginForm from "../components/Lecture/login";
import EventForm from "../components/Lecture/events/addEvents";
import StudentClassroomsScreen from "../screens/StudentClassrooms";
import LoginSelector from "../components/LoginSelector";
import RouterAuthGuard from "../security/routerAuthGuard"; // Import RouterAuthGuard
import StudentLoginForm from "../components/Student/login";
import StudentSignup from "../components/Student/signup";
import AddClassForm from "../components/Lecture/classrooms/addClassroom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <LoginSelector />,
  },
  {
    path: "/lecture",
    children: [
      { path: "signup", element: <LecturerSignup /> },
      { path: "login", element: <LecturerLoginForm /> },
      { path: "dashboard", element: <RouterAuthGuard> <LectureDashboard /> </RouterAuthGuard>},
      { path: "events", element: <RouterAuthGuard> < LectureEvents/> </RouterAuthGuard> },
      { path: "mentorship", element: <RouterAuthGuard> <Construction /> </RouterAuthGuard> },
      { path: "timetable", element: <RouterAuthGuard> <Construction /> </RouterAuthGuard>},
      { path: "resources", element: <RouterAuthGuard> <LectureResources /> </RouterAuthGuard> },
      { path: "ratings", element: <RouterAuthGuard> <Construction /> </RouterAuthGuard>},
      { path: "classroom", element: <RouterAuthGuard> <LectureClassroomScreen /> </RouterAuthGuard>},
      { path: "classroom/add", element: <RouterAuthGuard> <AddClassForm /> </RouterAuthGuard>},
      { path: "event/add", element: <RouterAuthGuard> <EventForm /> </RouterAuthGuard>}
    ],
  },
  {
    path: "/student",
    children: [
      {path:"login", element:<StudentLoginForm/>},
      {path:"signup", element:<StudentSignup/>},
      { path: "dashboard", element: <StudentDashboard /> },
      { path: "mentorship", element: <StudentConstruction /> },
      { path: "events", element: <StudentConstruction /> },
      { path: "timetable", element: <StudentConstruction /> },
      { path: "discussions", element: <StudentDiscussionsScreen /> },
      { path: "resources", element: <StudentConstruction /> },
      { path: "ratings", element: <StudentRatingsScreen /> },
      { path: "classroom", element: <StudentClassroomsScreen /> },
    ],
  },
]);

export default routes;
