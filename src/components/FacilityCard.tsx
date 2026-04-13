import './FacilityCard.css';

interface Props {
  name: string;
  description: string;
  area: string;
  tags: string[];
  isInterested?: boolean;
  onClick?: () => void;
  badge?: string;
  image?: string | null;
}

export default function FacilityCard({
  name,
  description,
  area,
  tags,
  isInterested,
  onClick,
  badge,
  image,
}: Props) {
  const basePath = import.meta.env.BASE_URL;

  return (
    <button className={`facility-card ${image ? 'has-image' : ''}`} onClick={onClick}>
      {image && (
        <div className="facility-image-wrap">
          <img
            className="facility-image"
            src={`${basePath}${image.replace(/^\//, '')}`}
            alt={name}
            loading="lazy"
          />
        </div>
      )}
      <div className="facility-content">
        {isInterested && <span className="facility-star">★ 気になる</span>}
        {badge && <span className="facility-badge">{badge}</span>}
        <h4 className="facility-name">{name}</h4>
        <p className="facility-area">{area}</p>
        <p className="facility-desc">{description}</p>
        {tags.length > 0 && (
          <div className="facility-tags">
            {tags.map((tag) => (
              <span key={tag} className="facility-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}
