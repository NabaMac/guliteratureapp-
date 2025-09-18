import React, { useState } from 'react';
import { CheckCircle, XCircle, Eye, Users, FileText, Clock, MessageSquare } from 'lucide-react';
import { Literature, User } from '../../types';

// Mock data for admin panel
const mockPendingWorks: Literature[] = [
  {
    id: '3',
    title: 'Digital Learning in Rural Schools',
    author_id: '3',
    author_name: 'Ravi Kumar',
    category: 'research',
    abstract: 'Research paper examining the implementation of digital learning tools in rural educational institutions of Northeast India.',
    keywords: ['education', 'digital', 'rural', 'research'],
    status: 'pending',
    created_at: '2024-01-08T16:45:00Z',
    updated_at: '2024-01-08T16:45:00Z',
    file_url: 'https://example.com/file3.pdf',
    file_name: 'digital-learning-research.pdf'
  },
  {
    id: '4',
    title: 'The Festival of Colors: A Short Story',
    author_id: '4',
    author_name: 'Priya Sharma',
    category: 'short_story',
    abstract: 'A heartwarming short story set during Holi festival, exploring themes of friendship and cultural unity.',
    keywords: ['holi', 'friendship', 'celebration', 'culture', 'unity'],
    status: 'pending',
    created_at: '2024-01-10T09:15:00Z',
    updated_at: '2024-01-10T09:15:00Z',
    file_url: 'https://example.com/file4.pdf',
    file_name: 'festival-of-colors.pdf'
  }
];

const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@gauhati.ac.in',
    name: 'Admin User',
    student_id: 'GU_ADMIN',
    is_admin: true,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    email: 'arjun.sharma@gauhati.ac.in',
    name: 'Arjun Sharma',
    student_id: 'GU123456',
    is_admin: false,
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: '3',
    email: 'priya.devi@gauhati.ac.in',
    name: 'Priya Devi',
    student_id: 'GU123457',
    is_admin: false,
    created_at: '2024-01-12T14:20:00Z'
  }
];

const categoryColors: Record<string, string> = {
  poetry: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  essay: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  research: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  novel: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  short_story: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
  drama: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
  criticism: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
  other: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
};

export const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'users'>('pending');
  const [selectedWork, setSelectedWork] = useState<Literature | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleReviewAction = (workId: string, action: 'approve' | 'reject', notes: string = '') => {
    // Simulate review action - replace with real Supabase update
    console.log('Review action:', { workId, action, notes });
    setSelectedWork(null);
    setReviewNotes('');
    // In real app, refetch pending works after action
  };

  const stats = {
    totalUsers: mockUsers.length,
    pendingWorks: mockPendingWorks.length,
    publishedWorks: 4, // From mock data
    totalWorks: 7
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Admin Panel
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage submissions and user accounts
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Review</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.pendingWorks}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
              <CheckCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Published</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.publishedWorks}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Works</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.totalWorks}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('pending')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'pending'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Pending Works ({mockPendingWorks.length})
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Users ({mockUsers.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'pending' && (
            <div className="space-y-6">
              {mockPendingWorks.length === 0 ? (
                <div className="text-center py-12">
                  <Clock className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No pending reviews
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    All submissions have been reviewed.
                  </p>
                </div>
              ) : (
                mockPendingWorks.map((work) => (
                  <div key={work.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-blue-200 dark:hover:border-blue-700 transition-colors duration-200">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {work.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                          <span>By {work.author_name}</span>
                          <span>•</span>
                          <span>Submitted {formatDate(work.created_at)}</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-3">
                          <span className={`px-2 py-1 rounded-md text-xs font-medium ${categoryColors[work.category] || categoryColors.other}`}>
                            {work.category.replace('_', ' ').toUpperCase()}
                          </span>
                          <span className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 px-2 py-1 rounded-md text-xs font-medium">
                            Pending Review
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                      {work.abstract}
                    </p>

                    {work.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {work.keywords.map((keyword, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-sm"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => setSelectedWork(work)}
                        className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                      >
                        <Eye className="h-4 w-4" />
                        <span>Review Details</span>
                      </button>

                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleReviewAction(work.id, 'reject')}
                          className="flex items-center space-x-2 px-4 py-2 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg font-medium transition-colors duration-200"
                        >
                          <XCircle className="h-4 w-4" />
                          <span>Reject</span>
                        </button>
                        <button
                          onClick={() => handleReviewAction(work.id, 'approve')}
                          className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors duration-200"
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span>Approve</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'users' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Student ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {user.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {user.student_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.is_admin ? (
                          <span className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 px-2 py-1 rounded-md text-xs font-medium">
                            Admin
                          </span>
                        ) : (
                          <span className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded-md text-xs font-medium">
                            Student
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(user.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Review Detail Modal */}
      {selectedWork && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Review Submission
                </h2>
                <button
                  onClick={() => {
                    setSelectedWork(null);
                    setReviewNotes('');
                  }}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {selectedWork.title}
                  </h3>
                  
                  <div className="space-y-3 mb-4">
                    <div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Author:</span>
                      <p className="text-gray-900 dark:text-white">{selectedWork.author_name}</p>
                    </div>

                    <div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Category:</span>
                      <p className="text-gray-900 dark:text-white capitalize">
                        {selectedWork.category.replace('_', ' ')}
                      </p>
                    </div>

                    <div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Submitted:</span>
                      <p className="text-gray-900 dark:text-white">
                        {formatDate(selectedWork.created_at)}
                      </p>
                    </div>

                    <div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Keywords:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedWork.keywords.map((keyword, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-sm"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {selectedWork.file_url && (
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 mb-4">
                      Download File
                    </button>
                  )}
                </div>

                <div>
                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Abstract:</span>
                    <p className="text-gray-900 dark:text-white mt-1 leading-relaxed">
                      {selectedWork.abstract}
                    </p>
                  </div>

                  <div>
                    <label htmlFor="reviewNotes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Review Notes (Optional)
                    </label>
                    <textarea
                      id="reviewNotes"
                      rows={4}
                      value={reviewNotes}
                      onChange={(e) => setReviewNotes(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-colors duration-200"
                      placeholder="Add notes for the author (optional)..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    setSelectedWork(null);
                    setReviewNotes('');
                  }}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleReviewAction(selectedWork.id, 'reject', reviewNotes)}
                  className="flex items-center space-x-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200"
                >
                  <XCircle className="h-4 w-4" />
                  <span>Reject</span>
                </button>
                <button
                  onClick={() => handleReviewAction(selectedWork.id, 'approve', reviewNotes)}
                  className="flex items-center space-x-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors duration-200"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Approve & Publish</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};