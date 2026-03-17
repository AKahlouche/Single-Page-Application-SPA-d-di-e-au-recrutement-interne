import UserCard from "../components/UserCard";
import "../styles/pages.css";

export default function Team({ team, onRemove }) {
  return (
    <section className="page">
      <h1 className="page__title">Mon Équipe</h1>

      {team.length === 0 ? (
        <div className="panel">
          Ton équipe est vide. Va dans <b>Annuaire</b> pour recruter.
        </div>
      ) : (
        <div className="grid">
          {team.map((u) => (
            <UserCard
              key={u.id}
              user={u}
              variant="remove"
              onPrimary={() => onRemove(u.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}