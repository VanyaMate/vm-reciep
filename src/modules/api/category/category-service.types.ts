export type Category = {
    title: string;
    parent: string;
    subcategories: string[];
    description: string;
    image: string;
}

export type CreateCategoryDto = Pick<Category, 'title'>;
export type UpdateCategoryDto = Partial<Category>;