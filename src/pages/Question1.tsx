import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';
import { useAnswers } from '../hooks/useAnswers';
import type { Q1Value } from '../types';

const OPTIONS = [
  { label: 'アトラクション（乗り物）', value: 'attraction', icon: '🎢' },
  { label: 'ショー・パレード', value: 'show', icon: '🎭' },
  { label: 'グルメ・食べ歩き', value: 'food', icon: '🍔' },
  { label: 'キャラクターに会いたい', value: 'greeting', icon: '🤗' },
  { label: 'エリアの世界観を楽しみたい', value: 'area', icon: '🏰' },
  { label: '季節イベント', value: 'event', icon: '🎉' },
];

export default function Question1() {
  const navigate = useNavigate();
  const { answers, updateQ1 } = useAnswers();

  return (
    <>
      <Header />
      <QuestionCard
        step={1}
        totalSteps={3}
        title="USJで特に楽しみたいものは？"
        subtitle="複数選べます！"
        options={OPTIONS}
        selected={answers.q1}
        multiple
        onSelect={(v) => updateQ1(v as Q1Value)}
        onNext={() => navigate('/q2')}
        nextDisabled={answers.q1.length === 0}
      />
    </>
  );
}
