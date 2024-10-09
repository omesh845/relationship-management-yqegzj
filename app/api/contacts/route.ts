import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { contacts } from '@/lib/schema';

export async function GET() {
  const allContacts = await db.select().from(contacts);
  return NextResponse.json(allContacts);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newContact = await db.insert(contacts).values(body).returning();
  return NextResponse.json(newContact[0]);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const updatedContact = await db
    .update(contacts)
    .set(body)
    .where(contacts.id.eq(body.id))
    .returning();
  return NextResponse.json(updatedContact[0]);
}