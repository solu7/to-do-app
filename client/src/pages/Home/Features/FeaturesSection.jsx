import "./assets/styles/FeaturesSection.css";
import FeatureCard from "./components/FeatureCard";
import { featureList } from "./assets/data/featureList";

const FeaturesSection = () => {
  return (
    <section className="features-container">
      <h2 className="features-title">¿Qué podés hacer con esta <span>app?</span></h2>
      <div className="features-list">
      {featureList.map((item, idx) => (
        <FeatureCard key={idx} {...item} />
      ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
