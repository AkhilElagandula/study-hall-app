import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white p-4 shadow-md h-full">
      <h2 className="text-lg font-semibold mb-4">Admin Menu</h2>
      <ul className="space-y-2">
        <li>
          <Link href="/admin/halls" className="text-blue-600 hover:underline">Manage Halls</Link>
        </li>
        <li>
          <Link href="/admin/bookings" className="text-blue-600 hover:underline">All Bookings</Link>
        </li>
      </ul>
    </aside>
  );
}
