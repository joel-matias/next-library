"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isBooks = pathname.startsWith("/books");
  const isCategories = pathname.startsWith("/categories");

  return (
    <nav className="border-b border-border">
      <div className="max-w-5xl mx-auto px-8 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-accent font-bold text-lg tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Biblioteca
        </Link>

        <div className="flex items-center gap-1">
          <Link
            href="/books"
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              isBooks
                ? "text-foreground bg-surface"
                : "text-muted hover:text-foreground hover:bg-surface/50"
            }`}
          >
            Libros
          </Link>
          <Link
            href="/categories"
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              isCategories
                ? "text-foreground bg-surface"
                : "text-muted hover:text-foreground hover:bg-surface/50"
            }`}
          >
            Categorías
          </Link>
        </div>
      </div>
    </nav>
  );
}
