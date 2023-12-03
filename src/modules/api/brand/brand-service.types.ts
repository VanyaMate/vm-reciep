export type CreateBrandDto = Pick<Brand, 'title' | 'admins'>;
export type UpdateBrandDto = Partial<Omit<Brand, 'id'>>;

export type Brand = {
    title: string;
    description: string;
    avatar: string;
    admins: string[];
}