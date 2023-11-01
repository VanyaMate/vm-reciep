import { Product } from '@/modules/api/product/product-service.types.ts';
import { IProductsService } from '@/modules/api/products/products-service.interface.ts';
import { LocalProductsService } from '@/modules/api/products/services/local-products-service.ts';
import { ProductsBackend } from '@/modules/local-backend/products/products-backend.ts';
import { useEffect, useMemo, useState } from 'react';


const App = () => {
    const [ products, setProducts ]                  = useState<Product[]>([]);
    const productsService: IProductsService<Product> = useMemo(() => new LocalProductsService(new ProductsBackend()), []);
    useEffect(() => {
        productsService
            .findMany((product) => product.calories > 900, {
                limit: 20,
                sort : [ 'calories', 'asc' ],
            })
            .then((response) => {
                setProducts(response.list);
            });
    }, []);

    return (
        <div>
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