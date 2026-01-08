import { CV_FILENAME, CV_URL } from "../../constants/assets";
import downloadIcon from "../../../core/assets/icons/download.png";
import "./DownloadCV.css";

function DownloadCV({ children = "Descargar CV" }) {
  return (
    <a
      href={CV_URL}
      download={CV_FILENAME}
      target="_blank"
      rel="noopener noreferrer"
      className="download-cv"
    >
      <p className="download-cv__btn">{children}</p>
      <img
        className="download-cv__icon"
        src={downloadIcon}
        alt="Download Icon"
      />
    </a>
  );
}
export default DownloadCV;
