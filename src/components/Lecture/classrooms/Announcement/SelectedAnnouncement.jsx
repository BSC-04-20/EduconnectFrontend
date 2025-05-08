import { FaFilePdf, FaFileWord, FaFileImage, FaFileAlt } from 'react-icons/fa';
import { MdLibraryBooks } from 'react-icons/md';
import { useParams } from 'react-router-dom';

const getFileIcon = (filename) => {
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
    const {selectedId} = useParams();

  const resources = [
    { name: 'Navigations Workbook', size: '15mb', file: 'workbook.pdf' },
    { name: 'Navigations Workbook', size: '15mb', file: 'workbook.docx' },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-10 rounded-lg max-w-4xl mx-auto">
      <span className="block font-semibold text-sm sm:text-base md:text-lg text-gray-700 mb-2 ">
        mobile Development
      </span>
      <h1 className="font-bold text-xl sm:text-2xl md:text-3xl mb-3">
        MyCampus Companion App
      </h1>
      <div className="flex flex-wrap gap-4 mb-4 text-gray-500 text-xs sm:text-sm">
        <span>Posted 20 May 2025</span>
      </div>
      <p className="text-gray-700 text-sm sm:text-base mb-6 leading-relaxed">
        Design and build a mobile app that helps university students manage their schedules, access campus services, and stay informed through intuitive, real-time features.
      </p>
      
      <h2 className="text-sm sm:text-base font-semibold mb-2">Resources</h2>
      <div className="flex gap-4 flex-wrap">
        {resources.map((res, index) => (
          <div
            key={index}
            className="w-40 p-3 bg-gray-100 rounded-md shadow-sm flex flex-col items-start hover:bg-gray-200 transition"
          >
            {getFileIcon(res.file)}
            <p className="mt-2 text-start text-sm font-medium">{res.name}</p>
            <span className="text-xs text-gray-500">{res.size}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
