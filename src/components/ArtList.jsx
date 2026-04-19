import ArtCard from "./ArtCard";

export default function ArtList({ artworks, onDelete, onEdit, categoryIcons }) {
  return artworks.map(a => (
    <ArtCard key={a.id} artwork={a} onDelete={onDelete} onEdit={onEdit} categoryIcons={categoryIcons} />
  ));
}