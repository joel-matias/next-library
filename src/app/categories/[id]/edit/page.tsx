import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CategoryForm from "../../components/Categoryform";
import Navbar from "@/app/components/Navbar";

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
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-5xl mx-auto px-8 py-10">
        <div className="mb-8">
          <p className="text-muted text-xs mb-1 tracking-wide uppercase">
            Categorías / Editar
          </p>
          <h1 className="text-2xl font-bold text-foreground">{category.name}</h1>
        </div>

        <CategoryForm initialCategory={category} />
      </div>
    </div>
  );
}
