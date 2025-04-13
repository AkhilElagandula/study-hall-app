// File: src/types/hall.types.ts

export interface Hall {
  id: string;
  name: string;
  location: string;
  capacity: number;
  imageUrl?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}