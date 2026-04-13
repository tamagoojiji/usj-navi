import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { getOwnerResponses } from '../api/client';
import type { Response } from '../types';
import './OwnerDashboard.css';

const Q1_LABELS: Record<string, string> = {
  attraction: 'アトラクション', show: 'ショー', food: 'グルメ',
  greeting: 'キャラ', area: 'エリア', event: 'イベント',
};
const Q2_LABELS: Record<string, string> = { love: '大好き', ok: 'まあまあ', no: '苦手' };
const TYPE_LABELS: Record<string, string> = {
  self: '自分', spouse: '配偶者', child1: '子ども1', child2: '子ども2',
  family: '家族', companion: '同行者', other: 'その他',
};

export default function OwnerDashboard() {
  const navigate = useNavigate();
  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOwnerResponses()
      .then(setResponses)
      .catch(() => setResponses([]))
      .finally(() => setLoading(false));
  }, []);

  const submitted = responses.filter((r) => r.status === 'submitted');

  return (
    <>
      <Header />
      <div className="owner-page">
        <h2 className="owner-title">回答一覧</h2>
        <p className="owner-subtitle">あなたと家族の回答を確認できます</p>

        {loading ? (
          <p className="owner-loading">読み込み中...</p>
        ) : submitted.length === 0 ? (
          <div className="owner-empty">
            <p>まだ回答がありません</p>
            <button className="owner-cta" onClick={() => navigate('/responder')}>
              希望を入力する
            </button>
          </div>
        ) : (
          <div className="owner-list">
            {submitted.map((r) => (
              <div key={r.responseId} className="owner-card">
                <div className="owner-card-header">
                  <span className="owner-card-name">
                    {r.displayName || r.respondentLabel || TYPE_LABELS[r.respondentType]}
                  </span>
                  <span className="owner-card-type">{TYPE_LABELS[r.respondentType]}</span>
                </div>
                <p className="owner-card-time">
                  {r.submittedAt ? new Date(r.submittedAt).toLocaleString('ja-JP') : ''}
                </p>
                <div className="owner-card-summary">
                  <div className="owner-card-row">
                    <span className="owner-card-label">楽しみたい</span>
                    <span className="owner-card-value">
                      {r.q1Answers.map((v) => Q1_LABELS[v]).join(', ')}
                    </span>
                  </div>
                  <div className="owner-card-row">
                    <span className="owner-card-label">絶叫系</span>
                    <span className="owner-card-value">{Q2_LABELS[r.q2Answer]}</span>
                  </div>
                  <div className="owner-card-row">
                    <span className="owner-card-label">気になるIP</span>
                    <span className="owner-card-value">
                      {r.q3Answers.length}個選択
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="owner-actions">
          <button className="owner-action-btn" onClick={() => navigate('/family-code')}>
            ファミリーコードを発行
          </button>
        </div>
      </div>
    </>
  );
}
