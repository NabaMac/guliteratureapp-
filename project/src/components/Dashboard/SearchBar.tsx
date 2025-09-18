import React from 'react';
import { Search, Filter } from 'lucide-react';
import { SearchFilters, LiteratureCategory } from '../../types';

interface SearchBarProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
}

const categories: { value: LiteratureCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Categories' },
  { value: 'poetry', label: 'Poetry' },
  { value: 'essay', label: 'Essay' },
  { value: 'research', label: 'Research' },
  { value: 'novel', label: 'Novel' },
  { value: 'short_story', label: 'Short Story' },
  { value: 'drama', label: 'Drama' },
  { value: 'criticism', label: 'Criticism' },
  { value: 'other', label: 'Other' },
];

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'title', label: 'Title A-Z' },
];

export const SearchBar: React.FC<SearchBarProps> = ({ filters, onFiltersChange }) => {
  const handleQueryChange = (query: string) => {
    onFiltersChange({ ...filters, query });
  };

  const handleCategoryChange = (category: LiteratureCategory | 'all') => {
    onFiltersChange({ ...filters, category });
  };

  const handleSortChange = (sortBy: 'newest' | 'oldest' | 'title') => {
    onFiltersChange({ ...filters, sortBy });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by title, author, or keywords..."
          value={filters.query}
          onChange={(e) => handleQueryChange(e.target.value)}
          className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-colors duration-200"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <select
            value={filters.category}
            onChange={(e) => handleCategoryChange(e.target.value as LiteratureCategory | 'all')}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <select
          value={filters.sortBy}
          onChange={(e) => handleSortChange(e.target.value as 'newest' | 'oldest' | 'title')}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};