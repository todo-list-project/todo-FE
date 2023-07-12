import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_HEADER, ROOT_API } from "constants/api";
import { useSelector } from "react-redux";

export function useDummyData() {
  const auth = useSelector((state) => state.authToken);
  // console.log(auth);

  const infinityQueryService = axios.create({
    baseURL: `${ROOT_API}`,
    headers: { API_HEADER, atk: auth.accessToken },
  });

  return useInfiniteQuery(
    ["todos"],
    async ({ pageParam = 0 }) => {
      const { data } = await infinityQueryService.get(`/posts?page=${pageParam}&size=20`);
      // console.log('응답하는 data', data);
      //다음페이지 데이터가 20보다 적으면 마지막 페이지이기때문에 undefined처리
      if (data.length < 20) return { result: data, nextpage: undefined };
      //아니면 pageParam에 1페이지 증가시켜 반환
      return {
        result: data,
        nextpage: pageParam + 1,
      };
    },
    //옵션으로 5초마다 새로고침 / 다음페이지 데이터반환
    {
      staleTime: 5000, //5초
      // cacheTime: 5000, //제한없음
      // refetchInterval: 10000,
      enabled: auth.accessToken !== null,
      // refetchIntervalInBackground: true,
      getNextPageParam: (lastPage) => {
        if (lastPage.result.length < 20) {
          return null;
        }

        return lastPage.nextpage;
      },
    }
  );
}
