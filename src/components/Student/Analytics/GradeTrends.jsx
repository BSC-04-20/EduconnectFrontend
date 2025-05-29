import { FaChartLine, FaSpinner } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const GradeTrends = ({ loadingMarks, marksError, marksData, getMarksChartData, getGradeStats, getGradeColor }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-6">
      <FaChartLine className="mr-2 text-green-600" />
      Grade Trends
    </h3>
    
    {loadingMarks ? (
      <div className="flex justify-center items-center py-12">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
        <span className="ml-3 text-gray-600">Loading grades data...</span>
      </div>
    ) : marksError ? (
      <div className="text-center py-12">
        <FaExclamationTriangle className="text-4xl text-red-500 mx-auto mb-4" />
        <p className="text-red-600">{marksError}</p>
      </div>
    ) : marksData && getMarksChartData().length > 0 ? (
      <>
        {/* Grade Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {getGradeStats() && (
            <>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {getGradeStats().average}%
                </div>
                <div className="text-sm text-gray-600">Average</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {getGradeStats().highest}%
                </div>
                <div className="text-sm text-gray-600">Highest</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {getGradeStats().lowest}%
                </div>
                <div className="text-sm text-gray-600">Lowest</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {getGradeStats().totalGraded}/{getGradeStats().totalAssignments}
                </div>
                <div className="text-sm text-gray-600">Graded</div>
              </div>
            </>
          )}
        </div>

        {/* Line Chart for Grade Trends */}
        <div className="mb-6">
          <h4 className="text-md font-semibold text-gray-700 mb-4">Grade Progression Over Time</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={getMarksChartData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                domain={[0, 100]}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value, name) => [`${value}%`, 'Marks']}
                labelFormatter={(label, payload) => {
                  if (payload && payload[0] && payload[0].payload) {
                    return payload[0].payload.fullName;
                  }
                  return label;
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="marks" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2 }}
                name="Marks (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Assignment Details Table */}
        <div className="overflow-x-auto">
          <h4 className="text-md font-semibold text-gray-700 mb-4">Assignment Details</h4>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-800">Assignment</th>
                <th className="text-center py-2 px-3 font-semibold text-gray-800">Marks</th>
                <th className="text-center py-2 px-3 font-semibold text-gray-800">Status</th>
                <th className="text-center py-2 px-3 font-semibold text-gray-800">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {marksData.map((assignment, index) => (
                <tr key={assignment.assignment_id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 px-3 font-medium">{assignment.title}</td>
                  <td className={`py-2 px-3 text-center font-semibold ${
                    assignment.marks_obtained ? getGradeColor(parseFloat(assignment.marks_obtained)) : 'text-gray-400'
                  }`}>
                    {assignment.marks_obtained ? `${assignment.marks_obtained}%` : 'N/A'}
                  </td>
                  <td className="py-2 px-3 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      assignment.marks_obtained && assignment.submitted_at 
                        ? 'bg-green-100 text-green-800' 
                        : assignment.submitted_at 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {assignment.marks_obtained && assignment.submitted_at 
                        ? 'Graded' 
                        : assignment.submitted_at 
                        ? 'Submitted'
                        : 'Not Submitted'}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-center text-gray-600">
                    {assignment.submitted_at 
                      ? new Date(assignment.submitted_at).toLocaleDateString()
                      : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {getGradeStats() && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <FaChartLine className="text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-blue-800">Performance Analysis</h4>
                <p className="text-sm text-blue-700">
                  You have completed {getGradeStats().totalGraded} out of {getGradeStats().totalAssignments} assignments with an average score of {getGradeStats().average}%. 
                  {getGradeStats().average >= 80 ? ' Excellent performance! Keep up the great work.' :
                    getGradeStats().average >= 70 ? ' Good performance with room for improvement.' :
                    getGradeStats().average >= 60 ? ' Fair performance - consider seeking additional help.' :
                    ' Performance needs significant improvement - please consult with your instructor.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </>
    ) : (
      <div className="text-center py-12">
        <p className="text-gray-600">No graded assignments found</p>
      </div>
    )}
  </div>
);

export default GradeTrends;