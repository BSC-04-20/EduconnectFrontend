import {React, useEffect} from "react";
import TopBar from "../components/Lecture/TopBar";
import LectureSideBar from "../components/Lecture/SideBar";
import { parseISO, format, getDay } from "date-fns";
import { AuthenticatedUserUrl } from "../config/urlFetcher";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const hours = Array.from({ length: 24 }, (_, i) => 0 + i); // 00:00 to 23:00

// const events = [
//   { id: 1, title: "Math Class", day: "Monday", start: "08:00", end: "10:00" },
//   { id: 2, title: "Physics", day: "Wednesday", start: "13:00", end: "15:00" },
//   { id: 3, title: "Chemistry", day: "Monday", start: "09:00", end: "10:30" },
// ];



const TimeTable = () => {
   var events = [];
    const convertDiscussionToEvent = (discussion) => {
        const dateObj = parseISO(discussion.start_time);
      
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const day = daysOfWeek[getDay(dateObj)];
      
        const start = format(dateObj, "HH:mm");
        const endObj = new Date(dateObj.getTime() + 60 * 60 * 1000); // Assume 1-hour duration
        const end = format(endObj, "HH:mm");
      
        return {
          id: discussion.id,
          title: discussion.meeting_name,
          day,
          start,
          end,
        };
      };
      useEffect(() => {
        const fetchDiscussions = async () => {
          try {
            const response = await AuthenticatedUserUrl.get(`/classes/discussions/student`);
            events = response.data;
          } catch (error) {
            alert("Error fetching rating:", error);
          }
          alert(events)
        };
        fetchDiscussions();
      }, []);
  return (
    <>
    
    <LectureSideBar/>
    <div className="flex flex-col ml-[20%] min-h-screen bg-gray-100 p-6">
      <TopBar/>
      
      </div>
    </>
  );
};

export default TimeTable;
