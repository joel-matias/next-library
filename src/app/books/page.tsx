import Link from "next/link";
import { prisma } from "@/lib/prisma";
import BookForm from "./components/ShowBooks";

export default async function NewBookPage() {
    const categories = await prisma.category.findMany({
        orderBy: { name: "asc" },
    });

    return (
        <div className="min-h-screen bg-slate-900 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link href="/books" className="text-slate-400 hover:text-white text-sm mb-1 inline-block transition-colors">
                        ← Libros
                    </Link>
                    <h1 className="text-3xl font-bold text-white">Nuevo Libro</h1>
                </div>

                <BookForm categories={categories} />
            </div>
        </div>
    );
}
