import { prisma } from "@/lib/prisma";
import BookForm from "../components/BookForm";
import Navbar from "@/app/components/Navbar";

export default async function NewBookPage() {
    const categories = await prisma.category.findMany({
        orderBy: { name: "asc" },
    });

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="max-w-5xl mx-auto px-8 py-10">
                <div className="mb-8">
                    <p className="text-muted text-xs mb-1 tracking-wide uppercase">
                        Libros / Nuevo
                    </p>
                    <h1 className="text-2xl font-bold text-foreground">Nuevo Libro</h1>
                </div>

                <BookForm categories={categories} />
            </div>
        </div>
    );
}
