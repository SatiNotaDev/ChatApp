// src/app/api/contacts/route.ts
import { NextResponse } from 'next/server';
import { ContactsController } from '@/controllers';
import { verifyAuth } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const userId = await verifyAuth(req);
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');
    const type = searchParams.get('type'); 

    const controller = new ContactsController();
    
    if (type === 'all') {
      const contacts = await controller.getAllContacts(search || undefined);
      return NextResponse.json(contacts);
    } else {
      const contacts = await controller.getUserContacts(userId, search || undefined);
      return NextResponse.json(contacts);
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const userId = await verifyAuth(req);
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { contactId, action } = await req.json();
    const controller = new ContactsController();

    if (action === 'add') {
      const contacts = await controller.addContactToUser(userId, contactId);
      return NextResponse.json(contacts);
    } else if (action === 'remove') {
      const contacts = await controller.removeContactFromUser(userId, contactId);
      return NextResponse.json(contacts);
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update contacts' },
      { status: 500 }
    );
  }
}