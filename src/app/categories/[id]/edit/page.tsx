import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CategoryForm from "../../components/Categoryform";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({ params }: Props) {
  const { id } = await params;
  const category = await prisma.category.findUnique({
    where: { id: parseInt(id) },
  });

  if (!category) notFound();

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/categories" className="text-slate-400 hover:text-white text-sm mb-1 inline-block transition-colors">
            ← Categorías
          </Link>
          <h1 className="text-3xl font-bold text-white">Editar Categoría</h1>
        </div>

        <CategoryForm initialCategory={category} />
      </div>
    </div>
  );
}
