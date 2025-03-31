import React, { useState, useEffect } from 'react';
import { Link, useParams} from 'react-router-dom';
import { AuthenticatedUserUrl } from '../../../config/urlFetcher';
import ClassCode from './selected/classCode';
import RegisteredStudents from './selected/StudentsNumber';
import PostedResources from './selected/classResourcesNumber';
import ClassroomFeed from './selected/announcements';
import { FaBullhorn } from 'react-icons/fa';
import { MdLibraryBooks } from 'react-icons/md';

export default function SelectedClassroom() {
    const { id } = useParams();
    const [classData, setClassData] = useState(null);
    const [enrolled, setEnrolled] = useState(null);
    const [announcements, setAnnouncements] = useState([]);
    
    useEffect(() => {
        const fetchClassData = async () => {
            try {
                const response = await AuthenticatedUserUrl(`/classes/get/${id}`);
                const data = response.data.data;

                if (response.status === 200) {
                    setClassData(data);
                    setEnrolled(response.data.total);
                    setAnnouncements(response.data.announcements);
                } else {
                    console.error('Class not found');
                }
            } catch (error) {
                console.error('Error fetching class data:', error);
            }
        };

        fetchClassData();
    }, [id]);

    if (!classData) {
        return <div>Loading...</div>;
    }

    // Function to navigate to assignment form
    const goToAssignment = () => {
        history.push(`/assignment-form/${id}`);
    };

    // Function to navigate to announcement form
    const goToAnnouncement = () => {
        history.push(`/announcement-form/${id}`);
    };

    return (
        <div className="my-5">
            <ClassWallpaper name={classData.name}/>
            <div className="flex flex-col md:grid md:grid-cols-[15%_75%] md:gap-10">
                <div className="flex flex-row md:flex-col gap-2 mt-5 mr-[5%] md:mr-0">
                    <ClassCode code={classData.class_code} />
                    <RegisteredStudents total={enrolled} />
                    <PostedResources />
                </div>
                <ClassroomFeed announcements={announcements} />
            </div>

            {/* Floating buttons for Assignment and Announcement */}
            <div className="fixed bottom-24 right-5 space-y-3">
                <Link
                    to={`/lecture/classroom/${id}/assignment`}
                    className="w-16 h-16 bg-white hover:bg-gray-50 rounded-full shadow-lg flex items-center justify-center transition duration-300"
                >
                    <MdLibraryBooks className='text-sky-600' size={20}/>
                </Link>
                <Link
                    to={`/lecture/classroom/${id}/announcement`}
                    className="w-16 h-16 bg-white hover:bg-gray-50 rounded-full shadow-lg flex items-center justify-center transition duration-300"
                >
                    <FaBullhorn className='text-sky-600' size={20}/>
                </Link>
            </div>
        </div>
    );
}

function ClassWallpaper({name}) {
    return (
        <div className="h-[20vh] md:h-[30vh] bg-gradient-to-r from-sky-700 to-pink-200 mr-[5%] py-5 px-2 rounded-md">
            <h1 className="text-3xl">{name}</h1>
        </div>
    );
}
