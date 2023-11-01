export type Product = {
    images: any[]
    available: boolean
    product_name: string
    brand_name: string
    brand: string
    category: string
    price: number
    quantity: number
    description: string
    weight: number
    expiration_date: string
    manufacturer: string
    country_of_origin: string
    barcode: number
    nutritional_facts: string
    allergens: string
    ingredients: string
    net_weight: number
    serving_size: number
    calories: number
    fat: number
    carbohydrates: number
    protein: number
    sugar: number
    fiber: number
    vitamin_a: number
    vitamin_c: number
    calcium: number
    iron: number
    image_url: string
    reviews: number
    rating: number
};

export type CreateProductDto = Pick<Product, 'barcode' | 'product_name'>;
export type UpdateProductDto = Partial<Product>;