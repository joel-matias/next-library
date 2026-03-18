"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function insertarCategoria(formData: FormData) {
    try {
        const name = (formData.get("name") as string).trim();
        const description = (formData.get("description") as string)?.trim() || null;

        await prisma.category.create({
            data: { name, description },
        });

        revalidatePath("/categories");
        return { success: true };
    } catch {
        return { success: false, error: "Error al crear la categoría" };
    }
}

export async function actualizarCategoria(formData: FormData) {
    try {
        const id = parseInt(formData.get("id") as string);
        const name = (formData.get("name") as string).trim();
        const description = (formData.get("description") as string)?.trim() || null;

        await prisma.category.update({
            where: { id },
            data: { name, description },
        });

        revalidatePath("/categories");
        return { success: true };
    } catch {
        return { success: false, error: "Error al actualizar la categoría" };
    }
}

export async function borrarCategoria(id: number) {
    try {
        await prisma.category.delete({ where: { id } });
        revalidatePath("/categories");
        return { success: true };
    } catch {
        return { success: false, error: "Error al eliminar la categoría" };
    }
}
