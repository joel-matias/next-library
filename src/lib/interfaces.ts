export interface Category {
    id: number;
    name: string;
    description?: string | null;
}

export interface Book {
    id: number;
    title: string;
    author: string;
    isbn?: string | null;
    year?: number | null;
    categoryId: number;
    category?: Category;
}
