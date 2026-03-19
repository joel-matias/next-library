import Link from "next/link";
import { prisma } from "@/lib/prisma";
import CategoryTable from "./components/ShowCategories";
import Navbar from "@/app/components/Navbar";

export default async function CategoriesPage() {
    const categories = await prisma.category.findMany({
        orderBy: { name: "asc" },
    });

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="max-w-5xl mx-auto px-8 py-10">
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Categorías</h1>
                        <p className="text-muted text-sm mt-0.5">
                            {categories.length} {categories.length === 1 ? "registro" : "registros"}
                        </p>
                    </div>
                    <Link
                        href="/categories/new"
                        className="bg-primary hover:bg-primary-hover text-primary-foreground px-4 py-2 rounded-lg transition-colors font-medium text-sm"
                    >
                        + Nueva Categoría
                    </Link>
                </div>

                {categories.length === 0 ? (
                    <div className="text-center py-20 border border-border rounded-xl">
                        <p className="text-foreground font-medium">Sin categorías registradas</p>
                        <p className="text-muted text-sm mt-1">Crea la primera categoría para comenzar.</p>
                    </div>
                ) : (
                    <CategoryTable categories={categories} />
                )}
            </div>
        </div>
    );
}
