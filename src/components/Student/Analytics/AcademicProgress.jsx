import { FaCalendarCheck, FaCheckCircle, FaSpinner } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa6";

const AcademicProgress = ({
  loadingStats,
  statsError,
  assignmentStats,
  getAssignmentCompletionRate,
  getProgressColor,
  studentData,
  attendance
}) => {
  console.log("Attendance prop:", attendance);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <FaBookOpen className="text-indigo-600 text-xl" />
        <h2 className="text-2xl font-bold text-gray-800">📘 Academic Progress</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Assignment Completion Rate */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <FaCheckCircle className="mr-2 text-green-600" />
            Assignment Completion Rate
          </h3>
          {loadingStats ? (
            <div className="flex items-center space-x-2">
              <FaSpinner className="animate-spin text-blue-500" />
              <span className="text-gray-600">Loading assignment statistics...</span>
            </div>
          ) : statsError ? (
            <div className="text-red-600 text-sm">{statsError}</div>
          ) : assignmentStats ? (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Completed vs Total Assigned</span>
                <span className="font-semibold">
                  {getAssignmentCompletionRate() !== null ? `${getAssignmentCompletionRate()}%` : 'N/A'}
                </span>
              </div>
              {getAssignmentCompletionRate() !== null && (
                <ProgressBar 
                  percentage={getAssignmentCompletionRate()} 
                  color="bg-green-500"
                />
              )}
              <div className="flex justify-between text-xs text-gray-600">
                <span>Total: {assignmentStats.total_assignments}</span>
                <span>Missed: {assignmentStats.missed_assignments}</span>
                <span>Completed: {parseInt(assignmentStats.total_assignments) - parseInt(assignmentStats.missed_assignments)}</span>
              </div>
              <p className="text-sm text-gray-600">
                {getAssignmentCompletionRate() >= 85 ? 'Excellent completion rate!' : 
                  getAssignmentCompletionRate() >= 70 ? 'Good progress, room for improvement' : 
                  'Needs attention - consider catching up on missing assignments'}
              </p>
            </div>
          ) : (
            <div className="text-gray-600">No assignment data available</div>
          )}
        </div>

        {/* Meetings Attendance */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <FaCalendarCheck className="mr-2 text-blue-600" />
            Meetings Attendance
          </h3>
          {attendance ? (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Attended vs Not Attended</span>
                <span className="font-semibold">
                  {parseInt((attendance.attended_discussions / attendance.total_discussions) * 100, 10) ?? 0}%
                </span>
              </div>
              <ProgressBar 
                percentage={parseInt((attendance.attended_discussions / attendance.total_discussions) * 100, 10)} 
                color="bg-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-600">
                <span>Total: {attendance.total_discussions}</span>
                <span>Attended: {attendance.attended_discussions}</span>
                <span>Not Attended: {attendance.total_discussions - attendance.attended_discussions}</span>
              </div>
              <p className="text-sm text-gray-600">
                {studentData.meetingAttendanceRate >= 85 ? 'Excellent engagement in meetings!' : 
                  studentData.meetingAttendanceRate >= 60 ? 'Decent participation, try attending more regularly' : 
                  'Low attendance - consider improving engagement in sessions'}
              </p>
            </div>
          ) : (
            <div className="text-gray-600">No attendance data available</div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProgressBar = ({ percentage, color }) => (
  <div className="w-full bg-gray-200 rounded-full h-3">
    <div 
      className={`h-3 rounded-full transition-all duration-500 ease-out ${color}`}
      style={{ width: `${percentage}%` }}
    ></div>
  </div>
);

export default AcademicProgress;
