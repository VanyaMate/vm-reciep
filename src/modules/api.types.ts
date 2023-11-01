export type Filter<DataType> =
    ((data: DataType) => boolean) | (Partial<DataType>);
export type Options<DataType> = {
    offset?: number;
    limit?: number;
    sort?: [ keyof DataType, 'asc' | 'desc' ] | [];
}
export type MultiplyResponse<DataType> = {
    options: Options<DataType>;
    count: number;
    list: DataType[];
}