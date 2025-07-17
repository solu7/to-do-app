import "./HomePage.css";
import { useExternalNavigation } from "../../hooks/useExternalNavigation";
import homeImage from "../../assets/images/home-principal.avif";
import FeaturesSection from "./Features/FeaturesSection";
import TechUsedSection from "./TechsUsed/TechsUsedSection";

function HomePage() {
  const { goToGitHubProject } = useExternalNavigation();
  return (
    <div className="home-page">
      <div className="home-page-header">
        <div className="home-page-header-text">
          <h1>
            <span className="highlight">To-Do</span> App
          </h1>
          <p className="home-page-description">
            Este proyecto es full-stack construida con React, Node.js, Express y
            MySQL, pensada para gestionar tus tareas. Más allá de la
            funcionalidad, el foco estuvo en la calidad del código, buscando
            implementar buenas prácticas, una estructura de carpetas lógica y
            mantenible, y algunas medidas de seguridad para un resultado
            confiable y escalable.
          </p>
          <button className="btn goGitHubProject" onClick={goToGitHubProject}>
            Codigo en GitHub
          </button>
        </div>
        <img className="home-page-image" src={homeImage} alt="" />
      </div>
      <div className="imageExample"></div>
      <FeaturesSection />
      <TechUsedSection />
    </div>
  );
}

export default HomePage;
