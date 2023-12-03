export interface IBrandService<Brand, CreateBrandDto, UpdateBrandDto> {
    create (data: CreateBrandDto): Promise<Brand>;

    update (id: string, data: UpdateBrandDto): Promise<Brand>;

    delete (id: string): Promise<boolean>;

    read (id: string): Promise<Brand | null>;
}