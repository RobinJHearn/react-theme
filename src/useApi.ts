import { useQuery } from "@tanstack/react-query";
import ky from "ky";

export function useApi() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["MyQueryKey"],
    queryFn: async () => {
      const response = await ky.get("/api/v1/rest");
      console.log(response);
      return response.json();
    },
  });
  if (!isPending && !isError) {
    console.log(data);
  }

  if (isError) {
    console.log("Error - ", error);
  }

  return { isPending, isError, data, error };
}
