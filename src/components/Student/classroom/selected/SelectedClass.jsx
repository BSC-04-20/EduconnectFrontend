import { useEffect, useState } from "react";
import ClassWallpaper from "./ClassWallpaper";
import { StudentAuthenticatedUserUrl } from "../../../../config/urlFetcher";
import { useParams } from "react-router-dom";
import StudentClassroomFeed from "./announcements";
import TotalStudents from "./classmatesNumber";

export default function StudentSelectedClass() {
    const [classData, setClassData] = useState(null);
    const [announcements, setAnnouncements] = useState([])
    const { id } = useParams();
    const [enrolled, setEnrolled] = useState(null);

    useEffect(() => {
        const fetchClassData = async () => {
            try {
                const response = await StudentAuthenticatedUserUrl(`/classes/get/${id}`);
                if (response && response.data) {
                    setClassData(response.data);
                    setAnnouncements(response.data.announcements)
                    setEnrolled(response.data.total);
                } else {
                    console.error("Invalid response format:", response);
                }
            } catch (error) {
                console.error("Error fetching class data:", error);
            }
        };

        if (id) fetchClassData();
    }, [id]);

    return (
        <>
            <ClassWallpaper name={classData?.data.name || "Loading..."} />
            <div className="flex flex-col md:grid md:grid-cols-[15%_75%] md:gap-10">
                <div className="flex flex-row md:flex-col gap-2 mt-5 mr-[5%] md:mr-0">
                    <TotalStudents total={enrolled}/>
                </div>
                <StudentClassroomFeed announcements={announcements}/>
            </div>
        </>
    );
}
