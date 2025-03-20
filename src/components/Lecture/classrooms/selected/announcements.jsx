import { FaBullhorn } from 'react-icons/fa6';

export default function ClassroomFeed({ announcements }) {
  return (
    <div className="mt-5">
      {/* Content */}
      <div>
        <ul>
          {announcements.map((announcement) => (

            <li key={announcement.id} className="p-4 bg-white shadow-sm rounded-md mb-2 flex items-center gap-3">
              <FaBullhorn className='text-sky-600'/>
              <div>
                <h3 className="font-semibold">{announcement.title}</h3>
                <p className="text-gray-500 text-sm">{new Date(announcement.created_at).toLocaleDateString('en-GB', {day: '2-digit', month: 'long', year: 'numeric'})}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
