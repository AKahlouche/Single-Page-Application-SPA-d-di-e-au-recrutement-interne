import { useMemo, useState } from "react";
import UserCard from "../components/UserCard";
import SearchBar from "../components/SearchBar";
import "../styles/pages.css";

export default function Directory({ users, loading, team, onAdd }) {
  const [qName, setQName] = useState("");
  const [qCompany, setQCompany] = useState("");
  const [sortAZ, setSortAZ] = useState(false);

  const filtered = useMemo(() => {
    let list = [...users];

    // filtre nom (temps réel)
    if (qName.trim()) {
      const n = qName.trim().toLowerCase();
      list = list.filter((u) => (u.name || "").toLowerCase().includes(n));
    }

    // filtre entreprise
    if (qCompany.trim()) {
      const c = qCompany.trim().toLowerCase();
      list = list.filter((u) =>
        ((u.company && u.company.name) || "").toLowerCase().includes(c)
      );
    }

    // tri A→Z
    if (sortAZ) {
      list.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    }

    return list;
  }, [users, qName, qCompany, sortAZ]);

  return (
    <section className="page">
      <h1 className="page__title">Annuaire</h1>

      <SearchBar
        qName={qName}
        qCompany={qCompany}
        onQName={setQName}
        onQCompany={setQCompany}
        sortAZ={sortAZ}
        onToggleSort={() => setSortAZ((s) => !s)}
      />

      {loading ? (
        <div className="panel">Chargement des talents...</div>
      ) : (
        <>
          <div className="hint">
            Résultats: <b>{filtered.length}</b>
          </div>

          <div className="grid">
            {filtered.map((u) => {
              const inTeam = team.some((m) => m.id === u.id);
              return (
                <UserCard
                  key={u.id}
                  user={u}
                  variant="add"
                  disabled={inTeam}
                  onPrimary={() => onAdd(u)}
                />
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}