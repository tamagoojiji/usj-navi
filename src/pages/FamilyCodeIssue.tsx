import { useState } from 'react';
import Header from '../components/Header';
import { issueFamilyCode } from '../api/client';
import './FamilyCode.css';

export default function FamilyCodeIssue() {
  const [code, setCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleIssue = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await issueFamilyCode();
      setCode(result.familyCode);
    } catch {
      setError('コード発行に失敗しました');
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className="family-code-page">
        <h2 className="fc-title">ファミリーコード発行</h2>
        <p className="fc-subtitle">
          家族や同行者にこのコードを伝えてください。
          <br />
          コードを入力すると、あなたに紐づいて回答できます。
        </p>

        {code ? (
          <div className="fc-code-display">
            <p className="fc-code-label">あなたのコード</p>
            <p className="fc-code">{code}</p>
            <p className="fc-code-hint">この4桁を家族に伝えてください</p>
          </div>
        ) : (
          <button
            className="fc-issue-btn"
            onClick={handleIssue}
            disabled={loading}
          >
            {loading ? '発行中...' : 'コードを発行する'}
          </button>
        )}

        {error && <p className="fc-error">{error}</p>}
      </div>
    </>
  );
}
