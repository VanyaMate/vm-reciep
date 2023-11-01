import { Cart, CreateCartDto } from '@/modules/local-backend/cart/cart-backend.types.ts';
import { IDataGenerator } from '@vanyamate/market-place-service';


export class CartBackendDataGenerator implements IDataGenerator<Cart, CreateCartDto> {
    private readonly _clearData: Cart = {
        userId: '',
        items : [],
    };

    public byData (data: CreateCartDto): Cart {
        return {
            ...this._clearData,
            ...data,
        };
    }

    public clear (): Cart {
        return { ...this._clearData };
    }

    public filled (data: CreateCartDto | undefined): Cart {
        return {
            userId: this.userId(),
            items : this.items(),
            ...data,
        };
    }

    public items (): Cart['items'] {
        return [];
    }

    public userId (): Cart['userId'] {
        return '';
    }

}