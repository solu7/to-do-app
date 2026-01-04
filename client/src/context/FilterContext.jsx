import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
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

  const removeTag = async (tagId) => {
    await deleteTag(tagId);
    await refreshFilters();
  };

  const removeCategory = async (categoryId) => {
    await deleteCategory(categoryId);
    await refreshFilters();
  };

  useEffect(() => {
    refreshFilters();
  }, [refreshFilters]);

  return (
    <FilterContext.Provider
      value={{
        tags,
        categories,
        removeTag,
        removeCategory,
        isLoading,
        refreshFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => useContext(FilterContext);
