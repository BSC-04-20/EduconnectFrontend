import { FaClock, FaExclamationTriangle, FaSpinner } from "react-icons/fa";

const SubmissionTrends = ({ loading, error, submissionData, getSubmissionTrends }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-8">
    <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-6">
      <FaClock className="mr-2 text-purple-600" />
      Submission Time Trends
    </h3>
    
    {loading ? (
      <div className="flex justify-center items-center py-12">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
        <span className="ml-3 text-gray-600">Loading submission data...</span>
      </div>
    ) : error ? (
      <div className="text-center py-12">
        <FaExclamationTriangle className="text-4xl text-red-500 mx-auto mb-4" />
        <p className="text-red-600">{error}</p>
      </div>
    ) : getSubmissionTrends() ? (
      <>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {Object.entries(getSubmissionTrends()).map(([category, percentage]) => (
            <div key={category} className="text-center">
              <div className="relative">
                <div className="w-20 h-20 mx-auto rounded-full border-4 border-gray-200 flex items-center justify-center mb-2">
                  <span className="text-lg font-bold text-gray-800">{percentage}%</span>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-800 capitalize">
                  {category.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <div className={`w-full h-2 rounded-full mt-1 mx-auto ${
                  category === 'veryEarly' ? 'bg-green-500' :
                  category === 'early' ? 'bg-blue-500' :
                  category === 'late' ? 'bg-orange-500' : 'bg-red-500'
                }`} style={{ width: `${Math.max(percentage * 2, 20)}%`, maxWidth: '100%' }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed submission breakdown */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-3">Assignment Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {submissionData && Object.entries(submissionData).map(([category, assignments]) => (
              <div key={category} className="bg-white rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{category}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    category === 'Very Early' ? 'bg-green-100 text-green-800' :
                    category === 'Early' ? 'bg-blue-100 text-blue-800' :
                    category === 'Late' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {assignments.length}
                  </span>
                </div>
                {assignments.length > 0 ? (
                  <div className="space-y-1">
                    {assignments.slice(0, 2).map((assignment, index) => (
                      <div key={assignment.id} className="text-xs text-gray-600 truncate">
                        • {assignment.title}
                      </div>
                    ))}
                    {assignments.length > 2 && (
                      <div className="text-xs text-gray-500">
                        +{assignments.length - 2} more
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-xs text-gray-500">No assignments</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </>
    ) : (
      <div className="text-center py-12">
        <p className="text-gray-600">No submission data available</p>
      </div>
    )}
    
    {!loading && !error && getSubmissionTrends() && (
      <div className="mt-4 text-sm text-gray-600">
        <p>
          {getSubmissionTrends().veryEarly + getSubmissionTrends().early >= 50
            ? 'Great time management! Most assignments submitted early.'
            : getSubmissionTrends().late + getSubmissionTrends().veryLate >= 50
            ? 'Consider improving time management - many late submissions detected.'
            : 'Mixed submission patterns - room for improvement in early submissions.'}
        </p>
      </div>
    )}
  </div>
);

export default SubmissionTrends;
