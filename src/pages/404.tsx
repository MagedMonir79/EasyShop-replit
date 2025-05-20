import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-8">The page you are looking for doesn't exist or has been moved.</p>
      <Link href="/" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
        Return to Homepage
      </Link>
    </div>
  );
}