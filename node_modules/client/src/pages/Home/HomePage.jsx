import "./HomePage.css";
import Navbar from "../../layout/NavBar/Navbar.jsx";
import { useExternalNavigation } from "../../hooks/useExternalNavigation.js";
import homeImage from "../../assets/images/home-principal.avif";
import FeaturesSection from "./Features/FeaturesSection.jsx";
import TechUsedSection from "./TechsUsed/TechsUsedSection.jsx";
import Footer from "../../layout/Footer/Footer.jsx";

function HomePage() {
  const { goToGitHubProject } = useExternalNavigation();
  return (
    <div className="home-page">
      <Navbar/>
      <div className="home-page-header">
        <div className="home-page-header-text">
          <h1>
            <span className="highlight">To-Do</span> App
          </h1>
          <p className="home-page-description">
            Este es un proyecto full-stack construido con React, Node.js,
            Express y MySQL, pensada para gestionar tus tareas. Más allá de la
            funcionalidad, el foco estuvo en la calidad del código, buscando
            implementar buenas prácticas, estructura de carpetas .medidas de
            seguridad para un resultado confiable y escalable.
          </p>
          <button className="btn goGitHubProject" onClick={goToGitHubProject}>
            Codigo en GitHub
          </button>
        </div>
        <img className="home-page-image" src={homeImage} alt="" />
      </div>
      <div className="imageExample"></div>
      <FeaturesSection />
      <hr />
      <TechUsedSection />
      <hr />
      <Footer />
    </div>
  );
}

export default HomePage;
