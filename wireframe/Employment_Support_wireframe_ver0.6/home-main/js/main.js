const P = {
  home: '<path d="M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
  route: '<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h7a3 3 0 000-6H9a3 3 0 010-6h7"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',
  bell: '<path d="M6 16v-5a6 6 0 0112 0v5l2 2H4zM10 21h4"/>',
  chev: '<path d="M9 6l6 6-6 6"/>',
  check: '<path d="M5 12l5 5 9-10"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  minus: '<path d="M6 12h12"/>',
  ext: '<path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6"/>',
  award: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/>',
  folder: '<path d="M3 6h6l2 2h10v11H3z"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>',
  file: '<path d="M6 3h8l4 4v14H6zM14 3v4h4"/>',
  spark: '<path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>'
};

const I = (n, c = '') => `<svg class="i ${c}" viewBox="0 0 24 24" aria-hidden="true">${P[n]}</svg>`;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const hv = (p, w) => p.skills.toLowerCase().includes(w.toLowerCase());
const eduOk = p => p.edu && p.edu !== '대학교 재학';
const C = (k, need, req, test, t, d, w) => ({ k, need, req, test, t, d, w });

const CO = [
  {
    id: 's', n: '삼성전자', j: '반도체 엔지니어', l: 'S', c: [
      C('학력', '대졸 이상', 1, p => eduOk(p), '졸업 요건 확인', '졸업 예정 시점과 지원 가능 시기 확인', 1),
      C('학점', '3.0 이상', 1, p => p.gpa === '' ? null : +p.gpa >= 3, '학점 보완 계획', '남은 학기 성적 향상 및 대체 경험 정리', 8),
      C('영어 점수', 'TOEIC 750 이상', 1, p => +p.toeic >= 750, 'TOEIC 750 달성', '약점 파트 분석 후 주 단위 모의고사 반복', 8),
      C('자격증', '관련 자격증 보유', 0, p => p.cert.trim() !== '', '관련 자격증 취득 준비', '시행기관 공식 응시 조건과 시험 일정 확인 후 준비', 8),
      C('보유 기술', 'Python 활용', 0, p => hv(p, 'python'), 'Python 실무 학습', '데이터 처리 중심 미니 프로젝트 진행', 6)
    ]
  },
  {
    id: 'n', n: '네이버', j: '서비스 기획', l: 'N', c: [
      C('학력', '대졸 이상', 1, p => eduOk(p), '졸업 요건 확인', '졸업 예정 시점과 지원 가능 시기 확인', 1),
      C('영어 점수', 'TOEIC 700 이상', 1, p => +p.toeic >= 700, 'TOEIC 700 달성', '약점 파트 분석 후 주 단위 모의고사 반복', 6),
      C('보유 기술', 'SQL 활용', 0, p => hv(p, 'sql'), 'SQL 기초 학습', '실제 서비스 로그 데이터로 쿼리 연습', 4),
      C('보유 기술', '데이터 분석 경험', 0, p => hv(p, '분석'), '데이터 분석 경험 쌓기', '서비스 지표 분석 리포트 1건 작성', 6)
    ]
  },
  {
    id: 'k', n: '카카오', j: '백엔드 개발자', l: 'K', c: [
      C('학력', '대졸 이상', 1, p => eduOk(p), '졸업 요건 확인', '졸업 예정 시점과 지원 가능 시기 확인', 1),
      C('보유 기술', 'Python·Java 중 1개 이상', 1, p => hv(p, 'python') || hv(p, 'java'), '백엔드 언어 학습', '언어 기초 후 REST API 서버 구현', 10),
      C('자격증', '정보처리기사 우대', 0, p => hv({ skills: p.cert }, '정보처리'), '정보처리기사 준비', '시행기관 공식 응시 조건과 일정 확인 후 준비', 10),
      C('보유 기술', 'SQL 활용', 0, p => hv(p, 'sql'), 'SQL 기초 학습', '서버 프로젝트에 DB 연동 포함', 4)
    ]
  }
];


// 직업 계열별 기업 예시 데이터 (실제 채용 조건은 공식 공고 확인 필요)
CO.forEach(c => {
  c.cat = /엔지니어|개발자/.test(c.j) ? 'IT·개발' : '기획' ;
});
CO.push(
 {id:'h',n:'현대자동차',j:'자동차 연구개발',l:'H',cat:'공학·기술',c:[C('학력','관련 전공 학사 이상',1,p=>eduOk(p),'전공·졸업 요건 확인','지원 직무의 전공 및 학력 조건을 공식 공고에서 확인',1),C('영어 점수','공인영어 성적',0,p=>+p.toeic>=700,'영어 역량 보완','공고에서 인정하는 시험과 기준 점수 확인',5),C('보유 기술','관련 설계·개발 경험',0,p=>!!p.skills.trim(),'직무 프로젝트 정리','설계 또는 개발 결과물을 포트폴리오로 정리',7)]},
 {id:'l',n:'LG전자',j:'제품·HW 개발',l:'L',cat:'공학·기술',c:[C('학력','대졸 이상',1,p=>eduOk(p),'졸업 요건 확인','졸업 예정 시점과 지원 가능 시기 확인',1),C('영어 점수','TOEIC 700 이상(예시)',0,p=>+p.toeic>=700,'영어 점수 보완','공식 공고의 인정 시험과 기준 확인',5),C('보유 기술','개발 관련 기술',0,p=>!!p.skills.trim(),'기술 경험 정리','직무 관련 실습과 프로젝트 기록',7)]},
 {id:'c',n:'CJ제일제당',j:'마케팅·브랜드',l:'C',cat:'마케팅·콘텐츠',c:[C('학력','대졸 이상',1,p=>eduOk(p),'졸업 요건 확인','지원 가능 학력과 졸업 시점 확인',1),C('영어 점수','공인영어 성적',0,p=>+p.toeic>=700,'어학 역량 보완','공고의 어학 우대 기준 확인',5),C('보유 기술','마케팅 프로젝트 경험',0,p=>!!p.skills.trim(),'마케팅 사례 정리','캠페인 기획과 성과를 사례로 정리',7)]},
 {id:'skt',n:'SK텔레콤',j:'서비스 기획',l:'S',cat:'기획·전략',c:[C('학력','대졸 이상',1,p=>eduOk(p),'졸업 요건 확인','졸업 예정 시점과 지원 가능 시기 확인',1),C('영어 점수','TOEIC 700 이상(예시)',0,p=>+p.toeic>=700,'영어 역량 보완','공고의 기준 점수 확인',5),C('보유 기술','데이터 분석·기획 경험',0,p=>!!p.skills.trim(),'서비스 기획 사례 정리','문제 정의와 개선안을 문서화',7)]},
 {id:'sh',n:'신한은행',j:'금융·데이터 분석',l:'S',cat:'금융·회계',c:[C('학력','대졸 이상',1,p=>eduOk(p),'졸업 요건 확인','지원 자격의 학력 기준 확인',1),C('영어 점수','공인영어 성적',0,p=>+p.toeic>=700,'어학 역량 보완','공고의 인정 시험 확인',5),C('자격증','금융·데이터 관련 자격',0,p=>!!p.cert.trim(),'관련 자격 검토','직무와 연결되는 자격 및 우대사항 확인',7)]},
 {id:'p',n:'아모레퍼시픽',j:'브랜드 마케팅',l:'A',cat:'마케팅·콘텐츠',c:[C('학력','대졸 이상',1,p=>eduOk(p),'졸업 요건 확인','지원 자격 확인',1),C('영어 점수','공인영어 성적',0,p=>+p.toeic>=700,'어학 역량 보완','공식 공고 기준 확인',5),C('보유 기술','콘텐츠·마케팅 경험',0,p=>!!p.skills.trim(),'캠페인 사례 정리','기획 의도와 성과를 포트폴리오로 작성',7)]},
 {id:'kakaoent',n:'카카오엔터테인먼트',j:'콘텐츠 기획',l:'K',cat:'마케팅·콘텐츠',c:[C('학력','대졸 이상',1,p=>eduOk(p),'졸업 요건 확인','공식 공고의 학력 기준 확인',1),C('영어 점수','어학 역량',0,p=>+p.toeic>=700,'어학 역량 보완','직무에서 요구하는 언어 역량 확인',5),C('보유 기술','콘텐츠 기획 경험',0,p=>!!p.skills.trim(),'콘텐츠 기획안 작성','타깃·콘셉트·운영안을 구체화',7)]},
 {id:'han',n:'한화시스템',j:'시스템 엔지니어',l:'H',cat:'공학·기술',c:[C('학력','관련 전공 학사 이상',1,p=>eduOk(p),'학력 요건 확인','공식 공고의 전공 및 학력 기준 확인',1),C('영어 점수','공인영어 성적',0,p=>+p.toeic>=700,'영어 역량 보완','공고에서 인정하는 기준 확인',5),C('보유 기술','시스템 개발 경험',0,p=>!!p.skills.trim(),'기술 프로젝트 정리','프로젝트에서 맡은 역할과 결과 기록',7)]}
);

const S = { s: 'home', dr: null, cc: 'IT', p: { edu: '', gpa: '', cert: '', toeic: '', skills: '' }, co: null, saved: {}, done: {}, hrs: 10, tgt: 6, activeTask: 0, feedback: '', roadmaps: [], activeRoadmap: null, jobCat: '전체' };
const filled = () => Object.values(S.p).filter(v => v !== '').length;
const ready = () => S.p.edu && S.p.toeic;
const ev = c => c.c.map(x => ({ x, ok: x.test(S.p) }));
const lvl = r => r.some(e => e.x.req && e.ok === false) ? 'bd' : r.some(e => !e.x.req && e.ok) ? 'ok' : 'wn';
const LB = { ok: '안정', wn: '소신', bd: '위험' };
const stIc = o => o === true ? `<span class="st ok">${I('check')}</span>` : o === false ? `<span class="st bd">${I('x')}</span>` : `<span class="st n">${I('minus')}</span>`;
const row = (ic, t, s, oc, extra = '') => `<button class="row" onclick="${oc}"><span class="ic">${I(ic)}</span><span class="cp"><b>${t}</b><small>${s}</small></span>${extra || I('chev')}</button>`;

const tasks = () => {
  const c = CO.find(z => z.id === S.co);
  if (!c) return [];
  const r = ev(c).filter(e => e.ok === false).sort((a, b) => b.x.req - a.x.req).map(e => ({ id: c.id + e.x.t, t: e.x.t, d: e.x.d, w: e.x.w, q: e.x.req }));
  r.push({ id: c.id + 'pf', t: c.j + ' 포트폴리오 제작', d: '직무 관련 주제 선정 → 결과물 구성 → 완료 기준 점검', w: 8, q: 0 });
  let cum = 0;
  return r.map(t => {
    cum += Math.ceil(t.w * 10 / S.hrs);
    return { ...t, m: Math.ceil(cum / 4) };
  });
};

const V = {
  home() { return homeNew(); },
  homeOld() {
    return `<h1>내 역량에 맞는 취업 준비,<br>지금 시작해 보세요.</h1><p class="sub">보유 역량과 실제 채용공고를 비교해 필요한 준비를 확인해요.</p>
<div class="hero"><h2>내 취업 경쟁력 확인하기</h2><p>학력, 자격증, 영어 점수를 입력하면 목표 기업의 지원 조건과 비교해 드려요.</p><button class="btn inv" onclick="go('profile')">${ready() ? '내 역량 수정하기' : '내 역량 입력하기'}${I('chev')}</button></div>
<div class="card"><div class="hr"><h2>나의 취업 준비 현황</h2><span class="pill ${Object.keys(S.saved).length ? '' : 'n'}">${Object.keys(S.saved).length ? '분석 완료' : '분석 전'}</span></div><div class="grid"><div class="met"><small>등록한 역량</small><b>${filled()}개</b><small>${filled() ? '입력한 항목 수' : '정보를 입력해 주세요'}</small></div><div class="met"><small>분석한 기업</small><b>${Object.keys(S.saved).length}곳</b><small>${Object.keys(S.saved).length ? '결과는 마이페이지에 저장' : '목표 기업을 선택하세요'}</small></div></div></div>
<div class="sec">빠른 메뉴</div><div class="card" style="padding:4px 16px">${row('search', '기업별 지원 조건 분석', '채용공고와 내 역량 비교하기', "go('analysis')")}${row('route', '맞춤형 취업 로드맵', '부족한 역량을 단계별로 준비하기', "go('roadmap')")}${row('file', '정보 출처 확인', '채용공고 원문과 공식 자격증 정보', "go('sources')")}</div>
<div class="sec">분석할 수 있는 기업</div><div class="card" style="padding:4px 16px">${CO.map(c => row('x', '', '', '').replace(/<button.*<\/button>/, `<button class="row" onclick="pick('${c.id}');go('analysis')"><span class="ic">${c.l}</span><span class="cp"><b>${c.n}</b><small>${c.j}</small></span><span class="pill">공고 보기</span></button>`)).join('')}</div>
<div class="note">기업과 채용공고는 화면 구성을 위한 예시 데이터예요.</div>`;
  },
  profile() {
    const p = S.dr || S.p, o = (v, l) => `<option ${p.edu === v ? 'selected' : ''} value="${v}">${l || v}</option>`;
    return stp(1) + `<h1>내 역량 정보 입력</h1><p class="sub">입력한 정보로 채용 조건 충족도를 분석해요. 별표(*) 항목은 꼭 입력해 주세요.</p>
<div class="card"><div class="f"><label for="pe">학력 *</label><select id="pe">${o('', '선택해 주세요')}${o('대학교 재학')}${o('졸업 예정')}${o('졸업')}</select></div>
<div class="f"><label for="pg">학점 <em>(선택, 4.5 만점)</em></label><input id="pg" type="number" step="0.01" min="0" max="4.5" placeholder="예: 3.8" value="${esc(p.gpa)}"></div>
<div class="f"><label for="pt">공인영어 점수 * <em>(TOEIC)</em></label><input id="pt" type="number" min="0" max="990" placeholder="예: 850" value="${esc(p.toeic)}"></div>
${certUI()}
<div class="f"><label for="ps">보유 기술 <em>(쉼표로 구분)</em></label><input id="ps" placeholder="예: Python, SQL" value="${esc(p.skills)}"></div></div>
<div class="err" id="er" role="alert"></div><div class="cta"><button class="btn" onclick="saveP()">저장하고 기업 선택하기${I('chev')}</button></div>`;
  },
  analysis() {
    const c = CO.find(z => z.id === S.co);
    return stp(2) + `<h1>기업별 지원 조건 분석</h1><p class="sub">목표 기업과 직무를 고르면 채용공고 조건을 확인할 수 있어요.</p>
<div class="card"><div class="f" style="margin-top:0"><label for="q">기업 또는 직무 검색</label><input id="q" placeholder="기업명 또는 직무를 입력하세요" oninput="fl(this.value)"></div>
<div class="chips job-cats">${['전체',...new Set(CO.map(z=>z.cat))].map(k=>`<button class="chip ${S.jobCat===k?'on':''}" onclick="S.jobCat='${k}';render()">${k}</button>`).join('')}</div>
${CO.filter(z=>S.jobCat==='전체'||z.cat===S.jobCat).map(z => `<button class="row ${S.co === z.id ? 'sel' : ''}" data-t="${z.n} ${z.j}" onclick="pick('${z.id}');render()"><span class="ic">${z.l}</span><span class="cp"><b>${z.n}</b><small>${z.j}</small></span><span class="rd ${S.co === z.id ? 'on' : ''}">${S.co === z.id ? I('check') : ''}</span></button>`).join('')}</div>
${c ? `<div class="card"><div class="hr"><h2>${c.n} 지원 조건</h2><span class="pill n">확인일 2026-11-03 (예시)</span></div>${ev(c).map(e => `<div class="chk">${ready() ? stIc(e.ok) : stIc(null)}<span class="cp"><b>${e.x.k} · ${e.x.need}</b><small>${e.x.req ? '필수 조건' : '우대 조건'}</small></span></div>`).join('')}${ready() ? '' : '<div class="note">내 역량을 입력하면 충족 여부가 표시돼요.</div>'}</div>` : ''}
<div class="cta"><button class="btn" ${c ? '' : 'disabled'} onclick="${ready() ? 'showR()' : "go('profile')"}">${!c ? '기업을 먼저 선택해 주세요' : ready() ? '조건 충족도 확인하기' : '먼저 내 역량 입력하기'}${I('chev')}</button></div>`;
  },
  result() {
    const c = CO.find(z => z.id === S.co), r = ev(c), l = lvl(r), un = r.filter(e => e.ok === false);
    const T = { ok: '필수 조건을 모두 충족하고 우대 조건도 갖췄어요.', wn: '필수 조건은 충족하지만 우대 조건이 부족해요.', bd: '충족하지 못한 필수 조건이 있어요.' };
    return stp(3) + `<h1>${c.n} · ${c.j}</h1><div class="card" style="margin-top:6px"><div class="hr"><h2>지원 조건 충족도</h2><span class="pill ${l}">${LB[l]}</span></div><div class="meter" role="img" aria-label="충족도 ${LB[l]}">${['ok', 'wn', 'bd'].map(k => `<div class="${k} ${k === l ? 'on' : ''}">${LB[k]}</div>`).join('')}</div><p class="sub" style="margin:8px 0 0">${T[l]}</p><div class="note">합격 확률이 아닌 채용 조건 충족도예요. 판정 기준은 시연용 임시 규칙이에요.</div></div>
<div class="card"><h2 style="margin-bottom:6px">판단 근거</h2>${r.map(e => `<div class="chk">${stIc(e.ok)}<span class="cp"><b>${e.x.k} · ${e.x.need}</b><small>${e.x.req ? '필수' : '우대'} · ${e.ok === true ? '충족' : e.ok === false ? '미충족' : '입력 없음, 비교 제외'}</small></span></div>`).join('')}</div>
<div class="card"><h2 style="margin-bottom:6px">부족한 역량과 보완 방향</h2>${un.length ? un.map(e => `<div class="chk">${I('target', '')}<span class="cp"><b>${e.x.t}</b><small>${e.x.req ? '필수 조건 보완' : '우대 조건 보완'} · ${e.x.d}</small></span></div>`).join('') : '<div class="note" style="margin:0">보완할 조건이 없어요. 포트폴리오로 강점을 정리해 보세요.</div>'}</div>
<div class="cta"><div class="two"><button class="btn ghost" onclick="go('sources')">출처 확인</button><button class="btn" onclick="go('roadmap')">준비 계획 보기</button></div></div>`;
  },
  roadmap() {
    const list = S.roadmaps || [];
    const selected = list.find(x => x.id === S.activeRoadmap);
    if (!selected) return `<h1>나의 취업 로드맵</h1><p class="sub">목표와 준비 주제를 직접 정하고, 작성한 내용을 바탕으로 피드백을 받아보세요.</p>
<div class="card"><h2>새 로드맵 만들기</h2><p class="sub">기존 로드맵이 있어도 언제든 새 계획을 추가할 수 있어요.</p><div class="f"><label>로드맵 이름</label><input id="newRoadName" placeholder="예: 서비스 기획자 취업 준비"></div><div class="f"><label>목표 직업 계열</label><select id="newRoadCat">${['IT·개발','기획·전략','공학·기술','금융·회계','마케팅·콘텐츠','경영지원·인사','디자인·예술','기타'].map(x=>`<option>${x}</option>`).join('')}</select></div><div class="f"><label>목표 기업 또는 직무</label><input id="newRoadGoal" placeholder="예: 네이버 서비스 기획"></div><button class="btn" onclick="createRoadmap()">새 로드맵 생성하기 ${I('chev')}</button></div>
${list.length ? `<div class="sec">내가 만든 로드맵 ${list.length}개</div><div class="card task-list">${list.map(r=>`<button class="task-overview" onclick="S.activeRoadmap='${r.id}';render()"><span class="task-number">${I('route')}</span><span class="cp"><b>${esc(r.name)}</b><small>${esc(r.cat)} · ${esc(r.goal)}</small></span>${I('chev')}</button>`).join('')}</div>` : `<div class="note">아직 만든 로드맵이 없어요. 위에서 첫 번째 로드맵을 만들어 보세요.</div>`}`;
    return `<div class="road-head"><button class="chip" onclick="S.activeRoadmap=null;S.feedback='';render()">← 내 로드맵 목록</button><button class="chip" onclick="deleteRoadmap('${selected.id}')">삭제</button></div><h1>${esc(selected.name)}</h1><p class="sub">${esc(selected.cat)} · ${esc(selected.goal)}</p>
<div class="card"><h2>목표와 방향</h2><div class="f"><label>이 로드맵으로 이루고 싶은 목표</label><textarea id="roadPurpose" rows="3" placeholder="예: 졸업 전까지 서비스 기획 직무에 지원할 수 있는 포트폴리오를 완성하고 싶다.">${esc(selected.purpose||'')}</textarea></div><div class="f"><label>현재 나의 상황과 고민</label><textarea id="roadNow" rows="3" placeholder="현재 가진 경험, 부족하다고 느끼는 점, 고민 등을 자유롭게 작성하세요.">${esc(selected.now||'')}</textarea></div><button class="btn ghost" onclick="saveRoadIntro('${selected.id}')">목표와 상황 저장</button></div>
<div class="sec">직접 정한 준비 주제</div><p class="sub">체크리스트 대신, 준비하고 싶은 주제와 본인의 생각·계획을 직접 작성하세요.</p>
${selected.entries.map((e,i)=>`<div class="card writing-card"><div class="hr"><h2>주제 ${i+1}</h2><button class="chip" onclick="removeRoadEntry('${selected.id}',${i})">삭제</button></div><div class="f"><label>내가 선정한 주제</label><input id="entryTitle${i}" value="${esc(e.title)}" placeholder="예: 서비스 기획 포트폴리오"></div><div class="f"><label>이 주제에 대해 내가 작성한 내용</label><textarea id="entryBody${i}" rows="5" placeholder="무엇을 준비할지, 어떤 자료를 참고할지, 어떤 결과물을 만들지 직접 작성하세요.">${esc(e.body)}</textarea></div><div class="f"><label>참고한 자료 또는 정보 출처 (선택)</label><input id="entrySource${i}" value="${esc(e.source||'')}" placeholder="공식 사이트, 채용공고, 강의 자료 링크 등"></div><button class="btn feedback-btn" onclick="reviewEntry('${selected.id}',${i})">${I('spark')} 작성 내용 피드백 받기</button>${e.feedback?`<div class="feedback-box"><b>${I('spark')} 내용 기반 피드백</b><p>${esc(e.feedback).replace(/\n/g,'<br>')}</p></div>`:''}</div>`).join('')}
<button class="btn ghost add-entry" onclick="addRoadEntry('${selected.id}')">＋ 준비 주제 추가하기</button>
<div class="note">피드백은 작성한 문장의 구체성, 실행 가능성, 근거와 보완할 점을 중심으로 제공하는 프로토타입 예시입니다. 실제 생성형 AI 분석을 연결하려면 별도 API 연동이 필요합니다.</div>`;
  },
  mypage() {
    const k = Object.keys(S.saved);
    return `<h1>마이페이지</h1><p class="sub">내 정보와 취업 준비 기록을 관리하세요.</p>
<div class="card" style="padding:4px 16px">${row('user', '내 역량 정보', filled() ? `입력 ${filled()}개 항목${S.p.toeic ? ' · TOEIC ' + esc(S.p.toeic) : ''}` : '아직 입력하지 않았어요', "go('profile')")}${row('folder', '저장한 분석 결과', k.length ? k.map(i => { const c = CO.find(z => z.id === i); return c.n + ' ' + LB[S.saved[i]] }).join(', ') : '저장된 결과가 없어요', "go('analysis')")}${row('route', '내 취업 로드맵', `${S.roadmaps.length}개 로드맵`, "go('roadmap')")}${row('file', '정보 출처', '채용공고 원문과 공식 자격증 정보', "go('sources')")}${row('gear', '서비스 설정', '이용 설정', "")}</div>`;
  },
  sources() {
    const l = S.co ? CO.filter(z => z.id === S.co) : CO;
    return `<h1>정보 출처</h1><p class="sub">분석에 쓴 채용공고와 공식 자격증 정보를 원문과 대조해 보세요.</p>
<div class="card"><h2 style="margin-bottom:4px">채용공고 원문</h2>${l.map(z => `<div class="chk"><span class="ic">${z.l}</span><span class="cp"><b>${z.n} · ${z.j}</b><small>확인일 2026-11-03 · 기업 공식 채용 페이지 (예시)</small></span>${I('ext')}</div>`).join('')}</div>
<div class="card"><h2 style="margin-bottom:4px">자격증 공식 정보</h2><div class="chk"><span class="ic">${I('award')}</span><span class="cp"><b>자격증 시행기관</b><small>응시 조건, 시험 일정, 공식 안내</small></span>${I('ext')}</div></div>
<div class="note">공식 자료에서 확인되지 않은 일정이나 조건은 확정된 정보처럼 보여주지 않아요. 실제 서비스에서는 원문 링크가 연결돼요.</div>`;
  }
};



function createRoadmap(){
 const name=document.getElementById('newRoadName').value.trim(),cat=document.getElementById('newRoadCat').value,goal=document.getElementById('newRoadGoal').value.trim();
 if(!name||!goal){alert('로드맵 이름과 목표 기업 또는 직무를 입력해 주세요.');return;}
 const id='r'+Date.now(); S.roadmaps.push({id,name,cat,goal,purpose:'',now:'',entries:[]});S.activeRoadmap=id;render();
}
function addRoadEntry(id){const r=S.roadmaps.find(x=>x.id===id);if(r){r.entries.push({title:'',body:'',source:'',feedback:''});render();}}
function saveRoadIntro(id){const r=S.roadmaps.find(x=>x.id===id);if(!r)return;r.purpose=document.getElementById('roadPurpose').value;r.now=document.getElementById('roadNow').value;render();}
function readEntry(id,i){const r=S.roadmaps.find(x=>x.id===id),e=r&&r.entries[i];if(!e)return null;e.title=document.getElementById('entryTitle'+i).value;e.body=document.getElementById('entryBody'+i).value;e.source=document.getElementById('entrySource'+i).value;return e;}
function reviewEntry(id,i){
 const e=readEntry(id,i);if(!e)return;const body=e.body.trim(),title=e.title.trim();
 if(!title||!body){e.feedback='주제와 작성 내용을 먼저 입력해 주세요. 어떤 결과물을 만들지, 어떻게 실행할지 구체적으로 적으면 더 정확한 피드백을 받을 수 있어요.';render();return;}
 const points=[];
 if(body.length<80)points.push('현재 내용은 다소 짧습니다. 준비 방법, 예상 결과물, 완료 기준을 각각 나누어 설명하면 계획이 더 명확해집니다.');
 if(!/(언제|주|월|기간|일정|까지|회차|마감)/.test(body))points.push('실행 시점이나 기간이 드러나지 않습니다. 주차별 일정 또는 목표 날짜를 추가해 보세요.');
 if(!/(결과물|포트폴리오|보고서|프로젝트|작성|제작|완성|산출물)/.test(body))points.push('준비 후 무엇을 남길지 불분명합니다. 포트폴리오, 기획서, 분석 보고서 등 확인 가능한 결과물을 정해 보세요.');
 if(!e.source.trim())points.push('참고 자료나 근거 출처가 없습니다. 기업 공식 채용공고, 직무기술서, 자격 시행기관 등 신뢰할 수 있는 자료를 연결해 보세요.');
 if(!/(목표|기준|이유|직무|기업|지원)/.test(body))points.push('이 주제가 목표 직무와 어떻게 연결되는지 설명을 보완하면 좋겠습니다.');
 if(!points.length)points.push('작성 내용에 목표와 실행 방향이 비교적 잘 드러납니다. 실제로 작성한 결과물이나 참고 자료를 추가하고, 본인의 역할과 판단 근거를 명시하면 완성도가 높아집니다.');
 e.feedback='검토 주제: '+title+'\n\n보완하면 좋은 점\n'+points.map((x,n)=>(n+1)+'. '+x).join('\n')+'\n\n수정 제안: 작성한 내용을 “목표 → 구체적인 실행 방법 → 결과물 → 확인 기준” 순서로 재구성해 보세요.';
 render();
}
function removeRoadEntry(id,i){const r=S.roadmaps.find(x=>x.id===id);if(r){r.entries.splice(i,1);render();}}
function deleteRoadmap(id){if(!confirm('이 로드맵을 삭제할까요?'))return;S.roadmaps=S.roadmaps.filter(x=>x.id!==id);S.activeRoadmap=null;render();}

const stp = n => `<div class="steps">${['역량 입력', '기업 선택', '결과 확인'].map((t, i) => `<div class="${i + 1 === n ? 'on' : i + 1 < n ? 'dn' : ''}"><b>${i + 1 < n ? I('check') : i + 1}</b>${t}</div>`).join('')}</div>`;

function homeNew() {
  const d = Object.keys(S.saved).length, st = !ready() ? 1 : !S.saved[S.co] ? 2 : 3, n = st === 1 ? ['먼저 내 역량을 입력해 보세요', '학력과 영어 점수만 있으면 시작할 수 있어요.', '내 역량 입력하기', "go('profile')"] : st === 2 ? ['이제 목표 기업을 골라 볼까요?', '기업을 고르면 지원 조건과 바로 비교해 줘요.', '기업 분석 시작하기', "go('analysis')"] : ['준비 계획을 확인해 보세요', '부족한 역량에 맞춰 만든 로드맵이 있어요.', '로드맵 보기', "go('roadmap')"];
  const T = [['user', '내 역량 입력', filled() ? filled() + '개 항목 입력함' : '학력·영어·자격증', 'profile'], ['search', '기업 분석', '채용 조건과 비교하기', 'analysis'], ['route', '취업 로드맵', '단계별 준비 계획', 'roadmap'], ['file', '정보 출처', '공고 원문 확인하기', 'sources']];
  return `<h1>내 역량에 맞는<br>취업 준비를 시작해요</h1>${stp(st)}<div class="hero" style="margin-top:0"><small style="opacity:.85">다음 할 일</small><h2 style="font-size:19px;margin-top:2px">${n[0]}</h2><p>${n[1]}</p><button class="btn inv" onclick="${n[3]}">${n[2]}${I('chev')}</button></div>
<div class="sec">메뉴</div><div class="tiles">${T.map(t => `<button class="tile" onclick="go('${t[3]}')"><span class="ic">${I(t[0])}</span><span><b>${t[1]}</b><small>${t[2]}</small></span></button>`).join('')}</div>
<div class="card"><div class="hr"><h2>나의 준비 현황</h2><span class="pill ${d ? 'ok' : 'n'}">${d ? '분석 완료' : '분석 전'}</span></div><div class="grid"><div class="met"><small>등록한 역량</small><b>${filled()}개</b></div><div class="met"><small>분석한 기업</small><b>${d}곳</b></div></div></div>
<div class="sec">분석할 수 있는 기업</div><div class="card" style="padding:4px 16px">${CO.map(c => `<button class="row" onclick="pick('${c.id}');go('analysis')"><span class="ic">${c.l}</span><span class="cp"><b>${c.n}</b><small>${c.j}</small></span><span class="pill">분석하기</span></button>`).join('')}</div><div class="note">기업과 채용공고는 화면 구성을 위한 예시 데이터예요.</div>`;
}

const CERT = { 'IT': ['정보처리기사', '정보처리산업기사', 'SQLD', 'ADsP', '컴퓨터활용능력 1급', '리눅스마스터 2급', '정보보안기사'], '경제·경영': ['매경TEST', 'TESAT', '재경관리사', '전산회계 1급', 'ERP 정보관리사'], '공학·기술': ['전기기사', '전자기사', '산업안전기사', '기계설계산업기사'], '어학·기타': ['OPIc', 'TOEIC Speaking', '한국사능력검정시험'] };
const certs = () => { const c = (S.dr || S.p).cert; return c ? c.split(', ') : [] };

function snap() {
  const g = i => { const e = document.getElementById(i); return e ? e.value.trim() : null }, d = { ...(S.dr || S.p) };
  [['pe', 'edu'], ['pg', 'gpa'], ['pt', 'toeic'], ['ps', 'skills']].forEach(([i, k]) => { const v = g(i); if (v !== null) d[k] = v });
  S.dr = d;
}

function setC(a) { snap(); S.dr.cert = a.join(', '); render(); }
function togC(i) { const n = CERT[S.cc][i], a = certs(), j = a.indexOf(n); j < 0 ? a.push(n) : a.splice(j, 1); setC(a); }
function rmC(i) { const a = certs(); a.splice(i, 1); setC(a); }
function setCat(k) { snap(); S.cc = k; render(); }

function certUI() {
  const sel = certs();
  return `<div class="f"><label>자격증 <em>(선택, 여러 개 가능)</em></label><div class="chips">${Object.keys(CERT).map(k => `<button type="button" class="chip ${k === S.cc ? 'on' : ''}" onclick="setCat('${k}')">${k} 계열</button>`).join('')}</div><div class="cl">${CERT[S.cc].map((n, i) => { const o = sel.includes(n); return `<button type="button" class="ci ${o ? 'on' : ''}" aria-pressed="${o}" onclick="togC(${i})"><span class="rd ${o ? 'on' : ''}">${o ? I('check') : ''}</span>${n}</button>` }).join('')}</div><div class="sc">${sel.length ? sel.map((n, i) => `<button type="button" class="pill" onclick="rmC(${i})" aria-label="${n} 선택 해제">${n} ✕</button>`).join('') : '<small style="color:var(--mu)">선택한 자격증이 없어요. 없으면 건너뛰어도 돼요.</small>'}</div></div>`;
}

const TAB = [['home', '홈', 'home'], ['analysis', '기업 분석', 'search'], ['roadmap', '로드맵', 'route'], ['mypage', '마이페이지', 'user']], MAP = { profile: 'home', result: 'analysis', sources: 'mypage' };

function render() {
  document.getElementById('m').innerHTML = V[S.s]();
  document.getElementById('nv').innerHTML = TAB.map(t => `<button class="${(MAP[S.s] || S.s) === t[0] ? 'on' : ''}" onclick="go('${t[0]}')" aria-label="${t[1]}">${I(t[2])}${t[1]}</button>`).join('');
}

function go(s) { if (s !== 'profile') S.dr = null; S.s = s; render(); window.scrollTo(0, 0); }
function pick(i) { S.co = i; }
function fl(v) { document.querySelectorAll('[data-t]').forEach(e => e.style.display = e.dataset.t.includes(v.trim()) ? '' : 'none'); }

function saveP() {
  const g = i => document.getElementById(i).value.trim(), e = document.getElementById('er');
  const p = { edu: g('pe'), gpa: g('pg'), toeic: g('pt'), cert: (S.dr || S.p).cert, skills: g('ps') };
  if (!p.edu || !p.toeic) { e.textContent = '학력과 공인영어 점수를 입력해 주세요. 학점은 비워도 돼요.'; return; }
  if (p.gpa !== '' && (+p.gpa < 0 || +p.gpa > 4.5)) { e.textContent = '학점은 0에서 4.5 사이로 입력해 주세요.'; return; }
  S.p = p; S.dr = null; go('analysis');
}

function showR() { S.saved[S.co] = lvl(ev(CO.find(z => z.id === S.co))); go('result'); }
function tg(i) { S.done[i] = !S.done[i]; const y = window.scrollY; render(); window.scrollTo(0, y); }

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('mk').innerHTML = I('spark');
  document.getElementById('bl').innerHTML = I('bell');
  render();
});