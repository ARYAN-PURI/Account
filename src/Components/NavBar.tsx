"use client";
import Link from "next/link";
import React from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/addUser", label: "Add User" },
  { href: "/display", label: "Users" },
  { href: "/records", label: "Records" },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white border-b border-slate-200 fixed top-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-indigo-600 tracking-tight" onClick={() => setMenuOpen(false)}>
          Puri Cloth House
        </Link>

        <div className="hidden sm:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-md transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className="sm:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="sm:hidden border-t border-slate-100 bg-white px-4 py-2 shadow-md">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 px-3 py-2.5 rounded-md transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}