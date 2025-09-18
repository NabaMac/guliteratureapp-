import React, { useState } from 'react';
import { User, Mail, Car as IdCard, Calendar, Edit3, Trash2, Eye, FileText } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Literature } from '../../types';

// Mock user works - replace with real data from Supabase
const mockUserWorks: Literature[] = [
  {
    id: '1',
    title: 'Memories of Assam: A Collection of Poems',
    author_id: '1',
    author_name: 'Current User',
    category: 'poetry',
    abstract: 'A beautiful collection of poems celebrating the natural beauty and cultural richness of Assam.',
    keywords: ['assam', 'nature', 'culture', 'homeland', 'identity'],
    status: 'published',
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z',
    file_url: 'https://example.com/file1.pdf',
    file_name: 'memories-of-assam.pdf'
  },
  {
    id: '2',
    title: 'The Monsoon Chronicles (Draft)',
    author_id: '1',
    author_name: 'Current User',
    category: 'novel',
    abstract: 'A coming-of-age novel set in Assam during the monsoon season. Still working on the final chapters.',
    keywords: ['monsoon', 'coming-of-age', 'assam', 'family'],
    status: 'draft',
    created_at: '2024-01-10T09:15:00Z',
    updated_at: '2024-01-12T14:20:00Z',
  },
  {
    id: '3',
    title: 'Digital Learning in Rural Schools',
    author_id: '1',
    author_name: 'Current User',
    category: 'research',
    abstract: 'Research paper examining the implementation of digital learning tools in rural educational institutions.',
    keywords: ['education', 'digital', 'rural', 'research'],
    status: 'pending',
    created_at: '2024-01-08T16:45:00Z',
    updated_at: '2024-01-08T16:45:00Z',
    file_url: 'https://example.com/file3.pdf',
    file_name: 'digital-learning-research.pdf'
  }
];

const statusColors = {
  published: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  draft: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
  pending: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
};

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

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const [selectedWork, setSelectedWork] = useState<Literature | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  if (!user) return null;

  const handleDeleteWork = (workId: string) => {
    // Simulate deletion - replace with real Supabase delete
    console.log('Deleting work:', workId);
    setDeleteConfirm(null);
    // In real app, refetch user works after deletion
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const workStats = {
    total: mockUserWorks.length,
    published: mockUserWorks.filter(w => w.status === 'published').length,
    draft: mockUserWorks.filter(w => w.status === 'draft').length,
    pending: mockUserWorks.filter(w => w.status === 'pending').length,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          My Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account and view your literary works
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {user.name}
              </h2>
              {user.is_admin && (
                <span className="inline-block bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 px-2 py-1 rounded-md text-sm font-medium mt-2">
                  Administrator
                </span>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Mail className="h-4 w-4 mr-3 flex-shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>

              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <IdCard className="h-4 w-4 mr-3 flex-shrink-0" />
                <span>{user.student_id}</span>
              </div>

              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="h-4 w-4 mr-3 flex-shrink-0" />
                <span>Joined {formatDate(user.created_at)}</span>
              </div>
            </div>

            {/* Work Statistics */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                Work Statistics
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {workStats.total}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Total Works
                  </div>
                </div>
                <div className="text-center p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <div className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                    {workStats.published}
                  </div>
                  <div className="text-xs text-emerald-700 dark:text-emerald-300">
                    Published
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                    {workStats.draft}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Drafts
                  </div>
                </div>
                <div className="text-center p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <div className="text-lg font-semibold text-amber-600 dark:text-amber-400">
                    {workStats.pending}
                  </div>
                  <div className="text-xs text-amber-700 dark:text-amber-300">
                    Pending
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Works List */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                My Works ({mockUserWorks.length})
              </h3>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {mockUserWorks.length === 0 ? (
                <div className="p-12 text-center">
                  <FileText className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No works yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Start sharing your literary creations with the community
                  </p>
                </div>
              ) : (
                mockUserWorks.map((work) => (
                  <div key={work.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {work.title}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusColors[work.status]}`}>
                          {work.status.charAt(0).toUpperCase() + work.status.slice(1)}
                        </span>
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${categoryColors[work.category] || categoryColors.other}`}>
                          {work.category.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {work.abstract}
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Updated {formatDate(work.updated_at)}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedWork(work)}
                          className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors duration-200"
                        >
                          <Eye className="h-4 w-4" />
                          <span>View</span>
                        </button>

                        <button className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-200">
                          <Edit3 className="h-4 w-4" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => setDeleteConfirm(work.id)}
                          className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Work Detail Modal */}
      {selectedWork && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedWork.title}
                </h2>
                <button
                  onClick={() => setSelectedWork(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusColors[selectedWork.status]}`}>
                    {selectedWork.status.charAt(0).toUpperCase() + selectedWork.status.slice(1)}
                  </span>
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${categoryColors[selectedWork.category] || categoryColors.other}`}>
                    {selectedWork.category.replace('_', ' ').toUpperCase()}
                  </span>
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

                <div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Abstract:</span>
                  <p className="text-gray-900 dark:text-white mt-1 leading-relaxed">
                    {selectedWork.abstract}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Created:</span>
                    <p className="text-gray-900 dark:text-white">
                      {formatDate(selectedWork.created_at)}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Last Updated:</span>
                    <p className="text-gray-900 dark:text-white">
                      {formatDate(selectedWork.updated_at)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                <div className="flex space-x-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
                    <Edit3 className="h-4 w-4" />
                    <span>Edit Work</span>
                  </button>
                  {selectedWork.file_url && (
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                      Download File
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Delete Work
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this work? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteWork(deleteConfirm)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};