import { ContactCard} from './ContactCard';
import {ContactListProps} from "@/types"


export function ContactList({ 
  contacts, 
  onContactAction, 
  emptyMessage = "No contacts found" 
}: ContactListProps) {
  if (contacts.length === 0) {
    return <p className="text-center text-gray-500 py-4">{emptyMessage}</p>;
  }

  return (
    <div className="space-y-4">
      {contacts.map(contact => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onAction={onContactAction}
        />
      ))}
    </div>
  );
}