import { useState, useEffect } from "react";

const empty = { title: "", artist: "", category: "kitap", customCategory: "", status: "Okundu", rating: "3", notes: "" };

const STATUS_MAP = {
  kitap:  ["Okundu", "Okunuyor", "Okunacak"],
  tablo:  ["Görüldü", "Görülecek", "Koleksiyonda"],
  heykel: ["Görüldü", "Görülecek", "Koleksiyonda"],
  diger:  ["Tamamlandı", "Devam Ediyor", "Planlandı"],
};

const inp = {
  background: "#fff8f5",
  border: "1.5px solid #e8d5cc",
  color: "#4a2820",
  borderRadius: "10px",
  padding: "10px 14px",
  fontSize: "13px",
  width: "100%",
  outline: "none",
  fontFamily: "Inter, sans-serif",
};

export default function ArtForm({ onSubmit, initial, onCancel }) {
  const [form, setForm]           = useState(empty);
  const [showNotes, setShowNotes] = useState(false);

  useEffect(() => {
    setForm(initial ?? empty);
    setShowNotes(!!initial?.notes);
  }, [initial]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleCategoryChange = (cat) => {
    set("category", cat);
    set("status", STATUS_MAP[cat]?.[0] || "Tamamlandı");
  };

  return (
    <div style={{
      background: "#fff8f5",
      border: "1.5px solid #e8d5cc",
      borderRadius: "18px",
      padding: "20px",
      marginBottom: "20px",
      boxShadow: "0 4px 0 #e8d5cc, 0 6px 20px rgba(180,110,100,0.08)"
    }}>
      <p style={{ fontSize: "10px", color: "#c4786e", letterSpacing: "2px", marginBottom: "16px" }}>
        {initial ? `✏️ ${initial.title} düzenleniyor` : "➕ YENİ ESER EKLE"}
      </p>

      {/* Eser adı */}
      <input style={{ ...inp, marginBottom: "10px" }}
        placeholder="Eser adı..." value={form.title}
        onChange={e => set("title", e.target.value)} />

      {/* Sanatçı */}
      <input style={{ ...inp, marginBottom: "16px" }}
        placeholder="Sanatçı / Yazar..." value={form.artist}
        onChange={e => set("artist", e.target.value)} />

      {/* Kategori + Durum yan yana */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <select style={{ ...inp }} value={form.category}
          onChange={e => handleCategoryChange(e.target.value)}>
          <option value="kitap">Kitap</option>
          <option value="tablo">Tablo</option>
          <option value="heykel">Heykel</option>
          <option value="diger">+ Diğer</option>
        </select>
        <select style={{ ...inp }} value={form.status}
          onChange={e => set("status", e.target.value)}>
          {(STATUS_MAP[form.category] || STATUS_MAP.diger).map(s =>
            <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Özel kategori */}
      {form.category === "diger" && (
        <input style={{ ...inp, marginBottom: "10px" }}
          placeholder="Kategori adı gir (örn: Film, Müzik...)"
          value={form.customCategory}
          onChange={e => set("customCategory", e.target.value)} />
      )}

      {/* Puan */}
      <select style={{ ...inp, marginBottom: "16px" }} value={form.rating}
        onChange={e => set("rating", e.target.value)}>
        {[1,2,3,4,5].map(n =>
          <option key={n} value={n}>{"★".repeat(n)}{"☆".repeat(5-n)} — {n}/5</option>)}
      </select>

      {/* Not toggle */}
      <button onClick={() => setShowNotes(s => !s)} style={{
        background: "none", border: "none", cursor: "pointer",
        color: "#c4786e", fontSize: "12px", marginBottom: "8px",
        display: "flex", alignItems: "center", gap: "4px",
        padding: 0, fontFamily: "Inter, sans-serif",
      }}>
        {showNotes ? "▼" : "▶"} Not ekle
      </button>

      {showNotes && (
        <textarea
          style={{ ...inp, marginBottom: "14px", minHeight: "85px", resize: "vertical", lineHeight: "1.6" }}
          placeholder="Bu eser hakkında notların..."
          value={form.notes}
          onChange={e => set("notes", e.target.value)}
        />
      )}

      {/* Butonlar */}
      <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
        <button onClick={() => {
          if (form.title.trim() && form.artist.trim()) {
            onSubmit(form);
            if (!initial) { setForm(empty); setShowNotes(false); }
          }
        }} style={{
          background: "linear-gradient(90deg,#6b3028,#a85a4e)",
          color: "#f9ede8", border: "none", borderRadius: "12px",
          padding: "10px 28px", fontSize: "13px", fontWeight: 500,
          cursor: "pointer", boxShadow: "0 3px 0 #4a2010",
          fontFamily: "Inter, sans-serif", letterSpacing: ".5px",
        }}>
          {initial ? "Güncelle" : "Ekle"}
        </button>
        {initial && (
          <button onClick={onCancel} style={{
            background: "#fff8f5", color: "#9a7068",
            border: "1px solid #e8d5cc", borderRadius: "12px",
            padding: "10px 18px", fontSize: "13px", cursor: "pointer",
            fontFamily: "Inter, sans-serif",
          }}>
            İptal
          </button>
        )}
      </div>
    </div>
  );
}