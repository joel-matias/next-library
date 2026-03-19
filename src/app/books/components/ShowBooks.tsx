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
                    <tr className="bg-surface-2 border-b border-border">
                        <th className="text-left px-6 py-4 text-muted font-semibold text-sm">Título</th>
                        <th className="text-left px-6 py-4 text-muted font-semibold text-sm">Autor</th>
                        <th className="text-left px-6 py-4 text-muted font-semibold text-sm">Categoría</th>
                        <th className="text-left px-6 py-4 text-muted font-semibold text-sm">Año</th>
                        <th className="text-left px-6 py-4 text-muted font-semibold text-sm">ISBN</th>
                        <th className="text-right px-6 py-4 text-muted font-semibold text-sm">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr
                            key={book.id}
                            className="border-b border-border/50 hover:bg-surface/50 transition-colors"
                        >
                            <td className="px-6 py-4 text-foreground font-medium">{book.title}</td>
                            <td className="px-6 py-4 text-muted">{book.author}</td>
                            <td className="px-6 py-4">
                                <span className="bg-tag-bg text-tag-text text-xs px-2.5 py-1 rounded-full">
                                    {categoryMap[book.categoryId] ?? "Sin categoría"}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-muted">
                                {book.year ?? <span className="italic opacity-50">—</span>}
                            </td>
                            <td className="px-6 py-4 text-muted font-mono text-sm">
                                {book.isbn ?? <span className="italic opacity-50">—</span>}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex gap-2 justify-end">
                                    <Link
                                        href={`/books/${book.id}/edit`}
                                        className="bg-success hover:bg-success-hover text-foreground px-3 py-1.5 rounded-lg text-sm transition-colors"
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
