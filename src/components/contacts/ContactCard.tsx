'use client';

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { UserPlus, X, Circle } from 'lucide-react';
import type { Contact } from '@/types';

type UserStatus = 'online' | 'busy' | 'unavailable' | 'vacation';

const statusStyles: Record<UserStatus, { color: string }> = {
  online: { color: 'text-green-500 fill-green-500' },
  busy: { color: 'text-red-500 fill-red-500' },
  unavailable: { color: 'text-gray-500 fill-gray-500' },
  vacation: { color: 'text-yellow-500 fill-yellow-500' }
};

interface ContactCardProps {
  contact: Contact & { status?: UserStatus };
  onAction: (contact: Contact) => void;
}

export function ContactCard({ contact, onAction }: ContactCardProps) {
  return (
    <Card className="p-4 flex items-center justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        <Avatar>
          <img 
            src={`/api/placeholder/40/40?text=${contact.name[0]}`} 
            alt={contact.name} 
          />
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{contact.name}</h3>
            {contact.status && (
              <Circle className={`h-2 w-2 ${statusStyles[contact.status].color}`} />
            )}
          </div>
          <p className="text-sm text-gray-500">{contact.email}</p>
        </div>
      </div>
      <Button
        variant={contact.isContact ? "destructive" : "default"}
        size="sm"
        onClick={() => onAction(contact)}
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
  );
}