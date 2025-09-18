import React, { useState } from 'react';
import { Upload, FileText, Save, Send, AlertCircle } from 'lucide-react';
import { LiteratureCategory } from '../../types';
import { useAuth } from '../../context/AuthContext';

const categories: { value: LiteratureCategory; label: string }[] = [
  { value: 'poetry', label: 'Poetry' },
  { value: 'essay', label: 'Essay' },
  { value: 'research', label: 'Research Paper' },
  { value: 'novel', label: 'Novel' },
  { value: 'short_story', label: 'Short Story' },
  { value: 'drama', label: 'Drama/Play' },
  { value: 'criticism', label: 'Literary Criticism' },
  { value: 'other', label: 'Other' },
];

export const UploadForm: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    category: 'essay' as LiteratureCategory,
    abstract: '',
    keywords: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword'
      ];
      
      if (allowedTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setMessage(null);
      } else {
        setMessage({
          type: 'error',
          text: 'Please upload a PDF or Word document (.pdf, .docx, .doc)'
        });
        e.target.value = '';
      }
    }
  };

  const handleSubmit = async (action: 'draft' | 'publish') => {
    if (!formData.title.trim()) {
      setMessage({ type: 'error', text: 'Title is required' });
      return;
    }

    if (!formData.abstract.trim()) {
      setMessage({ type: 'error', text: 'Abstract is required' });
      return;
    }

    if (action === 'publish' && !file) {
      setMessage({ type: 'error', text: 'File is required for publishing' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      // Simulate file upload and form submission
      await new Promise(resolve => setTimeout(resolve, 2000));

      const keywords = formData.keywords
        .split(',')
        .map(k => k.trim())
        .filter(k => k.length > 0);

      const literature = {
        id: Math.random().toString(36).substr(2, 9),
        title: formData.title,
        author_id: user?.id || '1',
        author_name: user?.name || 'Unknown',
        category: formData.category,
        abstract: formData.abstract,
        keywords,
        file_url: file ? `https://example.com/${file.name}` : undefined,
        file_name: file?.name,
        status: action === 'draft' ? 'draft' : 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      console.log('Created literature:', literature);

      setMessage({
        type: 'success',
        text: action === 'draft' 
          ? 'Work saved as draft successfully!' 
          : 'Work submitted for review successfully!'
      });

      // Reset form
      setFormData({
        title: '',
        category: 'essay',
        abstract: '',
        keywords: '',
      });
      setFile(null);

      // Clear file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to submit work. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Upload Literature Work
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Share your literary creation with the Gauhati University community
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <form className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-colors duration-200"
              placeholder="Enter the title of your work"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Author
              </label>
              <input
                id="author"
                type="text"
                value={user?.name || ''}
                disabled
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Keywords
            </label>
            <input
              id="keywords"
              name="keywords"
              type="text"
              value={formData.keywords}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-colors duration-200"
              placeholder="Enter keywords separated by commas (e.g., poetry, nature, identity)"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Separate keywords with commas to help others discover your work
            </p>
          </div>

          <div>
            <label htmlFor="abstract" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Abstract/Summary *
            </label>
            <textarea
              id="abstract"
              name="abstract"
              rows={6}
              required
              value={formData.abstract}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-colors duration-200 resize-vertical"
              placeholder="Provide a brief summary or abstract of your work. This will help readers understand what your work is about before they read it."
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Describe your work in 2-3 paragraphs (recommended: 150-300 words)
            </p>
          </div>

          <div>
            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Upload File
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors duration-200">
              <div className="flex flex-col items-center">
                <Upload className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                    Click to upload
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    or drag and drop your file here
                  </span>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Supported formats: PDF, DOC, DOCX (max 10MB)
                </p>
              </div>
            </div>

            {file && (
              <div className="mt-4 flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100 truncate">
                    {file.name}
                  </p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
                    if (fileInput) fileInput.value = '';
                  }}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {message && (
            <div className={`flex items-center space-x-2 p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400'
                : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400'
            }`}>
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm">{message.text}</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => handleSubmit('draft')}
              disabled={isLoading}
              className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="h-5 w-5" />
              <span>{isLoading ? 'Saving...' : 'Save as Draft'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleSubmit('publish')}
              disabled={isLoading}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-lg font-medium transition-colors duration-200 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
              <span>{isLoading ? 'Publishing...' : 'Submit for Review'}</span>
            </button>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <p className="font-medium mb-1">Publishing Guidelines:</p>
                <ul className="list-disc list-inside space-y-1 text-blue-700 dark:text-blue-300">
                  <li>Works saved as drafts are private and can be edited later</li>
                  <li>Submitted works will be reviewed by administrators before publication</li>
                  <li>Only original works are accepted - plagiarism will result in account suspension</li>
                  <li>Ensure your work follows academic and ethical standards</li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};