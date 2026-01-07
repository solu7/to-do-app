import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useLocation } from "react-router-dom";
import {
  getAllTags,
  deleteTag,
} from "../features/filters/tags/services/tagsServices";
import {
  getAllCategories,
  deleteCategory,
} from "../features/filters/categories/services/categoriesServices";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  const activeFilter = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const priority = params.get("priority");
    const categoryId = params.get("categoryId");
    const tagId = params.get("tagId");
    const name = params.get("name");

    return {
      type: priority
        ? "priority"
        : categoryId
        ? "categoryId"
        : tagId
        ? "tagId"
        : null,
      value: priority || categoryId || tagId || null,
      name: name || "Filtro",
    };
  }, [location.search]);

  const refreshFilters = useCallback(async () => {
    try {
      const [tagsData, categoriesData] = await Promise.all([
        getAllTags(),
        getAllCategories(),
      ]);
      setTags(tagsData);
      setCategories(categoriesData);
    } catch (err) {
      console.error("Error refreshing filters:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshFilters();
  }, [refreshFilters]);

  const removeTag = async (id) => {
    await deleteTag(id);
    refreshFilters();
  };
  const removeCategory = async (id) => {
    await deleteCategory(id);
    refreshFilters();
  };

  return (
    <FilterContext.Provider
      value={{
        tags,
        categories,
        removeTag,
        removeCategory,
        isLoading,
        refreshFilters,
        activeFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => useContext(FilterContext);
