import { IMapper } from '@/helpers/mapper/mapper.interface.ts';
import { Product } from '@/modules/api/product/product-service.types.ts';
import { UrlSearchItems } from '@/hooks/search/useSearch.ts';


export class SearchItemsMapper implements IMapper<UrlSearchItems, string> {
    deserialize (data: string): UrlSearchItems {
        const savedItems: string[]     = data.split(';');
        const urlItems: UrlSearchItems = {};

        for (let i = 0; i < savedItems.length; i++) {
            const [ key, value ]: [ keyof Product, string ] = savedItems[i].split(':') as [ keyof Product, string ];
            if (value.match(new RegExp(/\[\d+\-\d+\]/, 'gi'))) {
                urlItems[key] = {
                    value: value,
                    type : 'range',
                };
            } else if (value[0] === '!') {
                urlItems[key] = {
                    value: value.slice(1, value.length),
                    type : 'equal',
                };
            } else {
                urlItems[key] = {
                    value: value,
                    type : 'match',
                };
            }
        }

        return urlItems;
    }

    serialize (data: UrlSearchItems): string {
        return Object.entries(data).map(([ key, item ]) => {
            if ((item.type === 'match') || (item.type === 'range')) {
                return `${ key }:${ item.value }`;
            } else {
                return `${ key }:!${ item.value }`;
            }
        }).join(';');
    }

}