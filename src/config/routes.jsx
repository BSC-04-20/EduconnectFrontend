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
import RouterAuthGuard from "../security/lecturerRouterAuthGuard";
import StudentLoginForm from "../components/Student/login";
import StudentSignup from "../components/Student/signup";
import StudentRouterAuthGuard from "../security/studentRouterAuthGuard";
import HomeScreen from "../screens/Home";
import SignupSelector from "../components/SignupSelector";
import LectureClassScreen from "../screens/LectureClassScreen";
import ClassStudentsScreen from "../screens/ClassStudentsScreen";
import AnnouncementForm from "../components/Lecture/classrooms/announcementform";
import AssignmentForm from "../components/Lecture/classrooms/addassignment";
import StudentClassScreen from "../screens/StudentSelectedClass";
import ErrorPage from "../components/ErrorPage";
import AboutUs from "../screens/AboutUs";
import AssignmentUploader from "../components/AssignmentUploader";
import AddResources from "../components/Lecture/Resources/AddResources";
import StudentAnnouncementScreen from "../screens/StudentAnnouncementPage";
import ClassmatesScreen from "../screens/ClassmatesScreen";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
  },
  {
    path:"/login/select",
    element:<LoginSelector/>
  },
  {
    path:"/signup/select",
    element:<SignupSelector/>
  },
  {
    path:"/addresources",
    element:<AddResources/>
  },
  {
    path:"*",
    element:<ErrorPage/>
  },
  {
    path:"about",
    element:<AboutUs/>
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
      {path: "classroom/:id", element:<RouterAuthGuard><LectureClassScreen/></RouterAuthGuard>},
      {path: "classroom/:id/students", element:<RouterAuthGuard><ClassStudentsScreen/></RouterAuthGuard>},
      {path: "classroom/:id/announcement", element:<RouterAuthGuard><AnnouncementForm/></RouterAuthGuard>},
      {path: "classroom/:id/assignment", element:<RouterAuthGuard><AssignmentForm/></RouterAuthGuard>},
      { path: "event/add", element: <RouterAuthGuard> <EventForm /> </RouterAuthGuard>},
      { path: "classroom/:id/addresources", element: <RouterAuthGuard> <AddResources/> </RouterAuthGuard>}
    ],
  },
  {
    path: "/student",
    children: [
      {path:"login", element:<StudentLoginForm/>},
      {path:"signup", element:<StudentSignup/>},
      { path: "dashboard", element:<StudentRouterAuthGuard>  <StudentDashboard />  </StudentRouterAuthGuard>},
      { path: "mentorship", element:<StudentRouterAuthGuard>  <StudentConstruction />  </StudentRouterAuthGuard>},
      { path: "events", element:<StudentRouterAuthGuard>  <StudentConstruction />  </StudentRouterAuthGuard>},
      { path: "timetable", element:<StudentRouterAuthGuard>  <StudentConstruction />  </StudentRouterAuthGuard>},
      { path: "discussions", element:<StudentRouterAuthGuard>  <StudentDiscussionsScreen />  </StudentRouterAuthGuard>},
      { path: "resources", element:<StudentRouterAuthGuard>  <StudentConstruction />  </StudentRouterAuthGuard>},
      { path: "ratings", element:<StudentRouterAuthGuard>  <StudentRatingsScreen />  </StudentRouterAuthGuard>},
      { path: "classroom", element:<StudentRouterAuthGuard>  <StudentClassroomsScreen />  </StudentRouterAuthGuard>},
      { path: "classroom/:id", element:<StudentRouterAuthGuard>  <StudentClassScreen />  </StudentRouterAuthGuard>},
      {path: "assignmentupload/:id", element:<StudentRouterAuthGuard> <AssignmentUploader/> </StudentRouterAuthGuard>},
      { path: "classroom/:id/announcement", element:<StudentRouterAuthGuard> <StudentAnnouncementScreen/> </StudentRouterAuthGuard>},
      {path: "classroom/:id/students", element:<StudentRouterAuthGuard><ClassmatesScreen/></StudentRouterAuthGuard>},
    ],
  },
]);

export default routes;
