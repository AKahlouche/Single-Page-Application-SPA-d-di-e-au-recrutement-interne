import "../styles/pages.css";

export default function SearchBar({
  qName,
  qCompany,
  onQName,
  onQCompany,
  sortAZ,
  onToggleSort,
}) {
  return (
    <div className="toolbar">
      <div className="toolbar__group">
        <label className="label">Nom</label>
        <input
          className="input"
          value={qName}
          onChange={(e) => onQName(e.target.value)}
          placeholder="Rechercher par nom..."
        />
      </div>

      <div className="toolbar__group">
        <label className="label">Entreprise</label>
        <input
          className="input"
          value={qCompany}
          onChange={(e) => onQCompany(e.target.value)}
          placeholder="Filtrer par entreprise..."
        />
      </div>

      <button className="btn" onClick={onToggleSort}>
        Trier A→Z : <b>{sortAZ ? "ON" : "OFF"}</b>
      </button>
    </div>
  );
}