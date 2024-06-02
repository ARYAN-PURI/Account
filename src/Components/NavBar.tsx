import Link from "next/link";
export default function NavBar() {
  return (
      <nav className="bg-slate-900 flex place-content-center py-2">
          <Link href="/" className="bg-blue-900 mx-auto rounded-lg text-white py-1 px-3 font-medium">Home</Link>
          <Link href="/addUser" className="bg-blue-900 mx-auto rounded-lg text-white py-1 px-3 font-medium">Add User</Link>
          <Link href="/display" className="bg-blue-900 mx-auto rounded-lg text-white py-1 px-3 font-medium">Search Existing User</Link>
          <Link href="/records" className="bg-blue-900 mx-auto rounded-lg text-white py-1 px-3 font-medium">Records</Link>
      </nav>
  );
}