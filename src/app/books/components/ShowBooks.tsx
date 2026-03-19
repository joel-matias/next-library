import Link from "next/link";
import DeleteBookButton from "./DeketeButton";

interface Book {
    id: number;
    title: string;
    author: string;
    isbn: string | null;
    year: number | null;
    categoryId: number;
}

interface Props {
    books: Book[];
    categoryMap: Record<number, string>;
}

export default function BookTable({ books, categoryMap }: Props) {
    return (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-slate-700">
                        <th className="text-left px-6 py-4 text-slate-300 font-semibold">Título</th>
                        <th className="text-left px-6 py-4 text-slate-300 font-semibold">Autor</th>
                        <th className="text-left px-6 py-4 text-slate-300 font-semibold">Categoría</th>
                        <th className="text-left px-6 py-4 text-slate-300 font-semibold">Año</th>
                        <th className="text-left px-6 py-4 text-slate-300 font-semibold">ISBN</th>
                        <th className="text-right px-6 py-4 text-slate-300 font-semibold">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr
                            key={book.id}
                            className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                        >
                            <td className="px-6 py-4 text-white font-medium">{book.title}</td>
                            <td className="px-6 py-4 text-slate-300">{book.author}</td>
                            <td className="px-6 py-4">
                                <span className="bg-blue-900/50 text-blue-300 text-xs px-2.5 py-1 rounded-full">
                                    {categoryMap[book.categoryId] ?? "Sin categoría"}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-slate-400">
                                {book.year ?? <span className="italic text-slate-500">—</span>}
                            </td>
                            <td className="px-6 py-4 text-slate-400 font-mono text-sm">
                                {book.isbn ?? <span className="italic text-slate-500">—</span>}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex gap-2 justify-end">
                                    <Link
                                        href={`/books/${book.id}/edit`}
                                        className="bg-success hover:bg-success-hover text-white px-3 py-1.5 rounded-lg text-sm transition-colors"
                                    >
                                        Editar
                                    </Link>
                                    <DeleteBookButton id={book.id} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
