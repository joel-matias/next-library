import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BookForm from "../../components/BookForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditBookPage({ params }: Props) {
  const { id } = await params;

  const [book, categories] = await Promise.all([
    prisma.book.findUnique({ where: { id: parseInt(id) } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!book) notFound();

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/books" className="text-slate-400 hover:text-white text-sm mb-1 inline-block transition-colors">
            ← Libros
          </Link>
          <h1 className="text-3xl font-bold text-white">Editar Libro</h1>
        </div>

        <BookForm categories={categories} initialBook={book} />
      </div>
    </div>
  );
}
