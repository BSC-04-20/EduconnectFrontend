import { FaBullhorn } from 'react-icons/fa6';
import Empty from "../../../../assets/Empty-pana.svg";
import { MdLibraryBooks } from 'react-icons/md';
import { BiTrash } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';

export default function ClassroomFeed({ announcements }) {
  const navigator = useNavigate();
  const { id } = useParams()

  const goTo = (selectedId) => {
    navigator(`/lecture/classroom/${id}/${selectedId}`)
  }

  return (
    <div className="mt-5">
      {/* Content */}
      {announcements.length > 0 && (
        <div>
          <ul>
            {announcements.map((announcement) => (
              <li
                key={announcement.id}
                onClick={()=> goTo(announcement.id)}
                className="p-4 bg-white shadow-sm rounded-md mb-2 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {announcement.type === "announcement" ? (
                    <FaBullhorn className="text-sky-600" />
                  ) : (
                    <MdLibraryBooks className="text-sky-600" />
                  )}
                  <div>
                    <h3 className="font-semibold">{announcement.title}</h3>
                    <p className="text-gray-500 text-sm">
                      {new Date(announcement.created_at).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <BiTrash className="text-gray-500 hover:text-red-500 cursor-pointer" />
              </li>
            ))}
          </ul>
        </div>
      )}

      {announcements.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <div className="w-[30%]">
            <img src={Empty} alt="No announcements" />
          </div>
          <span className="text-sm text-gray-700 w-[40%] text-center">
            No any announcement, assignment or resource
          </span>
        </div>
      )}
    </div>
  );
}
