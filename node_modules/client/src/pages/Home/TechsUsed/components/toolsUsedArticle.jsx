import "../assets/styles/toolsUsedArticle.css";

const ToolsUsedArticle = ({ icon, name }) => {
  return (
    <div className="tool-used">
      <img className="tool-used-icon" src={icon} alt={name} />
      <p>{name}</p>
    </div>
  );
};

export default ToolsUsedArticle;