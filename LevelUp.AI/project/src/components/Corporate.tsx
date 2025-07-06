import React, { useState } from 'react';
import { Building2, Users, Shield, Award, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Corporate: React.FC = () => {
  const { courses, user, analytics } = useApp();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'compliance' | 'training' | 'reports'>('overview');

  const corporateCourses = courses.filter(course => course.isCorporate);
  const complianceCourses = courses.filter(course => course.complianceRequired);
  const completedCompliance = complianceCourses.filter(course => user.completedCourses.includes(course.id));

  const complianceRate = complianceCourses.length > 0 ? (completedCompliance.length / complianceCourses.length) * 100 : 0;

  const departmentData = [
    { name: 'Engineering', employees: 45, completed: 38, compliance: 84 },
    { name: 'Design', employees: 23, completed: 21, compliance: 91 },
    { name: 'Marketing', employees: 32, completed: 28, compliance: 87 },
    { name: 'Sales', employees: 28, completed: 24, compliance: 86 },
    { name: 'Data Science', employees: 18, completed: 16, compliance: 89 },
    { name: 'Security', employees: 12, completed: 12, compliance: 100 }
  ];

  const upcomingDeadlines = [
    { title: 'Cybersecurity Compliance', dueDate: '2024-02-15', status: 'urgent' },
    { title: 'Data Privacy Training', dueDate: '2024-02-28', status: 'warning' },
    { title: 'Leadership Development', dueDate: '2024-03-10', status: 'normal' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'normal': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Building2 },
    { id: 'compliance', label: 'Compliance', icon: Shield },
    { id: 'training', label: 'Training Programs', icon: Users },
    { id: 'reports', label: 'Reports', icon: TrendingUp }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Corporate Training</h1>
          <p className="text-gray-600 mt-1">Manage employee development and compliance</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            Export Report
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:from-purple-600 hover:to-blue-700 transition-colors">
            Assign Training
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white p-2 rounded-xl shadow-sm border">
        <div className="flex space-x-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedTab === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Overview Tab */}
      {selectedTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Employees</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">158</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Compliance Rate</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{analytics.complianceRate}%</p>
                </div>
                <Shield className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Programs</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{corporateCourses.length}</p>
                </div>
                <Building2 className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Certificates Issued</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{analytics.certificatesIssued}</p>
                </div>
                <Award className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Department Performance */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Department Performance</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Department</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Employees</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Completed</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Compliance</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {departmentData.map((dept, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{dept.name}</td>
                      <td className="text-center py-3 px-4 text-gray-600">{dept.employees}</td>
                      <td className="text-center py-3 px-4 text-gray-600">{dept.completed}</td>
                      <td className="text-center py-3 px-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          dept.compliance >= 90 ? 'bg-green-100 text-green-800' :
                          dept.compliance >= 80 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {dept.compliance}%
                        </span>
                      </td>
                      <td className="text-center py-3 px-4">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mx-auto">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-blue-600 h-2 rounded-full"
                            style={{ width: `${dept.compliance}%` }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Deadlines</h2>
            <div className="space-y-3">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className={`p-4 rounded-lg border ${getStatusColor(deadline.status)}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{deadline.title}</h3>
                      <p className="text-sm opacity-75">Due: {deadline.dueDate}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {deadline.status === 'urgent' && <AlertCircle className="w-5 h-5" />}
                      {deadline.status === 'warning' && <Clock className="w-5 h-5" />}
                      {deadline.status === 'normal' && <CheckCircle className="w-5 h-5" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Compliance Tab */}
      {selectedTab === 'compliance' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Compliance Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-white">{Math.round(complianceRate)}%</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Overall Compliance</h3>
                <p className="text-sm text-gray-600">Company-wide compliance rate</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-white">{complianceCourses.length}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Required Courses</h3>
                <p className="text-sm text-gray-600">Mandatory compliance training</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-white">{completedCompliance.length}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Completed</h3>
                <p className="text-sm text-gray-600">Courses you've finished</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Required Training</h2>
            <div className="space-y-4">
              {complianceCourses.map(course => {
                const isCompleted = user.completedCourses.includes(course.id);
                const isInProgress = user.currentCourses.includes(course.id);
                
                return (
                  <div key={course.id} className="border rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{course.title}</h3>
                          <p className="text-sm text-gray-600">{course.duration} • {course.instructor}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            {isCompleted && (
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                Completed
                              </span>
                            )}
                            {isInProgress && !isCompleted && (
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                                In Progress
                              </span>
                            )}
                            {!isCompleted && !isInProgress && (
                              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                                Not Started
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        {isCompleted ? (
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        ) : (
                          <button className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-blue-700 transition-colors">
                            {isInProgress ? 'Continue' : 'Start'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Training Programs Tab */}
      {selectedTab === 'training' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Available Training Programs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {corporateCourses.map(course => (
                <div key={course.id} className="border rounded-xl p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start space-x-4">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{course.duration}</span>
                        <span>{course.students} enrolled</span>
                        <span>⭐ {course.rating}</span>
                      </div>
                      <div className="mt-2">
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                          {course.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {selectedTab === 'reports' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Training Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Monthly Progress Report</h3>
                <p className="text-sm text-gray-600 mb-4">Detailed analysis of training progress across all departments</p>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Generate Report
                </button>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Compliance Summary</h3>
                <p className="text-sm text-gray-600 mb-4">Overview of compliance status and upcoming deadlines</p>
                <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                  View Summary
                </button>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Skills Gap Analysis</h3>
                <p className="text-sm text-gray-600 mb-4">Identify skill gaps and training needs across teams</p>
                <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  Analyze Skills
                </button>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">ROI Calculator</h3>
                <p className="text-sm text-gray-600 mb-4">Calculate return on investment for training programs</p>
                <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors">
                  Calculate ROI
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Corporate;