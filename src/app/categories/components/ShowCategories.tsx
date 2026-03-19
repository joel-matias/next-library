import Link from "next/link";
import { Category } from "@/lib/interfaces";
import DeleteCategoryButton from "./DeleteButton";

interface Props {
    categories: Category[];
}

export default function CategoryTable({ categories }: Props) {
    return (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-slate-700">
                        <th className="text-left px-6 py-4 text-slate-300 font-semibold">Nombre</th>
                        <th className="text-left px-6 py-4 text-slate-300 font-semibold">Descripción</th>
                        <th className="text-right px-6 py-4 text-slate-300 font-semibold">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr
                            key={category.id}
                            className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                        >
                            <td className="px-6 py-4 text-white font-medium">{category.name}</td>
                            <td className="px-6 py-4 text-slate-400">
                                {category.description || <span className="italic text-slate-500">Sin descripción</span>}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex gap-2 justify-end">
                                    <Link
                                        href={`/categories/${category.id}/edit`}
                                        className="bg-success hover:bg-success-hover text-white px-3 py-1.5 rounded-lg text-sm transition-colors"
                                    >
                                        Editar
                                    </Link>
                                    <DeleteCategoryButton id={category.id} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
