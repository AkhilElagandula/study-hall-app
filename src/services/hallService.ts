import { Hall } from "@/types/hall.types";

export const getHalls = async (): Promise<Hall[]> => {
  return [
    {
      id: "1",
      name: "Main Library Hall",
      location: "Block A",
      seats: 100,
      description: "Spacious and quiet with power outlets."
    },
    {
      id: "2",
      name: "South Wing",
      location: "Block C",
      seats: 60,
      description: "Ideal for group study and presentations."
    }
  ];
};

export async function getAllHalls(): Promise<Hall[]> {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/halls`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error('Failed to fetch halls');

    return await res.json();
  } catch (err) {
    console.error('Error loading halls:', err);
    return [];
  }
}

export async function getHallById(id: string): Promise<Hall | null> {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/halls/${id}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error('Error fetching hall by ID:', err);
    return null;
  }
}
