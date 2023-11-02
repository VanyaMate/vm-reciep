export interface ICategoryService<CategoryType, CreateCategoryType, UpdateCategoryType> {
    create (data: CreateCategoryType): Promise<CategoryType>;

    update (id: string, data: UpdateCategoryType): Promise<CategoryType>;

    delete (id: string): Promise<boolean>;

    read (id: string): Promise<CategoryType | null>;
}