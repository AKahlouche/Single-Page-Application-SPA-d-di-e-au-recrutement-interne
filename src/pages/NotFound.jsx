import { Link } from "react-router-dom";
import "../styles/pages.css";

export default function NotFound() {
  return (
    <section className="page">
      <h1 className="page__title">404</h1>
      <div className="panel">
        Oups, cette page n’existe pas.
        <div style={{ marginTop: 12 }}>
          <Link to="/" className="linkBtn">Retour à l’accueil</Link>
        </div>
      </div>
    </section>
  );
}