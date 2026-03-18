import Link from "next/link";
import { prisma } from "@/lib/prisma";
import CategoryTable from "./components/ShowCategories";

export default async function CategoriesPage() {
    const categories = await prisma.category.findMany({
        orderBy: { name: "asc" },
    });

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <Link href="/" className="text-foreground hover:text-border text-sm mb-1 inline-block transition-colors">
                            ← Inicio
                        </Link>
                        <h1 className="text-3xl font-bold text-accent">Categorías</h1>
                    </div>
                    <Link
                        href="/categories/new"
                        className="bg-surface hover:bg-surface-2 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                    >
                        + Nueva Categoría
                    </Link>
                </div>

                {categories.length === 0 ? (
                    <div className="text-center py-16 text-foregraund">
                        <p className="text-lg">No hay categorías registradas.</p>
                        <p className="text-sm mt-1">Crea la primera categoría para comenzar.</p>
                    </div>
                ) : (
                    <CategoryTable categories={categories} />
                )}
            </div>
        </div>
    );
}
