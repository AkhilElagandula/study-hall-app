// File: src/hooks/useHalls.ts

import useSWR from 'swr';
import { Hall } from '@/types/hall.types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useHalls() {
  const { data, error, isLoading } = useSWR<Hall[]>('/api/halls', fetcher);
  return {
    halls: data,
    isLoading,
    isError: error,
  };
}

export function useHall(id: string) {
  const { data, error, isLoading } = useSWR<Hall>(id ? `/api/halls/${id}` : null, fetcher);
  return {
    hall: data,
    isLoading,
    isError: error,
  };
}
