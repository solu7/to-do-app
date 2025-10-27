import "./DropdownWrapper.css";

function DropdownWrapper( {buttonText, buttonIcon, onClick, value, ...props} ) {
  return (
    <div className="dropdown-button__wrapper" onClick={onClick}>
      <img
        className="dropdown-button__icon"
        src={buttonIcon}
        alt="Dropdown icon"
      />
      <button className="dropdown-button__button">{buttonText}</button>
    </div>
  );
}
export default DropdownWrapper;