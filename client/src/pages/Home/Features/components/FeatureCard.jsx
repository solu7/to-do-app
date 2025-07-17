import "../assets/styles/FeatureCard.css";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="feature-card">
      <img className="feature-card-icon" src={icon} alt={title} />
      <h3 className="feature-card-title">{title}</h3>
      <p className="feature-card-description">{description}</p>
    </div>
  );
};

export default FeatureCard;
