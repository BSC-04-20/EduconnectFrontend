import { FaBullhorn } from 'react-icons/fa6';
import Empty from "../../../../assets/Empty-pana.svg"
import { MdLibraryBooks } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function StudentClassroomFeed({ announcements}) {
  
  useEffect(()=>{
    
  },[])

  return (
    <div className="mt-5 mr-[5%] sm:mr-[5%] md:mr-0">
      {/* Content */}
      {(announcements.length > 0) && <div>
        <ul>
          {announcements.map((announcement, index) => (
            <Link to={`/student/classroom/${announcement.id}/announcement`} key={announcement.id} className="p-4 bg-white shadow-sm rounded-md mb-2 flex items-center gap-3 hover:bg-sky-50">
              {announcements[index].type === "announcement" ? <FaBullhorn className='text-sky-600'/> : <MdLibraryBooks className='text-sky-600'/>}
              <div>
                <h3 className="font-semibold">{announcement.title}</h3>
                <p className="text-gray-500 text-sm">{new Date(announcement.created_at).toLocaleDateString('en-GB', {day: '2-digit', month: 'long', year: 'numeric'})}</p>
              </div>
            </Link>
          ))}
        </ul>
      </div>}

      {(announcements.length === 0) && <div className='flex flex-col items-center justify-center'>
            <div className='w-[30%]'>
                <img src={Empty} />
            </div>
            <span className='text-sm text-gray-700 w-[40%] text-center'>No any announcement, assignment or resource</span>
        </div>}
    </div>
  );
}
