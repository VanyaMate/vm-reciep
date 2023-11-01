export interface IMapper<From, To> {
    convert (data: From): To;
}