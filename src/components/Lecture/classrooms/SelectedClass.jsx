import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AuthenticatedUserUrl } from '../../../config/urlFetcher';
import ClassCode from './selected/classCode';
import RegisteredStudents from './selected/StudentsNumber';
import PostedResources from './selected/classResourcesNumber';
import ClassroomFeed from './selected/announcements';

export default function SelectedClassroom() {
    const { id } = useParams();
    const [classData, setClassData] = useState(null);
    const [enrolled, setEnrolled] = useState(null);
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        // Fetch the class data based on the class ID
        const fetchClassData = async () => {
            try {
                const response = await AuthenticatedUserUrl(`/classes/get/${id}`);
                const data = response.data.data;

                if (response.status === 200) {
                    setClassData(data);
                    setEnrolled(response.data.total)
                    setAnnouncements(response.data.announcements)
                } else {
                    console.error('Class not found');
                }
            } catch (error) {
                console.error('Error fetching class data:', error);
            }
        };

        fetchClassData();
    }, [id]);

    // Check if class data is still loading
    if (!classData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="my-5">
            <ClassWallpaper name={classData.name}/>
            <div className="flex flex-col md:grid md:grid-cols-[15%_75%] md:gap-10">
                <div className="flex flex-row md:flex-col gap-2 mt-5 mr-[5%] md:mr-0">
                    <ClassCode code={classData.class_code} /> {/* Pass code as prop */}
                    <RegisteredStudents total={enrolled}/>
                    <PostedResources />
                </div>
                <ClassroomFeed announcements={announcements}/>
            </div>
        </div>
    );
}

function ClassWallpaper({name}){
    return(
        <div className="h-[20vh] md:h-[30vh] bg-gradient-to-r from-sky-700 to-pink-200 mr-[5%] py-5 px-2 rounded-md">
            <h1 className="text-3xl">{name}</h1>
        </div>
    )
}
