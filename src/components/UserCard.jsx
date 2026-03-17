import "../styles/cards.css";

export default function UserCard({ user, variant, onPrimary, disabled }) {
  const company = user?.company?.name || "—";
  const email = user?.email || "—";
  const city = user?.address?.city || "—";

  const label =
    variant === "remove" ? "Retirer" : disabled ? "Déjà ajouté" : "Ajouter à l'équipe";

  return (
    <article className="card">
      <div className="card__top">
        <div className="avatar">{(user?.name || "?").slice(0, 1).toUpperCase()}</div>
        <div className="card__meta">
          <div className="card__name">{user?.name}</div>
          <div className="card__sub">{company}</div>
        </div>
      </div>

      <div className="card__info">
        <div><span className="k">Email:</span> {email}</div>
        <div><span className="k">Ville:</span> {city}</div>
      </div>

      <button className="card__btn" onClick={onPrimary} disabled={disabled && variant !== "remove"}>
        {label}
      </button>
    </article>
  );
}