import { useState, useEffect, useCallback } from "react";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// ─── SUPABASE CONFIG ──────────────────────────────────────────────────────────
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// ─────────────────────────────────────────────────────────────────────────────

// SQL to run once in Supabase dashboard → SQL Editor:
/*
create table students (
  usn text primary key,
  name text not null,
  created_at timestamptz default now()
);

create table teams (
  id text primary key,
  name text not null,
  color_idx int default 0,
  created_at timestamptz default now()
);

create table team_members (
  team_id text references teams(id) on delete cascade,
  usn text references students(usn) on delete cascade,
  primary key (team_id, usn)
);

-- Enable realtime
alter publication supabase_realtime add table students;
alter publication supabase_realtime add table teams;
alter publication supabase_realtime add table team_members;
*/

const SEED_STUDENTS = [
  { name: "Abhinav Suresh", usn: "1BY24EC003" },
  { name: "Achinth Hebbar", usn: "1BY24EC005" },
  { name: "Adarsh Kumar", usn: "1BY24EC006" },
  { name: "Aditya Gupta", usn: "1BY24EC008" },
  { name: "Ajay Gowda K L", usn: "1BY24EC011" },
  { name: "Akansha Kumari", usn: "1BY24EC013" },
  { name: "Akash Gorain", usn: "1BY24EC014" },
  { name: "Amirisetty Venkata Mounish", usn: "1BY24EC015" },
  { name: "Amshumaan R Kashyap", usn: "1BY24EC016" },
  { name: "Ayush Mishra", usn: "1BY24EC029" },
  { name: "Ayushman Sharma", usn: "1BY24EC030" },
  { name: "Chirag Ghosh", usn: "1BY24EC038" },
  { name: "Darshan K Subramani", usn: "1BY24EC039" },
  { name: "Dhruv Swaroop", usn: "1BY24EC045" },
  { name: "Dhruv Tripathi", usn: "1BY24EC046" },
  { name: "Gagandeep N S", usn: "1BY24EC052" },
  { name: "Gurudatt N", usn: "1BY24EC053" },
  { name: "Hemashree V", usn: "1BY24EC062" },
  { name: "Karthik P Kumar", usn: "1BY24EC073" },
  { name: "Kasinadhuni Venkata Sathvik", usn: "1BY24EC074" },
  { name: "Lalitaditya M V", usn: "1BY24EC081" },
  { name: "M S Sitaansh", usn: "1BY24EC084" },
  { name: "Makarla Ranvitha", usn: "1BY24EC087" },
  { name: "Mehal Bhagat", usn: "1BY24EC093" },
  { name: "Mithun Kumar V", usn: "1BY24EC095" },
  { name: "Mohammed Zahid Shariff", usn: "1BY24EC096" },
  { name: "Muppuri Venkata Naga Kasi Sai Tanmayee", usn: "1BY24EC098" },
  { name: "Navneet Arun", usn: "1BY24EC105" },
  { name: "Neha K", usn: "1BY24EC109" },
  { name: "Nihal S Patwardhan", usn: "1BY24EC110" },
  { name: "Nikhil Neelappa Koppa", usn: "1BY24EC113" },
  { name: "Niteesh Gowda A M", usn: "1BY24EC116" },
  { name: "Nitin Raj", usn: "1BY24EC117" },
  { name: "Padma Varshini D", usn: "1BY24EC119" },
  { name: "Parinitha V", usn: "1BY24EC120" },
  { name: "Parvathy R", usn: "1BY24EC121" },
  { name: "Poornith J K", usn: "1BY24EC124" },
  { name: "Pranathi Rajeev Girimaji", usn: "1BY24EC131" },
  { name: "Prashant Thakur", usn: "1BY24EC132" },
  { name: "Prateek Gururaj Deshpande", usn: "1BY24EC133" },
  { name: "Pratham M Gadal", usn: "1BY24EC134" },
  { name: "Praveen Kumar M", usn: "1BY24EC135" },
  { name: "Preetham B Y", usn: "1BY24EC136" },
  { name: "Purvitha C", usn: "1BY24EC139" },
  { name: "Rachana B", usn: "1BY24EC141" },
  { name: "Rahul U", usn: "1BY24EC142" },
  { name: "Rohan Patil", usn: "1BY24EC145" },
  { name: "Sameer Kedilaya", usn: "1BY24EC156" },
  { name: "Samiksha Chakki", usn: "1BY24EC157" },
  { name: "Samiksha Mawani", usn: "1BY24EC158" },
  { name: "Sanjana", usn: "1BY24EC161" },
  { name: "Shane Alan S", usn: "1BY24EC164" },
  { name: "Shashank P Naik", usn: "1BY24EC165" },
  { name: "Shreya A Hangal", usn: "1BY24EC168" },
  { name: "Shubham Vishal Injatkar", usn: "1BY24EC169" },
  { name: "Shwetank Sinha", usn: "1BY24EC170" },
  { name: "Srushti K", usn: "1BY24EC174" },
  { name: "Sunkara Muneera Farheen", usn: "1BY24EC175" },
  { name: "Thanushree B S", usn: "1BY24EC179" },
  { name: "V Nanda Kishore Naik", usn: "1BY24EC180" },
  { name: "Vasavi Borukati", usn: "1BY24EC184" },
  { name: "Vishal G F", usn: "1BY24EC187" },
  { name: "Simran Singh", usn: "1BY24EC193" },
  { name: "Sowmya N", usn: "1BY24EC194" },
  { name: "Abhishek Arya", usn: "1BY25EC400" },
  { name: "Akash Kumar M K", usn: "1BY25EC401" },
  { name: "Archana J", usn: "1BY25EC402" },
  { name: "Chennadasara Basavaraja", usn: "1BY25EC403" },
  { name: "Chetan Vishwanath Bhandare", usn: "1BY25EC404" },
  { name: "Daneshwar Ningappa Savanur", usn: "1BY25EC405" },
];

const PALETTE = {
  bg: "#09090b",
  surface: "#111113",
  card: "#18181b",
  border: "#27272a",
  accent: "#6366f1",
  accentHover: "#818cf8",
  success: "#22c55e",
  warning: "#f59e0b",
  danger: "#ef4444",
  text: "#fafafa",
  muted: "#71717a",
  subtle: "#3f3f46",
};

function getInitials(name) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function Avatar({ name, size = 36, color }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: color || PALETTE.accent,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.35, fontWeight: 700, color: "#fff", flexShrink: 0,
      fontFamily: "'Space Mono', monospace", letterSpacing: "-0.5px",
    }}>
      {getInitials(name)}
    </div>
  );
}

function Badge({ children, color }) {
  return (
    <span style={{
      display: "inline-block", padding: "2px 8px", borderRadius: 4,
      fontSize: 11, fontWeight: 600,
      background: (color || PALETTE.accent) + "22",
      color: color || PALETTE.accent,
      border: `1px solid ${(color || PALETTE.accent)}44`,
      fontFamily: "'Space Mono', monospace",
    }}>
      {children}
    </span>
  );
}

function Spinner() {
  return (
    <div style={{ display: "inline-block", width: 16, height: 16, border: `2px solid ${PALETTE.subtle}`, borderTopColor: PALETTE.accent, borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
  );
}

export default function App() {
  const [students, setStudents] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [view, setView] = useState("teams");
  const [modal, setModal] = useState(null);
  const [newTeamName, setNewTeamName] = useState("");
  const [search, setSearch] = useState("");
  const [studentSearch, setStudentSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  // Add student form
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentUSN, setNewStudentUSN] = useState("");

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };

  // ── Fetch all data ──────────────────────────────────────────────────────────
  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [{ data: studs }, { data: teamsData }, { data: membersData }] = await Promise.all([
        supabase.from("students").select("*").order("name"),
        supabase.from("teams").select("*").order("created_at"),
        supabase.from("team_members").select("team_id, usn, students(name, usn)"),
      ]);

      setStudents(studs || []);

      const teamsWithMembers = (teamsData || []).map((t) => ({
        ...t,
        members: (membersData || [])
          .filter((m) => m.team_id === t.id)
          .map((m) => m.students)
          .filter(Boolean),
      }));
      setTeams(teamsWithMembers);
    } catch (err) {
      showToast("Failed to load data. Check Supabase config.", "error");
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // ── Realtime subscriptions ──────────────────────────────────────────────────
  useEffect(() => {
    const channel = supabase
      .channel("db-changes")
      .on("postgres_changes", { event: "*", schema: "public" }, () => fetchAll())
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [fetchAll]);

  // ── Seed students (one-time) ────────────────────────────────────────────────
  const seedStudents = async () => {
    setSeeding(true);
    const { error } = await supabase
      .from("students")
      .upsert(SEED_STUDENTS, { onConflict: "usn" });
    if (error) showToast("Seed failed: " + error.message, "error");
    else showToast(`${SEED_STUDENTS.length} students seeded!`);
    setSeeding(false);
    fetchAll();
  };

  // ── Add new student ─────────────────────────────────────────────────────────
  const addStudent = async () => {
    const name = newStudentName.trim();
    const usn = newStudentUSN.trim().toUpperCase();
    if (!name || !usn) return;
    if (students.find((s) => s.usn === usn)) {
      showToast("USN already exists!", "error"); return;
    }
    const { error } = await supabase.from("students").insert({ name, usn });
    if (error) { showToast("Error: " + error.message, "error"); return; }
    setNewStudentName(""); setNewStudentUSN("");
    setModal(null);
    showToast(`${name} added!`);
  };

  // ── Teams CRUD ──────────────────────────────────────────────────────────────
  const createTeam = async () => {
    const name = newTeamName.trim();
    if (!name) return;
    if (teams.find((t) => t.name.toLowerCase() === name.toLowerCase())) {
      showToast("Team name already exists!", "error"); return;
    }
    const { error } = await supabase.from("teams").insert({
      id: Date.now().toString(), name, color_idx: teams.length % 10,
    });
    if (error) { showToast("Error: " + error.message, "error"); return; }
    setNewTeamName(""); setModal(null);
    showToast(`Team "${name}" created!`);
  };

  const deleteTeam = async (teamId) => {
    const team = teams.find((t) => t.id === teamId);
    const { error } = await supabase.from("teams").delete().eq("id", teamId);
    if (error) { showToast("Error: " + error.message, "error"); return; }
    setConfirmDelete(null);
    showToast(`Team "${team?.name}" deleted.`, "info");
  };

  const addMember = async (teamId, student) => {
    const assignedUSNs = new Set(teams.flatMap((t) => t.members.map((m) => m.usn)));
    if (assignedUSNs.has(student.usn)) {
      showToast(`${student.name} is already in a team!`, "error"); return;
    }
    const { error } = await supabase.from("team_members").insert({ team_id: teamId, usn: student.usn });
    if (error) { showToast("Error: " + error.message, "error"); return; }
    showToast(`${student.name} added!`);
  };

  const removeMember = async (teamId, usn) => {
    const { error } = await supabase.from("team_members").delete().match({ team_id: teamId, usn });
    if (error) showToast("Error: " + error.message, "error");
  };

  // ── Derived ─────────────────────────────────────────────────────────────────
  const assignedUSNs = new Set(teams.flatMap((t) => t.members.map((m) => m.usn)));
  const unassignedStudents = students.filter((s) => !assignedUSNs.has(s.usn));

  const filteredTeams = teams.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.members.some((m) => m.name.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredStudents = students.filter(
    (s) => s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.usn.toLowerCase().includes(studentSearch.toLowerCase())
  );

  const modalStudents = modal?.type === "addMember"
    ? unassignedStudents.filter(
        (s) => s.name.toLowerCase().includes((modal.memberSearch || "").toLowerCase()) ||
          s.usn.toLowerCase().includes((modal.memberSearch || "").toLowerCase())
      )
    : [];

  const teamForModal = modal?.type === "addMember" ? teams.find((t) => t.id === modal.teamId) : null;

  return (
    <div style={{ minHeight: "100vh", background: PALETTE.bg, color: PALETTE.text, fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: ${PALETTE.surface}; }
        ::-webkit-scrollbar-thumb { background: ${PALETTE.subtle}; border-radius: 3px; }
        input::placeholder { color: ${PALETTE.muted}; }
        .btn-hover:hover { opacity: 0.85; transform: translateY(-1px); }
        .card-hover:hover { border-color: ${PALETTE.subtle} !important; }
        .member-row:hover { background: ${PALETTE.surface} !important; }
        .student-row:hover { background: ${PALETTE.surface} !important; }
        .tab-btn { transition: all 0.15s; }
        .tab-btn:hover { color: ${PALETTE.text} !important; }
        .remove-btn { opacity: 0; transition: opacity 0.15s; }
        .member-row:hover .remove-btn { opacity: 1; }
        .add-student-btn:hover { background: ${PALETTE.accent}22 !important; border-color: ${PALETTE.accent} !important; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        .realtime-dot { animation: pulse 2s infinite; }
      `}</style>

      {/* Header */}
      <div style={{ borderBottom: `1px solid ${PALETTE.border}`, background: PALETTE.surface, position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: PALETTE.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "'Space Mono', monospace", letterSpacing: "-0.3px" }}>EE CCA Teams</div>
              <div style={{ fontSize: 10, color: PALETTE.muted, fontFamily: "'Space Mono', monospace", display: "flex", alignItems: "center", gap: 5 }}>
                <span className="realtime-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: PALETTE.success, display: "inline-block" }} />
                A Section · Engineering Electromagnetics 
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {students.length === 0 && !loading && (
              <button
                className="btn-hover"
                onClick={seedStudents}
                disabled={seeding}
                style={{ padding: "6px 14px", background: PALETTE.warning + "22", border: `1px solid ${PALETTE.warning}44`, borderRadius: 8, color: PALETTE.warning, fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
              >
                {seeding ? <Spinner /> : "⚡"} Seed Students
              </button>
            )}
            <div style={{ display: "flex", gap: 4, background: PALETTE.card, borderRadius: 8, padding: 4, border: `1px solid ${PALETTE.border}` }}>
              {["teams", "students"].map((v) => (
                <button key={v} className="tab-btn" onClick={() => setView(v)} style={{
                  padding: "5px 14px", borderRadius: 6, border: "none", cursor: "pointer",
                  fontSize: 12, fontWeight: 600, fontFamily: "'Space Mono', monospace",
                  background: view === v ? PALETTE.accent : "transparent",
                  color: view === v ? "#fff" : PALETTE.muted, transition: "all 0.15s",
                }}>
                  {v === "teams" ? `Teams (${teams.length})` : `Students (${students.length})`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ background: PALETTE.surface, borderBottom: `1px solid ${PALETTE.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "10px 24px", display: "flex", gap: 24, flexWrap: "wrap" }}>
          {[
            { label: "Total Students", val: students.length, color: PALETTE.text },
            { label: "Assigned", val: assignedUSNs.size, color: PALETTE.success },
            { label: "Unassigned", val: unassignedStudents.length, color: unassignedStudents.length > 0 ? PALETTE.warning : PALETTE.success },
            { label: "Teams", val: teams.length, color: PALETTE.accent },
          ].map((s) => (
            <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Space Mono', monospace", color: s.color }}>{loading ? "—" : s.val}</span>
              <span style={{ fontSize: 11, color: PALETTE.muted, fontWeight: 500 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px" }}>

        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 20px", color: PALETTE.muted }}>
            <Spinner />
            <div style={{ marginTop: 12, fontSize: 13 }}>Connecting to Supabase…</div>
          </div>
        ) : (
          <>
            {/* TEAMS VIEW */}
            {view === "teams" && (
              <>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, gap: 12, flexWrap: "wrap" }}>
                  <input placeholder="Search teams or members…" value={search} onChange={(e) => setSearch(e.target.value)} style={{ flex: 1, minWidth: 200, padding: "9px 14px", background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: 8, color: PALETTE.text, fontSize: 13, outline: "none" }} />
                  <button className="btn-hover" onClick={() => setModal({ type: "create" })} style={{ padding: "9px 18px", background: PALETTE.accent, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
                    <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> New Team
                  </button>
                </div>

                {filteredTeams.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "80px 20px", color: PALETTE.muted }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>🔭</div>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: PALETTE.subtle }}>No teams yet</div>
                    <div style={{ fontSize: 13 }}>Create a team and start adding members!</div>
                  </div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
                    {filteredTeams.map((team) => {
                      const isFull = team.members.length >= 4;
                      const isEmpty = team.members.length === 0;
                      return (
                        <div key={team.id} className="card-hover" style={{ background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: 12, overflow: "hidden", transition: "border-color 0.15s" }}>
                          <div style={{ padding: "14px 16px 12px", borderBottom: `1px solid ${PALETTE.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div style={{ width: 8, height: 8, borderRadius: "50%", background: isFull ? PALETTE.danger : isEmpty ? PALETTE.muted : PALETTE.success }} />
                              <span style={{ fontSize: 14, fontWeight: 700, fontFamily: "'Space Mono', monospace" }}>{team.name}</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <Badge color={isFull ? PALETTE.danger : team.members.length > 0 ? PALETTE.success : PALETTE.muted}>{team.members.length}/4</Badge>
                              <button onClick={() => setConfirmDelete(team.id)} style={{ background: "none", border: "none", cursor: "pointer", color: PALETTE.muted, fontSize: 14, padding: "2px 4px", borderRadius: 4 }} title="Delete team">✕</button>
                            </div>
                          </div>
                          <div style={{ padding: "8px 0", minHeight: 60 }}>
                            {team.members.length === 0 ? (
                              <div style={{ padding: "12px 16px", color: PALETTE.muted, fontSize: 12, fontStyle: "italic" }}>No members yet</div>
                            ) : (
                              team.members.map((m, i) => (
                                <div key={m.usn} className="member-row" style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 16px", transition: "background 0.1s" }}>
                                  <Avatar name={m.name} size={30} color={`hsl(${(m.usn.charCodeAt(m.usn.length - 1) * 37 + i * 60) % 360}, 60%, 50%)`} />
                                  <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.name}</div>
                                    <div style={{ fontSize: 10, color: PALETTE.muted, fontFamily: "'Space Mono', monospace" }}>{m.usn}</div>
                                  </div>
                                  <button className="remove-btn" onClick={() => removeMember(team.id, m.usn)} style={{ background: PALETTE.danger + "22", border: `1px solid ${PALETTE.danger}44`, color: PALETTE.danger, borderRadius: 4, cursor: "pointer", fontSize: 10, padding: "2px 6px", fontWeight: 600 }}>Remove</button>
                                </div>
                              ))
                            )}
                          </div>
                          {!isFull ? (
                            <div style={{ padding: "8px 16px 14px" }}>
                              <button className="add-student-btn" onClick={() => setModal({ type: "addMember", teamId: team.id, memberSearch: "" })} disabled={unassignedStudents.length === 0} style={{ width: "100%", padding: "7px", background: "transparent", border: `1px dashed ${PALETTE.border}`, borderRadius: 8, color: unassignedStudents.length === 0 ? PALETTE.muted : PALETTE.accent, fontSize: 12, fontWeight: 600, cursor: unassignedStudents.length === 0 ? "not-allowed" : "pointer", transition: "all 0.15s" }}>
                                {unassignedStudents.length === 0 ? "All students assigned" : `+ Add Member (${4 - team.members.length} spot${4 - team.members.length !== 1 ? "s" : ""} left)`}
                              </button>
                            </div>
                          ) : (
                            <div style={{ padding: "8px 16px 14px" }}>
                              <div style={{ textAlign: "center", fontSize: 11, color: PALETTE.danger, fontWeight: 600, fontFamily: "'Space Mono', monospace" }}>TEAM FULL</div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}

            {/* STUDENTS VIEW */}
            {view === "students" && (
              <>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, gap: 12, flexWrap: "wrap" }}>
                  <input placeholder="Search by name or USN…" value={studentSearch} onChange={(e) => setStudentSearch(e.target.value)} style={{ flex: 1, minWidth: 200, maxWidth: 400, padding: "9px 14px", background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: 8, color: PALETTE.text, fontSize: 13, outline: "none" }} />
                  <button className="btn-hover" onClick={() => setModal({ type: "addStudent" })} style={{ padding: "9px 18px", background: PALETTE.success + "22", border: `1px solid ${PALETTE.success}44`, color: PALETTE.success, borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
                    <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> Add Student
                  </button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 8 }}>
                  {filteredStudents.map((s, i) => {
                    const assigned = assignedUSNs.has(s.usn);
                    const teamOfStudent = teams.find((t) => t.members.find((m) => m.usn === s.usn));
                    return (
                      <div key={s.usn} className="student-row" style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: 8, transition: "background 0.1s" }}>
                        <div style={{ width: 22, fontSize: 10, color: PALETTE.muted, fontFamily: "'Space Mono', monospace", textAlign: "right", flexShrink: 0 }}>{i + 1}</div>
                        <Avatar name={s.name} size={32} color={`hsl(${(s.usn.charCodeAt(s.usn.length - 1) * 37 + i * 60) % 360}, 60%, 45%)`} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.name}</div>
                          <div style={{ fontSize: 10, color: PALETTE.muted, fontFamily: "'Space Mono', monospace" }}>{s.usn}</div>
                        </div>
                        {assigned ? <Badge color={PALETTE.success}>{teamOfStudent?.name || "Assigned"}</Badge> : <Badge color={PALETTE.warning}>Unassigned</Badge>}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* CREATE TEAM MODAL */}
      {modal?.type === "create" && (
        <div style={{ position: "fixed", inset: 0, background: "#000a", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }} onClick={(e) => { if (e.target === e.currentTarget) setModal(null); }}>
          <div style={{ background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: 14, width: "100%", maxWidth: 400, padding: 24 }}>
            <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Space Mono', monospace", marginBottom: 16 }}>Create New Team</div>
            <input autoFocus placeholder="Team name (e.g. Maxwell's Demons)" value={newTeamName} onChange={(e) => setNewTeamName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && createTeam()} style={{ width: "100%", padding: "10px 14px", background: PALETTE.surface, border: `1px solid ${PALETTE.border}`, borderRadius: 8, color: PALETTE.text, fontSize: 14, outline: "none", marginBottom: 16 }} />
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button onClick={() => setModal(null)} style={{ padding: "8px 16px", background: PALETTE.surface, border: `1px solid ${PALETTE.border}`, borderRadius: 8, color: PALETTE.muted, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Cancel</button>
              <button className="btn-hover" onClick={createTeam} disabled={!newTeamName.trim()} style={{ padding: "8px 16px", background: newTeamName.trim() ? PALETTE.accent : PALETTE.subtle, border: "none", borderRadius: 8, color: "#fff", cursor: newTeamName.trim() ? "pointer" : "not-allowed", fontSize: 13, fontWeight: 600 }}>Create Team</button>
            </div>
          </div>
        </div>
      )}

      {/* ADD STUDENT MODAL */}
      {modal?.type === "addStudent" && (
        <div style={{ position: "fixed", inset: 0, background: "#000a", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }} onClick={(e) => { if (e.target === e.currentTarget) setModal(null); }}>
          <div style={{ background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: 14, width: "100%", maxWidth: 400, padding: 24 }}>
            <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Space Mono', monospace", marginBottom: 4 }}>Add New Student</div>
            <div style={{ fontSize: 11, color: PALETTE.muted, marginBottom: 18 }}>Student will be synced across all devices.</div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 11, color: PALETTE.muted, display: "block", marginBottom: 5, fontWeight: 600 }}>FULL NAME</label>
              <input autoFocus placeholder="e.g. Riya Sharma" value={newStudentName} onChange={(e) => setNewStudentName(e.target.value)} style={{ width: "100%", padding: "10px 14px", background: PALETTE.surface, border: `1px solid ${PALETTE.border}`, borderRadius: 8, color: PALETTE.text, fontSize: 14, outline: "none" }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 11, color: PALETTE.muted, display: "block", marginBottom: 5, fontWeight: 600 }}>USN</label>
              <input placeholder="e.g. 1BY24EC999" value={newStudentUSN} onChange={(e) => setNewStudentUSN(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addStudent()} style={{ width: "100%", padding: "10px 14px", background: PALETTE.surface, border: `1px solid ${PALETTE.border}`, borderRadius: 8, color: PALETTE.text, fontSize: 14, outline: "none", fontFamily: "'Space Mono', monospace" }} />
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button onClick={() => setModal(null)} style={{ padding: "8px 16px", background: PALETTE.surface, border: `1px solid ${PALETTE.border}`, borderRadius: 8, color: PALETTE.muted, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Cancel</button>
              <button className="btn-hover" onClick={addStudent} disabled={!newStudentName.trim() || !newStudentUSN.trim()} style={{ padding: "8px 16px", background: (newStudentName.trim() && newStudentUSN.trim()) ? PALETTE.success : PALETTE.subtle, border: "none", borderRadius: 8, color: "#fff", cursor: (newStudentName.trim() && newStudentUSN.trim()) ? "pointer" : "not-allowed", fontSize: 13, fontWeight: 600 }}>Add Student</button>
            </div>
          </div>
        </div>
      )}

      {/* ADD MEMBER MODAL */}
      {modal?.type === "addMember" && teamForModal && (
        <div style={{ position: "fixed", inset: 0, background: "#000a", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }} onClick={(e) => { if (e.target === e.currentTarget) setModal(null); }}>
          <div style={{ background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: 14, width: "100%", maxWidth: 480, display: "flex", flexDirection: "column", maxHeight: "80vh" }}>
            <div style={{ padding: "18px 20px 14px", borderBottom: `1px solid ${PALETTE.border}` }}>
              <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "'Space Mono', monospace", marginBottom: 2 }}>Add to "{teamForModal.name}"</div>
              <div style={{ fontSize: 11, color: PALETTE.muted }}>{unassignedStudents.length} unassigned · {4 - teamForModal.members.length} spot{4 - teamForModal.members.length !== 1 ? "s" : ""} left</div>
              <input autoFocus placeholder="Search students…" value={modal.memberSearch || ""} onChange={(e) => setModal((m) => ({ ...m, memberSearch: e.target.value }))} style={{ width: "100%", padding: "8px 12px", background: PALETTE.surface, border: `1px solid ${PALETTE.border}`, borderRadius: 8, color: PALETTE.text, fontSize: 13, outline: "none", marginTop: 12 }} />
            </div>
            <div style={{ overflowY: "auto", flex: 1, padding: "8px 0" }}>
              {modalStudents.length === 0 ? (
                <div style={{ padding: "24px", textAlign: "center", color: PALETTE.muted, fontSize: 13 }}>No unassigned students found</div>
              ) : (
                modalStudents.map((s, i) => (
                  <div key={s.usn} onClick={() => addMember(modal.teamId, s)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 20px", cursor: "pointer", transition: "background 0.1s" }} onMouseEnter={(e) => e.currentTarget.style.background = PALETTE.surface} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                    <Avatar name={s.name} size={32} color={`hsl(${(s.usn.charCodeAt(s.usn.length - 1) * 37 + i * 60) % 360}, 60%, 45%)`} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</div>
                      <div style={{ fontSize: 10, color: PALETTE.muted, fontFamily: "'Space Mono', monospace" }}>{s.usn}</div>
                    </div>
                    <span style={{ fontSize: 11, color: PALETTE.accent, fontWeight: 600 }}>Add →</span>
                  </div>
                ))
              )}
            </div>
            <div style={{ padding: "12px 20px", borderTop: `1px solid ${PALETTE.border}` }}>
              <button onClick={() => setModal(null)} style={{ width: "100%", padding: "8px", background: PALETTE.surface, border: `1px solid ${PALETTE.border}`, borderRadius: 8, color: PALETTE.muted, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Done</button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {confirmDelete && (
        <div style={{ position: "fixed", inset: 0, background: "#000a", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }} onClick={(e) => { if (e.target === e.currentTarget) setConfirmDelete(null); }}>
          <div style={{ background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: 14, width: "100%", maxWidth: 360, padding: 24 }}>
            <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "'Space Mono', monospace", marginBottom: 8 }}>Delete Team?</div>
            <div style={{ fontSize: 13, color: PALETTE.muted, marginBottom: 20 }}>"{teams.find((t) => t.id === confirmDelete)?.name}" and all its members will be removed. This cannot be undone.</div>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button onClick={() => setConfirmDelete(null)} style={{ padding: "8px 16px", background: PALETTE.surface, border: `1px solid ${PALETTE.border}`, borderRadius: 8, color: PALETTE.muted, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Cancel</button>
              <button className="btn-hover" onClick={() => deleteTeam(confirmDelete)} style={{ padding: "8px 16px", background: PALETTE.danger, border: "none", borderRadius: 8, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 200, background: toast.type === "error" ? PALETTE.danger : toast.type === "info" ? PALETTE.subtle : PALETTE.success, color: "#fff", padding: "10px 18px", borderRadius: 10, fontSize: 13, fontWeight: 600, boxShadow: "0 4px 20px #0006", animation: "fadeInUp 0.2s ease" }}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}