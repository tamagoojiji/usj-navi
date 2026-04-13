import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';
import { useAnswers } from '../hooks/useAnswers';
import type { Q2Value } from '../types';

const OPTIONS = [
  { label: '大好き！ガンガン乗りたい！', value: 'love', icon: '🔥' },
  { label: 'まあまあ、ものによる', value: 'ok', icon: '🤔' },
  { label: '苦手…ゆったり楽しみたい', value: 'no', icon: '😌' },
];

export default function Question2() {
  const navigate = useNavigate();
  const { answers, updateQ2 } = useAnswers();

  const handleSelect = (value: string) => {
    updateQ2(value as Q2Value);
  };

  return (
    <>
      <Header />
      <QuestionCard
        step={2}
        totalSteps={3}
        title="絶叫系はどんな感じ？"
        options={OPTIONS}
        selected={answers.q2 ? [answers.q2] : []}
        onSelect={handleSelect}
        onNext={() => navigate('/q3')}
        nextDisabled={!answers.q2}
      />
    </>
  );
}
