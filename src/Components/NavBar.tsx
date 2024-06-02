import Link from "next/link";
export default function NavBar() {
  return (
      <nav className="bg-slate-900 flex place-content-center py-2 fixed top-0 w-[100vw]">
          <Link href="/" className="bg-blue-900 mx-auto rounded-lg text-xl text-white py-1 px-3 font-bold">Home</Link>
          <Link href="/addUser" className="bg-blue-900 mx-auto rounded-lg text-xl text-white py-1 px-3 font-bold">Add User</Link>
          <Link href="/display" className="bg-blue-900 mx-auto rounded-lg text-xl text-white py-1 px-3 font-bold">Search Existing User</Link>
          <Link href="/records" className="bg-blue-900 mx-auto rounded-lg text-xl text-white py-1 px-3 font-bold">Records</Link>
      </nav>
  );
}