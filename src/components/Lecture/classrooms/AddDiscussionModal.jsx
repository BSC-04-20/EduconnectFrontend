import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

export default function AddDiscussionModal({ isOpen, onClose, onSubmit, classId }) {
  const [meetingName, setMeetingName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true); // Set loading

    try {
      const result = onSubmit({
        class_id: classId,
        meeting_name: meetingName,
        start_time: startTime,
      });
      
      // Check if onSubmit returns a Promise
      if (result && typeof result.then === 'function') {
        await result;
      }
      
      setMeetingName("");
      setStartTime("");
      onClose();
    } catch (error) {
      console.error("Error submitting discussion:", error);
      alert("Error submitting discussion.");
    } finally {
      setIsSubmitting(false); // Reset loading
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
        <div className="bg-white rounded-2xl shadow-lg p-6 z-50 w-full max-w-md relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            disabled={isSubmitting}
          >
            <X size={20} />
          </button>
          <Dialog.Title className="text-xl font-semibold mb-4">Add Discussion</Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Meeting Name</label>
              <input
                type="text"
                value={meetingName}
                onChange={(e) => setMeetingName(e.target.value)}
                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Time</label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-60"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Discussion"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
}