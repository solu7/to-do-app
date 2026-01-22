import "./LearnedSection.css";

function LearnedSection() {
  return (
    <div className="learned">
      <h2 className="section-title learned__title">
        ¿Que aprendi con el <span>desarrollo de esta app</span>?
      </h2>
      <div className="learned__list">
        <ul>
          <li>Manejar estados globales con Context API</li>
          <li>
            Cómo funcionan los tokens JWT y por qué usar cookies para proteger
            la información del usuario.
          </li>
          <li>
            Crear middlewares para crear filtros de seguridad automáticos antes
            de procesar la solicitud.
          </li>
          <li>
            Como implementar esquemas de validación para asegurar que los datos
            siempre lleguen como se necesiten.
          </li>
          <li>
            Que tener en cuenta al diseñar una base de datos relacional para
            conectar la información de forma lógica.
          </li>
        </ul>
        <ul>
          <li>
            Organizar y separar el código, en esta app hice un buen trabajo para
            que el proyecto no se me fuera de las manos y fuera mas fácil de
            mantener.
          </li>
          <li>
            Darle mas importancia a la experiencia del usuario, esto trate
            mejorarlo con colores, modales de aviso, animaciones, etc.
          </li>
          <li>
            Todo el proceso de llevar un desarrollo local a un entorno de
            producción real, configurando servidores y bases de datos en la
            nube.
          </li>
          <li>
            Me permitio familiarizarme mas con el testing que era un sector
            desconocido para mi.
          </li>
          <li>
            Manejar consultas SQL mas robustas y complicadas, para poder hacer
            peticiones mas eficientes
          </li>
        </ul>
      </div>
    </div>
  );
}
export default LearnedSection;
