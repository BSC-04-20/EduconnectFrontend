// Importing component that displays the student's selected class content
import StudentSelectedClass from "../components/Student/classroom/selected/SelectedClass";

// Importing the sidebar navigation component for students
import StudentSideBar from "../components/Student/SideBar";

// Importing the top navigation bar component for students
import StudentTopBar from "../components/Student/TopBar";

// Component responsible for rendering the Student Class screen layout
export default function StudentClassScreen() {
    return (
        // Layout wrapper: using flex to create a horizontal layout with a sidebar and main content
        <div className="flex flex-row gap-5">
            
            {/* Sidebar on the left */}
            <StudentSideBar />

            {/* Main content area */}
            <section className="mt-[5vh] md:mt-0 ml-[2%] md:ml-[5%] lg:ml-[17%] w-[100%]">
                
                {/* Top navigation bar */}
                <StudentTopBar />
                
                {/* Main class content for the student */}
                <StudentSelectedClass />
            </section>
        </div>
    );
}
