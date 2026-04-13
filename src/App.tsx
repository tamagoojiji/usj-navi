import { Routes, Route } from 'react-router-dom';
import TopPage from './pages/TopPage';
import ResponderInfo from './pages/ResponderInfo';
import Question1 from './pages/Question1';
import Question2 from './pages/Question2';
import Question3 from './pages/Question3';
import CategoryList from './pages/CategoryList';
import SubCategory from './pages/SubCategory';
import DetailCard from './pages/DetailCard';
import ReviewPage from './pages/ReviewPage';
import CompletePage from './pages/CompletePage';
import FamilyCodeIssue from './pages/FamilyCodeIssue';
import FamilyCodeJoin from './pages/FamilyCodeJoin';
import OwnerDashboard from './pages/OwnerDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<TopPage />} />
      <Route path="/responder" element={<ResponderInfo />} />
      <Route path="/q1" element={<Question1 />} />
      <Route path="/q2" element={<Question2 />} />
      <Route path="/q3" element={<Question3 />} />
      <Route path="/categories" element={<CategoryList />} />
      <Route path="/categories/:categoryId" element={<SubCategory />} />
      <Route path="/detail/:type/:itemId" element={<DetailCard />} />
      <Route path="/review" element={<ReviewPage />} />
      <Route path="/complete" element={<CompletePage />} />
      <Route path="/family-code" element={<FamilyCodeIssue />} />
      <Route path="/family-join" element={<FamilyCodeJoin />} />
      <Route path="/owner" element={<OwnerDashboard />} />
    </Routes>
  );
}

export default App;
