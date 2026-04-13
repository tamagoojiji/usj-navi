import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './CompletePage.css';

export default function CompletePage() {
  const navigate = useNavigate();
  const now = new Date().toLocaleString('ja-JP');

  return (
    <>
      <Header />
      <div className="complete-page">
        <div className="complete-icon">✓</div>
        <h2 className="complete-title">送信完了！</h2>
        <p className="complete-time">送信日時: {now}</p>
        <p className="complete-message">
          ご回答ありがとうございます。
          <br />
          内容を確認して、最適なプランをご提案します。
        </p>

        <div className="complete-actions">
          <button
            className="complete-btn primary"
            onClick={() => navigate('/owner')}
          >
            回答一覧を見る
          </button>
          <button
            className="complete-btn secondary"
            onClick={() => navigate('/family-code')}
          >
            家族コードを発行する
          </button>
          <button
            className="complete-btn tertiary"
            onClick={() => {
              localStorage.removeItem('usj-navi-answers');
              localStorage.removeItem('usj-navi-responder');
              navigate('/responder?family=true');
            }}
          >
            別の家族の入力へ進む
          </button>
        </div>
      </div>
    </>
  );
}
