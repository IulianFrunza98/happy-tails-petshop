import { useMemo } from "react";
import fuzzysort from "fuzzysort";

export function useFilteredProducts(products, search, category) {
  return useMemo(() => {
    let filtered = products;

    if (category !== "All") {
      filtered = filtered.filter((product) => product.category === category);
    }

    if (search.trim() !== "") {
      const results = fuzzysort.go(search, filtered, { key: "name" });
      return results.map((res) => res.obj);
    }

    return filtered;
  }, [products, search, category]);
}
