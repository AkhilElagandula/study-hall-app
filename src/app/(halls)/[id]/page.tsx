// File: src/app/(halls)/[id]/page.tsx

import { getHallById } from '@/services/hallService';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  params: { id: string };
}

export default async function HallDetailPage({ params }: Props) {
  const hall = await getHallById(params.id);

  if (!hall) return notFound();

  return (
    <div className="min-h-screen bg-white p-6 max-w-4xl mx-auto">
      <div className="rounded-xl overflow-hidden shadow-md">
        <Image
          src={hall.imageUrl || '/images/logo.png'}
          alt={hall.name}
          width={1000}
          height={400}
          className="w-full h-80 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{hall.name}</h1>
          <p className="text-gray-600 mb-1">Location: {hall.location}</p>
          <p className="text-gray-600 mb-4">Capacity: {hall.capacity}</p>
          <p className="text-gray-700 mb-6">{hall.description || 'No description available.'}</p>

          <Link
            href={`/book/${hall.id}`}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Book This Hall
          </Link>
        </div>
      </div>
    </div>
  );
}
