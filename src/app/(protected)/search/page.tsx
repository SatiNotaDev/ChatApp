// src/app/(protected)/search/page.tsx
'use client';

import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import {SearchResult} from "@/types"



const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    chatName: 'Project Team',
    messageContent: 'Lets discuss the project timeline tomorrow',
    timestamp: '2024-02-15 14:30',
    matchCount: 2
  },
  {
    id: '2',
    chatName: 'Design Team',
    messageContent: 'The project specs need to be updated',
    timestamp: '2024-02-14 11:20',
    matchCount: 1
  }
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setIsSearching(true);


    setTimeout(() => {
      if (searchQuery.trim()) {
        setResults(mockSearchResults);
      } else {
        setResults([]);
      }
      setIsSearching(false);
    }, 500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
        <Input
          className="pl-10"
          placeholder="Search in chats..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-4">
          {isSearching ? (
            <div className="text-center text-gray-500">Searching...</div>
          ) : results.length > 0 ? (
            results.map((result) => (
              <Card 
                key={result.id}
                className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <Avatar>
                    <img 
                      src={`/api/placeholder/40/40?text=${result.chatName[0]}`} 
                      alt={result.chatName} 
                    />
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium truncate">{result.chatName}</h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {new Date(result.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {result.messageContent}
                    </p>
                    <div className="text-xs text-gray-500 mt-1">
                      {result.matchCount} {result.matchCount === 1 ? 'match' : 'matches'}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : query ? (
            <div className="text-center text-gray-500">
              No messages found containing "{query}"
            </div>
          ) : (
            <div className="text-center text-gray-500">
              Enter a search term to find messages
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}