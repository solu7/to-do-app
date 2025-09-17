import { useState } from "react";

export const useTaskItemRelations = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleAssignTag = (tag) => {
    setSelectedTags((prevTags) => {
      if (!prevTags.some((t) => t.id === tag.id)) {
        return [...prevTags, tag];
      }
      return prevTags;
    });
  };

  const handleRemoveTag = (tagId) => {
    setSelectedTags((prevTags) => prevTags.filter((t) => t.id !== tagId));
  };

  const handleAssignCategory = (category) => {
    setSelectedCategories((prevCategories) => {
      if (!prevCategories.some((c) => c.id === category.id)) {
        return [...prevCategories, category];
      }
      return prevCategories;
    });
  };

  const handleRemoveCategory = (categoryId) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.filter((c) => c.id !== categoryId)
    );
  };

  const resetRelations = () => {
    setSelectedTags([]);
    setSelectedCategories([]);
  };

  return {
    selectedTags,
    selectedCategories,
    handleAssignTag,
    handleRemoveTag,
    handleAssignCategory,
    handleRemoveCategory,
    resetRelations,
  };
};
