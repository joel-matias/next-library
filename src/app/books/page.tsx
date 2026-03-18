import Link from "next/link";
import { prisma } from "@/lib/prisma";
import BookTable from "./components/ShowBooks";

export default async function BooksPage() {
    const [books, categories] = await Promise.all([
        prisma.book.findMany({
            include: { category: true },
            orderBy: { title: "asc" },
        }),
        prisma.category.findMany({ orderBy: { name: "asc" } }),
    ]);

    const categoryMap = Object.fromEntries(
        categories.map((c) => [c.id, c.name])
    );

    return (
        <div className="min-h-screen bg-slate-900 p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <Link href="/" className="text-slate-500 hover:text-white text-sm mb-1 inline-block transition-colors">
                            ← Volver
                        </Link>
                        <h1 className="text-3xl font-bold text-white">Libros</h1>
                    </div>
                    <Link
                        href="/books/new"
                        className="bg-blue-800 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                    >
                        Nuevo Libro
                    </Link>
                </div>

                {books.length === 0 ? (
                    <div className="text-center py-16 text-slate-500">
                        <p className="text-lg">No hay libros registrados.</p>
                        <p className="text-sm mt-1">Agrega el primer libro para comenzar.</p>
                    </div>
                ) : (
                    <BookTable books={books} categoryMap={categoryMap} />
                )}
            </div>
        </div>
    );
}
