import "./assets/styles/TechsUsedSection.css";

import { techsUsedFront } from "./assets/data/techsUsedFront";
import TechsUsedFrontArticle from "./components/techsUsedFrontArticle";

import { techsUsedBack } from "./assets/data/techsUsedBack";
import TechsUsedBackArticle from "./components/techUsedBackArticle";

import { toolsUsed } from "./assets/data/toolsUsed";
import ToolsUsedArticle from "./components/toolsUsedArticle";


function TechUsedSection() {
  return (
    <div className="tech-used-section">
      <h1 className="tech-used-section-title">
        <span>Tecnologias</span> usadas para el proyecto.
      </h1>
      <section className="tech-used-section-languages">
        <section className="tech-used-languages front">
          <p className="languages-used-title">Frontend</p>
          <section className="languages front">
            {techsUsedFront.map((item, idx) => (
              <TechsUsedFrontArticle key={idx} {...item} />
            ))}
          </section>
        </section>
        <section className="tech-used-languages back">
          <p className="languages-used-title">Backend</p>
          <section className="languages back">
            {techsUsedBack.map((item, idx) => (
              <TechsUsedBackArticle key={idx} {...item} />
            ))}
          </section>
        </section>
      </section>
      <section className="tech-used-section-tools">
        <p className="tech-used-section-tools-title">
          Herramientas y librerias.
        </p>
        <section className="tech-used-tools">
            {toolsUsed.map((item, idx) => (
              <ToolsUsedArticle key={idx} {...item} />
            ))}
        </section>
      </section>
    </div>
  );
}
export default TechUsedSection;
