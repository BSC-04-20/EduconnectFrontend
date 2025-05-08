import { useEffect, useState } from "react";
import {
  FaDownload,
  FaTrash,
  FaFilePdf,
  FaFileWord,
  FaFileImage,
  FaFileVideo,
  FaFileAlt,
  FaSpinner,
} from "react-icons/fa";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AuthenticatedUserUrl } from "../../../config/urlFetcher";
import Modal from "react-modal";

dayjs.extend(relativeTime);

const FILE_ICONS = {
  pdf: <FaFilePdf className="text-red-600 size-10" />,
  doc: <FaFileWord className="text-blue-600 size-10" />,
  docx: <FaFileWord className="text-blue-600 size-10" />,
  jpg: <FaFileImage className="text-green-600 size-10" />,
  jpeg: <FaFileImage className="text-green-600 size-10" />,
  png: <FaFileImage className="text-green-600 size-10" />,
  mp4: <FaFileVideo className="text-purple-600 size-10" />,
  mkv: <FaFileVideo className="text-purple-600 size-10" />,
  default: <FaFileAlt className="text-gray-500 size-10" />,
};

const truncateFileName = (filename, maxLength = 25) => {
  const parts = filename.split(".");
  if (parts.length < 2) return filename;
  const ext = parts.pop();
  const name = parts.join(".");
  const truncated =
    name.length > maxLength ? name.substring(0, maxLength) + "..." : name;
  return `${truncated}.${ext}`;
};

Modal.setAppElement("#root");

export default function LecturePostedResources() {
  const [resources, setResources] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = () => {
    setIsFetching(true);
    AuthenticatedUserUrl.get("/resources/lecture")
      .then((response) => {
        const flatResources = response.data.resources
          .flat()
          .filter((item) => item && item.resource_name);
        setResources(flatResources);
      })
      .catch((error) => {
        console.error("Failed to fetch resources:", error);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  const getFileExtension = (filename) => {
    const parts = filename.split(".");
    return parts.length > 1 ? parts.pop().toLowerCase() : "default";
  };

  const getFileIcon = (filename) => {
    const ext = getFileExtension(filename);
    return FILE_ICONS[ext] || FILE_ICONS.default;
  };

  const handleDownload = async (resourceId, fileId, fileName) => {
    setDownloadingId(fileId);
    try {
      const response = await AuthenticatedUserUrl.get(
        `/download/${resourceId}/${fileId}`,
        {
          responseType: "blob",
          withCredentials: true,
        }
      );

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download file:", error);
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDelete = async () => {
    if (!selectedResource) return;
    setDeletingId(selectedResource.id);
    try {
      await AuthenticatedUserUrl.delete(`/resources/resource/file/${selectedResource.id}`);
      setResources((prev) => prev.filter((res) => res.id !== selectedResource.id));
      setModalIsOpen(false);
    } catch (error) {
      console.error("Failed to delete resource:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const openModal = (resource) => {
    setSelectedResource(resource);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedResource(null);
  };

  return (
    <div className="bg-white rounded-lg w-[95%] py-10 px-5">
      {isFetching ? (
        <p className="text-center text-gray-500">Loading resources...</p>
      ) : resources.length === 0 ? (
        <p className="text-center text-gray-500">No resources posted yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 shadow-sm flex flex-col items-start"
            >
              <div className="mb-3">{getFileIcon(resource.resource_name)}</div>
              <p
                className="font-semibold text-sm break-words"
                title={resource.resource_name}
              >
                {truncateFileName(resource.resource_name)}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Uploaded {dayjs(resource.created_at).fromNow()}
              </p>
              <div className="mt-4 flex gap-4 self-start md:self-end">
                <button
                  onClick={() =>
                    handleDownload(
                      resource.resource_id,
                      resource.id,
                      resource.resource_name
                    )
                  }
                  className={`text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 ${
                    downloadingId === resource.id && "opacity-50 pointer-events-none"
                  }`}
                  disabled={downloadingId === resource.id}
                  title="Download"
                >
                  {downloadingId === resource.id ? (
                    <FaSpinner className="animate-spin size-5" />
                  ) : (
                    <FaDownload className="size-5" />
                  )}
                </button>
                <button
                  onClick={() => openModal(resource)}
                  className={`text-gray-600 hover:text-red-600 transition-colors ${
                    deletingId === resource.id && "opacity-50 pointer-events-none"
                  }`}
                  disabled={deletingId === resource.id}
                  title="Delete"
                >
                  <FaTrash className="size-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Deletion"
        overlayClassName="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50"
        className="bg-white p-6 rounded-md shadow-lg w-full max-w-sm mx-auto outline-none"
      >
        <h2 className="text-lg font-semibold text-start mb-4">Confirm Deletion</h2>
        <p className="text-start mb-6">
          Are you sure you want to delete "{selectedResource?.resource_name}"?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 text-black rounded-md"
            disabled={deletingId === selectedResource?.id}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md flex items-center gap-2"
            disabled={deletingId === selectedResource?.id}
          >
            {deletingId === selectedResource?.id ? (
              <FaSpinner className="animate-spin size-4" />
            ) : null}
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
}
