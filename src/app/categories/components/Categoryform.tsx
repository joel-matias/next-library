"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Category } from "@/lib/interfaces";
import { insertarCategoria, actualizarCategoria } from "../actions";

interface Props {
    initialCategory?: Category;
}

export default function CategoryForm({ initialCategory }: Props) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
            const result = initialCategory
                ? await actualizarCategoria(formData)
                : await insertarCategoria(formData);

            if (result.success) {
                router.push("/categories");
            } else {
                alert(result.error);
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border p-6 max-w-lg">
            {initialCategory && (
                <input type="hidden" name="id" value={initialCategory.id} />
            )}

            <div className="mb-5">
                <label htmlFor="name" className="block text-muted text-sm font-medium mb-2">
                    Nombre <span className="text-danger">*</span>
                </label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    defaultValue={initialCategory?.name}
                    required
                    className="w-full bg-input-bg border border-input-border text-foreground rounded-lg px-4 py-2.5 focus:outline-none focus:border-input-focus transition-colors"
                    placeholder="Ej: Ciencia Ficción"
                />
            </div>

            <div className="mb-6">
                <label htmlFor="description" className="block text-muted text-sm font-medium mb-2">
                    Descripción
                </label>
                <textarea
                    id="description"
                    name="description"
                    defaultValue={initialCategory?.description ?? ""}
                    rows={3}
                    className="w-full bg-input-bg border border-input-border text-foreground rounded-lg px-4 py-2.5 focus:outline-none focus:border-input-focus transition-colors resize-none"
                    placeholder="Descripción opcional de la categoría"
                />
            </div>

            <div className="flex gap-3">
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-primary hover:bg-primary-hover text-primary-foreground px-5 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? "Guardando..." : initialCategory ? "Actualizar" : "Crear Categoría"}
                </button>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="bg-surface hover:bg-surface-2 text-muted border border-border px-5 py-2.5 rounded-lg font-medium transition-colors"
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}
