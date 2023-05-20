import axios from 'axios';
import { useInfiniteQuery } from 'react-query';

const infinityQueryService = axios.create({
    baseURL: 'http://localhost:5000',
});

export function useDummyData() {
    return useInfiniteQuery(
        'todos',
        async ({ pageParam = 1 }) => {
            const { data } = await infinityQueryService.get(`/todos?_page=${pageParam}&_limit=10`);
            console.log('api', data);
            if (data.length < 10) return { result: data, nextpage: undefined };

            return {
                result: data,
                nextpage: pageParam + 1,
            };
        },
        {
            staleTime: 5000, //5초
            cacheTime: Infinity, //제한없음
        },
        {
            getNextPageParam: (lastPage, pages) => {
                console.log('pages', pages);
                lastPage.nextpage ?? undefined;
            },
        }
    );
}
