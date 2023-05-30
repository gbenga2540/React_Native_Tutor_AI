import { useRef, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
    QueryObserverResult,
    RefetchOptions,
    RefetchQueryFilters,
} from 'react-query';

const OnScreenFocus = (
    refetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
    ) => Promise<
        QueryObserverResult<
            {
                error: boolean;
                data: any;
            },
            unknown
        >
    >,
) => {
    const enabledRef = useRef(false);

    useFocusEffect(
        useCallback(() => {
            if (enabledRef.current) {
                refetch();
            } else {
                enabledRef.current = true;
            }
        }, [refetch]),
    );
};

export { OnScreenFocus };
