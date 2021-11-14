/* eslint-disable @typescript-eslint/naming-convention */
import { API_URL } from "src/constants/API_URL";
import type { BroadcastLiveType } from "src/types";
import useSWR from "swr";
import fetch from "unfetch";

const fetchWithToken = (url: string, token: string) => {
	return fetch(url, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}).then((res) => res.json());
};

const initialData: BroadcastLiveType = {
	id: 0,
	title: "",
	status: "live",
	scheduleStartTime: new Date(),
	Trivia: [],
};

export const useGetEngiviaInfo = (url: string, token: string) => {
	const { data, error } = useSWR<BroadcastLiveType>([`${API_URL}${url}`, token], fetchWithToken, {
		fallbackData: initialData,
	});

	return {
		data,
		error,
		isLoading: !error && !data,
		isEmpty: data && data === undefined,
	};
};

// // ----------------------------------------

// export const useSharedState = <T extends any>(key: string, fallbackData?: T) => {
// 	const { data, mutate } = useSWR(key, { fallbackData });
// 	return [data, mutate] as [typeof fallbackData, KeyedMutator<typeof fallbackData>];
// };

// export const useCounter = (url: string) => {
// 	const [count, setCount] = useSharedState(url, 0);
// 	return { count, setCount };
// };
