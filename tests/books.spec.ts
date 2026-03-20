import { expect, test } from "@playwright/test";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categoryFlow = {
  firstName: "Ciencia Ficcion",
  firstDescription:
    "Obras ambientadas en futuros posibles, viajes espaciales y avances cientificos.",
  updatedName: "Novela Historica",
  updatedDescription:
    "Relatos de ficcion inspirados en procesos, epocas y personajes historicos.",
  finalName: "Literatura Latinoamericana",
  finalDescription:
    "Narrativa y ensayo de autores latinoamericanos de distintas generaciones.",
};

const bookFlow = {
  firstTitle: "Dune",
  firstAuthor: "Frank Herbert",
  firstYear: "1965",
  firstIsbn: "9780441172719",
  updatedTitle: "La sombra del viento",
  updatedAuthor: "Carlos Ruiz Zafon",
  updatedYear: "2001",
  updatedIsbn: "9788408172178",
  finalTitle: "Cien anos de soledad",
  finalAuthor: "Gabriel Garcia Marquez",
  finalYear: "1967",
  finalIsbn: "9780307474728",
};

test.describe.serial("Demo paso por paso", () => {
  test.beforeAll(async () => {
    await prisma.book.deleteMany();
    await prisma.category.deleteMany();
  });

  test("paso 1: la base inicia vacia", async ({ page }) => {
    await page.goto("/categories");
    await expect(page.getByText("Sin categorías registradas")).toBeVisible();

    await page.goto("/books");
    await expect(page.getByText("Sin libros registrados")).toBeVisible();

    await expect
      .poll(async () => {
        const [categories, books] = await Promise.all([
          prisma.category.count(),
          prisma.book.count(),
        ]);

        return { categories, books };
      })
      .toEqual({ categories: 0, books: 0 });
  });

  test("paso 2: crear una categoria", async ({ page }) => {
    await page.goto("/categories");
    await page.getByRole("link", { name: "+ Nueva Categoría" }).click();

    await page.getByLabel("Nombre *").fill(categoryFlow.firstName);
    await page.getByLabel("Descripción").fill(categoryFlow.firstDescription);
    await page.getByRole("button", { name: "Crear Categoría" }).click();

    await expect(page).toHaveURL(/\/categories$/);
    await expect
      .poll(async () => {
        return prisma.category.count({
          where: { name: categoryFlow.firstName },
        });
      })
      .toBe(1);

    const row = page.locator("tbody tr").filter({
      hasText: categoryFlow.firstName,
    });
    await expect(row).toContainText(categoryFlow.firstDescription);
  });

  test("paso 3: mostrar que la categoria aparece al crear un libro", async ({
    page,
  }) => {
    await page.goto("/books/new");

    const categorySelect = page.getByLabel("Categoría *");
    await expect(categorySelect).toContainText(categoryFlow.firstName);
  });

  test("paso 4: editar la categoria y ver el cambio reflejado", async ({
    page,
  }) => {
    await page.goto("/categories");

    const row = page.locator("tbody tr").filter({
      hasText: categoryFlow.firstName,
    });

    await row.getByRole("link", { name: "Editar" }).click();
    await page.getByLabel("Nombre *").fill(categoryFlow.updatedName);
    await page.getByLabel("Descripción").fill(categoryFlow.updatedDescription);
    await page.getByRole("button", { name: "Actualizar" }).click();

    await expect(page).toHaveURL(/\/categories$/);
    await expect
      .poll(async () => {
        return prisma.category.count({
          where: { name: categoryFlow.updatedName },
        });
      })
      .toBe(1);

    const updatedRow = page.locator("tbody tr").filter({
      hasText: categoryFlow.updatedName,
    });
    await expect(updatedRow).toContainText(categoryFlow.updatedDescription);

    await page.goto("/books/new");
    const categorySelect = page.getByLabel("Categoría *");
    await expect(categorySelect).toContainText(categoryFlow.updatedName);
    await expect(categorySelect).not.toContainText(categoryFlow.firstName);
  });

  test("paso 5: eliminar la categoria editada", async ({ page }) => {
    await page.goto("/categories");

    const row = page.locator("tbody tr").filter({
      hasText: categoryFlow.updatedName,
    });

    page.once("dialog", async (dialog) => {
      expect(dialog.message()).toContain(
        "¿Estás seguro que deseas eliminar esta categoría?"
      );
      await dialog.accept();
    });

    await row.getByRole("button", { name: "Eliminar" }).click();

    await expect
      .poll(async () => {
        return prisma.category.count({
          where: { name: categoryFlow.updatedName },
        });
      })
      .toBe(0);

    await page.reload();
    await expect(page.getByText("Sin categorías registradas")).toBeVisible();
  });

  test("paso 6: crear la categoria final para asociarla a libros", async ({
    page,
  }) => {
    await page.goto("/categories/new");

    await page.getByLabel("Nombre *").fill(categoryFlow.finalName);
    await page.getByLabel("Descripción").fill(categoryFlow.finalDescription);
    await page.getByRole("button", { name: "Crear Categoría" }).click();

    await expect(page).toHaveURL(/\/categories$/);
    await expect
      .poll(async () => {
        return prisma.category.count({
          where: { name: categoryFlow.finalName },
        });
      })
      .toBe(1);

    const row = page.locator("tbody tr").filter({
      hasText: categoryFlow.finalName,
    });
    await expect(row).toContainText(categoryFlow.finalDescription);
  });

  test("paso 7: crear un libro usando la categoria final", async ({ page }) => {
    await page.goto("/books/new");

    await page.getByLabel("Título *").fill(bookFlow.firstTitle);
    await page.getByLabel("Autor *").fill(bookFlow.firstAuthor);
    await page
      .getByLabel("Categoría *")
      .selectOption({ label: categoryFlow.finalName });
    await page.getByLabel("Año de publicación").fill(bookFlow.firstYear);
    await page.getByLabel("ISBN").fill(bookFlow.firstIsbn);
    await page.getByRole("button", { name: "Crear Libro" }).click();

    await expect(page).toHaveURL(/\/books$/);
    await expect
      .poll(async () => {
        return prisma.book.count({
          where: { title: bookFlow.firstTitle },
        });
      })
      .toBe(1);

    const row = page.locator("tbody tr").filter({
      hasText: bookFlow.firstTitle,
    });
    await expect(row).toContainText(bookFlow.firstAuthor);
    await expect(row).toContainText(categoryFlow.finalName);
    await expect(row).toContainText(bookFlow.firstYear);
    await expect(row).toContainText(bookFlow.firstIsbn);
  });

  test("paso 8: editar el libro y mantener su asociacion con la categoria", async ({
    page,
  }) => {
    const finalCategory = await prisma.category.findFirst({
      where: { name: categoryFlow.finalName },
    });

    expect(finalCategory).not.toBeNull();

    await page.goto("/books");

    const row = page.locator("tbody tr").filter({
      hasText: bookFlow.firstTitle,
    });

    await row.getByRole("link", { name: "Editar" }).click();
    await page.getByLabel("Título *").fill(bookFlow.updatedTitle);
    await page.getByLabel("Autor *").fill(bookFlow.updatedAuthor);
    await page
      .getByLabel("Categoría *")
      .selectOption({ value: String(finalCategory!.id) });
    await page.getByLabel("Año de publicación").fill(bookFlow.updatedYear);
    await page.getByLabel("ISBN").fill(bookFlow.updatedIsbn);
    await page.getByRole("button", { name: "Actualizar" }).click();

    await expect(page).toHaveURL(/\/books$/);
    await expect
      .poll(async () => {
        return prisma.book.count({
          where: { title: bookFlow.updatedTitle },
        });
      })
      .toBe(1);

    const updatedRow = page.locator("tbody tr").filter({
      hasText: bookFlow.updatedTitle,
    });
    await expect(updatedRow).toContainText(bookFlow.updatedAuthor);
    await expect(updatedRow).toContainText(categoryFlow.finalName);
    await expect(updatedRow).toContainText(bookFlow.updatedYear);
    await expect(updatedRow).toContainText(bookFlow.updatedIsbn);
  });

  test("paso 9: eliminar el libro editado", async ({ page }) => {
    await page.goto("/books");

    const row = page.locator("tbody tr").filter({
      hasText: bookFlow.updatedTitle,
    });

    page.once("dialog", async (dialog) => {
      expect(dialog.message()).toContain(
        "¿Estás seguro que deseas eliminar este libro?"
      );
      await dialog.accept();
    });

    await row.getByRole("button", { name: "Eliminar" }).click();

    await expect
      .poll(async () => {
        return prisma.book.count({
          where: { title: bookFlow.updatedTitle },
        });
      })
      .toBe(0);

    await page.reload();
    await expect(page.getByText("Sin libros registrados")).toBeVisible();
  });

  test("paso 10: crear el libro final y dejarlo guardado", async ({ page }) => {
    const finalCategory = await prisma.category.findFirst({
      where: { name: categoryFlow.finalName },
    });

    expect(finalCategory).not.toBeNull();

    await page.goto("/books/new");

    await page.getByLabel("Título *").fill(bookFlow.finalTitle);
    await page.getByLabel("Autor *").fill(bookFlow.finalAuthor);
    await page
      .getByLabel("Categoría *")
      .selectOption({ value: String(finalCategory!.id) });
    await page.getByLabel("Año de publicación").fill(bookFlow.finalYear);
    await page.getByLabel("ISBN").fill(bookFlow.finalIsbn);
    await page.getByRole("button", { name: "Crear Libro" }).click();

    await expect(page).toHaveURL(/\/books$/);
    await expect
      .poll(async () => {
        return prisma.book.count({
          where: { title: bookFlow.finalTitle },
        });
      })
      .toBe(1);

    const row = page.locator("tbody tr").filter({
      hasText: bookFlow.finalTitle,
    });
    await expect(row).toContainText(bookFlow.finalAuthor);
    await expect(row).toContainText(categoryFlow.finalName);
    await expect(row).toContainText(bookFlow.finalYear);
    await expect(row).toContainText(bookFlow.finalIsbn);
  });
});

test.afterAll(async () => {
  await prisma.$disconnect();
});
