// File: src/services/hallService.ts

import { Hall } from '@/types/hall.types';

export async function getAllHalls(): Promise<Hall[]> {
  const res = await fetch('/api/halls');
  if (!res.ok) throw new Error('Failed to fetch halls');
  return res.json();
}

export async function getHallById(id: string): Promise<Hall> {
  const res = await fetch(`/api/halls/${id}`);
  if (!res.ok) throw new Error('Failed to fetch hall');
  return res.json();
}
