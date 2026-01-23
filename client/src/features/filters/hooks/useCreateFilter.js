import { useState } from "react";
import { createCategory } from "../categories/services/categoriesServices";
import { createTag } from "../tags/services/tagsServices";

export const useCreateFilter = (onSuccess) => {
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    placeholder: "",
    type: "",
    anchorRect: null,
  });

  const openModal = (type) => {
    const config =
      type === "category"
        ? { title: "nueva categoría", placeholder: "Ej: Trabajo...", type }
        : { title: "nuevo tag", placeholder: "Ej: Urgente...", type };

    setModalConfig({
      ...config,
      isOpen: true,
    });
  };

  const closeModal = () =>
    setModalConfig((prev) => ({ ...prev, isOpen: false }));

  const handleCreate = async (name) => {
    try {
      if (modalConfig.type === "category") {
        await createCategory({ name });
      } else {
        await createTag({ name });
      }
      if (onSuccess) await onSuccess();
      closeModal();
    } catch (error) {
      console.error("Error al crear:", error.message);
    }
  };

  return { modalConfig, openModal, closeModal, handleCreate };
};
