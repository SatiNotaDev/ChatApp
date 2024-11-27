'use client';

import { useState } from 'react';
import { Search, Check } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ContactList } from '@/components/contacts/ContactList';
import type {Contact} from '@/types'

const mockContacts: Contact[] = [
  { id: '1', name: 'Alice Smith', email: 'alice@example.com', isContact: true },
  { id: '2', name: 'Bob Johnson', email: 'bob@example.com', isContact: true },
];

const mockSearchResults: Contact[] = [
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', isContact: false },
  { id: '4', name: 'Diana Prince', email: 'diana@example.com', isContact: false },
];

export default function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [contacts, setContacts] = useState(mockContacts);
  const [searchResults, setSearchResults] = useState(mockSearchResults);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddContact = (contact: Contact) => {
    const updatedResults = searchResults.filter(r => r.id !== contact.id);
    setSearchResults(updatedResults);
    setContacts([...contacts, { ...contact, isContact: true }]);
  };

  const handleRemoveContact = (contact: Contact) => {
    const updatedContacts = contacts.filter(c => c.id !== contact.id);
    setContacts(updatedContacts);
    setSearchResults([...searchResults, { ...contact, isContact: false }]);
  };

  const handleContactAction = (contact: Contact) => {
    if (contact.isContact) {
      handleRemoveContact(contact);
    } else {
      handleAddContact(contact);
    }
  };

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
            contacts={contacts}
            onContactAction={handleContactAction}
            emptyMessage="No contacts yet"
          />
        </TabsContent>

        <TabsContent value="search" className="mt-6">
          <ContactList
            contacts={searchResults}
            onContactAction={handleContactAction}
            emptyMessage="No results found"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}