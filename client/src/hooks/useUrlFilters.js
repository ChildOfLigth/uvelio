import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export function useUrlFilters() {
  const [searchParams] = useSearchParams();

  return useMemo(() => {
    const filters = {};

    for (const [key, value] of searchParams.entries()) {
      if (!filters[key]) filters[key] = [];
      if (!filters[key].includes(value)) filters[key].push(value);
    };

    return filters;
  }, [searchParams]);
};