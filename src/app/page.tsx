import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full">
        <h1 className="text-4xl font-bold text-white text-center mb-2">
          Biblioteca
        </h1>
        <p className="text-slate-400 text-center mb-10">
          Sistema de gestión de libros y categorías
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href="/books"
            className="flex items-center justify-between bg-slate-800 hover:bg-slate-700 text-white px-6 py-4 rounded-xl transition-colors border border-slate-700"
          >
            <div>
              <p className="font-semibold text-lg">Libros</p>
              <p className="text-slate-400 text-sm">Gestionar el catalogo de los libros</p>
            </div>
          </Link>

          <Link
            href="/categories"
            className="flex items-center justify-between bg-slate-800 hover:bg-slate-700 text-white px-6 py-4 rounded-xl transition-colors border border-slate-700"
          >
            <div>
              <p className="font-semibold text-lg">Categorías</p>
              <p className="text-slate-400 text-sm">Gestionar las categorías de libros</p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
