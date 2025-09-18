export interface User {
  id: string;
  email: string;
  name: string;
  student_id: string;
  is_admin: boolean;
  created_at: string;
}

export interface Literature {
  id: string;
  title: string;
  author_id: string;
  author_name: string;
  category: LiteratureCategory;
  abstract: string;
  keywords: string[];
  file_url?: string;
  file_name?: string;
  status: 'draft' | 'published' | 'pending' | 'rejected';
  created_at: string;
  updated_at: string;
  admin_notes?: string;
}

export type LiteratureCategory = 
  | 'poetry' 
  | 'essay' 
  | 'research' 
  | 'novel' 
  | 'short_story' 
  | 'drama' 
  | 'criticism'
  | 'other';

export interface AuthState {
  user: User | null;
  isLoading: boolean;
}

export interface SearchFilters {
  query: string;
  category: LiteratureCategory | 'all';
  sortBy: 'newest' | 'oldest' | 'title';
}