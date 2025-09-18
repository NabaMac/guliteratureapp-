import React from 'react';
import { Calendar, User, Tag, Download, Eye } from 'lucide-react';
import { Literature } from '../../types';

interface LiteratureCardProps {
  literature: Literature;
  onView?: (literature: Literature) => void;
}

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

export const LiteratureCard: React.FC<LiteratureCardProps> = ({ literature, onView }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200 hover:border-blue-200 dark:hover:border-blue-700 group">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
          {literature.title}
        </h3>
        <span className={`px-2 py-1 rounded-md text-xs font-medium ${categoryColors[literature.category] || categoryColors.other}`}>
          {literature.category.replace('_', ' ').toUpperCase()}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <User className="h-4 w-4 mr-2" />
          {literature.author_name}
        </div>

        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="h-4 w-4 mr-2" />
          {formatDate(literature.created_at)}
        </div>

        {literature.keywords.length > 0 && (
          <div className="flex items-start text-sm text-gray-600 dark:text-gray-400">
            <Tag className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
            <div className="flex flex-wrap gap-1">
              {literature.keywords.slice(0, 3).map((keyword, index) => (
                <span
                  key={index}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs"
                >
                  {keyword}
                </span>
              ))}
              {literature.keywords.length > 3 && (
                <span className="text-gray-500 dark:text-gray-400 text-xs">
                  +{literature.keywords.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
        {literature.abstract}
      </p>

      <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          {literature.status === 'published' && (
            <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 px-2 py-1 rounded-md text-xs font-medium">
              Published
            </span>
          )}
          {literature.status === 'draft' && (
            <span className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300 px-2 py-1 rounded-md text-xs font-medium">
              Draft
            </span>
          )}
          {literature.status === 'pending' && (
            <span className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 px-2 py-1 rounded-md text-xs font-medium">
              Pending Review
            </span>
          )}
        </div>

        <div className="flex space-x-2">
          {onView && (
            <button
              onClick={() => onView(literature)}
              className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors duration-200"
            >
              <Eye className="h-4 w-4" />
              <span>View</span>
            </button>
          )}
          
          {literature.file_url && (
            <button className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-md transition-colors duration-200">
              <Download className="h-4 w-4" />
              <span>Download</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};