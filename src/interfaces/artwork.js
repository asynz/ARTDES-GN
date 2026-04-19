export const createArtwork = ({ title, artist, category, customCategory, status, rating, notes }) => ({
  id: Date.now(),
  title,
  artist,
  category,
  customCategory: customCategory || "",
  status,
  rating: Number(rating),
  notes: notes || "",
});