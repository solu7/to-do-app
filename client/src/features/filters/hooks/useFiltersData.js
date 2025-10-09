import { useState, useEffect } from "react";
import { getAllTags } from "../tags/services/tagsServices";
import { getAllCategories } from "../categories/services/categoriesServices";

export const useFiltersData = () => {
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tagsData, categoriesData] = await Promise.all([
          getAllTags(),
          getAllCategories(),
        ]);

        setTags(tagsData);
        setCategories(categoriesData);
        setError(null);
      } catch (err) {
        setError("Error al cargar los filtros. Por favor, inténtalo de nuevo.");
        console.error("Filtros error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { tags, categories, isLoading, error };
};
