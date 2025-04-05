import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { StudentAuthenticatedUserUrl } from '../config/urlFetcher';

export default function AssignmentUpload() {
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const { id } = useParams();

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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      const formData = new FormData();
      files.forEach((fileObj) => {
        formData.append('files[]', fileObj.file);
      });

      const response = await StudentAuthenticatedUserUrl.post(
        `/assignment/submit/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 201) {
        setSubmitMessage('Files submitted successfully!');
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h3 className="text-2xl font-semibold text-blue-700 mb-6">UPLOAD ASSIGNMENT</h3>

        <div className="border-2 border-dashed border-gray-400 p-6 rounded-xl mb-6">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="block w-full mb-2"
            disabled={isSubmitting}
          />
          <small className="text-sm text-gray-500">Submit files and videos (Max: 25MB each)</small>
        </div>

        <div className="mb-6">
          {files.map((fileObj, index) => (
            <div key={`${fileObj.file.name}-${index}`} className="flex justify-between items-center mb-4 p-4 bg-gray-100 rounded-lg">
              <span className="text-sm text-gray-700">{fileObj.file.name} {fileObj.status === 'completed' && '✓'} {fileObj.status === 'error' && '✗'}</span>
              {fileObj.status === 'pending' && (
                <>
                  <progress value={fileObj.progress} max="100" className="flex-grow mx-2" />
                  <span>{fileObj.progress}%</span>
                </>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className={`w-full py-2 rounded-md text-white bg-blue-700 ${isSubmitting ? 'opacity-70' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
        </button>

        {submitMessage && (
          <p className={`mt-4 text-center ${submitMessage.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
            {submitMessage}
          </p>
        )}
      </div>
    </div>
  );
}
