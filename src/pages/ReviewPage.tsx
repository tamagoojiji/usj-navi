import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAnswers } from '../hooks/useAnswers';
import type { ResponderInfo } from '../types';
import { submitResponse } from '../api/client';
import './ReviewPage.css';

const Q1_LABELS: Record<string, string> = {
  attraction: 'アトラクション',
  show: 'ショー・パレード',
  food: 'グルメ・食べ歩き',
  greeting: 'キャラクターに会いたい',
  area: 'エリアの世界観',
  event: '季節イベント',
};

const Q2_LABELS: Record<string, string> = {
  love: '大好き！',
  ok: 'まあまあ',
  no: '苦手',
};

const Q3_LABELS: Record<string, string> = {
  mario: 'スーパーマリオ', donkeykong: 'ドンキーコング',
  harrypotter: 'ハリー・ポッター', minion: 'ミニオン',
  jurassic: 'ジュラシック・パーク', jaws: 'ジョーズ',
  snoopy: 'スヌーピー', hellokitty: 'ハローキティ',
  sesame: 'セサミストリート',
  conan: '名探偵コナン', jujutsu: '呪術廻戦',
  frieren: '葬送のフリーレン', monsterhunter: 'モンスターハンター',
  pokemon: 'ポケモン', kuromi: 'クロミ',
};

export default function ReviewPage() {
  const navigate = useNavigate();
  const { answers } = useAnswers();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const responderRaw = localStorage.getItem('usj-navi-responder');
  const responder: ResponderInfo = responderRaw
    ? JSON.parse(responderRaw)
    : { respondentType: 'self', respondentLabel: '自分', displayName: '' };

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    setError('');
    try {
      await submitResponse({
        respondentType: responder.respondentType,
        respondentLabel: responder.respondentLabel,
        displayName: responder.displayName,
        q1Answers: answers.q1,
        q2Answer: answers.q2!,
        q3Answers: answers.q3,
      });
      navigate('/complete');
    } catch (e) {
      setError('送信に失敗しました。もう一度お試しください。');
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="review-page">
        <h2 className="review-title">回答確認</h2>
        <p className="review-subtitle">内容を確認して送信してください</p>

        <div className="review-section">
          <h3 className="review-section-title">入力者</h3>
          <p className="review-value">
            {responder.respondentLabel || responder.respondentType}
            {responder.displayName && ` (${responder.displayName})`}
          </p>
        </div>

        <div className="review-section">
          <h3 className="review-section-title">Q1. 楽しみたいもの</h3>
          <div className="review-chips">
            {answers.q1.map((v) => (
              <span key={v} className="review-chip">{Q1_LABELS[v]}</span>
            ))}
          </div>
        </div>

        <div className="review-section">
          <h3 className="review-section-title">Q2. 絶叫系</h3>
          <p className="review-value">{answers.q2 ? Q2_LABELS[answers.q2] : '未回答'}</p>
        </div>

        <div className="review-section">
          <h3 className="review-section-title">Q3. 気になるもの</h3>
          <div className="review-chips">
            {answers.q3.map((v) => (
              <span key={v} className="review-chip">{Q3_LABELS[v] || v}</span>
            ))}
          </div>
        </div>

        {error && <p className="review-error">{error}</p>}

        <div className="review-actions">
          <button
            className="review-btn submit"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? '送信中...' : '送信する'}
          </button>
          <button
            className="review-btn back"
            onClick={() => navigate('/categories')}
          >
            カテゴリに戻る
          </button>
        </div>
      </div>
    </>
  );
}
