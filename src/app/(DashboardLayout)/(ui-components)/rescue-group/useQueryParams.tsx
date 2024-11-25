import { useEffect, useState } from "react";

export const useQueryParams = () => {
  const [queryParams, setQueryParams] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      const id = params.get("id");
      setQueryParams({ token, id });
    }
  }, []);

  return queryParams;
};
