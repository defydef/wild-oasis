import { useQuery } from "@tanstack/react-query";
import getCabins from "../../services/apiCabins";

function useCabins() {
  const {
    isLoading,
    data: cabins,
    error: retrieveCabinsError,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { isLoading, cabins, retrieveCabinsError };
}

export default useCabins;
