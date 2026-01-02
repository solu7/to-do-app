import "./FiltersView.css";
import { useState } from "react";
import tagIcon from "../../assets/images/SectionIcon/tagIcon.png";
import tagItemIcon from "../../assets/images/ItemIcon/tagItemIcon.png";
import categoriesIcon from "../../assets/images/SectionIcon/categoryIcon.png";
import categoryItemIcon from "../../assets/images/ItemIcon/categoryItemIcon.png";
import priotiesListIcon from "../../assets/images/SectionIcon/priorityIcon.png";
import { useFiltersData } from "../../../filters/hooks/useFiltersData";
import { TaskPrioritiesList } from "../../../filters/priorities/data/TaskPrioritiesList";
import FilterCard from "../../../filters/components/FilterCard/FilterCard";
import { useNavigation } from "../../../../core/hooks/useNavigation";
import CreateFilterModal from "../../../filters/components/CreateFilterModal/CreateFilterModal";
import { createCategory } from "../../../filters/categories/services/categoriesServices";
import { createTag } from "../../../filters/tags/services/tagsServices";

function FiltersView() {
  const { goToFilteredTasks } = useNavigation();
  const { tags, categories, isLoading, error, refreshFilters } =
    useFiltersData();

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    placeholder: "",
    type: "",
  });

  const openModal = (type) => {
    const config =
      type === "category"
        ? {
            title: "nueva categoría",
            placeholder: "Ej: Trabajo, Estudio...",
            type,
          }
        : { title: "nuevo tag", placeholder: "Ej: Urgente, Revisar...", type };

    setModalConfig({ ...config, isOpen: true });
  };

  const handleCreateFilter = async (name) => {
    try {
      if (modalConfig.type === "category") {
        await createCategory({ name });
      } else {
        await createTag({ name });
      }
      await refreshFilters();
    } catch (error) {
      console.error("Error al crear:", error.message);
    }
  };

  const handleFilterClick = (filterKey, filterValue, filterName) => {
    goToFilteredTasks(filterKey, filterValue, filterName);
  };
  const prioritiesToShow = TaskPrioritiesList.slice(1);
  if (isLoading) {
    return (
      <div className="filters-section__container">
        <p>Cargando filtros...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="filters-section__container">
        <p className="error-message">{error}</p>
      </div>
    );
  }
  return (
    <div className="task-view__container">
      <section className="task-view__header">
        <h3 className="task-view__header-title">
          Tus{" "}
          <span className="task-view__header-title--highlight">filtros</span>
        </h3>
        <img
          className="task-view__header-icon"
          src={tagIcon}
          alt="Icono de bandeja de entrada"
        />
      </section>
      <div className="filters-content__container">
        <section className="filter__content">
          <div className="filter__header-title">
            <h4>Prioridades</h4>
            <img src={priotiesListIcon} alt="Icono de prioridad" />
          </div>
          <section className="filters__content__list">
            {prioritiesToShow.map((priority) => (
              <FilterCard
                key={priority.value}
                filterName={priority.name}
                filterIcon={priority.icon}
                onFilterClick={() =>
                  handleFilterClick("priority", priority.value, priority.name)
                }
              />
            ))}
          </section>
        </section>
        <hr className="filter-card__hr" />
        <section className="filter__content">
          <header className="filters__content__header">
            <div className="filter__header-title">
              <h4>Categorias ({categories.length})</h4>
              <img src={categoriesIcon} alt="Icono de categoria" />
            </div>
            <button className="add-btn" onClick={() => openModal("category")}>
              +
            </button>
          </header>
          <section className="filters__content__list">
            {categories.map((category) => (
              <FilterCard
                key={category.id}
                filterName={category.name}
                filterIcon={categoryItemIcon}
                onFilterClick={() =>
                  handleFilterClick("categoryId", category.id, category.name)
                }
              />
            ))}
          </section>
        </section>
        <hr className="filter-card__hr" />
        <section className="filter__content">
          <header className="filters__content__header">
            <div className="filter__header-title">
              <h4>Tags ({tags.length})</h4>
              <img src={tagIcon} alt="Icono de tags" />
            </div>
            <button className="add-btn" onClick={() => openModal("tag")}>
              +
            </button>
          </header>
          <section className="filters__content__list">
            {tags.map((tag) => (
              <FilterCard
                key={tag.id}
                filterName={tag.name}
                filterIcon={tagItemIcon}
                onFilterClick={() =>
                  handleFilterClick("tagId", tag.id, tag.name)
                }
              />
            ))}
          </section>
        </section>
        <CreateFilterModal
          isOpen={modalConfig.isOpen}
          title={modalConfig.title}
          placeholder={modalConfig.placeholder}
          onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
          onSubmit={handleCreateFilter}
        />
      </div>
    </div>
  );
}
export default FiltersView;
