import { useEffect, useState } from 'react';
import { FaBullhorn } from 'react-icons/fa6';
import Empty from "../../../../assets/Empty-pana.svg";
import { MdLibraryBooks } from 'react-icons/md';
import { BiTrash } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthenticatedUserUrl } from "../../../../config/urlFetcher";

export default function ClassroomFeed({ announcements }) {
  const navigator = useNavigate();
  const { id } = useParams();
  const [localAnnouncements, setLocalAnnouncements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false); // 🔁 new state

  useEffect(() => {
    setLocalAnnouncements(announcements);
  }, [announcements]);

  const goTo = (selectedId, type) => {
    navigator(`/lecture/classroom/${id}/${selectedId}`, {
      state: { type: type }
    });
  };

  const handleDeleteClick = (announcementId, type, e) => {
    e.stopPropagation();
    setAnnouncementToDelete(announcementId);
    setDeleteType(type);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      const endpoint =
        deleteType === "assignment"
          ? `/assignment/delete/${announcementToDelete}`
          : `/announcement/delete/${announcementToDelete}`;

      const response = await AuthenticatedUserUrl(endpoint, {
        method: 'DELETE',
      });

      if (response && response.success !== false) {
        setLocalAnnouncements(prev =>
          prev.filter(item => item.id !== announcementToDelete)
        );
      } else {
        throw new Error("Failed to delete item");
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting the item.");
    } finally {
      setIsDeleting(false);
      setShowModal(false);
      setAnnouncementToDelete(null);
      setDeleteType(null);
    }
  };

  const cancelDelete = () => {
    if (isDeleting) return; // prevent cancel during deletion
    setShowModal(false);
    setAnnouncementToDelete(null);
    setDeleteType(null);
  };

  return (
    <div className="mt-5 relative">
      {localAnnouncements.length > 0 ? (
        <ul>
          {localAnnouncements.map((announcement) => (
            <li
              key={announcement.id}
              onClick={() => goTo(announcement.id, announcement.type)}
              className="p-4 bg-white shadow-sm hover:bg-sky-50 rounded-md mb-2 flex items-center justify-between cursor-pointer"
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
              <BiTrash
                className="text-gray-500 hover:text-red-500 cursor-pointer"
                onClick={(e) => handleDeleteClick(announcement.id, announcement.type, e)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div className="w-[30%]">
            <img src={Empty} alt="No announcements" />
          </div>
          <span className="text-sm text-gray-700 w-[40%] text-center">
            No any announcement, assignment or resource
          </span>
        </div>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              Delete {deleteType === 'assignment' ? 'Assignment' : 'Announcement'}
            </h2>
            <p className="mb-6">
              Are you sure you want to delete this {deleteType === 'assignment' ? 'assignment' : 'announcement'}? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                disabled={isDeleting}
                className={`px-4 py-2 rounded-md ${
                  isDeleting ? 'bg-gray-200 text-gray-500' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className={`px-4 py-2 rounded-md ${
                  isDeleting
                    ? 'bg-red-300 text-white cursor-not-allowed'
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
