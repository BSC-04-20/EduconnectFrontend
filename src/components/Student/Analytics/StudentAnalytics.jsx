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
          <span>{studentData?.studentId ? studentData.studentId : studentData.email}</span>
        </p>
      </div>
    </div>
  </div>
);

// ==================== MAIN COMPONENT ====================

const StudentAnalyticsDashboard = () => {
  const [submissionData, setSubmissionData] = useState(null);
  const [averageScore, setAverageScore] = useState(null);
  const [assignmentStats, setAssignmentStats] = useState(null);
  const [marksData, setMarksData] = useState(null);
  const [studentInfo, setStudentInfo] = useState({ fullname: 'Loading...', studentId: '' });
  const [attendancePercentage, setAttendancePercentage] = useState(0);

  const [loading, setLoading] = useState(true);
  const [loadingAverage, setLoadingAverage] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingMarks, setLoadingMarks] = useState(true);

  const [error, setError] = useState(null);
  const [averageError, setAverageError] = useState(null);
  const [statsError, setStatsError] = useState(null);
  const [marksError, setMarksError] = useState(null);

  // Attendance State;
  const [attendance, setAttendance] = useState();
  const [loadingAttendance, setLoadingAttendance] = useState(false);

  useEffect(() => {
    const fetchSubmissionData = async () => {
      try {
        setLoading(true);
        const response = await StudentAuthenticatedUserUrl.get('/assignment/group');
        setSubmissionData(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch submission data');
        console.error(err);
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
        console.error(err);
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
        console.error(err);
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
        console.error(err);
      } finally {
        setLoadingMarks(false);
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await StudentAuthenticatedUserUrl.get('/user');
        setStudentInfo(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchAttendance = async () => {
      try {
        setLoadingAttendance(true);
        const response = await StudentAuthenticatedUserUrl.get('/classes/discussion/summary');
        console.log(response.data)
        setAttendance(response.data);
        setAttendancePercentage((response.data.attended_discussions / response.data.total_discussions ) * 100)
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingAttendance(false);
      }
    };

    fetchUserData();
    fetchSubmissionData();
    fetchAverageScore();
    fetchAssignmentStats();
    fetchMarksData();
    fetchAttendance();
    console.log(attendancePercentage)
  }, []);

  const getMarksChartData = () => {
    if (!marksData) return [];
    return marksData
      .filter(a => a.marks_obtained !== null)
      .map((a, i) => ({
        name: a.title.length > 20 ? a.title.substring(0, 20) + '...' : a.title,
        fullName: a.title,
        marks: parseFloat(a.marks_obtained),
        submittedAt: a.submitted_at,
        index: i + 1,
      }))
      .sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt));
  };

  const getGradeStats = () => {
    if (!marksData) return null;
    const graded = marksData.filter(a => a.marks_obtained !== null);
    const total = marksData.length;
    if (graded.length === 0) return null;

    const scores = graded.map(a => parseFloat(a.marks_obtained));
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;

    return {
      totalAssignments: total,
      totalGraded: graded.length,
      ungraded: total - graded.length,
      average: Math.round(avg * 100) / 100,
      highest: Math.max(...scores),
      lowest: Math.min(...scores),
    };
  };

  const getAssignmentCompletionRate = () => {
    if (!assignmentStats) return null;
    const total = parseInt(assignmentStats.total_assignments);
    const missed = parseInt(assignmentStats.missed_assignments);
    if (isNaN(total) || isNaN(missed) || total === 0) return null;
    return Math.round(((total - missed) / total) * 100);
  };

  const getSubmissionTrends = () => {
    if (!submissionData) return null;
    const total = ["Very Early", "Early", "Late", "Very Late"]
      .reduce((acc, key) => acc + (submissionData[key]?.length || 0), 0);
    if (total === 0) return null;
    return {
      veryEarly: Math.round(((submissionData["Very Early"]?.length || 0) / total) * 100),
      early: Math.round(((submissionData["Early"]?.length || 0) / total) * 100),
      late: Math.round(((submissionData["Late"]?.length || 0) / total) * 100),
      veryLate: Math.round(((submissionData["Very Late"]?.length || 0) / total) * 100),
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
          loadingAttendance={loadingAttendance}
          averageError={averageError}
          averageScore={averageScore}
          attendance={attendancePercentage}
        />

        <AcademicProgress
          loadingStats={loadingStats}
          statsError={statsError}
          assignmentStats={assignmentStats}
          getAssignmentCompletionRate={getAssignmentCompletionRate}
          getProgressColor={getProgressColor}
          studentData={studentInfo}
          attendance={attendance}
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
