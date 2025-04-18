// File: src/hooks/useHalls.ts

import useSWR from 'swr';
import { Hall } from '@/types/hall.types';
import { getAllHalls, getHallById } from '@/services/hallService';

// SWR will use these service methods as fetchers
export function useHalls() {
  const { data, error, isLoading } = useSWR<Hall[]>('getAllHalls', getAllHalls);
  return {
    halls: data,
    isLoading,
    isError: error,
  };
}

export function useHall(id: string) {
  const { data, error, isLoading } = useSWR<Hall>(
    id ? ['getHallById', id] : null, // Use a key that can be memoized
    () => getHallById(id)
  );

  return {
    hall: data,
    isLoading,
    isError: error,
  };
}
