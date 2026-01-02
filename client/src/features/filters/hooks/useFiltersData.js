import { useState, useEffect, useCallback } from "react";
import { getAllTags } from "../tags/services/tagsServices";
import { getAllCategories } from "../categories/services/categoriesServices";

export const useFiltersData = () => {
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshFilters = useCallback(async () => {
    try {
      const [tagsData, categoriesData] = await Promise.all([
        getAllTags(),
        getAllCategories(),
      ]);

      setTags(tagsData);
      setCategories(categoriesData);
      setError(null);
    } catch (err) {
      setError("Error al actualizar los filtros.");
      console.error("Filtros error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshFilters();
  }, [refreshFilters]);

  return { tags, categories, isLoading, error, refreshFilters };
};
