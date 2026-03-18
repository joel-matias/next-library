"use client";

import { useTransition } from "react";
import { borrarLibro } from "../actions";

interface Props {
  id: number;
}

export default function DeleteBookButton({ id }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!window.confirm("¿Estás seguro que deseas eliminar este libro?")) return;

    startTransition(async () => {
      const result = await borrarLibro(id);
      if (!result.success) alert("Error al eliminar el libro");
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isPending ? "Eliminando..." : "Eliminar"}
    </button>
  );
}
