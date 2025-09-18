import React, { useState, useMemo } from 'react';
import { SearchBar } from './SearchBar';
import { LiteratureCard } from './LiteratureCard';
import { SearchFilters, Literature } from '../../types';
import { BookOpen, TrendingUp, Users, FileText } from 'lucide-react';

// Mock data - replace with real data from Supabase
const mockLiterature: Literature[] = [
  {
    id: '1',
    title: 'Memories of Assam: A Collection of Poems',
    author_id: '1',
    author_name: 'Arjun Sharma',
    category: 'poetry',
    abstract: 'A beautiful collection of poems celebrating the natural beauty and cultural richness of Assam. This anthology explores themes of nostalgia, identity, and connection to the homeland through vivid imagery and emotional depth.',
    keywords: ['assam', 'nature', 'culture', 'homeland', 'identity'],
    status: 'published',
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z',
    file_url: 'https://example.com/file1.pdf',
    file_name: 'memories-of-assam.pdf'
  },
  {
    id: '2',
    title: 'Digital Transformation in Rural Education: A Case Study',
    author_id: '2',
    author_name: 'Priya Devi',
    category: 'research',
    abstract: 'This research paper examines the impact of digital technology on rural education systems in Northeast India. The study analyzes various digital initiatives and their effectiveness in improving educational outcomes.',
    keywords: ['education', 'digital', 'rural', 'technology', 'northeast'],
    status: 'published',
    created_at: '2024-01-12T14:20:00Z',
    updated_at: '2024-01-12T14:20:00Z',
    file_url: 'https://example.com/file2.pdf',
    file_name: 'digital-transformation-education.pdf'
  },
  {
    id: '3',
    title: 'The Festival of Colors: A Short Story',
    author_id: '3',
    author_name: 'Ravi Kumar',
    category: 'short_story',
    abstract: 'A heartwarming short story set during Holi festival, exploring themes of friendship, forgiveness, and the power of celebration to bring people together across cultural divides.',
    keywords: ['holi', 'friendship', 'celebration', 'culture', 'unity'],
    status: 'pending',
    created_at: '2024-01-10T09:15:00Z',
    updated_at: '2024-01-10T09:15:00Z',
    file_url: 'https://example.com/file3.pdf',
    file_name: 'festival-of-colors.pdf'
  },
  {
    id: '4',
    title: 'Modern Literary Criticism: Postcolonial Perspectives',
    author_id: '4',
    author_name: 'Dr. Meera Goswami',
    category: 'criticism',
    abstract: 'An analytical essay examining postcolonial literary theory and its application to contemporary Indian literature. The paper discusses various critical frameworks and their relevance to understanding cultural narratives.',
    keywords: ['literary criticism', 'postcolonial', 'theory', 'indian literature'],
    status: 'published',
    created_at: '2024-01-08T16:45:00Z',
    updated_at: '2024-01-08T16:45:00Z',
    file_url: 'https://example.com/file4.pdf',
    file_name: 'postcolonial-criticism.pdf'
  },
  {
    id: '5',
    title: 'The Monsoon Chronicles',
    author_id: '5',
    author_name: 'Ananya Borah',
    category: 'novel',
    abstract: 'A coming-of-age novel set in Assam during the monsoon season. The story follows a young woman\'s journey of self-discovery as she navigates family expectations, personal dreams, and the changing landscape of her hometown.',
    keywords: ['monsoon', 'coming-of-age', 'assam', 'family', 'dreams'],
    status: 'draft',
    created_at: '2024-01-05T11:30:00Z',
    updated_at: '2024-01-05T11:30:00Z',
  }
];

export const Dashboard: React.FC = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: 'all',
    sortBy: 'newest'
  });

  const [selectedLiterature, setSelectedLiterature] = useState<Literature | null>(null);

  const filteredLiterature = useMemo(() => {
    let filtered = mockLiterature.filter(lit => lit.status === 'published');

    // Apply search query
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filtered = filtered.filter(lit =>
        lit.title.toLowerCase().includes(query) ||
        lit.author_name.toLowerCase().includes(query) ||
        lit.abstract.toLowerCase().includes(query) ||
        lit.keywords.some(keyword => keyword.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(lit => lit.category === filters.category);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'newest':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

    return filtered;
  }, [filters]);

  const stats = useMemo(() => {
    const published = mockLiterature.filter(lit => lit.status === 'published').length;
    const pending = mockLiterature.filter(lit => lit.status === 'pending').length;
    const categories = new Set(mockLiterature.map(lit => lit.category)).size;
    const authors = new Set(mockLiterature.map(lit => lit.author_id)).size;

    return { published, pending, categories, authors };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Literature Hub Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover and explore literary works by Gauhati University students
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Published Works</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.published}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <TrendingUp className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Review</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
              <FileText className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Categories</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.categories}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Contributors</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.authors}</p>
            </div>
          </div>
        </div>
      </div>

      <SearchBar filters={filters} onFiltersChange={setFilters} />

      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Recent Publications
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {filteredLiterature.length} work{filteredLiterature.length !== 1 ? 's' : ''} found
          </span>
        </div>

        {filteredLiterature.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No works found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLiterature.map((literature) => (
              <LiteratureCard
                key={literature.id}
                literature={literature}
                onView={setSelectedLiterature}
              />
            ))}
          </div>
        )}
      </div>

      {/* Literature Detail Modal */}
      {selectedLiterature && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedLiterature.title}
                </h2>
                <button
                  onClick={() => setSelectedLiterature(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Author:</span>
                  <p className="text-gray-900 dark:text-white">{selectedLiterature.author_name}</p>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Category:</span>
                  <p className="text-gray-900 dark:text-white capitalize">{selectedLiterature.category.replace('_', ' ')}</p>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Keywords:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedLiterature.keywords.map((keyword, index) => (
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
                    {selectedLiterature.abstract}
                  </p>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Published:</span>
                  <p className="text-gray-900 dark:text-white">
                    {new Date(selectedLiterature.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              {selectedLiterature.file_url && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
                    <span>Download Full Work</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};