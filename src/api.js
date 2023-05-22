import axios from 'axios';
import { useInfiniteQuery } from 'react-query';

const infinityQueryService = axios.create({
    baseURL: 'http://localhost:5000',
});

export function useDummyData() {
    return useInfiniteQuery(
        'todos',
        async ({ pageParam = 1 }) => {
            const { data } = await infinityQueryService.get(`/todos?_page=${pageParam}&_limit=20`);
            //다음페이지 데이터가 20보다 적으면 마지막 페이지이기때문에 undefined처리
            if (data.length < 20) return { result: data, nextpage: undefined };
            //아니면 pageParam에 1페이지 증가시켜 반환
            return {
                result: data,
                nextpage: pageParam + 1,
            };
        },
        //옵션으로 5초마다 새로고침  다음페이지 데이터반환
        {
            staleTime: 5000, //5초
            cacheTime: Infinity, //제한없음
            getNextPageParam: (lastPage) => {
                if (lastPage.result.length < 20) {
                    return null;
                }

                return lastPage.nextpage;
            },
        }
    );
}
