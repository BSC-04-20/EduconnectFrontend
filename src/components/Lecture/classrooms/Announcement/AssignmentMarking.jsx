import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { AuthenticatedUserUrl } from "../../../../config/urlFetcher";
import { FaEnvelope, FaUser } from "react-icons/fa";

export default function AssignmentMarking() {
  const { submissionId } = useParams();

  const [numPages, setNumPages] = useState(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [fileUrl, setFileUrl] = useState("");
  const [userDetails, setUserDetails] = useState({
    fullname:"",
    email:""
  })

  const [marks, setMarks] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const containerRef = useRef(null);
  const pageRefs = useRef([]);

  const filename = fileUrl ? fileUrl.split("/").pop() : "";

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    pageRefs.current = new Array(numPages).fill(null);
  }

  useEffect(() => {
    async function fetchAssignment() {
      try {
        const res = await AuthenticatedUserUrl.get(`/assignment/submission/${submissionId}`);
        const fileUrlFromAPI = res.data?.files[0].file_path;
        setUserDetails(res.data.student);
        setFileUrl(fileUrlFromAPI);
      } catch (error) {
        console.error("Failed to load assignment:", error);
      }
    }
    fetchAssignment();
  }, [submissionId]);

  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (!containerRef.current || !pageRefs.current.length) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      let closestPage = 0;
      let closestDistance = Infinity;

      for (let i = 0; i < pageRefs.current.length; i++) {
        const pageEl = pageRefs.current[i];
        if (pageEl) {
          const rect = pageEl.getBoundingClientRect();
          const pageCenter = rect.top + rect.height / 2;
          const containerCenter = containerRect.top + containerRect.height / 2;
          const distance = Math.abs(pageCenter - containerCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestPage = i;
          }
        }
      }

      setCurrentPage(closestPage + 1);
    }

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [numPages]);

  const handleMarksChange = (e) => {
    const value = e.target.value;
    if (value === "" || (/^\d+$/.test(value) && +value <= 100)) {
      setMarks(value);
      setSubmissionStatus(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (marks === "") return;

    setIsSubmitting(true);
    setSubmissionStatus(null);

    try {
      await AuthenticatedUserUrl.post(`/assignment/mark/${submissionId}`, {
        marks: Number(marks),
      });
      setSubmissionStatus("success");
    } catch (error) {
      console.error("Failed to submit marks:", error);
      setSubmissionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center px-4 py-6 bg-gray-50 min-h-screen">
      {/* Marks Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-row gap-4 mb-8 w-full max-w-lg items-center"
      >
        <input
          type="number"
          className="flex-1 border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          placeholder="Enter marks (0-100)"
          max="100"
          min="0"
          value={marks}
          onChange={handleMarksChange}
          disabled={isSubmitting}
        />
        <input
          type="submit"
          value={isSubmitting ? "Submitting..." : "Submit"}
          disabled={isSubmitting || marks === ""}
          className={`${
            isSubmitting || marks === ""
              ? "bg-sky-300 cursor-not-allowed"
              : "bg-sky-500 hover:bg-sky-600 cursor-pointer"
          } text-white px-5 py-2 rounded shadow-md transition`}
        />
      </form>

      {/* Submission status message */}
      {submissionStatus === "success" && (
        <p className="text-green-600 mb-4 font-semibold">Marks submitted successfully!</p>
      )}
      {submissionStatus === "error" && (
        <p className="text-red-600 mb-4 font-semibold">Failed to submit marks. Try again.</p>
      )}

      {/* File Info */}
      <div className="w-full max-w-5xl mb-4">
        <div className="bg-white rounded-md p-4 shadow text-start">
          <p className="flex flex-row gap-5 items-center mb-2"><FaUser className="text-sky-400"/>{userDetails.fullname}</p>
          <p className="flex flex-row gap-5 items-center mb-2"><FaEnvelope className="text-sky-400"/>{userDetails.email}</p>
          <p className="text-xl font-semibold text-gray-800 break-words">📄 {filename}</p>
          {numPages !== null && (
            <p className="text-gray-500 mt-1">Total Pages: {numPages}</p>
          )}
        </div>
      </div>

      {/* Current Page Display */}
      {numPages && (
        <div className="fixed top-4 right-4 bg-white/80 backdrop-blur-sm text-sm text-gray-800 shadow-lg px-4 py-2 rounded-xl font-semibold z-10">
          Page {currentPage} / {numPages}
        </div>
      )}

      {/* PDF Viewer */}
      {fileUrl && (
        <div
          ref={containerRef}
          className="border bg-white w-full max-w-5xl shadow-lg overflow-y-auto h-[80vh] px-2 py-6 space-y-6 rounded-md"
        >
          <Document
            file={`${import.meta.env.VITE_BASE_API_URL}/storage/${filename}`}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={console.error}
            className="w-full"
          >
            {Array.from(new Array(numPages), (el, index) => (
              <div
                key={`page_wrapper_${index}`}
                ref={(el) => (pageRefs.current[index] = el)}
                className="w-full flex justify-center"
              >
                <Page
                  pageNumber={index + 1}
                  width={containerWidth > 0 ? containerWidth - 32 : 600}
                />
              </div>
            ))}
          </Document>
        </div>
      )}
    </div>
  );
}
