import { useState } from "react";
import { createArtwork } from "../interfaces/artwork";
import ArtForm from "../components/ArtForm";
import ArtList from "../components/ArtList";

const BOOK_ICON = (
  <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
    <rect x="6" y="4" width="14" height="20" rx="2" fill="#f2ddd5" stroke="#8b4a40" strokeWidth="1.5"/>
    <rect x="9" y="4" width="14" height="20" rx="2" fill="#fff8f5" stroke="#c97868" strokeWidth="1.5"/>
    <line x1="12" y1="10" x2="20" y2="10" stroke="#c97868" strokeWidth="1" strokeLinecap="round"/>
    <line x1="12" y1="13" x2="20" y2="13" stroke="#d4a898" strokeWidth="1" strokeLinecap="round"/>
  </svg>
);
const PAINTING_ICON = (
  <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
    <rect x="5" y="5" width="22" height="18" rx="2" fill="#f2ddd5" stroke="#8b4a40" strokeWidth="1.5"/>
    <rect x="8" y="8" width="16" height="12" rx="1" fill="#fff8f5" stroke="#c97868" strokeWidth="1"/>
    <circle cx="16" cy="14" r="4" fill="#f2ddd5" stroke="#8b4a40" strokeWidth="1"/>
    <rect x="13" y="23" width="6" height="2" rx="1" fill="#d4a898"/>
  </svg>
);
const SCULPTURE_ICON = (
  <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
    <ellipse cx="16" cy="8" rx="5" ry="6" fill="#f2ddd5" stroke="#8b4a40" strokeWidth="1.5"/>
    <path d="M11 13 Q9 18 10 22 h12 Q23 18 21 13" fill="#fff8f5" stroke="#c97868" strokeWidth="1.5"/>
    <rect x="13" y="22" width="6" height="4" rx="1" fill="#d4a898" stroke="#8b4a40" strokeWidth="1"/>
    <rect x="10" y="26" width="12" height="2" rx="1" fill="#8b4a40"/>
  </svg>
);

const CATEGORY_ICONS = { kitap: BOOK_ICON, tablo: PAINTING_ICON, heykel: SCULPTURE_ICON };

const statCardStyle = {
  background: "#fff8f5",
  border: "1px solid #e8d5cc",
  boxShadow: "0 3px 0 #d4a898, 0 5px 14px rgba(180,110,100,0.1)",
  transform: "perspective(400px) rotateX(2deg)",
  transition: "transform .2s, box-shadow .2s",
  borderRadius: "14px",
  padding: "16px 10px",
  textAlign: "center",
  flex: 1,
};

export default function Home() {
  const [artworks, setArtworks] = useState([]);
  const [editing, setEditing]   = useState(null);
  const [filter, setFilter]     = useState("hepsi");

  const handleAdd    = (d)     => setArtworks([...artworks, createArtwork(d)]);
  const handleDelete = (id)    => setArtworks(artworks.filter(a => a.id !== id));
  const handleUpdate = (id, d) => {
    setArtworks(artworks.map(a => a.id === id ? { ...a, ...d, rating: Number(d.rating) } : a));
    setEditing(null);
  };

  const filtered = filter === "hepsi" ? artworks : artworks.filter(a => a.category === filter);
  const count = c => artworks.filter(a => a.category === c).length;

  const filters = [
    { key: "hepsi",  label: "Tümü",   icon: null },
    { key: "kitap",  label: "Kitap",  icon: BOOK_ICON },
    { key: "tablo",  label: "Tablo",  icon: PAINTING_ICON },
    { key: "heykel", label: "Heykel", icon: SCULPTURE_ICON },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg,#f9ede8 0%,#f2ddd5 40%,#faf0eb 100%)" }}>
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "40px 16px" }}>

        {/* Başlık */}
        <div style={{ textAlign: "center", marginBottom: "32px", animation: "fadeUp .5s ease both" }}>
          <div style={{ display: "inline-block", animation: "float 3s ease-in-out infinite" }}>
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              <circle cx="22" cy="22" r="20" fill="#f2ddd5" stroke="#c97868" strokeWidth="1.5"/>
              <path d="M14 28 Q22 12 30 28" stroke="#8b4a40" strokeWidth="2" fill="none" strokeLinecap="round"/>
              <circle cx="22" cy="18" r="3" fill="#c97868"/>
              <path d="M16 30 h12" stroke="#8b4a40" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "2.8rem", fontWeight: 700,
            background: "linear-gradient(90deg,#6b3028,#c97868,#6b3028)",
            backgroundSize: "200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "shimmer 4s linear infinite",
            letterSpacing: "2px", marginTop: "6px",
          }}>ArtDesign</h1>
          <p style={{ color: "#c4786e", fontSize: "10px", letterSpacing: "4px", marginTop: "4px" }}>
            ESER KOLEKSİYONUN
          </p>
        </div>

        {/* İstatistikler */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "24px", animation: "fadeUp .5s .1s ease both" }}>
          {[
            { label: "KİTAP",  value: count("kitap"),  icon: BOOK_ICON },
            { label: "TABLO",  value: count("tablo"),  icon: PAINTING_ICON },
            { label: "HEYKEL", value: count("heykel"), icon: SCULPTURE_ICON },
          ].map(s => (
            <div key={s.label} style={statCardStyle}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "perspective(400px) rotateX(-2deg) translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 0 #b8786e, 0 10px 20px rgba(180,110,100,0.16)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "perspective(400px) rotateX(2deg)";
                e.currentTarget.style.boxShadow = "0 3px 0 #d4a898, 0 5px 14px rgba(180,110,100,0.1)";
              }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "6px" }}>{s.icon}</div>
              <p style={{ fontSize: "22px", fontWeight: 700, color: "#4a2820" }}>{s.value}</p>
              <p style={{ fontSize: "10px", color: "#c4786e", marginTop: "2px", letterSpacing: "1px" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div style={{ animation: "fadeUp .5s .2s ease both" }}>
          <ArtForm
            onSubmit={editing ? d => handleUpdate(editing.id, d) : handleAdd}
            initial={editing}
            onCancel={() => setEditing(null)}
          />
        </div>

        {/* Filtreler */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap", animation: "fadeUp .5s .3s ease both" }}>
          {filters.map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "7px 16px", borderRadius: "999px",
                fontSize: "12px", fontWeight: 500, cursor: "pointer",
                border: "1px solid " + (filter === f.key ? "transparent" : "#e8d5cc"),
                background: filter === f.key ? "linear-gradient(90deg,#6b3028,#a85a4e)" : "#fff8f5",
                color: filter === f.key ? "#fff" : "#1a1a1a",
                boxShadow: filter === f.key ? "0 3px 10px rgba(180,110,100,0.25)" : "none",
                transition: "all .2s", fontFamily: "Inter, sans-serif",
              }}>
              {f.icon && <span style={{ display: "flex" }}>{f.icon}</span>}
              {f.label}
            </button>
          ))}
        </div>

        {/* Liste */}
        <ArtList artworks={filtered} onDelete={handleDelete} onEdit={setEditing} categoryIcons={CATEGORY_ICONS} />

        {filtered.length === 0 && (
          <p style={{ textAlign: "center", padding: "48px 0", fontSize: "14px", color: "#d4a898" }}>
            Henüz eser eklenmedi.
          </p>
        )}
      </div>
    </div>
  );
}