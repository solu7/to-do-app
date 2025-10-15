import "./FilterCard.css";

function FilterCard({ filterName, filterIcon, onFilterClick }) {
  return (
    <div className="filter-card" onClick={onFilterClick}>
      <p>{filterName}</p>
      <img
        className="filter-card__icon"
        src={filterIcon}
        alt={`Icono de ${filterName}`}
      />
    </div>
  );
}
export default FilterCard;
