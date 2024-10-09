import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { relationships } from '@/lib/schema';

export async function GET() {
  const allRelationships = await db.select().from(relationships);
  return NextResponse.json(allRelationships);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newRelationship = await db.insert(relationships).values(body).returning();
  return NextResponse.json(newRelationship[0]);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const updatedRelationship = await db
    .update(relationships)
    .set(body)
    .where(relationships.id.eq(body.id))
    .returning();
  return NextResponse.json(updatedRelationship[0]);
}