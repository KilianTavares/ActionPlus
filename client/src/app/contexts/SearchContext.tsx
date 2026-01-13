"use client";
import { useState, createContext, useContext, ReactNode } from "react";

interface SearchResult {
  id: string;
  title: string;
  type: 'movie' | 'tv';
  poster?: string;
  year?: string;
}

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  results: SearchResult[];
  setResults: (results: SearchResult[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  history: string[];
  setHistory: (history: string[]) => void;
}

export const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        results,
        setResults,
        loading,
        setLoading,
        history,
        setHistory,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
