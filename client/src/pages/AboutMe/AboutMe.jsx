import "./AboutMe.css";
import Navbar from "../../layout/NavBar/Navbar.jsx";
import quotesIcon from "./assets/images/comillas.png";
import frontendIcon from "./assets/images/frontend.png";
import backendIcon from "./assets/images/backend.png";
import dbIcon from "./assets/images/database.png";
import phoneIcon from "./assets/images/phone.png";
import emailIcon from "./assets/images/email.png";
import decorationImg from "./assets/images/decoration.png";
function AboutMe() {
  return (
    <div className="about-me">
      <Navbar />
      <section className="about-me__introduction">
        <h4 className="about-me__heading">
          {" --- { "} ¡ Hola ! {" } "}
        </h4>
        <h2 className="section-title about-me__heading-title">
          Soy <span>Agustin Salva</span>
        </h2>
        <p className="about-me__subtitle">
          Desarrollador Full-Stack (22 años) de Argentina.
        </p>
      </section>
      <div className="about-me__content-wrapper">
        <section className="about-me__column-main">
          <section className="about-me__more-info">
            <img
              className="about-me__paragraph-quotes"
              src={quotesIcon}
              alt="comillas"
            />
            <p className="about-me__paragraph">
              Desde Enero de 2024, me he dedicado al aprendizaje autodidacta del
              desarrollo Full-Stack, dominando la pila PERN (PostgreSQL,
              Express, React y Node.js).
            </p>
            <p className="about-me__paragraph">
              Mi mayor enfoque es la arquitectura y la escalabilidad, buscando
              siempre un código limpio y mantenible. Buscando hacer un buen
              trabajo de control de versiones (Git) y usar buenas prácticas de
              desarrollo.
            </p>
          </section>
          <p className="about-me__call-to-action">
            Actualmente <span>busco mi primera experiencia laboral</span>. Estoy
            disponible para aplicar mis conocimientos de programación en un
            equipo de desarrollo profesional.
          </p>
        </section>
        <section className="about-me__column-meta">
          <section className="about-me__techs-learned-container">
            <div className="about-me__techs-learned about-me__techs-learned--frontend">
              <p className="about-me__tech">React</p>
              <img
                className="about-me__tech-icon about-me__tech-icon--front"
                src={frontendIcon}
                alt="Frontend Logo"
              />
              <p className="about-me__tech--dark">JavaScript</p>
            </div>
            <div className="about-me__techs-learned about-me__techs-learned--backend">
              <img
                className="about-me__tech-icon about-me__tech-icon--back"
                src={backendIcon}
                alt="Backend Logo"
              />
              <p className="about-me__tech--dark">Express.js</p>
              <p className="about-me__tech">Node.js</p>
            </div>
            <div className="about-me__techs-learned about-me__techs-learned--db">
              <p className="about-me__tech">MySql</p>
              <p className="about-me__tech--dark">PostgreSql</p>
              <img
                className="about-me__tech-icon about-me__tech-icon--db"
                src={dbIcon}
                alt="Database Logo"
              />
            </div>
          </section>
          <section className="about-me__contact">
            <div className="about-me__email-contact">
              <img
                className="about-me__contact-icon"
                src={emailIcon}
                alt="Icono de email"
              />
              <p className="about-me__email-adress">salvaagustin03@gmail.com</p>
            </div>
            <div className="about-me__phone-contact">
              <img
                className="about-me__contact-icon"
                src={phoneIcon}
                alt="Icono de celular"
              />
              <p className="about-me__phone-number">+54 387 6 136 086</p>
            </div>
          </section>
        </section>
        <img className="bg-deco" src={decorationImg} alt="Background Decoration" />
      </div>
    </div>
  );
}
export default AboutMe;
