import {
    DateType, getDeltaByDates,
} from '@vanyamate/helpers/date/getDeltaByDates/getDeltaByDates';
import { useMemo } from 'react';
import {
    getStringDeltaByDates,
} from '@vanyamate/helpers/date/getStringDeltaByDates/getStringDeltaByDates';


export const useDeltaDate = function (target: DateType, current: DateType = Date.now()) {
    return useMemo(() => getStringDeltaByDates(getDeltaByDates(target, current)), [ target, current ]);
};