import { IDataGenerator } from '@vanyamate/market-place-service';
import { CreateReviewDto, Review } from '@/modules/api/review/review-service.types.ts';
import { getRandomInt, getRandomWords } from '@/helpers/random.ts';
import { productWordsLib } from '@/helpers/libs/product-words.lib.ts';


export class ReviewBackendDataGenerator implements IDataGenerator<Review, CreateReviewDto> {
    private readonly _clearData: Review = {
        id      : '',
        rating  : 0,
        title   : '',
        body    : '',
        date    : '',
        redacted: false,
        author  : 'root',
        target  : '',
    };

    author (): Review['author'] {
        return 'root';
    }

    body (): Review['body'] {
        return getRandomWords(productWordsLib, 20);
    }

    byData (data: CreateReviewDto): Review {
        return {
            ...this._clearData,
            ...data,
        };
    }

    clear (): Review {
        return { ...this._clearData };
    }

    date (): Review['date'] {
        return new Date().toDateString();
    }

    filled (data: CreateReviewDto | undefined): Review {
        return {
            id      : this.id(),
            rating  : this.rating(),
            title   : this.title(),
            body    : this.body(),
            date    : this.date(),
            redacted: this.redacted(),
            author  : this.author(),
            target  : this.target(),
            ...data,
        };
    }

    id (): Review['id'] {
        return getRandomInt(100000, 999999).toString();
    }

    rating (): Review['rating'] {
        return getRandomInt(0, 6);
    }

    redacted (): Review['redacted'] {
        return false;
    }

    target (): Review['target'] {
        return '';
    }

    title (): Review['title'] {
        return getRandomWords(productWordsLib, 3);
    }

}