import "../styles/pages.css";

export default function Home({ loading, totalTalents }) {
  return (
    <section className="page">
      <h1 className="page__title">Dashboard</h1>

      {loading ? (
        <div className="panel">Chargement des statistiques...</div>
      ) : (
        <div className="panel">
          Il y a actuellement <b>{totalTalents}</b> talents disponibles pour vos projets.
        </div>
      )}
    </section>
  );
}