import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import type { RespondentType } from '../types';
import './ResponderInfo.css';

const TYPES: { label: string; value: RespondentType }[] = [
  { label: '自分', value: 'self' },
  { label: '配偶者', value: 'spouse' },
  { label: '子ども1', value: 'child1' },
  { label: '子ども2', value: 'child2' },
  { label: '家族', value: 'family' },
  { label: '同行者', value: 'companion' },
  { label: 'その他', value: 'other' },
];

export default function ResponderInfo() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const isFamily = params.get('family') === 'true';

  const [type, setType] = useState<RespondentType>(isFamily ? 'family' : 'self');
  const [name, setName] = useState('');

  const handleNext = () => {
    const info = { respondentType: type, respondentLabel: name || TYPES.find(t => t.value === type)?.label || '', displayName: name };
    localStorage.setItem('usj-navi-responder', JSON.stringify(info));
    navigate('/q1');
  };

  return (
    <>
      <Header />
      <div className="responder-page">
        <h2 className="responder-title">入力者情報</h2>
        <p className="responder-subtitle">誰の希望を入力しますか？</p>

        <div className="responder-types">
          {TYPES.map((t) => (
            <button
              key={t.value}
              className={`responder-type-btn ${type === t.value ? 'selected' : ''}`}
              onClick={() => setType(t.value)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="responder-name-field">
          <label className="responder-label">表示名（任意）</label>
          <input
            type="text"
            className="responder-input"
            placeholder="例：パパ、たろう"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <button className="next-btn" onClick={handleNext}>
          質問に進む
        </button>
      </div>
    </>
  );
}
