"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function insertarLibro(formData: FormData) {
    try {
        const title = (formData.get("title") as string).trim();
        const author = (formData.get("author") as string).trim();
        const isbn = (formData.get("isbn") as string)?.trim() || null;
        const yearRaw = formData.get("year") as string;
        const year = yearRaw ? parseInt(yearRaw) : null;
        const categoryId = parseInt(formData.get("categoryId") as string);

        await prisma.book.create({
            data: { title, author, isbn, year, categoryId },
        });

        revalidatePath("/books");
        return { success: true };
    } catch {
        return { success: false, error: "Error al crear el libro" };
    }
}

export async function actualizarLibro(formData: FormData) {
    try {
        const id = parseInt(formData.get("id") as string);
        const title = (formData.get("title") as string).trim();
        const author = (formData.get("author") as string).trim();
        const isbn = (formData.get("isbn") as string)?.trim() || null;
        const yearRaw = formData.get("year") as string;
        const year = yearRaw ? parseInt(yearRaw) : null;
        const categoryId = parseInt(formData.get("categoryId") as string);

        await prisma.book.update({
            where: { id },
            data: { title, author, isbn, year, categoryId },
        });

        revalidatePath("/books");
        return { success: true };
    } catch {
        return { success: false, error: "Error al actualizar el libro" };
    }
}

export async function borrarLibro(id: number) {
    try {
        await prisma.book.delete({ where: { id } });
        revalidatePath("/books");
        return { success: true };
    } catch {
        return { success: false, error: "Error al eliminar el libro" };
    }
}
