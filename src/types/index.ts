// 質問の回答
export interface Answers {
  q1: Q1Value[];
  q2: Q2Value | null;
  q3: string[];
}

export type Q1Value = 'attraction' | 'show' | 'food' | 'greeting' | 'area' | 'event';
export type Q2Value = 'love' | 'ok' | 'no';

// 入力者情報
export type RespondentType = 'self' | 'spouse' | 'child1' | 'child2' | 'family' | 'companion' | 'other';

export interface ResponderInfo {
  respondentType: RespondentType;
  respondentLabel: string;
  displayName: string;
}

// 回答データ
export interface Response {
  responseId: string;
  ownerId: string;
  responderLineUserId: string | null;
  respondentType: RespondentType;
  respondentLabel: string;
  displayName: string;
  q1Answers: Q1Value[];
  q2Answer: Q2Value;
  q3Answers: string[];
  status: 'draft' | 'submitted';
  submittedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// オーナー情報
export interface Owner {
  ownerId: string;
  lineUserId: string;
  displayName: string;
  familyCode: string | null;
  createdAt: string;
  updatedAt: string;
}

// 静的データ: アトラクション
export interface Attraction {
  id: string;
  name: string;
  area: string;
  type: 'ride' | 'show' | 'experience';
  thrillLevel: 'high' | 'medium' | 'low';
  indoor: boolean;
  heightRestriction: number | null;
  description: string;
  tags: string[];
  relatedIp: string[];
}

// 静的データ: レストラン
export interface Restaurant {
  id: string;
  name: string;
  area: string;
  genre: 'restaurant' | 'cafe' | 'foodcart' | 'snack';
  description: string;
  tags: string[];
  relatedIp: string[];
}

// 静的データ: ショー
export interface Show {
  id: string;
  name: string;
  area: string;
  type: 'indoor_show' | 'street_show' | 'parade' | 'greeting';
  description: string;
  tags: string[];
  relatedIp: string[];
}

// 静的データ: イベント
export interface SeasonEvent {
  id: string;
  name: string;
  period: string;
  description: string;
  tags: string[];
  relatedIp: string[];
}

// 静的データ: キャラクター
export interface Character {
  id: string;
  name: string;
  ip: string;
  area: string;
  greetingType: 'photo_opportunity' | 'free_greeting' | 'paid_greeting' | 'parade' | 'show';
  description: string;
}

// カテゴリ
export type CategoryId = 'attraction' | 'show' | 'food' | 'greeting' | 'area' | 'event';

export interface Category {
  id: CategoryId;
  label: string;
  icon: string;
  description: string;
}
