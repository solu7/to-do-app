import "./HomePage.css";
import Navbar from "../../layout/NavBar/Navbar.jsx";
import { useExternalNavigation } from "../../core/hooks/useExternalNavigation.js";
import itemFondo from "../../core/assets/images/itemFondoApp.png";
import FeaturesSection from "./Features/FeaturesSection.jsx";
import TechUsedSection from "./TechsUsed/TechsUsedSection.jsx";
import LearnedSection from "./Learned/LearnedSection.jsx";
import Footer from "../../layout/Footer/Footer.jsx";

function HomePage() {
  const { goToGitHubProject } = useExternalNavigation();
  return (
    <div className="home-page">
      <Navbar />
      <div className="home-page__header">
        <div className="home-page__header-text">
          <h1>
            <span className="highlight">To-Do</span> App
          </h1>
          <p className="home-page__description">
            Este es un proyecto full-stack construido con React, Node.js,
            Express y MySQL, pensada para gestionar tus tareas. Más allá de la
            funcionalidad, el foco estuvo en la calidad del código, buscando
            implementar buenas prácticas, estructura de carpetas y medidas de
            seguridad para un resultado confiable y escalable.
          </p>
          <button className="btn goGitHubProject" onClick={goToGitHubProject}>
            Codigo en GitHub
          </button>
        </div>
        <img className="home-page__bgItem" src={itemFondo} alt="" />
      </div>
      <FeaturesSection />
      <hr />
      <TechUsedSection />
      <hr />
      <LearnedSection />
      <hr />
      <Footer />
    </div>
  );
}

export default HomePage;
