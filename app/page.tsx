import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold mb-8">
          Welcome to <span className="text-blue-600">Relationship Manager</span>
        </h1>
        <p className="text-xl mb-8">
          Manage your personal and professional connections with ease.
        </p>
        <div className="flex space-x-4">
          <Button asChild>
            <Link href="/dashboard">
              View Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contacts">
              Manage Contacts
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}