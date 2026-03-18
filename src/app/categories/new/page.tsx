import Link from "next/link";
import CategoryForm from "../components/Categoryform";

export default function NewCategoryPage() {
    return (
        <div className="min-h-screen bg-slate-900 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link href="/categories" className="text-slate-400 hover:text-white text-sm mb-1 inline-block transition-colors">
                        ← Categorías
                    </Link>
                    <h1 className="text-3xl font-bold text-white">Nueva Categoría</h1>
                </div>

                <CategoryForm />
            </div>
        </div>
    );
}
