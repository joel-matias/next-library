import Link from "next/link";
import { prisma } from "@/lib/prisma";
import BookForm from "../components/BookForm";

export default async function NewBookPage() {
    const categories = await prisma.category.findMany({
        orderBy: { name: "asc" },
    });

    return (
        <div className="min-h-screen bg-background p-8 flex items-center aling-center">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link href="/books" className="text-foreground hover:text-muted text-sm mb-1 inline-block transition-colors">
                        ← Volver
                    </Link>
                    <h1 className="text-3xl font-bold text-accent">Nuevo Libro</h1>
                </div>

                <BookForm categories={categories} />
            </div>
        </div>
    );
}
