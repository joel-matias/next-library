import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <div className="max-w-sm w-full">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-foreground mb-3">
            Biblioteca
          </h1>
          <p className="text-muted text-sm leading-relaxed">
            Sistema de gestión de libros y categorías
          </p>
        </div>

        <div className="flex flex-col border border-border rounded-xl overflow-hidden">
          <Link
            href="/books"
            className="group flex items-center justify-between px-6 py-4 hover:bg-surface transition-colors border-b border-border"
          >
            <span className="text-foreground font-medium text-sm">Libros</span>
            <span className="text-muted group-hover:text-accent transition-colors">
              →
            </span>
          </Link>
          <Link
            href="/categories"
            className="group flex items-center justify-between px-6 py-4 hover:bg-surface transition-colors"
          >
            <span className="text-foreground font-medium text-sm">
              Categorías
            </span>
            <span className="text-muted group-hover:text-accent transition-colors">
              →
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
