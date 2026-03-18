import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full">
        <h1 className="text-4xl font-bold text-accent text-center mb-2">
          Biblioteca
        </h1>
        <p className="text-muted text-center mb-10">
          Sistema de gestión de libros y categorías
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href="/books"
            className="flex items-center justify-between bg-card hover:bg-surface text-foreground px-6 py-4 rounded-xl transition-colors border border-border"
          >
            <div>
              <p className="font-semibold text-lg text-primary">Libros</p>
              <p className="text-muted text-sm">Gestionar el catalogo de los libros</p>
            </div>
          </Link>

          <Link
            href="/categories"
            className="flex items-center justify-between bg-card hover:bg-surface text-foreground px-6 py-4 rounded-xl transition-colors border border-border"
          >
            <div>
              <p className="font-semibold text-lg text-accent">Categorías</p>
              <p className="text-muted text-sm">Gestionar las categorías de libros</p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
