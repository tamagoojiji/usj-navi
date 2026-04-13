import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAnswers } from '../hooks/useAnswers';
import './Question3.css';

const REGULAR_IPS = [
  { label: 'スーパーマリオ', value: 'mario', icon: '🍄' },
  { label: 'ドンキーコング', value: 'donkeykong', icon: '🦍' },
  { label: 'ハリー・ポッター', value: 'harrypotter', icon: '⚡' },
  { label: 'ミニオン', value: 'minion', icon: '🟡' },
  { label: 'ジュラシック・パーク（恐竜）', value: 'jurassic', icon: '🦖' },
  { label: 'ジョーズ（サメ）', value: 'jaws', icon: '🦈' },
  { label: 'スヌーピー（PEANUTS）', value: 'snoopy', icon: '🐕' },
  { label: 'ハローキティ', value: 'hellokitty', icon: '🎀' },
  { label: 'セサミストリート', value: 'sesame', icon: '🔴' },
];

const LIMITED_IPS = [
  { label: '名探偵コナン', value: 'conan', icon: '🔍' },
  { label: '呪術廻戦', value: 'jujutsu', icon: '👁' },
  { label: '葬送のフリーレン', value: 'frieren', icon: '✨' },
  { label: 'モンスターハンター', value: 'monsterhunter', icon: '🐉' },
  { label: 'ポケモン', value: 'pokemon', icon: '⚡' },
  { label: 'クロミ', value: 'kuromi', icon: '💜' },
];

export default function Question3() {
  const navigate = useNavigate();
  const { answers, toggleQ3 } = useAnswers();

  return (
    <>
      <Header />
      <div className="q3-page">
        <div className="question-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '100%' }} />
          </div>
          <span className="progress-text">3 / 3</span>
        </div>

        <h2 className="question-title">気になるものにチェック！</h2>
        <p className="question-subtitle">複数選べます。USJにはこんなものがあります！</p>

        <div className="q3-section">
          <h3 className="q3-section-title">定番で気になるもの</h3>
          <div className="q3-grid">
            {REGULAR_IPS.map((ip) => {
              const isSelected = answers.q3.includes(ip.value);
              return (
                <button
                  key={ip.value}
                  className={`q3-chip ${isSelected ? 'selected' : ''}`}
                  onClick={() => toggleQ3(ip.value)}
                >
                  <span className="q3-chip-icon">{ip.icon}</span>
                  <span className="q3-chip-label">{ip.label}</span>
                  {isSelected && <span className="q3-chip-check">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        <div className="q3-section">
          <h3 className="q3-section-title">期間限定・コラボで気になるもの</h3>
          <div className="q3-grid">
            {LIMITED_IPS.map((ip) => {
              const isSelected = answers.q3.includes(ip.value);
              return (
                <button
                  key={ip.value}
                  className={`q3-chip ${isSelected ? 'selected' : ''}`}
                  onClick={() => toggleQ3(ip.value)}
                >
                  <span className="q3-chip-icon">{ip.icon}</span>
                  <span className="q3-chip-label">{ip.label}</span>
                  {isSelected && <span className="q3-chip-check">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        <button
          className="next-btn"
          onClick={() => navigate('/categories')}
          disabled={answers.q3.length === 0}
        >
          結果を見る
        </button>
      </div>
    </>
  );
}
