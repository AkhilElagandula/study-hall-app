// File: src/app/(halls)/book/[id]/page.tsx

import BookingForm from '@/components/booking/BookingForm';
import { getHallById } from '@/services/hallService';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

export default async function BookHallPage({ params }: Props) {
  const hall = await getHallById(params.id);

  if (!hall) return notFound();

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Book {hall.name}</h1>
      <BookingForm hall={hall} />
    </div>
  );
}