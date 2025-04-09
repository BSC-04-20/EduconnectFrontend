import React, { useState } from 'react';
import { FaBullhorn } from 'react-icons/fa6';
import { MdLibraryBooks } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { StudentAuthenticatedUserUrl } from '../../../../config/urlFetcher';

export default function StudentClassroomFeed({ announcements }) {
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState(null);
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleFileChange = (e) => {
    const newSelectedFiles = Array.from(e.target.files).map((file) => ({
      file,
      progress: 0,
    }));
    setFiles((prevFiles) => [...prevFiles, ...newSelectedFiles]);
    simulateUpload(newSelectedFiles);
  };

  const simulateUpload = (fileList) => {
    fileList.forEach((fileObj) => {
      const uploadInterval = setInterval(() => {
        setFiles((prevFiles) => {
          return prevFiles.map((f) => {
            if (f.file.name === fileObj.file.name && f.progress < 100) {
              const newProgress = f.progress + 10;
              if (newProgress >= 100) {
                clearInterval(uploadInterval);
              }
              return { ...f, progress: Math.min(newProgress, 100) };
            }
            return f;
          });
        });
      }, 200);
    });
  };

  const handleRemoveFile = (indexToRemove) => {
    setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitMessage('');
    try {
      const formData = new FormData();
      files.forEach((fileObj) => {
        formData.append('files[]', fileObj.file);
      });
      const response = await StudentAuthenticatedUserUrl.post(
        `/assignment/submit/${selectedAnnouncementId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response.status === 201) {
        setSubmitMessage('Files submitted successfully!');
        setFiles([]); // Clear files after successful submission
      } else {
        setSubmitMessage('Failed to submit files!');
      }
    } catch (error) {
      setSubmitMessage('An error occurred during submission!');
      console.error('Error submitting files:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-5 relative">
      <ul>
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="p-4 bg-white shadow-sm rounded-md mb-2 flex items-center gap-3 cursor-pointer"
            onClick={() => {
              if (announcement.type === 'assignment') {
                setSelectedAnnouncementId(announcement.id);
                setShowUploadPopup(true);
              }
            }}
          >
            {announcement.type === 'announcement' ? (
              <FaBullhorn className="text-sky-600" />
            ) : (
              <MdLibraryBooks className="text-sky-600" />
            )}
            <div>
              <h3 className="font-semibold">{announcement.title}</h3>
              <p className="text-gray-500 text-sm">
                {new Date(announcement.created_at).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        ))}
      </ul>

      {showUploadPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg sm:max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => {
                setShowUploadPopup(false);
                setFiles([]);
                setSubmitMessage('');
              }}
            >
              &#10005;
            </button>
            <h3 className="text-2xl font-semibold text-sky-700 mb-6">UPLOAD ASSIGNMENT</h3>
            <div className="border-2 border-dashed border-gray-400 p-6 rounded-xl mb-4">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="block w-full mb-2"
                disabled={isSubmitting}
              />
              <small className="text-sm text-gray-500">
                Submit files and videos (Max: 25MB each)
              </small>
              {/* <p className="text-sm mt-2 text-gray-700">
                Total files selected: <strong>{files.length}</strong>
              </p> */}
            </div>

            <div className="mb-4 max-h-60 overflow-y-auto">
              {files.map((fileObj, index) => (
                <div
                  key={`${fileObj.file.name}-${index}`}
                  className="flex justify-between items-center mb-3 p-3 bg-gray-100 rounded-lg"
                >
                  <div className="flex-1 text-sm text-gray-700 truncate">{fileObj.file.name}</div>
                  <progress value={fileObj.progress} max="100" className="mx-2 w-24" />
                  <span className="text-sm">{fileObj.progress}%</span>
                  <button
                    className="ml-2 text-red-600 hover:text-red-800 text-sm"
                    onClick={() => handleRemoveFile(index)}
                    disabled={isSubmitting}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              className={`w-full bg-sky-700 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isSubmitting || files.length === 0}
            >
              {isSubmitting ? 'Submitting...' : 'SUBMIT'}
            </button>

            {submitMessage && (
              <p className="text-sm mt-4 text-center text-gray-700">{submitMessage}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}








