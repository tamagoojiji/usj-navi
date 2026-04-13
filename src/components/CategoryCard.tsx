import { useNavigate } from 'react-router-dom';
import './CategoryCard.css';

interface Props {
  id: string;
  label: string;
  icon: string;
  description: string;
  recommended?: boolean;
}

export default function CategoryCard({ id, label, icon, description, recommended }: Props) {
  const navigate = useNavigate();

  return (
    <button
      className={`category-card ${recommended ? 'recommended' : ''}`}
      onClick={() => navigate(`/categories/${id}`)}
    >
      {recommended && <span className="category-badge">おすすめ</span>}
      <span className="category-icon">{icon}</span>
      <div className="category-info">
        <h3 className="category-label">{label}</h3>
        <p className="category-desc">{description}</p>
      </div>
      <span className="category-arrow">›</span>
    </button>
  );
}
