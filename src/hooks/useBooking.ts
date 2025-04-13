// File: src/hooks/useBooking.ts

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface BookingData {
  hallId: string;
  date: string;
  time: string;
}

export function useBooking() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const bookHall = async (data: BookingData) => {
    setLoading(true);
    setMessage('');
    try {
      await axios.post('/api/bookings', data);
      setMessage('Booking successful!');
      router.push('/my-bookings');
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  return { bookHall, loading, message };
}
