export interface IMapper<From, To> {
    serialize (data: From): To;

    deserialize (data: To): From;
}