import { useState } from "react";
import { createCategory } from "../categories/services/categoriesServices";
import { createTag } from "../tags/services/tagsServices";

export const useCreateFilter = (onSuccess) => {
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    placeholder: "",
    type: "",
  });

  const openModal = (type, e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const config =
      type === "category"
        ? { title: "nueva categoría", placeholder: "Ej: Trabajo...", type }
        : { title: "nuevo tag", placeholder: "Ej: Urgente...", type };

    setModalConfig({
      ...config,
      isOpen: true,
      position: {
        top: rect.top + window.scrollY - 10,
        left: rect.left + window.scrollX + rect.width / 2,
      },
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
