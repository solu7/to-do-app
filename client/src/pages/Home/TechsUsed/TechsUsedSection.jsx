import "./assets/styles/TechsUsedSection.css";

import { techsUsedFront } from "./assets/data/techsUsedFront";
import TechsUsedFrontArticle from "./components/techsUsedFrontArticle";

import { techsUsedBack } from "./assets/data/techsUsedBack";
import TechsUsedBackArticle from "./components/techUsedBackArticle";

import { toolsUsed } from "./assets/data/toolsUsed";
import ToolsUsedArticle from "./components/toolsUsedArticle";

function TechUsedSection() {
  return (
    <div className="techs-used">
      <h1 className="hp__section-title techs-used__container-title">
        <span>Tecnologias</span> usadas para el proyecto.
      </h1>
      <section className="techs-used__sections-wrapper">
        <div className="techs-used__section">
          <p className="techs-used__section-heading">Frontend</p>
          <section className="techs-used__list">
            {techsUsedFront.map((item, idx) => (
              <TechsUsedFrontArticle key={idx} {...item} />
            ))}
          </section>
        </div>
        <div className="techs-used__section">
          <p className="techs-used__section-heading">Backend</p>
          <section className="techs-used__list">
            {techsUsedBack.map((item, idx) => (
              <TechsUsedBackArticle key={idx} {...item} />
            ))}
          </section>
        </div>
        <section className="techs-used__section">
          <p className="techs-used__section-heading">
            Herramientas y librerias.
          </p>
          <section className="techs-used__list">
            {toolsUsed.map((item, idx) => (
              <ToolsUsedArticle key={idx} {...item} />
            ))}
          </section>
        </section>
      </section>
    </div>
  );
}
export default TechUsedSection;
