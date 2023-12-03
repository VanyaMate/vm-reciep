export type CreateBrandDto = Pick<Brand, 'title' | 'admins'>;
export type UpdateBrandDto = Partial<Brand>;

export type Brand = {
    title: string;
    description: string;
    avatar: string;
    admins: string[];
    company: string;
}