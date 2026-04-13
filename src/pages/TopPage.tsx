import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './TopPage.css';

export default function TopPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="top-page">
        <div className="top-hero">
          <h2 className="top-heading">
            USJで何を楽しむ？
            <br />
            まずはここから整理しよう！
          </h2>
          <p className="top-description">
            USJには乗り物、ショー、グルメ、キャラクターなど楽しみ方がいっぱい。
            <br />
            3つの質問に答えるだけで、あなたに合った情報を整理できます。
          </p>
        </div>

        <div className="top-actions">
          <button
            className="top-btn primary"
            onClick={() => navigate('/q1')}
          >
            自分の希望を入力する
          </button>
          <button
            className="top-btn secondary"
            onClick={() => navigate('/family-join')}
          >
            家族コードを入力する
          </button>
        </div>

        <div className="top-note">
          <p>
            家族や同行者の方は、代表者から受け取った
            <strong>4桁のコード</strong>を入力してください。
          </p>
        </div>
      </div>
    </>
  );
}
