import { expect, test as base } from "@playwright/test";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface SeedData {
  runId: string;
  primaryCategory: string;
  secondaryCategory: string;
  initialBookTitle: string;
  updatedBookTitle: string;
}

const test = base.extend<{ seed: SeedData }>({
  seed: async ({}, use) => {
    const runId = `pw-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const primaryCategory = `${runId}-Categoria-A`;
    const secondaryCategory = `${runId}-Categoria-B`;
    const initialBookTitle = `${runId}-Libro-Inicial`;
    const updatedBookTitle = `${runId}-Libro-Actualizado`;

    const [firstCategory, secondCategory] = await Promise.all([
      prisma.category.create({
        data: {
          name: primaryCategory,
          description: "Categoria creada por Playwright",
        },
      }),
      prisma.category.create({
        data: {
          name: secondaryCategory,
          description: "Categoria creada por Playwright",
        },
      }),
    ]);

    await prisma.book.create({
      data: {
        title: initialBookTitle,
        author: `${runId}-Autor-Inicial`,
        isbn: `${runId}-ISBN-001`,
        year: 2024,
        categoryId: firstCategory.id,
      },
    });

    try {
      await use({
        runId,
        primaryCategory: primaryCategory,
        secondaryCategory: secondaryCategory,
        initialBookTitle,
        updatedBookTitle,
      });
    } finally {
      await prisma.book.deleteMany({
        where: {
          OR: [
            { title: { startsWith: runId } },
            { author: { startsWith: runId } },
            { isbn: { startsWith: runId } },
          ],
        },
      });

      await prisma.category.deleteMany({
        where: {
          name: { startsWith: runId },
        },
      });
    }
  },
});

test.describe("CRUD de libros", () => {
  test("muestra en el listado un libro sembrado para la prueba", async ({
    page,
    seed,
  }) => {
    await page.goto("/books");

    const row = page.locator("tbody tr").filter({ hasText: seed.initialBookTitle });

    await expect(row).toContainText(seed.initialBookTitle);
    await expect(row).toContainText(`${seed.runId}-Autor-Inicial`);
    await expect(row).toContainText(seed.primaryCategory);
    await expect(row).toContainText("2024");
    await expect(row).toContainText(`${seed.runId}-ISBN-001`);
    await expect(row.getByRole("link", { name: "Editar" })).toBeVisible();
    await expect(row.getByRole("button", { name: "Eliminar" })).toBeVisible();
  });

  test("crea un libro nuevo y lo muestra en el listado", async ({ page, seed }) => {
    const newBookTitle = `${seed.runId}-Libro-Nuevo`;

    await page.goto("/books/new");
    await page.getByLabel("Título *").fill(newBookTitle);
    await page.getByLabel("Autor *").fill(`${seed.runId}-Autor-Nuevo`);
    await page.getByLabel("Categoría *").selectOption({ label: seed.secondaryCategory });
    await page.getByLabel("Año de publicación").fill("2025");
    await page.getByLabel("ISBN").fill(`${seed.runId}-ISBN-NEW`);
    await page.getByRole("button", { name: "Crear Libro" }).click();

    await expect(page).toHaveURL(/\/books$/);

    const row = page.locator("tbody tr").filter({ hasText: newBookTitle });
    await expect(row).toContainText(`${seed.runId}-Autor-Nuevo`);
    await expect(row).toContainText(seed.secondaryCategory);
    await expect(row).toContainText("2025");
    await expect(row).toContainText(`${seed.runId}-ISBN-NEW`);
  });

  test("edita un libro existente y refleja los cambios", async ({ page, seed }) => {
    await page.goto("/books");

    const row = page.locator("tbody tr").filter({ hasText: seed.initialBookTitle });
    await row.getByRole("link", { name: "Editar" }).click();

    await expect(page).toHaveURL(/\/books\/\d+\/edit$/);

    await page.getByLabel("Título *").fill(seed.updatedBookTitle);
    await page.getByLabel("Autor *").fill(`${seed.runId}-Autor-Editado`);
    await page.getByLabel("Categoría *").selectOption({ label: seed.secondaryCategory });
    await page.getByLabel("Año de publicación").fill("2023");
    await page.getByLabel("ISBN").fill(`${seed.runId}-ISBN-EDIT`);
    await page.getByRole("button", { name: "Actualizar" }).click();

    await expect(page).toHaveURL(/\/books$/);
    await expect(page.locator("tbody tr").filter({ hasText: seed.initialBookTitle })).toHaveCount(0);

    const updatedRow = page.locator("tbody tr").filter({ hasText: seed.updatedBookTitle });
    await expect(updatedRow).toContainText(`${seed.runId}-Autor-Editado`);
    await expect(updatedRow).toContainText(seed.secondaryCategory);
    await expect(updatedRow).toContainText("2023");
    await expect(updatedRow).toContainText(`${seed.runId}-ISBN-EDIT`);
  });

  test("elimina un libro del listado tras confirmar el dialogo", async ({ page, seed }) => {
    await page.goto("/books");

    page.once("dialog", async (dialog) => {
      expect(dialog.message()).toContain("¿Estás seguro que deseas eliminar este libro?");
      await dialog.accept();
    });

    const row = page.locator("tbody tr").filter({ hasText: seed.initialBookTitle });
    await row.getByRole("button", { name: "Eliminar" }).click();

    await expect(page.locator("tbody tr").filter({ hasText: seed.initialBookTitle })).toHaveCount(0);
  });

  test("bloquea el envio si el año rebasa el maximo permitido", async ({ page, seed }) => {
    const invalidBookTitle = `${seed.runId}-Libro-Invalido`;
    const nextYear = (new Date().getFullYear() + 1).toString();

    await page.goto("/books/new");
    await page.getByLabel("Título *").fill(invalidBookTitle);
    await page.getByLabel("Autor *").fill(`${seed.runId}-Autor-Invalido`);
    await page.getByLabel("Categoría *").selectOption({ label: seed.primaryCategory });
    await page.getByLabel("Año de publicación").fill(nextYear);
    await page.getByRole("button", { name: "Crear Libro" }).click();

    await expect(page).toHaveURL(/\/books\/new$/);

    const hasOverflow = await page.getByLabel("Año de publicación").evaluate((element) => {
      return (element as HTMLInputElement).validity.rangeOverflow;
    });

    expect(hasOverflow).toBe(true);

    await page.goto("/books");
    await expect(page.locator("tbody tr").filter({ hasText: invalidBookTitle })).toHaveCount(0);
  });
});

test.afterAll(async () => {
  await prisma.$disconnect();
});
