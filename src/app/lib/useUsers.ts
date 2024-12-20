import useSWR from "swr";
import axios from "./axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;
const fetcher = (url: string) => axios.get(url, { withCredentials: false }).then((res) => res.data);

export const useUsers = () => {
  const { data, error } = useSWR(
    apiBaseUrl,
    fetcher
  );

  return {
    users: data,
    isLoading: !error && !data,
    isError: error,
  };
};
