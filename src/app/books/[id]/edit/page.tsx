import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BookForm from "../../components/BookForm";
import Navbar from "@/app/components/Navbar";

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
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-5xl mx-auto px-8 py-10">
        <div className="mb-8">
          <p className="text-muted text-xs mb-1 tracking-wide uppercase">
            Libros / Editar
          </p>
          <h1 className="text-2xl font-bold text-foreground">{book.title}</h1>
        </div>

        <BookForm categories={categories} initialBook={book} />
      </div>
    </div>
  );
}
