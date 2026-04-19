import { useState } from "react";

const STATUS_COLORS = {
  "Okundu":      { color: "#16a34a", bg: "#f0fdf4" },
  "Okunuyor":    { color: "#d97706", bg: "#fffbeb" },
  "Okunacak":    { color: "#6b3028", bg: "#f2ddd5" },
  "Görüldü":     { color: "#2563eb", bg: "#eff6ff" },
  "Görülecek":   { color: "#9333ea", bg: "#faf5ff" },
  "Koleksiyonda":{ color: "#0f766e", bg: "#f0fdfa" },
  "Tamamlandı":  { color: "#16a34a", bg: "#f0fdf4" },
  "Devam Ediyor":{ color: "#d97706", bg: "#fffbeb" },
  "Planlandı":   { color: "#6b3028", bg: "#f2ddd5" },
};

export default function ArtCard({ artwork, onDelete, onEdit, categoryIcons }) {
  const [showNotes, setShowNotes] = useState(false);
  const sc = STATUS_COLORS[artwork.status] || { color: "#6b3028", bg: "#f2ddd5" };
  const icon = categoryIcons[artwork.category];
  const categoryLabel = artwork.category === "diger"
    ? (artwork.customCategory || "Diğer")
    : artwork.category.charAt(0).toUpperCase() + artwork.category.slice(1);

  return (
    <div className="rounded-2xl p-4 mb-3 slide-in" style={{
      background: "#fff8f5", border: "1px solid #e8d5cc",
      boxShadow: "0 4px 0 #d4a898, 0 6px 20px rgba(180,110,100,0.1)",
      transform: "perspective(700px) rotateX(1deg)",
      transition: "transform .25s, box-shadow .25s",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = "perspective(700px) rotateX(-1deg) translateY(-3px)";
      e.currentTarget.style.boxShadow = "0 8px 0 #b8786e, 0 14px 30px rgba(180,110,100,0.18)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = "perspective(700px) rotateX(1deg)";
      e.currentTarget.style.boxShadow = "0 4px 0 #d4a898, 0 6px 20px rgba(180,110,100,0.1)";
    }}>
      <div className="flex justify-between items-start gap-3">
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            {icon && <span style={{ display: "flex", flexShrink: 0 }}>{icon}</span>}
            <p style={{ fontWeight: 600, color: "#3d1a14", fontSize: "15px", fontFamily: "'Cormorant Garamond', serif" }}>
              {artwork.title}
            </p>
          </div>
          <p style={{ fontSize: "12px", color: "#c4786e", marginLeft: icon ? "28px" : "0" }}>
            {artwork.artist}
          </p>

          <div style={{ marginTop: "8px", display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "999px", background: "#f2ddd5", color: "#6b3028", fontWeight: 500 }}>
              {categoryLabel}
            </span>
            <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "999px", background: sc.bg, color: sc.color, fontWeight: 500 }}>
              {artwork.status}
            </span>
            <span style={{ color: "#a85a4e", fontSize: "13px", letterSpacing: "1px" }}>
              {"★".repeat(artwork.rating)}{"☆".repeat(5 - artwork.rating)}
            </span>
          </div>

          {artwork.notes && (
            <button onClick={() => setShowNotes(s => !s)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#c4786e", fontSize: "12px", marginTop: "8px",
              display: "flex", alignItems: "center", gap: "4px",
              padding: 0, fontFamily: "Inter, sans-serif",
            }}>
              {showNotes ? "▼ Notu gizle" : "▶ Notu göster"}
            </button>
          )}

          {showNotes && artwork.notes && (
            <div style={{
              marginTop: "8px", padding: "10px 14px",
              background: "#faf0eb", borderRadius: "10px",
              border: "1px solid #e8d5cc", fontSize: "13px",
              color: "#6b3028", lineHeight: "1.6", whiteSpace: "pre-wrap",
            }}>
              {artwork.notes}
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
          <button onClick={() => onEdit(artwork)} style={{
            background: "#f2ddd5", color: "#6b3028", border: "none",
            borderRadius: "10px", padding: "6px 12px",
            fontSize: "12px", fontWeight: 500, cursor: "pointer",
            fontFamily: "Inter, sans-serif",
          }}>Düzenle</button>
          <button onClick={() => onDelete(artwork.id)} style={{
            background: "#fff1f2", color: "#f43f5e", border: "none",
            borderRadius: "10px", padding: "6px 12px",
            fontSize: "12px", fontWeight: 500, cursor: "pointer",
            fontFamily: "Inter, sans-serif",
          }}>Sil</button>
        </div>
      </div>
    </div>
  );
}