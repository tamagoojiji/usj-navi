import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import FacilityCard from '../components/FacilityCard';
import { useAnswers } from '../hooks/useAnswers';
import attractionsData from '../data/attractions.json';
import restaurantsData from '../data/restaurants.json';
import showsData from '../data/shows.json';
import eventsData from '../data/events.json';
import charactersData from '../data/characters.json';
import type { Attraction, Restaurant, Show, SeasonEvent, Character } from '../types';
import './SubCategory.css';

const AREA_LIST = [
  { id: 'nintendo', name: 'スーパー・ニンテンドー・ワールド', icon: '🍄', description: 'マリオやルイージの世界に飛び込もう！マリオカートやヨッシー・アドベンチャーが楽しめます。' },
  { id: 'donkeykong', name: 'ドンキーコング・カントリー', icon: '🦍', description: '2024年12月オープンの新エリア！ジャングルの中をトロッコで駆け抜けるライドが目玉。' },
  { id: 'harrypotter', name: 'ウィザーディング・ワールド・オブ・ハリー・ポッター', icon: '⚡', description: 'ホグワーツ城がそびえる魔法の世界。バタービールも飲めます。' },
  { id: 'minion', name: 'ミニオン・パーク', icon: '🟡', description: 'ミニオンたちのハチャメチャな世界。お子さまにも大人気。' },
  { id: 'hollywood', name: 'ハリウッド・エリア', icon: '🎬', description: 'パークの入口。絶叫コースターや映画テーマのショーが集まるエリア。' },
  { id: 'newyork', name: 'ニューヨーク・エリア', icon: '🗽', description: 'ニューヨークの街並みを再現。ストリートショーやレストランが充実。' },
  { id: 'sanfrancisco', name: 'サンフランシスコ・エリア', icon: '🌉', description: '港町の雰囲気。中華やカフェでゆっくりできます。' },
  { id: 'jurassic', name: 'ジュラシック・パーク', icon: '🦖', description: '恐竜の世界。フライング・ダイナソーはUSJ最強の絶叫ライド！' },
  { id: 'amity', name: 'アミティ・ビレッジ', icon: '🦈', description: '映画ジョーズの世界。ボートに乗ってサメから逃げよう！' },
  { id: 'waterworld', name: 'ウォーターワールド', icon: '💧', description: '大迫力の水上スタントショー。爆発や水しぶきが圧巻！' },
  { id: 'wonderland', name: 'ユニバーサル・ワンダーランド', icon: '🎪', description: '小さなお子さま向けエリア。スヌーピーやハローキティに会えます。' },
];

function getThrillBadge(level: string) {
  if (level === 'high') return '絶叫';
  if (level === 'medium') return 'ほどよいスリル';
  return undefined;
}

export default function SubCategory() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { answers } = useAnswers();

  const isInterested = (relatedIp: string[]) =>
    relatedIp.some((ip) => answers.q3.includes(ip));

  const sortByInterest = <T extends { relatedIp: string[] }>(items: T[]): T[] =>
    [...items].sort((a, b) => {
      const aMatch = isInterested(a.relatedIp);
      const bMatch = isInterested(b.relatedIp);
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return 0;
    });

  if (categoryId === 'attraction') {
    const attractions = sortByInterest(attractionsData as Attraction[]);
    // Q2でフィルタ: 絶叫苦手なら絶叫系を下位に
    if (answers.q2 === 'no') {
      attractions.sort((a, b) => {
        if (a.thrillLevel === 'high' && b.thrillLevel !== 'high') return 1;
        if (a.thrillLevel !== 'high' && b.thrillLevel === 'high') return -1;
        return 0;
      });
    }
    return (
      <>
        <Header />
        <div className="sub-page">
          <h2 className="sub-title">アトラクション</h2>
          <p className="sub-count">{attractions.length}件</p>
          <div className="sub-list">
            {attractions.map((a, i) => (
              <div key={a.id} style={{ animationDelay: `${i * 0.03}s` }}>
                <FacilityCard
                  name={a.name}
                  description={a.description}
                  area={a.area}
                  tags={[
                    a.type === 'ride' ? 'ライド' : a.type === 'show' ? 'ショー' : '体験',
                    a.indoor ? '屋内' : '屋外',
                    ...(a.heightRestriction ? [`身長${a.heightRestriction}cm〜`] : []),
                  ]}
                  isInterested={isInterested(a.relatedIp)}
                  badge={getThrillBadge(a.thrillLevel)}
                  onClick={() => navigate(`/detail/attraction/${a.id}`)}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (categoryId === 'food') {
    const restaurants = sortByInterest(restaurantsData as Restaurant[]);
    return (
      <>
        <Header />
        <div className="sub-page">
          <h2 className="sub-title">フード・レストラン</h2>
          <p className="sub-count">{restaurants.length}件</p>
          <div className="sub-list">
            {restaurants.map((r, i) => (
              <div key={r.id} style={{ animationDelay: `${i * 0.03}s` }}>
                <FacilityCard
                  name={r.name}
                  description={r.description}
                  area={r.area}
                  tags={[
                    r.genre === 'restaurant' ? 'レストラン' :
                    r.genre === 'cafe' ? 'カフェ' :
                    r.genre === 'foodcart' ? 'フードカート' : 'スナック',
                  ]}
                  isInterested={isInterested(r.relatedIp)}
                  onClick={() => navigate(`/detail/restaurant/${r.id}`)}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (categoryId === 'show') {
    const shows = sortByInterest(showsData as Show[]);
    return (
      <>
        <Header />
        <div className="sub-page">
          <h2 className="sub-title">ショー・パレード</h2>
          <p className="sub-count">{shows.length}件</p>
          <div className="sub-list">
            {shows.map((s, i) => (
              <div key={s.id} style={{ animationDelay: `${i * 0.03}s` }}>
                <FacilityCard
                  name={s.name}
                  description={s.description}
                  area={s.area}
                  tags={[
                    s.type === 'indoor_show' ? '屋内ショー' :
                    s.type === 'street_show' ? 'ストリートショー' :
                    s.type === 'parade' ? 'パレード' : 'グリーティング',
                  ]}
                  isInterested={isInterested(s.relatedIp)}
                  onClick={() => navigate(`/detail/show/${s.id}`)}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (categoryId === 'greeting') {
    const characters = [...(charactersData as Character[])].sort((a, b) => {
      const aMatch = answers.q3.includes(a.ip);
      const bMatch = answers.q3.includes(b.ip);
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return 0;
    });
    return (
      <>
        <Header />
        <div className="sub-page">
          <h2 className="sub-title">キャラクターグリーティング</h2>
          <p className="sub-count">{characters.length}キャラ</p>
          <div className="sub-list">
            {characters.map((c, i) => (
              <div key={c.id} style={{ animationDelay: `${i * 0.03}s` }}>
                <FacilityCard
                  name={c.name}
                  description={c.description}
                  area={c.area}
                  tags={[
                    c.greetingType === 'photo_opportunity' ? 'フォトスポット' :
                    c.greetingType === 'free_greeting' ? 'フリーグリーティング' :
                    c.greetingType === 'paid_greeting' ? '有料グリーティング' :
                    c.greetingType === 'parade' ? 'パレード出演' : 'ショー出演',
                    ...(c.members && c.members.length > 0 ? c.members : []),
                  ]}
                  isInterested={answers.q3.includes(c.ip)}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (categoryId === 'event') {
    const events = sortByInterest(eventsData as SeasonEvent[]);
    return (
      <>
        <Header />
        <div className="sub-page">
          <h2 className="sub-title">季節イベント</h2>
          <p className="sub-count">{events.length}件</p>
          <div className="sub-list">
            {events.map((e, i) => (
              <div key={e.id} style={{ animationDelay: `${i * 0.03}s` }}>
                <FacilityCard
                  name={e.name}
                  description={e.description}
                  area={e.period}
                  tags={e.tags}
                  isInterested={isInterested(e.relatedIp)}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (categoryId === 'area') {
    return (
      <>
        <Header />
        <div className="sub-page">
          <h2 className="sub-title">エリア紹介</h2>
          <p className="sub-count">{AREA_LIST.length}エリア</p>
          <div className="sub-list">
            {AREA_LIST.map((area, i) => (
              <div key={area.id} style={{ animationDelay: `${i * 0.03}s` }}>
                <FacilityCard
                  name={`${area.icon} ${area.name}`}
                  description={area.description}
                  area=""
                  tags={[]}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="sub-page">
        <p>カテゴリが見つかりません</p>
      </div>
    </>
  );
}
