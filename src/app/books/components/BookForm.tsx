"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Book, Category } from "@/lib/interfaces";
import { insertarLibro, actualizarLibro } from "../actions";

interface Props {
    categories: Category[];
    initialBook?: Book;
}

export default function BookForm({ categories, initialBook }: Props) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
            const result = initialBook
                ? await actualizarLibro(formData)
                : await insertarLibro(formData);

            if (result.success) {
                router.push("/books");
            } else {
                alert(result.error);
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-cardrounded-xl border border-border p-6 max-w-lg">
            {initialBook && (
                <input type="hidden" name="id" value={initialBook.id} />
            )}

            <div className="mb-5">
                <label htmlFor="title" className="block text-slate-300 text-sm font-medium mb-2">
                    Título <span className="text-red-400">*</span>
                </label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    defaultValue={initialBook?.title}
                    required
                    className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Título del libro"
                />
            </div>

            <div className="mb-5">
                <label htmlFor="author" className="block text-slate-300 text-sm font-medium mb-2">
                    Autor <span className="text-red-400">*</span>
                </label>
                <input
                    id="author"
                    type="text"
                    name="author"
                    defaultValue={initialBook?.author}
                    required
                    className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Nombre del autor"
                />
            </div>

            <div className="mb-5">
                <label htmlFor="categoryId" className="block text-slate-300 text-sm font-medium mb-2">
                    Categoría <span className="text-red-400">*</span>
                </label>
                <select
                    id="categoryId"
                    name="categoryId"
                    defaultValue={initialBook?.categoryId}
                    required
                    className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
                >
                    <option value="">Selecciona una categoría</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                    <label htmlFor="year" className="block text-slate-300 text-sm font-medium mb-2">
                        Año de publicación
                    </label>
                    <input
                        id="year"
                        type="number"
                        name="year"
                        defaultValue={initialBook?.year ?? ""}
                        min={1000}
                        max={new Date().getFullYear()}
                        className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="Ej: 2023"
                    />
                </div>

                <div>
                    <label htmlFor="isbn" className="block text-slate-300 text-sm font-medium mb-2">
                        ISBN
                    </label>
                    <input
                        id="isbn"
                        type="text"
                        name="isbn"
                        defaultValue={initialBook?.isbn ?? ""}
                        className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors font-mono"
                        placeholder="Ej: 978-3-16-148410-0"
                    />
                </div>
            </div>

            <div className="flex gap-4">
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-surface hover:bg-surface-2 text-white px-5 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? "Guardando..." : initialBook ? "Actualizar" : "Crear Libro"}
                </button>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="bg-slate-400 hover:bg-slate-500 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}
