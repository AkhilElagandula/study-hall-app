// File: src/components/halls/HallCard.tsx

import Link from 'next/link';
import { Hall } from '../../types/hall.types';

interface Props {
  hall: Hall;
}

export default function HallCard({ hall }: Props) {
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition">
      <img
        src={hall.imageUrl || '/images/logo.png'}
        alt={hall.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-1">{hall.name}</h2>
        <p className="text-sm text-gray-600">{hall.location}</p>
        <p className="text-sm text-gray-500">Capacity: {hall.capacity}</p>

        <Link
          href={`/book/${hall.id}`}
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}