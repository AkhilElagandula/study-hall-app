// File: src/components/auth/ForgotPasswordForm.tsx

'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import axios from 'axios';

const schema = z.object({
  email: z.string().email('Invalid email address'),
});

type ForgotPasswordData = z.infer<typeof schema>;

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(schema),
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ForgotPasswordData) => {
    setLoading(true);
    setMessage('');
    try {
      const res = await axios.post('/api/auth/forgot-password', data);
      setMessage(res.data.message);
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          {...register('email')}
          className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring"
        />
        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send Reset Link'}
      </button>

      {message && <p className="text-center text-sm mt-2 text-green-600">{message}</p>}
    </form>
  );
}