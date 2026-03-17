import { Routes, Route } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Directory from "./pages/Directory";
import Team from "./pages/Team";
import NotFound from "./pages/NotFound";
import Home from "./pages/home";

const LS_KEY = "hrconnect_team_v1";
const THEME_KEY = "hrconnect_theme_v1"; 

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(THEME_KEY);
    return saved === "dark" ? "dark" : "light";
  });

  const [team, setTeam] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);


  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    let alive = true;

    async function loadUsers() {
  setLoading(true);
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();

    //On a mit cette ligne de code pour tester le loading state si ca fonctionne ou pas
    ////
    //await new Promise(resolve => setTimeout(resolve, 2000));
    ////
    if (!alive) return;
    setUsers(Array.isArray(data) ? data : []);
  } catch {
    if (!alive) return;
    setUsers([]);
  } finally {
    if (!alive) return;
    setLoading(false);
  }
}

    loadUsers();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(team));
  }, [team]);

  const addToTeam = (user) => {
    setTeam((prev) => {
      const exists = prev.some((m) => m.id === user.id);
      if (exists) return prev;
      return [...prev, user];
    });
  };

  const removeFromTeam = (id) => {
    setTeam((prev) => prev.filter((m) => m.id !== id));
  };

  const stats = useMemo(
    () => ({
      totalTalents: users.length,
      teamCount: team.length,
    }),
    [users.length, team.length]
  );
    console.log("Loading state:", loading);
  return (
    <div className="appShell">
      <Header
        teamCount={stats.teamCount}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="appMain">
        <Routes>
          <Route
            path="/"
            element={<Home loading={loading} totalTalents={stats.totalTalents} />}
          />

          <Route
            path="/annuaire"
            element={
              <Directory
                users={users}
                loading={loading}
                team={team}
                onAdd={addToTeam}
              />
            }
          />

          <Route
            path="/equipe"
            element={<Team team={team} onRemove={removeFromTeam} />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}