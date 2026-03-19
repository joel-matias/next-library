import CategoryForm from "../components/Categoryform";
import Navbar from "@/app/components/Navbar";

export default function NewCategoryPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="max-w-5xl mx-auto px-8 py-10">
                <div className="mb-8">
                    <p className="text-muted text-xs mb-1 tracking-wide uppercase">
                        Categorías / Nueva
                    </p>
                    <h1 className="text-2xl font-bold text-foreground">Nueva Categoría</h1>
                </div>

                <CategoryForm />
            </div>
        </div>
    );
}
