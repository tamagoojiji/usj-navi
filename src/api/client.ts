import type { Q1Value, Q2Value, RespondentType, Response } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'https://park.tamago-app.com';

function getToken(): string | null {
  return localStorage.getItem('usj-navi-token');
}

async function apiFetch(path: string, options: RequestInit = {}) {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }
  return res.json();
}

export async function submitResponse(data: {
  respondentType: RespondentType;
  respondentLabel: string;
  displayName: string;
  q1Answers: Q1Value[];
  q2Answer: Q2Value;
  q3Answers: string[];
}) {
  const familyCode = localStorage.getItem('usj-navi-family-code');
  return apiFetch('/usj-guide/responses', {
    method: 'POST',
    body: JSON.stringify({
      ...data,
      family_code: familyCode,
      status: 'submitted',
    }),
  });
}

export async function saveDraft(data: {
  responseId?: string;
  respondentType: RespondentType;
  respondentLabel: string;
  displayName: string;
  q1Answers: Q1Value[];
  q2Answer: Q2Value | null;
  q3Answers: string[];
}) {
  if (data.responseId) {
    return apiFetch(`/usj-guide/responses/${data.responseId}`, {
      method: 'PATCH',
      body: JSON.stringify({ ...data, status: 'draft' }),
    });
  }
  return apiFetch('/usj-guide/responses', {
    method: 'POST',
    body: JSON.stringify({ ...data, status: 'draft' }),
  });
}

export async function issueFamilyCode(): Promise<{ familyCode: string }> {
  return apiFetch('/usj-guide/owner/family-code', { method: 'POST' });
}

export async function joinFamily(code: string): Promise<{ ownerId: string }> {
  return apiFetch('/usj-guide/family/join', {
    method: 'POST',
    body: JSON.stringify({ family_code: code }),
  });
}

export async function getOwnerResponses(): Promise<Response[]> {
  return apiFetch('/usj-guide/owner/responses');
}
