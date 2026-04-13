import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isTop = location.pathname === '/';

  return (
    <header className="header">
      {!isTop && (
        <button className="header-back" onClick={() => navigate(-1)}>
          ← 戻る
        </button>
      )}
      <h1 className="header-title">USJ はじめてガイド</h1>
    </header>
  );
}
