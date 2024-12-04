import { useState } from 'react';

export function useContacts(userId: string) {
  const [contacts, setContacts] = useState([]);

  
  const fetchContacts = async () => {
    const response = await fetch(`/api/contacts?type=user&userId=${userId}`);
    const data = await response.json();
    setContacts(data.contacts);
  };

  const addContact = async (contactId: string) => {
    const response = await fetch(`/api/contacts`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, contactId, action: 'add' }),
    });
    if (response.ok) {
      const data = await response.json();
      setContacts(data); 
    } else {
      console.error('Failed to add contact');
    }
  };

  const removeContact = async (contactId: string) => {
    const response = await fetch(`/api/contacts`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, contactId, action: 'remove' }),
    });
    if (response.ok) {
      const data = await response.json();
      setContacts(data); 
    } else {
      console.error('Failed to remove contact');
    }
  };

  return { contacts, fetchContacts, addContact, removeContact };
}
