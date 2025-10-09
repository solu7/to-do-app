import "./FiltersView.css";
import tagIcon from "../../assets/images/SectionIcon/tagIcon.png";
import tagItemIcon from "../../assets/images/ItemIcon/tagItemIcon.png";
import categoriesIcon from "../../assets/images/SectionIcon/categoryIcon.png";
import categoryItemIcon from "../../assets/images/ItemIcon/categoryItemIcon.png";
import priotiesListIcon from "../../assets/images/SectionIcon/priorityIcon.png";
import { useFiltersData } from "../../../filters/hooks/useFiltersData";
import { TaskPrioritiesList } from "../../../filters/priorities/data/TaskPrioritiesList";
import FilterCard from "../../../filters/components/FilterCard/FilterCard";

function FiltersView() {
  const { tags, categories, isLoading, error } = useFiltersData();
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
  const prioritiesToShow = TaskPrioritiesList.slice(1);
  return (
    <div className="filters-section__container">
      <section className="filters-section__header">
        <h3 className="filters-section__header-title">
          Tus <span>filtros</span>
        </h3>
        <img
          className="filters__header-icon"
          src={tagIcon}
          alt="Icono de bandeja de entrada"
        />
      </section>
      <div className="filters-content__container">
        <section className="filters__content priorities">
          <div className="filters__content__header priorities">
            <h4>Prioridades</h4>
            <img src={priotiesListIcon} alt="Icono de prioridad" />
          </div>
          <section className="filters__content__list priorities">
            {prioritiesToShow.map((priority) => (
              <FilterCard
                key={priority.value}
                filterName={priority.name}
                filterIcon={priority.icon}
              />
            ))}
          </section>
        </section>
        <hr className="filter-card__hr" />
        <section className="filters__content categories">
          <div className="filters__content__header categories">
            <h4>Categorias ({categories.length})</h4>
            <img src={categoriesIcon} alt="Icono de categoria" />
          </div>
          <section className="filters__content__list categories">
            {categories.map((category) => (
              <FilterCard
                key={category.id}
                filterName={category.name}
                filterIcon={categoryItemIcon}
              />
            ))}
          </section>
        </section>
        <hr className="filter-card__hr" />
        <section className="filters__content tags">
          <div className="filters__content__header tags">
            <h4>Tags ({tags.length})</h4>
            <img src={tagIcon} alt="Icono de tags" />
          </div>
          <section className="filters__content__list tags">
            {tags.map((tag) => (
              <FilterCard
                key={tag.id}
                filterName={tag.name}
                filterIcon={tagItemIcon}
              />
            ))}
          </section>
        </section>
      </div>
    </div>
  );
}
export default FiltersView;
