import React, { useState, useEffect } from 'react';
import { StudentAuthenticatedUserUrl } from '../../../config/urlFetcher';
import QuickStats from './QuickStats';
import AcademicProgress from './AcademicProgress';
import SubmissionTrends from './SubmissionTrends';
import GradeTrends from './GradeTrends';
import { FaGraduationCap } from 'react-icons/fa';


// ==================== COMPONENTS ====================

const Header = ({ studentData }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-8">
    <div className="flex items-center space-x-4">
      <div className="p-3 bg-indigo-100 rounded-full">
        <FaGraduationCap className="text-indigo-600 text-2xl" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Student Analytics</h1>
        <p className="flex flex-col gap-1 text-gray-600">
          <span>{studentData?.fullname || 'Loading...'}</span>
          <span>{studentData?.studentId ? studentData.studentId :  studentData.email}</span>
        </p>
      </div>
    </div>
  </div>
);

// ==================== MAIN COMPONENT ====================

const StudentAnalyticsDashboard = () => {
  // State for API data
  const [submissionData, setSubmissionData] = useState(null);
  const [averageScore, setAverageScore] = useState(null);
  const [assignmentStats, setAssignmentStats] = useState(null);
  const [marksData, setMarksData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingAverage, setLoadingAverage] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingMarks, setLoadingMarks] = useState(true);
  const [error, setError] = useState(null);
  const [averageError, setAverageError] = useState(null);
  const [statsError, setStatsError] = useState(null);
  const [marksError, setMarksError] = useState(null);
  const [studentInfo, setStudentInfo] = useState({
    fullname: 'Loading...',
    studentId: ''
  });
  
  // Sample data for other metrics (replace with API calls as needed)
  const [studentData] = useState({
    name: "Alex Johnson",
    studentId: "ST001234",
    assignmentCompletionRate: 87,
    onTimeSubmissionRate: 73,
    gradeHistory: [
      { month: 'Jan', math: 85, science: 92, english: 78, history: 88 },
      { month: 'Feb', math: 88, science: 89, english: 82, history: 85 },
      { month: 'Mar', math: 92, science: 94, english: 85, history: 91 },
      { month: 'Apr', math: 89, science: 91, english: 88, history: 87 },
      { month: 'May', math: 93, science: 96, english: 91, history: 89 }
    ],
    currentGrades: {
      math: 91,
      science: 94,
      english: 87,
      history: 88
    }
  });

  // Fetch submission data from API
  useEffect(() => {
    const fetchSubmissionData = async () => {
      try {
        setLoading(true);
        const response = await StudentAuthenticatedUserUrl.get('/assignment/group');
        setSubmissionData(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch submission data');
        console.error('Error fetching submission data:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchAverageScore = async () => {
      try {
        setLoadingAverage(true);
        const response = await StudentAuthenticatedUserUrl.get('/assignment/average');
        setAverageScore(response.data.average_score);
        setAverageError(null);
      } catch (err) {
        setAverageError('Failed to fetch average score');
        console.error('Error fetching average score:', err);
      } finally {
        setLoadingAverage(false);
      }
    };

    const fetchAssignmentStats = async () => {
      try {
        setLoadingStats(true);
        const response = await StudentAuthenticatedUserUrl.get('/assignment/stats');
        setAssignmentStats(response.data);
        setStatsError(null);
      } catch (err) {
        setStatsError('Failed to fetch assignment statistics');
        console.error('Error fetching assignment statistics:', err);
      } finally {
        setLoadingStats(false);
      }
    };

    const fetchMarksData = async () => {
      try {
        setLoadingMarks(true);
        const response = await StudentAuthenticatedUserUrl.get('/assignment/marks');
        setMarksData(response.data);
        setMarksError(null);
      } catch (err) {
        setMarksError('Failed to fetch marks data');
        console.error('Error fetching marks data:', err);
      } finally {
        setLoadingMarks(false);
      }
    };

    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await StudentAuthenticatedUserUrl.get('/user');
        setStudentInfo(response.data)
      } catch (error) {
        console.log(error)
      }finally{
        setLoading(false)
      }
    }

    fetchUserData();
    fetchSubmissionData();
    fetchAverageScore();
    fetchAssignmentStats();
    fetchMarksData();
  }, []);

  // Process marks data for charts
  const getMarksChartData = () => {
    if (!marksData) return [];
    
    return marksData
      .filter(assignment => assignment.marks_obtained !== null)
      .map((assignment, index) => ({
        name: assignment.title.length > 20 ? 
          assignment.title.substring(0, 20) + '...' : 
          assignment.title,
        fullName: assignment.title,
        marks: parseFloat(assignment.marks_obtained),
        submittedAt: assignment.submitted_at,
        index: index + 1
      }))
      .sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt));
  };

  // Get grade statistics
  const getGradeStats = () => {
    if (!marksData) return null;
    
    const gradedAssignments = marksData.filter(assignment => assignment.marks_obtained !== null);
    const totalGraded = gradedAssignments.length;
    const totalAssignments = marksData.length;
    
    if (totalGraded === 0) return null;
    
    const marks = gradedAssignments.map(a => parseFloat(a.marks_obtained));
    const average = marks.reduce((sum, mark) => sum + mark, 0) / marks.length;
    const highest = Math.max(...marks);
    const lowest = Math.min(...marks);
    
    return {
      totalAssignments,
      totalGraded,
      ungraded: totalAssignments - totalGraded,
      average: Math.round(average * 100) / 100,
      highest,
      lowest
    };
  };

  const getAssignmentCompletionRate = () => {
    if (!assignmentStats) return null;
    
    const total = parseInt(assignmentStats.total_assignments);
    const missed = parseInt(assignmentStats.missed_assignments);
    
    if (isNaN(total) || isNaN(missed) || total === 0) return null;
    
    const completed = total - missed;
    return Math.round((completed / total) * 100);
  };

  const getSubmissionTrends = () => {
    if (!submissionData) return null;

    const totalAssignments = 
      (submissionData["Very Early"]?.length || 0) +
      (submissionData["Early"]?.length || 0) +
      (submissionData["Late"]?.length || 0) +
      (submissionData["Very Late"]?.length || 0);

    if (totalAssignments === 0) return null;

    return {
      veryEarly: Math.round(((submissionData["Very Early"]?.length || 0) / totalAssignments) * 100),
      early: Math.round(((submissionData["Early"]?.length || 0) / totalAssignments) * 100),
      late: Math.round(((submissionData["Late"]?.length || 0) / totalAssignments) * 100),
      veryLate: Math.round(((submissionData["Very Late"]?.length || 0) / totalAssignments) * 100)
    };
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getGradeColor = (grade) => {
    if (grade >= 90) return 'text-green-600';
    if (grade >= 80) return 'text-blue-600';
    if (grade >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Header studentData={studentInfo} />
        
        <QuickStats 
          loadingStats={loadingStats}
          statsError={statsError}
          getAssignmentCompletionRate={getAssignmentCompletionRate}
          loadingAverage={loadingAverage}
          averageError={averageError}
          averageScore={averageScore}
          studentData={studentData}
        />
        
        <AcademicProgress 
          loadingStats={loadingStats}
          statsError={statsError}
          assignmentStats={assignmentStats}
          getAssignmentCompletionRate={getAssignmentCompletionRate}
          getProgressColor={getProgressColor}
          studentData={studentData}
        />
        
        <SubmissionTrends 
          loading={loading}
          error={error}
          submissionData={submissionData}
          getSubmissionTrends={getSubmissionTrends}
        />
        
        <GradeTrends 
          loadingMarks={loadingMarks}
          marksError={marksError}
          marksData={marksData}
          getMarksChartData={getMarksChartData}
          getGradeStats={getGradeStats}
          getGradeColor={getGradeColor}
        />
      </div>
    </div>
  );
};

export default StudentAnalyticsDashboard;