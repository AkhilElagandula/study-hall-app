// File: src/app/(halls)/page.tsx

import HallCard from '@/components/halls/HallCard';
import { getAllHalls } from '@/services/hallService';
import { Hall } from '@/types/hall.types';

export default async function HallsPage() {
  const halls: Hall[] = await getAllHalls();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Available Study Halls</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {halls.map((hall) => (
          <HallCard key={hall.id} hall={hall} />
        ))}
      </div>
    </div>
  );
}