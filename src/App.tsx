import { Product } from '@/modules/api/product/product-service.types.ts';
import {
    IProductsService,
} from '@/modules/api/products/products-service.interface.ts';
import {
    LocalProductsService,
} from '@/modules/api/products/services/local-products-service.ts';
import {
    ProductsBackend,
} from '@/modules/local-backend/products/products-backend.ts';
import { useEffect, useMemo, useState } from 'react';
import { Category } from '@/modules/api/category/category-service.types.ts';
import {
    ICategoriesService,
} from '@/modules/api/categories/categories-service.interface.ts';
import { LocalCategoryService } from '@/modules/api/category/services/local-category-service.ts';
import {
    LocalCategoriesService,
} from '@/modules/api/categories/services/local-categories-service.ts';
import {
    CategoriesBackend,
} from '@/modules/local-backend/categories/categories-backend.ts';


const App = () => {
    const [ products, setProducts ]                     = useState<Product[]>([]);
    const [ categories, setCategories ]                 = useState<Category[]>([]);
    const productsService: IProductsService<Product>    = useMemo(() => new LocalProductsService(new ProductsBackend()), []);
    const categoryService: ICategoriesService<Category> = useMemo(() => new LocalCategoriesService(new CategoriesBackend()), []);
    useEffect(() => {
        productsService
            .findMany((product) => product.calories > 900, {
                limit: 20,
                sort : [ 'calories', 'asc' ],
            })
            .then((response) => {
                setProducts(response.list);
            });

        categoryService
            .findMany({}, { limit: 100 })
            .then((response) => setCategories(response.list));
    }, []);

    return (
        <div>
            <h2>[categories]</h2>
            {
                categories.map((category) => (
                    <div key={ category.title }>
                        category: <b>{ category.title }</b>
                    </div>
                ))
            }
            <hr/>
            <h2>[products]</h2>
            {
                products.map((product) => (
                    <div key={ product.barcode }>
                        <p>{ product.product_name }</p>
                        <p>id: { product.barcode }</p>
                        <p>category: <b>{ product.category }</b></p>
                        <hr/>
                    </div>
                ))
            }
        </div>
    );
};

export default App;