import { FaChartLine, FaCheckCircle, FaClock, FaSpinner, FaTrophy } from "react-icons/fa";

const QuickStats = ({ loadingStats, statsError, getAssignmentCompletionRate, loadingAverage, averageError, averageScore, studentData }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <MetricCard
      icon={FaCheckCircle}
      title="Assignment Completion"
      value={loadingStats ? (
        <FaSpinner className="animate-spin text-xl" />
      ) : statsError ? (
        <span className="text-red-500 text-sm">Error</span>
      ) : getAssignmentCompletionRate() !== null ? (
        `${getAssignmentCompletionRate()}%`
      ) : (
        "N/A"
      )}
      subtitle={loadingStats ? "Loading..." : statsError ? "Failed to load" : "Completed"}
      color="green"
    />
    <MetricCard
      icon={FaClock}
      title="Meeting attendance"
      value={`${studentData.onTimeSubmissionRate}%`}
      subtitle="Punctual"
      color="blue"
    />
    <MetricCard
      icon={FaTrophy}
      title="Overall Average"
      value={loadingAverage ? (
        <FaSpinner className="animate-spin text-xl" />
      ) : averageError ? (
        <span className="text-red-500 text-sm">Error</span>
      ) : averageScore ? (
        `${averageScore}%`
      ) : (
        "N/A"
      )}
      subtitle={loadingAverage ? "Loading..." : averageError ? "Failed to load" : "All Assignments"}
      color="yellow"
    />
    <MetricCard
      icon={FaChartLine}
      title="Performance Status"
      value={loadingAverage ? (
        <FaSpinner className="animate-spin text-xl" />
      ) : averageError ? (
        <span className="text-red-500 text-sm">Error</span>
      ) : averageScore ? (
        parseFloat(averageScore) >= 80 ? "↑ Excellent" :
        parseFloat(averageScore) >= 70 ? "→ Good" :
        parseFloat(averageScore) >= 60 ? "⚠ Fair" : "↓ Needs Work"
      ) : (
        "N/A"
      )}
      subtitle={loadingAverage ? "Loading..." : averageError ? "Failed to load" : "Based on Average"}
      color="purple"
    />
  </div>
);

const MetricCard = ({ icon: Icon, title, value, subtitle, color = "blue" }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-full bg-${color}-100`}>
        <Icon className={`text-${color}-600 text-xl`} />
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold text-gray-800">{value}</div>
        <div className="text-sm text-gray-600">{subtitle}</div>
      </div>
    </div>
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
  </div>
);

export default QuickStats;