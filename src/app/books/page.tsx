import Link from "next/link";
import { prisma } from "@/lib/prisma";
import BookTable from "./components/ShowBooks";
import Navbar from "@/app/components/Navbar";

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
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="max-w-5xl mx-auto px-8 py-10">
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Libros</h1>
                        <p className="text-muted text-sm mt-0.5">
                            {books.length} {books.length === 1 ? "registro" : "registros"}
                        </p>
                    </div>
                    <Link
                        href="/books/new"
                        className="bg-primary hover:bg-primary-hover text-primary-foreground px-4 py-2 rounded-lg transition-colors font-medium text-sm"
                    >
                        + Nuevo Libro
                    </Link>
                </div>

                {books.length === 0 ? (
                    <div className="text-center py-20 border border-border rounded-xl">
                        <p className="text-foreground font-medium">Sin libros registrados</p>
                        <p className="text-muted text-sm mt-1">Agrega el primer libro para comenzar.</p>
                    </div>
                ) : (
                    <BookTable books={books} categoryMap={categoryMap} />
                )}
            </div>
        </div>
    );
}
