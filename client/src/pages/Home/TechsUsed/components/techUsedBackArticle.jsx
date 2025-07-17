import "../assets/styles/techsUsedArticle.css";

const TechsUsedBackArticle = ({ icon, name }) => {
  return (
    <div className="tech-used">
      <img className="tech-used-icon" src={icon} alt={name} />
      <p>{name}</p>
    </div>
  );
};

export default TechsUsedBackArticle;