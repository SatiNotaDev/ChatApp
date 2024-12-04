import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, X } from "lucide-react";
import type { Contact } from "@/types";

export interface ContactListProps {
  allContacts: Contact[];
  onContactAction: (contact: Contact) => Promise<void>;
  emptyMessage?: string;
}

export function ContactList({ allContacts = [], onContactAction, emptyMessage }: ContactListProps) {
  return (
    <div className="space-y-4">
      {allContacts.length === 0 ? (
        <p>{emptyMessage}</p>
      ) : (
        allContacts.map((contact: Contact) => (
          <Card key={contact._id} className="p-4 flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div>
                <p className="font-bold">{contact.name}</p>
                <p className="text-sm text-gray-600">{contact.email}</p>
                {contact.department && <p className="text-sm text-gray-600">{contact.department}</p>}
              </div>
            </div>
            <Button
              variant={contact.isContact ? "destructive" : "default"}
              size="sm"
              onClick={() => onContactAction(contact)}
              className={!contact.isContact ? "bg-green-500  text-white" : ""}
            >
              {contact.isContact ? (
                <>
                  <X className="h-4 w-4 mr-2" />
                  Remove
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Contact
                </>
              )}
            </Button>
          </Card>
        ))
      )}
    </div>
  );
}
