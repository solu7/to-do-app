import "./FilterCard.css";
import closeIcon from "../../../assets/images/close.png";

function FilterCard({ filterName, filterIcon, onFilterClick, onRemoveClick }) {
  return (
    <div
      className="filter-card item-to-remove"
      onClick={(e) => {
        e.stopPropagation();
        onFilterClick;
      }}
    >
      <div className="filter-card__header">
        <p>{filterName}</p>
        <img
          className="filter-card__icon"
          src={filterIcon}
          alt={`Icono de ${filterName}`}
        />
      </div>
      {onRemoveClick && (
        <img
          className="remove-button"
          src={closeIcon}
          alt="Icono de cerrar"
          onClick={onRemoveClick}
        />
      )}
    </div>
  );
}
export default FilterCard;
