'use client';

import { useState, useEffect } from 'react';
import { Search, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ContactList } from '@/components/contacts/ContactList';
import type { Contact } from '@/types';

export default function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchResults, setSearchResults] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserContacts = async (search?: string) => {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);

      const response = await fetch(`/api/contacts?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch contacts');

      const data = await response.json();
      setContacts(data.map((contact: Contact) => ({ ...contact, isContact: true })));
    } catch (error) {
      console.error('Error fetching user contacts:', error);
      setContacts([]); // Установите пустой массив при ошибке
    }
  };

  const fetchSearchResults = async (search: string) => {
    try {
      const params = new URLSearchParams({
        search,
        type: 'all',
      });

      const response = await fetch(`/api/contacts?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch search results');

      const data = await response.json();

      const filteredResults = data
        .filter((contact: Contact) => !contacts.some((c) => c._id === contact._id))
        .map((contact: Contact) => ({ ...contact, isContact: false }));

      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);

    try {
      if (query.trim()) {
        await Promise.all([fetchUserContacts(query), fetchSearchResults(query)]);
      } else {
        await fetchUserContacts();
        setSearchResults([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactAction = async (contact: Contact) => {
    try {
      const response = await fetch('/api/contacts', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contactId: contact._id,
          action: contact.isContact ? 'remove' : 'add',
        }),
      });

      if (!response.ok) throw new Error('Failed to update contact');

      if (contact.isContact) {
        setContacts(contacts.filter((c) => c._id !== contact._id));
        setSearchResults([...searchResults, { ...contact, isContact: false }]);
      } else {
        setSearchResults(searchResults.filter((r) => r._id !== contact._id));
        setContacts([...contacts, { ...contact, isContact: true }]);
      }
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  useEffect(() => {
    fetchUserContacts();
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
        <Input
          className="pl-10"
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <Tabs defaultValue="contacts">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="contacts">
            <Check className="h-4 w-4 mr-2" />
            My Contacts
          </TabsTrigger>
          <TabsTrigger value="search">
            <Search className="h-4 w-4 mr-2" />
            Search Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contacts" className="mt-6">
          <ContactList
            allContacts={contacts}
            onContactAction={handleContactAction}
            emptyMessage="No contacts yet"
          />
        </TabsContent>

        <TabsContent value="search" className="mt-6">
          <ContactList
            allContacts={searchResults}
            onContactAction={handleContactAction}
            emptyMessage="No results found"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
