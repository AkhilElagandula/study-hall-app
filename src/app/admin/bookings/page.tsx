// File: src/app/admin/bookings/page.tsx

// import { prisma } from '@/lib/db';

export default async function AdminBookingsPage() {
  // const bookings = await prisma.booking.findMany({
  //   include: {
  //     hall: true,
  //     user: true,
  //   },
  //   orderBy: { date: 'asc' },
  // });

  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">All Bookings</h1>

      {/* {bookings.length ? (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="font-medium">{b.user?.name || b.user?.email}</p>
                <p className="text-gray-600 text-sm">{b.hall.name} — {b.hall.location}</p>
                <p className="text-gray-500 text-sm">{b.date} at {b.time}</p>
              </div>
              <p className="text-xs text-gray-400 mt-2 md:mt-0">ID: {b.id}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No bookings available.</p>
      )} */}
    </div>
  );
}