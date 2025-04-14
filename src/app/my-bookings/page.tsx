// // File: src/app/my-bookings/page.tsx

// import { getServerSession } from 'next-auth';
// import { authOptions } from '../api/auth/[...nextauth]/route';
// import { prisma } from '@/lib/db';
// import { redirect } from 'next/navigation';

// export default async function MyBookingsPage() {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.email) {
//     redirect('/login');
//   }

//   const user = await prisma.user.findUnique({
//     where: { email: session.user.email },
//     include: {
//       bookings: {
//         include: { hall: true },
//         orderBy: { date: 'asc' },
//       },
//     },
//   });

//   return (
//     <div className="min-h-screen p-6 bg-gray-50 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
//       {user?.bookings.length ? (
//         <div className="space-y-4">
//           {user.bookings.map((booking) => (
//             <div key={booking.id} className="bg-white p-4 rounded-xl shadow">
//               <h2 className="font-semibold text-lg">{booking.hall.name}</h2>
//               <p className="text-gray-600">Location: {booking.hall.location}</p>
//               <p className="text-gray-600">Date: {booking.date}</p>
//               <p className="text-gray-600">Time: {booking.time}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-600">You have no bookings yet.</p>
//       )}
//     </div>
//   );
// }