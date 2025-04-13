// File: src/components/booking/BookingForm.tsx

'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Hall } from '@/types/hall.types';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const schema = z.object({
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  hall: Hall;
}

export default function BookingForm({ hall }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setMessage('');
    try {
      await axios.post('/api/bookings', {
        hallId: hall.id,
        ...data,
      });
      setMessage('Booking successful!');
      router.push('/my-bookings');
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl shadow-md space-y-4">
      <div>
        <label className="block text-sm font-medium">Date</label>
        <input type="date" {...register('date')} className="w-full px-4 py-2 mt-1 border rounded-md" />
        {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Time</label>
        <input type="time" {...register('time')} className="w-full px-4 py-2 mt-1 border rounded-md" />
        {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
      >
        {loading ? 'Booking...' : 'Confirm Booking'}
      </button>

      {message && <p className="text-center text-sm mt-2 text-blue-600">{message}</p>}
    </form>
  );
}