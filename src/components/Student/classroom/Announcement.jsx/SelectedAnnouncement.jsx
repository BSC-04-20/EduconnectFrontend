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
  const [status, setStatus] = useState();
  const [mark, setMarking] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!type || !selectedId) return;

      const endpoint =
        type === 'announcement'
          ? `/announcement/get/${selectedId}`
          : `/assignment/get/${selectedId}`;

      try {
        const res = await StudentAuthenticatedUserUrl.get(endpoint);
        {type === "announcement" ? setData(res.data) : setData(res.data.assignment);}
        setStatus(res.data.status);
        if (res.data.assignment?.files) {
          setResources(res.data.assignment.files);
        }
        if (res.data.submitted_files) {
          setSubmittedFiles(res.data.submitted_files);
        }
        if (res.data.mark) {
          setMarking(res.data.mark);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchData();
  }, [type, selectedId]);

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
      window.location.reload();
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

      {/* Content Header */}
      <span className="block font-light text-sm sm:text-base md:text-lg text-gray-700 mb-2">
        {type === 'assignment' ? data.class?.name || 'Unknown Subject' : data.name || 'Unknown Subject'}
      </span>

      {/* Marking Section */}
      {type === 'assignment' && (
        <>
          {mark ? (
            <div className="bg-gray-50 border border-gray-300 rounded p-4 mb-6">
              <p className="text-lg font-semibold text-green-600">Marks: {mark}</p>
              </div>
          ) : (
            <p className="text-gray-500 italic mb-6">Not marked yet.</p>
          )}
        </>
      )}

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
      {(type === 'assignment' && status === "not submitted" && submittedFiles.length === 0) && (
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
