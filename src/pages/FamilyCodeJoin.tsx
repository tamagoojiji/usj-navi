import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { joinFamily } from '../api/client';
import './FamilyCode.css';

export default function FamilyCodeJoin() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleJoin = async () => {
    if (code.length !== 4) {
      setError('4桁のコードを入力してください');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await joinFamily(code);
      localStorage.setItem('usj-navi-family-code', code);
      navigate('/responder?family=true');
    } catch {
      setError('コードが見つかりません。正しいコードか確認してください。');
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className="family-code-page">
        <h2 className="fc-title">家族コードを入力</h2>
        <p className="fc-subtitle">
          代表者から受け取った4桁のコードを入力してください。
        </p>

        <div className="fc-input-area">
          <input
            type="text"
            inputMode="numeric"
            maxLength={4}
            className="fc-input"
            placeholder="0000"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
          />
        </div>

        {error && <p className="fc-error">{error}</p>}

        <button
          className="fc-join-btn"
          onClick={handleJoin}
          disabled={loading || code.length !== 4}
        >
          {loading ? '確認中...' : '参加する'}
        </button>
      </div>
    </>
  );
}
