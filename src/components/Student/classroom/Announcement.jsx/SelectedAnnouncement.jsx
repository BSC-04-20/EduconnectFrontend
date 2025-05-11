import { useEffect, useState } from 'react';
import {
  FaFilePdf,
  FaFileWord,
  FaFileImage,
  FaFileAlt
} from 'react-icons/fa';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { AuthenticatedUserUrl, StudentAuthenticatedUserUrl } from '../../../../config/urlFetcher';

const baseUrl = import.meta.env.VITE_SANCTUM_TOP_LEVEL_DOMAIN;

const getFileIcon = (filename) => {
    if (!filename) {
      return <FaFileAlt className="text-gray-600 text-3xl" />;
    }
    
    const ext = filename.split('.').pop().toLowerCase();
    
    switch (ext) {
      case 'pdf':
        return <FaFilePdf className="text-red-600 text-3xl" />;
      case 'doc':
      case 'docx':
        return <FaFileWord className="text-blue-600 text-3xl" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <FaFileImage className="text-purple-600 text-3xl" />;
      default:
        return <FaFileAlt className="text-gray-600 text-3xl" />;
    }
  };

export default function SelectedAnnouncement() {
  const { selectedId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const type = location.state?.type;

  const [data, setData] = useState(null);
  const [resources, setResources] = useState([]);
  const [submittedFiles, setSubmittedFiles] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState([]);
  const [status, setStatus] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (!type || !selectedId) return;

      const endpoint =
        type === 'announcement'
          ? `/announcement/get/${selectedId}`
          : `/assignment/get/${selectedId}`;

      try {
        const res = await StudentAuthenticatedUserUrl.get(endpoint);
        setData(res.data.assignment);
        setStatus(res.data.status);
        if (res.data.assignment.files) {
          setResources(res.data.assignment.files);
        }
        if (res.data.submitted_files) {
          setSubmittedFiles(res.data.submitted_files);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchData();
  }, [type, selectedId]);

  const handleDelete = async () => {
    if (!type || !selectedId) return;
    setDeleting(true);

    const endpoint =
      type === 'announcement'
        ? `/announcement/delete/${selectedId}`
        : `/assignment/delete/${selectedId}`;

    try {
      await StudentAuthenticatedUserUrl.delete(endpoint);
      alert(`${type} deleted successfully!`);
      navigate(-1);
    } catch (error) {
      console.error(`Failed to delete ${type}:`, error);
      alert(`Error deleting ${type}`);
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = () => {
    console.log(`Edit ${type} with ID ${selectedId}`);
  };

  const handleSubmitAssignment = async (e) => {
    e.preventDefault();
    if (!selectedFile || selectedFile.length === 0) return alert("Please choose at least one file.");

    const formData = new FormData();
    for (const file of selectedFile) {
      formData.append("files[]", file);
    }

    try {
      setUploading(true);
      await StudentAuthenticatedUserUrl.post(`/assignment/submit/${selectedId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      alert("Assignment submitted successfully!");
      window.location.reload(); // Refresh to reflect new state
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to submit assignment.");
    } finally {
      setUploading(false);
    }
  };

  if (!data) {
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  }

  return (
    <div className="bg-white p-6 sm:p-8 md:p-10 rounded-lg max-w-4xl mx-auto relative">
      {/* Top-right menu */}
      <div className="absolute top-4 right-4 z-10">
        <div className="relative">
          <button
            className="text-gray-600 hover:text-black text-xl"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            ⋮
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-md z-20">
              <button
                onClick={handleEdit}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={() => setConfirmDelete(true)}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-80 text-center">
            <p className="mb-4 text-start text-gray-700">
              Are you sure you want to delete this {type}?
            </p>
            <div className="flex gap-5 justify-end">
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-sm rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className={`px-4 py-2 ${deleting ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'} text-white text-sm rounded`}
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <span className="block font-light text-sm sm:text-base md:text-lg text-gray-700 mb-2">
        {data.class.name || 'Unknown Subject'}
      </span>
      <hr className="mb-4 border-gray-300" />
      <h1 className="font-bold text-xl sm:text-2xl md:text-3xl mb-3">
        {data.title}
      </h1>
      <div className="flex flex-wrap gap-4 mb-4 text-gray-500 text-xs sm:text-sm">
        <span>Posted {new Date(data.created_at || data.posted).toLocaleDateString()}</span>
        {type === 'assignment' && (
          <span>
            Due:{' '}
            {new Date(data.due_date).toLocaleString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        )}
      </div>
      <p className="text-gray-700 text-sm sm:text-base mb-6 leading-relaxed">
        {data.description}
      </p>

      {/* Resources */}
      {resources.length > 0 && (
        <>
          <hr className="mb-4 border-gray-300" />
          <h2 className="text-sm sm:text-base font-semibold mb-2">Resources</h2>
          <div className="flex flex-wrap gap-4">
            {resources.map((res, index) => (
              <a
                key={index}
                href={`${baseUrl}/storage/${res.file_path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-40 md:w-48 lg:w-52 p-3 bg-gray-50 rounded-md shadow-sm flex flex-col items-start hover:bg-gray-200 transition cursor-pointer"
              >
                {getFileIcon(res.file_name)}
                <p className="mt-2 text-start text-sm font-medium">
                  {res.file_name || res.filename}
                </p>
                <span className="text-xs text-gray-500">
                  {res.size || 'Unknown Size'}
                </span>
              </a>
            ))}
          </div>
        </>
      )}

      {/* Submitted Files View */}
      {submittedFiles.length > 0 && (
        <>
          <hr className="my-6 border-gray-300" />
          <h2 className="text-sm sm:text-base font-semibold mb-2">Your Submitted Files</h2>
          <div className="flex flex-wrap gap-4">
            {submittedFiles.map((file, index) => (
              <a
                key={index}
                href={`${baseUrl}/storage/${file.file_path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-40 md:w-48 lg:w-52 p-3 bg-green-50 rounded-md shadow-sm flex flex-col items-start hover:bg-green-100 transition cursor-pointer"
              >
                {getFileIcon(file.file_path)}
                <p className="mt-2 text-start text-sm font-medium">
                  {file.file_path}
                </p>
              </a>
            ))}
          </div>
        </>
      )}

      {/* Submission Form */}
      {(type === 'assignment' && status === "pending" && submittedFiles.length === 0) && (
        <>
          <hr className="my-6 border-gray-300" />
          <h2 className="text-sm sm:text-base font-semibold mb-2">Submit Assignment</h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmitAssignment}>
            <div>
              <label htmlFor="assignmentFile" className="block mb-1 text-sm font-medium text-gray-700">
                Upload your assignment file
              </label>
              <input
                type="file"
                id="assignmentFile"
                name="assignmentFile"
                multiple
                className="block w-full border border-gray-300 rounded px-3 py-2"
                onChange={(e) => setSelectedFile(Array.from(e.target.files))}
              />
            </div>
            <button
              type="submit"
              disabled={uploading}
              className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded w-fit ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {uploading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </>
      )}

      {(type === 'assignment' && status === "missed") && (
        <div>
          <hr className="my-6 border-gray-300" />
          <span className='text-red-500'>You missed this assignment.</span>
        </div>
      )}
    </div>
  );
}
