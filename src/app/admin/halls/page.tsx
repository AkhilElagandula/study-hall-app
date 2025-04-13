// File: src/app/admin/halls/page.tsx

import { prisma } from '@/lib/db';
import Link from 'next/link';

export default async function AdminHallsPage() {
  const halls = await prisma.hall.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="min-h-screen p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Halls</h1>
        <Link
          href="#"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          + Add New Hall
        </Link>
      </div>

      {halls.length ? (
        <div className="space-y-4">
          {halls.map((hall) => (
            <div
              key={hall.id}
              className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
            >
              <div>
                <h2 className="font-semibold text-lg">{hall.name}</h2>
                <p className="text-gray-600">{hall.location}</p>
                <p className="text-gray-500 text-sm">Capacity: {hall.capacity}</p>
              </div>
              <div className="flex gap-3">
                <button className="text-blue-600 hover:underline text-sm">Edit</button>
                <button className="text-red-600 hover:underline text-sm">Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No halls found.</p>
      )}
    </div>
  );
}
