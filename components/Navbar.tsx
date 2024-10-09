import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-gray-700">
            <Link href="/">
              Relationship Manager
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link href="/dashboard" className="text-gray-700 hover:text-gray-900">
              Dashboard
            </Link>
            <Link href="/contacts" className="text-gray-700 hover:text-gray-900">
              Contacts
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}