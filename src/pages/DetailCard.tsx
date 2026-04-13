import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { useAnswers } from '../hooks/useAnswers';
import attractionsData from '../data/attractions.json';
import restaurantsData from '../data/restaurants.json';
import showsData from '../data/shows.json';
import type { Attraction, Restaurant, Show } from '../types';
import './DetailCard.css';

export default function DetailCard() {
  const { type, itemId } = useParams<{ type: string; itemId: string }>();
  const { answers } = useAnswers();

  if (type === 'attraction') {
    const item = (attractionsData as Attraction[]).find((a) => a.id === itemId);
    if (!item) return <><Header /><p className="detail-notfound">見つかりません</p></>;
    const interested = item.relatedIp.some((ip) => answers.q3.includes(ip));
    return (
      <>
        <Header />
        <div className="detail-page">
          {item.image && (
            <img
              className="detail-hero-image"
              src={`${import.meta.env.BASE_URL}${item.image.replace(/^\//, '')}`}
              alt={item.name}
            />
          )}
          {interested && <div className="detail-interested">★ あなたが気になるIPに関連！</div>}
          <h2 className="detail-name">{item.name}</h2>
          <p className="detail-area">{item.area}</p>
          <p className="detail-desc">{item.description}</p>
          <div className="detail-info-grid">
            <div className="detail-info-item">
              <span className="detail-info-label">タイプ</span>
              <span className="detail-info-value">
                {item.type === 'ride' ? 'ライド' : item.type === 'show' ? 'ショー' : '体験型'}
              </span>
            </div>
            <div className="detail-info-item">
              <span className="detail-info-label">スリル</span>
              <span className="detail-info-value">
                {item.thrillLevel === 'high' ? '絶叫' : item.thrillLevel === 'medium' ? 'ほどよい' : 'おだやか'}
              </span>
            </div>
            <div className="detail-info-item">
              <span className="detail-info-label">屋内/屋外</span>
              <span className="detail-info-value">{item.indoor ? '屋内' : '屋外'}</span>
            </div>
            {item.heightRestriction && (
              <div className="detail-info-item">
                <span className="detail-info-label">身長制限</span>
                <span className="detail-info-value">{item.heightRestriction}cm以上</span>
              </div>
            )}
          </div>
          {item.tags.length > 0 && (
            <div className="detail-tags">
              {item.tags.map((tag) => (
                <span key={tag} className="detail-tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </>
    );
  }

  if (type === 'restaurant') {
    const item = (restaurantsData as Restaurant[]).find((r) => r.id === itemId);
    if (!item) return <><Header /><p className="detail-notfound">見つかりません</p></>;
    return (
      <>
        <Header />
        <div className="detail-page">
          <h2 className="detail-name">{item.name}</h2>
          <p className="detail-area">{item.area}</p>
          <p className="detail-desc">{item.description}</p>
          <div className="detail-info-grid">
            <div className="detail-info-item">
              <span className="detail-info-label">タイプ</span>
              <span className="detail-info-value">
                {item.genre === 'restaurant' ? 'レストラン' :
                 item.genre === 'cafe' ? 'カフェ' :
                 item.genre === 'foodcart' ? 'フードカート' : 'スナック'}
              </span>
            </div>
          </div>
          {item.tags.length > 0 && (
            <div className="detail-tags">
              {item.tags.map((tag) => (
                <span key={tag} className="detail-tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </>
    );
  }

  if (type === 'show') {
    const item = (showsData as Show[]).find((s) => s.id === itemId);
    if (!item) return <><Header /><p className="detail-notfound">見つかりません</p></>;
    return (
      <>
        <Header />
        <div className="detail-page">
          <h2 className="detail-name">{item.name}</h2>
          <p className="detail-area">{item.area}</p>
          <p className="detail-desc">{item.description}</p>
          <div className="detail-info-grid">
            <div className="detail-info-item">
              <span className="detail-info-label">タイプ</span>
              <span className="detail-info-value">
                {item.type === 'indoor_show' ? '屋内ショー' :
                 item.type === 'street_show' ? 'ストリートショー' :
                 item.type === 'parade' ? 'パレード' : 'グリーティング'}
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }

  return <><Header /><p className="detail-notfound">見つかりません</p></>;
}
