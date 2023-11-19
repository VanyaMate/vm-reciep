import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import css from './ProductsCarousel.module.scss';
import {
    Pagination,
    Navigation,
    Autoplay,
    HashNavigation, Thumbs,
} from 'swiper/modules';
import ProductCard from '@/components/_product/ProductCard/ProductCard.tsx';
import { Product } from '@/modules/api/product/product-service.types.ts';
import ProductCardSkeleton
    from '@/components/_product/ProductCard/ProductCardSkeleton/ProductCardSkeleton.tsx';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import Box from '@/components/_ui/_container/Box/Box.tsx';


export type ProductCarouselProps = {
    loading?: boolean;
    urlGenerator: (id: string) => string;
    products: Product[];
}

const ProductsCarousel: React.FC<ProductCarouselProps> = (props) => {
    const { loading, products, urlGenerator } = props;

    if (!loading && !products.length) {
        return '';
    }

    return (
        <Box className={ css.container }>
            <Swiper
                className={ css.swiper }
                slidesPerView={ 1 }
                autoplay={ {
                    delay               : 4000,
                    disableOnInteraction: true,
                    pauseOnMouseEnter   : true,
                } }
                loop={ true }
                spaceBetween={ 10 }
                pagination={ {
                    clickable: true,
                } }
                hashNavigation={ {
                    watchState: true,
                } }
                navigation={ true }
                allowTouchMove={ true }
                breakpoints={ {
                    640 : {
                        slidesPerView: 2,
                    },
                    868 : {
                        slidesPerView: 3,
                    },
                    1184: {
                        slidesPerView: 4,
                    },
                } }
                modules={ [ Pagination, Navigation, HashNavigation, Autoplay, Thumbs ] }
            >
                {
                    loading ? new Array(10).fill(null).map((_, index) =>
                        <SwiperSlide className={ css.slide } key={ index }>
                            <ProductCardSkeleton/>
                        </SwiperSlide>,
                    ) : products.map((product) =>
                        <SwiperSlide className={ css.slide }
                                     key={ product.barcode }>
                            <ProductCard
                                product={ product }
                                url={ urlGenerator(product.barcode.toString()) }
                            />
                        </SwiperSlide>,
                    )
                }
            </Swiper>
        </Box>
    );
};

export default ProductsCarousel;