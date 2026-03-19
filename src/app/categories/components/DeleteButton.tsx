"use client";

import { useTransition } from "react";
import { borrarCategoria } from "../actions";

interface Props {
    id: number;
}

export default function DeleteCategoryButton({ id }: Props) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (!window.confirm("¿Estás seguro que deseas eliminar esta categoría?")) return;

        startTransition(async () => {
            const result = await borrarCategoria(id);
            if (!result.success) alert("Error al eliminar la categoría");
        });
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className="bg-danger hover:bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isPending ? "Eliminando..." : "Eliminar"}
        </button>
    );
}
