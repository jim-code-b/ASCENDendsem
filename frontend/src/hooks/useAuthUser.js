import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";

const useAuthUser = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
    refetchOnWindowFocus: false,
  });

  // If there's an error or no data, return null user
  const authUser = error ? null : data?.user;

  return { 
    isLoading, 
    authUser,
    error 
  };
};

export default useAuthUser;