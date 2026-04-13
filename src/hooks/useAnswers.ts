import { useState, useCallback } from 'react';
import type { Answers, Q1Value, Q2Value } from '../types';

const STORAGE_KEY = 'usj-navi-answers';

function loadAnswers(): Answers {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch { /* ignore */ }
  return { q1: [], q2: null, q3: [] };
}

function saveAnswers(answers: Answers) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
}

export function useAnswers() {
  const [answers, setAnswers] = useState<Answers>(loadAnswers);

  const updateQ1 = useCallback((value: Q1Value) => {
    setAnswers((prev) => {
      const q1 = prev.q1.includes(value)
        ? prev.q1.filter((v) => v !== value)
        : [...prev.q1, value];
      const next = { ...prev, q1 };
      saveAnswers(next);
      return next;
    });
  }, []);

  const updateQ2 = useCallback((value: Q2Value) => {
    setAnswers((prev) => {
      const next = { ...prev, q2: value };
      saveAnswers(next);
      return next;
    });
  }, []);

  const toggleQ3 = useCallback((value: string) => {
    setAnswers((prev) => {
      const q3 = prev.q3.includes(value)
        ? prev.q3.filter((v) => v !== value)
        : [...prev.q3, value];
      const next = { ...prev, q3 };
      saveAnswers(next);
      return next;
    });
  }, []);

  const resetAnswers = useCallback(() => {
    const empty: Answers = { q1: [], q2: null, q3: [] };
    setAnswers(empty);
    saveAnswers(empty);
  }, []);

  return { answers, updateQ1, updateQ2, toggleQ3, resetAnswers };
}
