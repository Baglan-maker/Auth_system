import useSWR from "swr";
import axios from "./axios";

const fetcher = (url: string) => axios.get(url, { withCredentials: false }).then((res) => res.data);

export const useUsers = () => {
  const { data, error } = useSWR(
    "https://675ca3b5fe09df667f6468f8.mockapi.io/users",
    fetcher
  );

  return {
    users: data,
    isLoading: !error && !data,
    isError: error,
  };
};
