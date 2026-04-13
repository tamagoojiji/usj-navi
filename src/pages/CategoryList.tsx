import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import CategoryCard from '../components/CategoryCard';
import { useAnswers } from '../hooks/useAnswers';
import type { Q1Value } from '../types';
import './CategoryList.css';

interface CategoryDef {
  id: string;
  label: string;
  icon: string;
  description: string;
  q1Key: Q1Value;
}

const ALL_CATEGORIES: CategoryDef[] = [
  { id: 'attraction', label: 'アトラクション', icon: '🎢', description: '乗り物・ライド・体験型アトラクション', q1Key: 'attraction' },
  { id: 'show', label: 'ショー・パレード', icon: '🎭', description: '屋内ショー・ストリートショー・パレード', q1Key: 'show' },
  { id: 'food', label: 'フード・レストラン', icon: '🍔', description: 'レストラン・カフェ・食べ歩きフード', q1Key: 'food' },
  { id: 'greeting', label: 'キャラクターグリーティング', icon: '🤗', description: 'キャラクターに会える場所・撮影スポット', q1Key: 'greeting' },
  { id: 'area', label: 'エリア紹介', icon: '🏰', description: '11のテーマエリアの世界観を紹介', q1Key: 'area' },
  { id: 'event', label: '季節イベント', icon: '🎉', description: '今開催中のイベント・期間限定コラボ', q1Key: 'event' },
];

export default function CategoryList() {
  const navigate = useNavigate();
  const { answers } = useAnswers();

  // Q1の回答に応じてカテゴリの表示順を変更
  const sorted = [...ALL_CATEGORIES].sort((a, b) => {
    const aSelected = answers.q1.includes(a.q1Key);
    const bSelected = answers.q1.includes(b.q1Key);
    if (aSelected && !bSelected) return -1;
    if (!aSelected && bSelected) return 1;
    return 0;
  });

  return (
    <>
      <Header />
      <div className="category-list-page">
        <div className="category-list-header">
          <h2 className="category-list-title">あなた向けのUSJガイド</h2>
          <p className="category-list-subtitle">
            気になるカテゴリをタップして詳しく見てみよう！
          </p>
        </div>
        <div className="category-list">
          {sorted.map((cat, i) => (
            <div key={cat.id} style={{ animationDelay: `${i * 0.05}s` }}>
              <CategoryCard
                id={cat.id}
                label={cat.label}
                icon={cat.icon}
                description={cat.description}
                recommended={answers.q1.includes(cat.q1Key)}
              />
            </div>
          ))}
        </div>

        <button
          className="category-submit-btn"
          onClick={() => navigate('/review')}
        >
          回答を確認・送信する
        </button>
      </div>
    </>
  );
}
