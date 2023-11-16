import React, { useState } from 'react';
import css from './ProductSlider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Mousewheel, Thumbs } from 'swiper/modules';
import { Swiper as SwiperClass } from 'swiper/types';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import AnimatedImageBox
    from '@/components/_ui/_container/AnimatedImageBox/AnimatedImageBox.tsx';
import { Image } from 'antd';


export type ProductSliderProps = {
    images: string[];
}

const ProductBigSlider: React.FC<ProductSliderProps> = (props) => {
    const { images }                    = props;
    const [ mainSwiper, setMainSwiper ] = useState<SwiperClass | null>(null);
    const [ visible, setVisible ]       = useState<boolean>(false);
    const [ src, setSrc ]               = useState<string>('');

    return (
        <div className={ css.container }>
            <Swiper
                direction={ 'vertical' }
                slidesPerView={ 1 }
                spaceBetween={ 10 }
                pagination={ {
                    clickable: true,
                } }
                thumbs={ {
                    swiper: mainSwiper && !mainSwiper.destroyed ? mainSwiper
                                                                : null,
                } }
                modules={ [ Mousewheel, Thumbs ] }
                className={ css.main }
                mousewheel={ true }
            >
                {
                    images.map((slide, index) => {
                        return <SwiperSlide
                            key={ index }
                            className={ css.slide }
                            onClick={ () => {
                                setSrc(slide);
                                setVisible(true);
                            } }
                        >
                            <AnimatedImageBox
                                src={ slide }
                                w={ 500 }
                                h={ 500 }
                                seconds={ 10 }
                            />
                        </SwiperSlide>;
                    })
                }
            </Swiper>
            <Swiper
                onSwiper={ setMainSwiper }
                direction={ 'vertical' }
                slidesPerView={ 'auto' }
                spaceBetween={ 5 }
                pagination={ {
                    clickable: true,
                } }
                grabCursor={ true }
                watchSlidesProgress={ true }
                modules={ [ Mousewheel, Pagination, Thumbs ] }
                className={ css.second }
                mousewheel={ true }
            >
                {
                    images.map((slide, index) => {
                        return <SwiperSlide key={ index }
                                            className={ css.second_slide }>
                            <AnimatedImageBox
                                src={ slide }
                                w={ 95 }
                                h={ 95 }
                                seconds={ 10 }
                            />
                        </SwiperSlide>;
                    })
                }
            </Swiper>
            <Image
                src={ src }
                style={ { display: 'none' } }
                preview={ {
                    visible,
                    onVisibleChange: (value) => setVisible(value),
                } }
            />
        </div>
    );
};

export default React.memo(ProductBigSlider);