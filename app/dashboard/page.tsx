import { Suspense } from 'react';
import Dashboard from '@/components/Dashboard';
import { db } from '@/lib/db';
import { contacts, relationships } from '@/lib/schema';

async function getContacts() {
  try {
    return await db.select().from(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }
}

async function getRelationships() {
  try {
    return await db.select().from(relationships);
  } catch (error) {
    console.error('Error fetching relationships:', error);
    return [];
  }
}

export default async function DashboardPage() {
  const [contactsData, relationshipsData] = await Promise.all([
    getContacts(),
    getRelationships(),
  ]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dashboard initialContacts={contactsData} initialRelationships={relationshipsData} />
    </Suspense>
  );
}