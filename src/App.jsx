import { useState } from "react";

const disciplines = [
  { id: "area",        code: "RH-FL", name: "야지 수색 구조견",  emoji: "🌲", color: "#2D6A3F", bg: "#E8F5E9", de: "Flächenrettungshund" },
  { id: "disaster",    code: "RH-T",  name: "재난 수색 구조견",  emoji: "🏚️", color: "#C0392B", bg: "#FEECEB", de: "Trümmerrettungshund" },
  { id: "mantrailing", code: "RH-MT", name: "맨트레일링 구조견", emoji: "👃", color: "#6A1B9A", bg: "#F3E5F5", de: "Mantrailing-Rettungshund" },
  { id: "tracking",    code: "RH-F",  name: "추적 구조견",       emoji: "🐾", color: "#B8860B", bg: "#FFF8E1", de: "Fährtenrettungshund" },
  { id: "avalanche",   code: "RH-L",  name: "눈사태 구조견",     emoji: "🏔️", color: "#37474F", bg: "#ECEFF1", de: "Lawinenrettungshund" },
  { id: "water",       code: "RH-W",  name: "수상 구조견",       emoji: "🌊", color: "#0277BD", bg: "#E1F5FE", de: "Wasserrettungshund" },
];

const levels = [
  { id: "V", name: "단계 V", de: "Stufe V (Vorprüfung)", desc: "예비 시험", minAge: "15개월", maxScore: 100 },
  { id: "A", name: "단계 A", de: "Stufe A",               desc: "중급 시험", minAge: "18개월", maxScore: 200 },
  { id: "B", name: "단계 B", de: "Stufe B",               desc: "고급 시험", minAge: "20개월", maxScore: 200 },
];

const grades = [
  { code: "V",  kr: "우수함",   de: "Vorzüglich",   range: "96–100%", color: "#B8860B", bg: "#FFF8E1" },
  { code: "SG", kr: "아주좋음", de: "Sehr Gut",      range: "90–95%",  color: "#4A5568", bg: "#EDF2F7" },
  { code: "G",  kr: "좋음",     de: "Gut",           range: "80–89%",  color: "#6B4C2A", bg: "#FDF3E7" },
  { code: "B",  kr: "만족함",   de: "Befriedigend",  range: "70–79%",  color: "#276749", bg: "#E6FFFA" },
  { code: "M",  kr: "부족함",   de: "Mangelhaft",    range: "0–69%",   color: "#C0392B", bg: "#FEECEB" },
];

const obedData = {
  tracking: {
    V: [
      { name: "시작보고 및 사회성 테스트", pts: 10, icon: "👋" },
      { name: "줄메고 따라걷기", pts: 15, icon: "🦮" },
      { name: "이동중 앉아 및 부르기", pts: 10, icon: "⬇️" },
      { name: "자세변경 (테이블)", pts: 15, icon: "📋" },
      { name: "산만한 상황에서의 대기", pts: 10, icon: "⏳" },
      { name: "들고 건네주기", pts: 10, icon: "🤲" },
      { name: "원격조정 (테이블 2개)", pts: 10, icon: "📡" },
      { name: "터널통과", pts: 10, icon: "🕳️" },
      { name: "고정된 나무다리 건너기", pts: 10, icon: "🌉" },
    ],
    A: [
      { name: "시작보고 및 사회성 테스트", pts: 5,  icon: "👋" },
      { name: "줄없이 따라걷기", pts: 10, icon: "🚶" },
      { name: "원격통제 (앉아-와-엎드려-와)", pts: 15, icon: "📡" },
      { name: "평지물품회수", pts: 10, icon: "🎾" },
      { name: "들고 건네주기", pts: 10, icon: "🤲" },
      { name: "원격조정 (테이블 3개)", pts: 15, icon: "🔭" },
      { name: "터널통과", pts: 10, icon: "🕳️" },
      { name: "고정된 나무다리 건너기", pts: 10, icon: "🌉" },
      { name: "비고정 나무다리 건너기", pts: 5,  icon: "🌀" },
      { name: "산만한 상황에서의 대기", pts: 10, icon: "⏳" },
    ],
    B: [
      { name: "시작보고 및 사회성 테스트", pts: 5,  icon: "👋" },
      { name: "줄없이 따라걷기", pts: 10, icon: "🚶" },
      { name: "원격통제 (앉아-와-엎드려-서-와)", pts: 15, icon: "📡" },
      { name: "평지물품회수", pts: 10, icon: "🎾" },
      { name: "들고 건네주기", pts: 10, icon: "🤲" },
      { name: "원격조정 (테이블 3개)", pts: 15, icon: "🔭" },
      { name: "그네 건너기", pts: 10, icon: "🎪" },
      { name: "사다리 건너기", pts: 10, icon: "🪜" },
      { name: "터널통과", pts: 5,  icon: "🕳️" },
      { name: "산만한 상황에서의 대기", pts: 10, icon: "⏳" },
    ],
  },
  area: {
    V: [
      { name: "시작보고 및 사회성 테스트", pts: 10, icon: "👋" },
      { name: "줄메고 따라걷기", pts: 15, icon: "🦮" },
      { name: "이동중 앉아 및 부르기", pts: 10, icon: "⬇️" },
      { name: "자세변경 (테이블)", pts: 15, icon: "📋" },
      { name: "산만한 상황에서의 대기", pts: 10, icon: "⏳" },
      { name: "들고 건네주기", pts: 10, icon: "🤲" },
      { name: "원격조정 (테이블 2개)", pts: 10, icon: "📡" },
      { name: "터널통과", pts: 10, icon: "🕳️" },
      { name: "고정된 나무다리 건너기", pts: 10, icon: "🌉" },
    ],
    A: [
      { name: "시작보고 및 사회성 테스트", pts: 5,  icon: "👋" },
      { name: "줄없이 따라걷기", pts: 10, icon: "🚶" },
      { name: "원격통제", pts: 15, icon: "📡" },
      { name: "평지물품회수", pts: 10, icon: "🎾" },
      { name: "들고 건네주기", pts: 10, icon: "🤲" },
      { name: "원격조정 (테이블 3개)", pts: 15, icon: "🔭" },
      { name: "터널통과", pts: 10, icon: "🕳️" },
      { name: "고정된 나무다리 건너기", pts: 10, icon: "🌉" },
      { name: "비고정 나무다리 건너기", pts: 5,  icon: "🌀" },
      { name: "산만한 상황에서의 대기", pts: 10, icon: "⏳" },
    ],
    B: [
      { name: "시작보고 및 사회성 테스트", pts: 5,  icon: "👋" },
      { name: "줄없이 따라걷기", pts: 10, icon: "🚶" },
      { name: "원격통제", pts: 15, icon: "📡" },
      { name: "평지물품회수", pts: 10, icon: "🎾" },
      { name: "들고 건네주기", pts: 10, icon: "🤲" },
      { name: "원격조정 (테이블 3개)", pts: 15, icon: "🔭" },
      { name: "그네 건너기", pts: 10, icon: "🎪" },
      { name: "사다리 건너기", pts: 10, icon: "🪜" },
      { name: "터널통과", pts: 5,  icon: "🕳️" },
      { name: "산만한 상황에서의 대기", pts: 10, icon: "⏳" },
    ],
  },
  disaster: {
    V: [
      { name: "시작보고 및 사회성 테스트", pts: 10, icon: "👋" },
      { name: "줄메고 따라걷기", pts: 15, icon: "🦮" },
      { name: "이동중 앉아 및 부르기", pts: 10, icon: "⬇️" },
      { name: "자세변경 (테이블)", pts: 15, icon: "📋" },
      { name: "산만한 상황에서의 대기", pts: 10, icon: "⏳" },
      { name: "들고 건네주기", pts: 10, icon: "🤲" },
      { name: "원격조정 (테이블 2개)", pts: 10, icon: "📡" },
      { name: "터널통과", pts: 10, icon: "🕳️" },
      { name: "고정된 나무다리 건너기", pts: 10, icon: "🌉" },
    ],
    A: [
      { name: "시작보고 및 사회성 테스트", pts: 5,  icon: "👋" },
      { name: "줄없이 따라걷기", pts: 10, icon: "🚶" },
      { name: "원격통제", pts: 15, icon: "📡" },
      { name: "평지물품회수", pts: 10, icon: "🎾" },
      { name: "들고 건네주기", pts: 10, icon: "🤲" },
      { name: "원격조정 (테이블 3개)", pts: 15, icon: "🔭" },
      { name: "터널통과", pts: 10, icon: "🕳️" },
      { name: "고정된 나무다리 건너기", pts: 10, icon: "🌉" },
      { name: "비고정 나무다리 건너기", pts: 5,  icon: "🌀" },
      { name: "산만한 상황에서의 대기", pts: 10, icon: "⏳" },
    ],
    B: [
      { name: "시작보고 및 사회성 테스트", pts: 5,  icon: "👋" },
      { name: "줄없이 따라걷기", pts: 10, icon: "🚶" },
      { name: "원격통제", pts: 15, icon: "📡" },
      { name: "평지물품회수", pts: 10, icon: "🎾" },
      { name: "들고 건네주기", pts: 10, icon: "🤲" },
      { name: "원격조정 (테이블 3개)", pts: 15, icon: "🔭" },
      { name: "그네 건너기", pts: 10, icon: "🎪" },
      { name: "사다리 건너기", pts: 10, icon: "🪜" },
      { name: "터널통과", pts: 5,  icon: "🕳️" },
      { name: "산만한 상황에서의 대기", pts: 10, icon: "⏳" },
    ],
  },
  mantrailing: {
    V: [
      { name: "시작보고 및 사회성 테스트", pts: 10, icon: "👋" },
      { name: "줄메고 따라걷기", pts: 15, icon: "🦮" },
      { name: "이동중 앉아 및 부르기", pts: 10, icon: "⬇️" },
      { name: "자세변경 (테이블)", pts: 15, icon: "📋" },
      { name: "산만한 상황에서의 대기", pts: 10, icon: "⏳" },
      { name: "들고 건네주기", pts: 10, icon: "🤲" },
      { name: "원격조정 (테이블 2개)", pts: 10, icon: "📡" },
      { name: "터널통과", pts: 10, icon: "🕳️" },
      { name: "고정된 나무다리 건너기", pts: 10, icon: "🌉" },
    ],
    A: [
      { name: "시작보고 및 사회성 테스트", pts: 5,  icon: "👋" },
      { name: "줄없이 따라걷기", pts: 10, icon: "🚶" },
      { name: "원격통제", pts: 15, icon: "📡" },
      { name: "평지물품회수", pts: 10, icon: "🎾" },
      { name: "들고 건네주기", pts: 10, icon: "🤲" },
      { name: "원격조정 (테이블 3개)", pts: 15, icon: "🔭" },
      { name: "터널통과", pts: 10, icon: "🕳️" },
      { name: "고정된 나무다리 건너기", pts: 10, icon: "🌉" },
      { name: "비고정 나무다리 건너기", pts: 5,  icon: "🌀" },
      { name: "산만한 상황에서의 대기", pts: 10, icon: "⏳" },
    ],
    B: [
      { name: "시작보고 및 사회성 테스트", pts: 5,  icon: "👋" },
      { name: "줄없이 따라걷기", pts: 10, icon: "🚶" },
      { name: "원격통제", pts: 15, icon: "📡" },
      { name: "평지물품회수", pts: 10, icon: "🎾" },
      { name: "들고 건네주기", pts: 10, icon: "🤲" },
      { name: "원격조정 (테이블 3개)", pts: 15, icon: "🔭" },
      { name: "그네 건너기", pts: 10, icon: "🎪" },
      { name: "사다리 건너기", pts: 10, icon: "🪜" },
      { name: "터널통과", pts: 5,  icon: "🕳️" },
      { name: "산만한 상황에서의 대기", pts: 10, icon: "⏳" },
    ],
  },
  water: {
    V: [
      { name: "장거리 수영 (4분·최대 300m)", pts: 20, icon: "🏊" },
      { name: "시작보고 및 사회성 테스트", pts: 5,  icon: "👋" },
      { name: "줄메고 따라걷기", pts: 5,  icon: "🦮" },
      { name: "자세변경 (서핑보드)", pts: 10, icon: "🏄" },
      { name: "산만한 상황에서의 대기", pts: 10, icon: "⏳" },
      { name: "서프보드 타기와 이동 (20m)", pts: 10, icon: "🏄" },
      { name: "들고 건네주기", pts: 10, icon: "🤲" },
      { name: "보트동승 (약 100m)", pts: 10, icon: "⛵" },
    ],
    A: [
      { name: "장거리 수영 (8분·최대 500m)", pts: 20, icon: "🏊" },
      { name: "시작보고 및 사회성 테스트", pts: 5,  icon: "👋" },
      { name: "줄없이 따라걷기", pts: 5,  icon: "🚶" },
      { name: "원격통제 (수상·20m)", pts: 10, icon: "📡" },
      { name: "들고 건네주기", pts: 10, icon: "🤲" },
      { name: "산만한 상황에서의 대기", pts: 10, icon: "⏳" },
      { name: "물에서 가져오기", pts: 10, icon: "🎣" },
      { name: "서프보드 타기와 이동 (20m)", pts: 10, icon: "🏄" },
      { name: "원격조정 (수상·20m)", pts: 10, icon: "🔭" },
      { name: "보트동승 (약 100m)", pts: 10, icon: "⛵" },
    ],
    B: [
      { name: "장거리 수영 (12분·최대 800m)", pts: 20, icon: "🏊" },
      { name: "시작보고 및 사회성 테스트", pts: 5,  icon: "👋" },
      { name: "줄없이 따라걷기", pts: 5,  icon: "🚶" },
      { name: "원격통제 (수상·40m)", pts: 10, icon: "📡" },
      { name: "들고 건네주기", pts: 10, icon: "🤲" },
      { name: "산만한 상황에서의 대기", pts: 10, icon: "⏳" },
      { name: "서프보드 타기와 이동 (40m)", pts: 10, icon: "🏄" },
      { name: "원격조정 (수상·40m)", pts: 10, icon: "🔭" },
      { name: "보트에서 던진 패들 회수", pts: 10, icon: "🚣" },
      { name: "보트동승 (약 100m)", pts: 10, icon: "⛵" },
    ],
  },
  avalanche: {
    V: [
      { name: "시작보고 및 사회성 테스트", pts: 10, icon: "👋" },
      { name: "줄메고 따라걷기", pts: 15, icon: "🦮" },
      { name: "이동중 앉아 및 부르기", pts: 10, icon: "⬇️" },
      { name: "자세변경 (눈덩이·자연높이)", pts: 15, icon: "❄️" },
      { name: "산만한 상황에서의 대기", pts: 10, icon: "⏳" },
      { name: "들고 건네주기", pts: 10, icon: "🤲" },
      { name: "원격조정 (배낭/양동이 2개)", pts: 10, icon: "📡" },
      { name: "설원에서 흔적 따르기 (150보)", pts: 10, icon: "⛷️" },
      { name: "운송수단 동승 (약 150m)", pts: 10, icon: "🚁" },
    ],
    A: [
      { name: "시작보고 및 사회성 테스트", pts: 5,  icon: "👋" },
      { name: "줄없이 따라걷기", pts: 10, icon: "🚶" },
      { name: "원격통제", pts: 15, icon: "📡" },
      { name: "평지물품회수", pts: 10, icon: "🎾" },
      { name: "들고 건네주기", pts: 10, icon: "🤲" },
      { name: "원격조정 (배낭/양동이 3개)", pts: 20, icon: "🔭" },
      { name: "산만한 상황에서의 대기", pts: 10, icon: "⏳" },
      { name: "설원에서 흔적 따르기 (250보)", pts: 10, icon: "⛷️" },
      { name: "운송수단 동승 (약 150m)", pts: 10, icon: "🚁" },
    ],
    B: [
      { name: "시작보고 및 사회성 테스트", pts: 5,  icon: "👋" },
      { name: "줄없이 따라걷기", pts: 10, icon: "🚶" },
      { name: "원격통제", pts: 15, icon: "📡" },
      { name: "평지물품회수", pts: 10, icon: "🎾" },
      { name: "들고 건네주기", pts: 10, icon: "🤲" },
      { name: "원격조정 (배낭/양동이 3개)", pts: 20, icon: "🔭" },
      { name: "산만한 상황에서의 대기", pts: 10, icon: "⏳" },
      { name: "설원에서 흔적 따르기 (350보)", pts: 10, icon: "⛷️" },
      { name: "운송수단 동승 (약 150m)", pts: 10, icon: "🚁" },
    ],
  },
};

const noseworkData = {
  tracking: {
    V: { pts: 100, items: ["족적 작성자: 지도수 소유 족적 (대기 20분)", "족적 길이: 400보(상보) · 우측 방향 굴절 2회", "확인 물품: 지도수 소유 일용품 3개", "수색 시간: 최대 15분", "통보테스트: 후각작업 완료 후 별도 실시"] },
    A: { pts: 200, items: ["족적 작성자: 지도수에게 알려진 사람", "족적 연령: 최소 30분", "족적 길이: 최소 600m · 방향 변경 최소 4회", "확인 물품: 낡은 일용품 3개 (족적 위에 배치)", "교차 족적: 없음", "출발 구역: 20m×20m 내 확인물품 1개"] },
    B: { pts: 200, items: ["족적 작성자: 지도수에게 낯선 사람", "족적 연령: 최소 60분", "족적 길이: 최소 800m · 방향 변경 최소 5회", "확인 물품: 낡은 일용품 3개", "교차 족적: 1개", "출발 구역: 30m×30m 내 확인물품 1개"] },
  },
  area: {
    V: { pts: 100, items: ["수색 면적: 최소 10,000㎡ (자연지형)", "은폐인: 1명 (지도수에게 알려진 사람)", "수색 시간: 15분", "통보테스트: 수색 후 별도 실시"] },
    A: { pts: 200, items: ["수색 면적: 최소 30,000㎡", "은폐인: 2명 (낯선 사람)", "수색 시간: 20분", "통보테스트: 수색 후 별도 실시"] },
    B: { pts: 200, items: ["수색 면적: 최소 50,000㎡", "은폐인: 3명 (낯선 사람)", "수색 시간: 30분", "통보테스트: 수색 후 별도 실시"] },
  },
  disaster: {
    V: { pts: 100, items: ["수색 면적: 최소 600㎡ (이중구조 장애물)", "은폐인: 1명", "수색 시간: 10분", "헬멧·안전화 착용 필수 (지도수·심사위원)", "통보테스트: 수색 후 별도 실시"] },
    A: { pts: 200, items: ["수색 면적: 최소 800㎡", "은폐인: 2명", "수색 시간: 15분", "헬멧·안전화 착용 필수", "통보테스트: 수색 후 별도 실시"] },
    B: { pts: 200, items: ["수색 면적: 최소 1,200㎡", "은폐인: 3명", "수색 시간: 20분", "야간·연기 환경 가능", "통보테스트: 수색 후 별도 실시"] },
  },
  mantrailing: {
    V: { pts: 100, items: ["트레일 작성자: 지도수에게 알려진 사람", "트레일 연령: 최소 30분", "트레일 길이: 최소 400m · 방향 변경 최소 3회", "교차 트레일: 없음", "GPS 사용: 시작 전 심사위원에게 신고 필수"] },
    A: { pts: 200, items: ["트레일 작성자: 낯선 사람", "트레일 연령: 최소 1시간", "트레일 길이: 최소 600m · 방향 변경 최소 4회", "교차 트레일: 1개", "GPS 사용: 사전 신고 후 허용"] },
    B: { pts: 200, items: ["트레일 작성자: 낯선 사람", "트레일 연령: 최소 2시간", "트레일 길이: 최소 800m · 방향 변경 최소 5회", "교차 트레일: 2개", "GPS 사용: 사전 신고 후 허용"] },
  },
  water: {
    V: { pts: 100, items: ["해안가에서 구명줄 가져다주기", "해안가에서 출발 → 요구조자 구조", "장거리 수영: 4분 (최대 300m)", "수영 거리: 약 15–20m"] },
    A: { pts: 200, items: ["해안가 → 구조장비(줄) 가져다주기 (25m)", "해안가 → 요구조자를 해안가로 데려오기 (25m)", "보트 → 구조장비(줄) 가져다주기 (25m)", "보트 → 요구조자를 보트로 데려오기 (25m)", "표류하는 보트 끌고 오기 (25m)"] },
    B: { pts: 200, items: ["해안가 → 구조장비 가져다주기 (40m)", "해안가 → 요구조자를 해안가로 데려오기 (40m)", "보트 → 구조장비 가져다주기 (40m)", "보트 → 요구조자를 보트로 데려오기 (40m)", "표류하는 보트 끌고 오기 (40m)"] },
  },
  avalanche: {
    V: { pts: 100, items: ["수색 면적: 최소 2,500㎡", "은폐인: 1명 (얼음구멍에 완전 매몰)", "수색 시간: 15분", "LVS(눈사태 탐지기) 지참 허용"] },
    A: { pts: 200, items: ["수색 면적: 최소 5,000㎡", "은폐인: 2명 (완전 매몰)", "수색 시간: 20분", "통보 후 파헤침·진입 행동 필요"] },
    B: { pts: 200, items: ["수색 면적: 최소 10,000㎡", "은폐인: 3명 (완전 매몰)", "수색 시간: 30분", "통보 후 파헤침·진입 행동 필요"] },
  },
};

// ── 시행방법 데이터
const procedureMap = {
  "시작보고 및 사회성 테스트": {
    summary: "테스트 시작 전 지도수가 심사위원에게 보고하고, 견의 사회성·공격성을 검사합니다.",
    steps: [
      "지도수가 견과 함께 심사위원에게 집합·보고 — 건강증명서·접종기록 제출",
      "심사위원이 지도수 및 견 장비 점검 (금지 보조수단 여부 확인)",
      "낯선 사람(심사위원·도우미)이 견에게 접근 → 견의 반응 관찰",
      "갑작스러운 큰 소리 또는 총성에 대한 견의 반응 확인",
      "견이 위협·공격 자세를 보이지 않아야 통과",
    ],
    note: "공격성 또는 과도한 공포반응 시 즉시 실격. 사회성 테스트는 모든 단계·종목에서 동일 적용.",
    schema: "socialTest",
  },
  "줄메고 따라걷기": {
    summary: "V단계 전용. 견이 줄을 맨 상태로 지도수 왼쪽에 밀착하여 다양한 보행과 방향 전환을 소화합니다.",
    steps: [
      "기본자세에서 출발 — 견은 지도수 왼쪽에 견갑이 무릎에 밀착, 리드줄은 느슨하게 유지",
      "직선 약 50보(상보) 이동 → 180° 회전",
      "상보 10–15보 후 속보, 완보 각 10보 이상 실시",
      "오른쪽 90° 굴절 20–25보 → 두 번째 오른쪽 90° 굴절 25–30보",
      "180° 회전 후 10–15보 상보 → 기본자세",
      "왼쪽 90° 굴절 후 출발점 방향 20–25보 → 기본자세",
    ],
    note: "리드줄이 팽팽해지거나 앞서 가기·측면 이탈·뒤처지기 시 감점. A·B단계는 줄 없이 실시.",
    schema: "leashedHeeling",
  },
  "줄없이 따라걷기": {
    summary: "견이 줄 없이 지도수 왼쪽에 밀착하여 다양한 보행 방식과 방향 전환을 소화합니다.",
    steps: [
      "기본자세에서 출발 — 견은 지도수 왼쪽에 견갑이 무릎에 밀착",
      "직선 약 50보(상보) 이동 → 180° 회전",
      "상보 10–15보 후 속보, 완보 각 10보 이상 실시",
      "오른쪽 90° 굴절 20–25보 → 두 번째 오른쪽 90° 굴절 25–30보",
      "180° 회전 후 10–15보 상보 → 기본자세",
      "왼쪽 90° 굴절 후 출발점 방향 20–25보 → 기본자세",
    ],
    note: "앞서 가기·측면 이탈·뒤처지기·팽팽한 리드줄은 감점 요인입니다.",
    schema: "heeling",
  },
  "원격통제 (앉아-와-엎드려-와)": {
    summary: "A단계: 지도수에게서 멀어진 견을 음성/시각 신호로 앉히고, 40보 후 불러오는 중간에 엎드려 자세를 취하게 합니다.",
    steps: [
      "기본자세에서 직선 이동 → 10–15보 후 '앉아' 신호 (지도수는 멈추지 않고 계속 이동)",
      "40보 이동 후 정지·반전 → 심사위원 지시로 '와' 신호",
      "견이 달려오는 중간 지점에서 '엎드려' 신호",
      "심사위원 지시로 다시 '와' → 전면 앉아 → 종료기본자세",
    ],
    note: "엎드려 명령 후 10보 이상 지나쳐 엎드리면 최대 만족함(B).",
    schema: "remoteControl",
  },
  "원격통제 (앉아-와-엎드려-서-와)": {
    summary: "B단계: A단계에 '서' 자세가 추가됩니다.",
    steps: [
      "기본자세에서 직선 이동 → 10–15보 후 '앉아' 신호",
      "40보 이동 후 정지·반전 → '와' 신호",
      "견이 달려오는 중간 지점에서 '엎드려' 신호",
      "엎드린 자리에서 '서' 신호",
      "심사위원 지시로 '와' → 전면 앉아 → 종료기본자세",
    ],
    note: "각 자세 미이행 또는 10보 초과 이동 시 감점.",
    schema: "remoteControl",
  },
  "원격통제": {
    summary: "지도수에게서 멀어진 견을 음성/시각 신호로 자세 변환시킵니다.",
    steps: [
      "기본자세에서 직선 이동 → 10–15보 후 '앉아' 신호 (지도수는 멈추지 않고 계속)",
      "40보 이동 후 정지·반전 → 심사위원 지시로 '와' 신호",
      "중간 지점에서 '엎드려' 신호 → [B단계] 추가로 '서' 신호",
      "심사위원 지시로 최종 '와' → 전면 앉아 → 종료기본자세",
    ],
    note: "각 자세 위치 이탈 또는 10보 초과 시 감점.",
    schema: "remoteControl",
  },
  "원격조정 (테이블 2개)": {
    summary: "V단계 전용. 견이 전방 표식으로 달려가 멈춘 후, 2개의 테이블을 순서대로 이동합니다.",
    steps: [
      "기본자세에서 전방 20m 중앙 표식으로 견 파견 → '멈춰' 신호",
      "심사위원 지시로 테이블1로 '가' 신호 → 테이블1에서 최소 3초 대기",
      "테이블2로 '가' 신호 → 테이블2에서 최소 3초 대기",
      "마지막 테이블에서 '와' 신호 → 전면 앉아 → 종료기본자세",
    ],
    note: "중앙 표식 미경유 또는 순서 불이행 시 전체 과목 부족함(M).",
    schema: "sendAwayV",
  },
  "원격조정 (테이블 3개)": {
    summary: "A·B단계. 중앙 표식 → 3개 테이블을 추첨 순서로 이동합니다.",
    steps: [
      "기본자세에서 전방 20m 중앙 표식으로 견 파견 → '멈춰' 신호",
      "심사위원 추첨 순서에 따라 테이블1→2→3 순서로 이동",
      "각 테이블에서 최소 3초 대기",
      "마지막 테이블에서 '와' → 전면 앉아 → 종료기본자세",
    ],
    note: "지도수는 위치를 이탈할 수 없음 (한 발짝 방향 전환만 허용).",
    schema: "sendAwayAB",
  },
  "원격조정 (배낭/양동이 2개)": {
    summary: "눈사태 V단계 전용. 테이블 대신 배낭/양동이를 사용합니다.",
    steps: [
      "전방 중앙 표식으로 견 파견 → '멈춰'",
      "배낭/양동이1 → 배낭/양동이2 순서로 이동·대기",
      "마지막 지점에서 '와' → 종료기본자세",
    ],
    note: "눈 위에서 실시. 배낭/양동이 각 최소 3초 대기.",
    schema: "sendAwayV",
  },
  "원격조정 (배낭/양동이 3개)": {
    summary: "눈사태 A·B단계. 배낭/양동이 3개를 순서대로 이동합니다.",
    steps: [
      "전방 중앙 표식으로 견 파견 → '멈춰'",
      "추첨 순서로 배낭/양동이1→2→3 이동·대기",
      "마지막 지점에서 '와' → 종료기본자세",
    ],
    note: "눈 위에서 실시. 각 지점 최소 3초 대기.",
    schema: "sendAwayAB",
  },
  "원격조정 (수상·20m)": {
    summary: "수상 A단계. 두 보트 지점 중 지시된 순서로 수영하여 이동합니다.",
    steps: [
      "지도수가 육지 또는 보트 위에서 기본자세 취함",
      "심사위원이 두 지점 순서를 정함 → 견이 첫 지점으로 수영",
      "첫 지점 도착 후 '멈춰' (수영하며 대기) → 두 번째 지점으로",
      "'와' 신호로 지도수에게 수영하여 돌아옴 → 전면 앉아",
    ],
    note: "지시 순서 미이행 또는 지도수 위치 이탈 시 부족함(M).",
    schema: "waterRemote",
  },
  "원격조정 (수상·40m)": {
    summary: "수상 B단계. A단계와 동일하나 거리가 40m로 증가합니다.",
    steps: [
      "육지에서 기본자세 → 심사위원이 두 보트 지점 순서 지정",
      "첫 지점으로 수영 → 수영하며 대기 → 두 번째 지점으로 수영",
      "'와' 신호로 지도수에게 귀환 → 전면 앉아 → 종료기본자세",
    ],
    note: "두 지점은 상호 및 해안으로부터 40m 거리.",
    schema: "waterRemote",
  },
  "사다리 건너기": {
    summary: "4m 사다리를 디딤판으로 올라 끝까지 이동 후 지도수에게 안겨 내려옵니다.",
    steps: [
      "사다리 전면 기본자세 → '올라가' 신호",
      "디딤판을 통해 사다리 위로 올라 마지막 디딤대까지 자발적으로 이동·대기",
      "[A단계] 지도수가 앞발이 첫 디딤대에 닿으면 측면에서 동반 (접촉 금지)",
      "[B단계] 지도수는 서서 대기 → 심사위원 지시에 따라 접근",
      "종단부에서 지도수가 견을 들어 내려놓음 → 기본자세",
    ],
    note: "절반 이전 뛰어내리면 0점, 절반 이후 뛰어내리면 부족함(M).",
    schema: "ladder",
  },
  "그네 건너기": {
    summary: "B단계 전용. 좌우로 자유롭게 움직이는 3m 널빤지를 안정적으로 통과합니다.",
    steps: [
      "그네 전면 기본자세 → '올라가' 신호 → 디딤판 경유 → '멈춰'",
      "심사위원 지시로 지도수가 견 측면으로 이동 → '계속' 신호로 종단부까지 이동·자발 대기",
      "심사위원 지시로 '내려가' 신호 → 디딤판으로 하강 → 기본자세",
    ],
    note: "절반 이전 뛰어내리면 0점, 절반 이후 뛰어내리면 부족함(M). 그네 높이 40cm.",
    schema: "seesaw",
  },
  "터널통과": {
    summary: "하드터널(직경 50cm·길이 3m) 또는 소프트터널을 성부/시부 한 번으로 통과합니다.",
    steps: [
      "터널 전면 기본자세 → '통과' 성부/시부",
      "견이 통과 후 '멈춰' 성부/시부 → 심사위원 지시로 지도수 접근",
      "기본자세 성부/시부로 종료",
    ],
    note: "통과 후 멈춤 실패 시 부족함(M).",
    schema: "tunnel",
  },
  "고정된 나무다리 건너기": {
    summary: "V단계 전용. 두 고정 지지대 위 4m 나무다리를 안정적으로 횡단합니다.",
    steps: [
      "나무다리 전면 기본자세 → '올라가' 성부/시부 → 즉시 '멈춰'",
      "심사위원 지시로 지도수가 견 위치로 이동 → '계속' 성부/시부로 함께 이동",
      "견이 다리에서 내려오면 지도수 정지 → 견이 자발적으로 기본자세",
    ],
    note: "전반부 뛰어내리면 0점, 후반부 뛰어내리면 부족함(M). 너비 약 30cm.",
    schema: "fixedbridge",
  },
  "비고정 나무다리 건너기": {
    summary: "A단계 전용. 직경 40cm 원통 2개 위의 움직이는 판자를 통과합니다.",
    steps: [
      "장비 전면 기본자세 → '올라가' → '멈춰'",
      "심사위원 지시로 지도수 접근 → '계속'으로 동반 이동",
      "종단부 도달 시 자발 대기 → '계속'으로 하강 → 기본자세",
    ],
    note: "판자 이동 폭 약 20cm. 구조 유사물 허용.",
    schema: "movingbridge",
  },
  "이동중 앉아 및 부르기": {
    summary: "V단계 전용. 걸어가는 중에 견을 앉히고 30보 후 불러들입니다.",
    steps: [
      "기본자세에서 줄 없이 직선 이동 → 10–15보 후 '앉아' 신호",
      "30보 더 이동 후 정지·반전",
      "심사위원 지시로 '와' → 견이 전면 밀착 앉아",
      "약 3초 후 종료기본자세",
    ],
    note: "앉아 신호 후 엎드려 또는 서 있으면 5점 감점.",
    schema: "movingSit",
  },
  "자세변경 (테이블)": {
    summary: "테이블 위에서 앉아·엎드려·서 3가지 자세를 지도수 선택 순서로 실시합니다.",
    steps: [
      "테이블에서 10보 기본자세 → '올라가' → 테이블 위에서 멈춤",
      "앉아·엎드려·서 3가지 자세 (순서는 지도수가 선택)",
      "'와' 성부 → 테이블에서 내려와 전면 앉아",
      "성부 1회로 종료기본자세",
    ],
    note: "테이블 크기: 100×100cm, 높이 60cm. 각 자세에서 약 3초 대기.",
    schema: "positionChange",
  },
  "자세변경 (눈덩이·자연높이)": {
    summary: "눈사태 V단계. 테이블 대신 눈덩이나 자연 높이 차이를 활용합니다.",
    steps: [
      "눈덩이 또는 자연 높이 차이로 만든 대기 지점으로 이동",
      "앉아·엎드려·서 3가지 자세",
      "'와' 신호로 지도수에게 복귀 → 종료기본자세",
    ],
    note: "눈 위 환경이므로 테이블 없이도 인정.",
    schema: null,
  },
  "자세변경 (서핑보드)": {
    summary: "수상 V단계. 서핑보드 위에서 자세를 취합니다.",
    steps: [
      "서핑보드(패들보드)로 이동 → '올라가' → 위에 올라 '멈춰'",
      "앉아·엎드려·서 중 지시된 자세 유지",
      "'내려와' 및 '이리와' 신호로 해안으로 수영 귀환",
    ],
    note: "B단계는 도우미가 보드를 40m 밀고, 견이 수영하여 지도수에게 돌아옴.",
    schema: null,
  },
  "평지물품회수": {
    summary: "견이 지도수가 던진 물품을 즉시 물고 돌아와 전면 앉아 후 건네줍니다.",
    steps: [
      "기본자세에서 물품을 약 10보 거리에 던짐 → 물품 정지 후 '가져와' 신호",
      "견이 달려가 즉시 입으로 물고 속보로 귀환",
      "전면 밀착 앉아 → '놔' 신호로 전달 → 종료기본자세",
    ],
    note: "200g 미만/500g 초과 물품 금지. 길이 10–25cm 권장.",
    schema: null,
  },
  "들고 건네주기": {
    summary: "도우미가 견을 들고 10보 이동 후 내려놓으면, 견이 지도수 명령에 따라 돌아옵니다.",
    steps: [
      "지도수가 견을 들어 도우미에게 전달 → 도우미가 10보 이동 후 내려놓음",
      "[V단계] 도우미가 견 머리를 지도수 방향으로 향하게 한 뒤 내려놓음",
      "[A·B단계] 내려놓은 후 '와' 신호 → 전면 앉아 → 종료기본자세",
    ],
    note: "도중 뛰어내리면 부족함(M). 지도수가 들 수 없으면 도우미가 대신.",
    schema: "carryHandover",
  },
  "산만한 상황에서의 대기": {
    summary: "다른 팀이 과목을 수행하는 동안 견이 조용히 엎드려 대기합니다.",
    steps: [
      "'엎드려' 신호 → 지도수가 정해진 거리로 이동",
      "[V] 20보 거리·견을 마주보고·2–4번째 과목까지 대기",
      "[A] 40보 거리·등 돌리고·2–9번째 과목까지 대기",
      "[B] 완전 은폐 (블라인드) → 모든 과목 완료까지 대기",
      "심사위원 지시로 '앉아' → 종료",
    ],
    note: "2번째 과목 후 3m 이상 이탈 시 부족함(M). 이전이면 0점.",
    schema: "waitSchema",
  },
  "장거리 수영 (4분·최대 300m)": {
    summary: "V단계: 정지 보트에서 물에 넣어진 후 지정 시간 동안 수영합니다.",
    steps: [
      "지도수가 견을 정지 보트에서 물에 넣음 (또는 견이 자발적으로 뛰어듦)",
      "보트가 출발하면 견이 뒤따라 수영 (최대 4분·300m)",
      "보트 정지 → '와' 신호 → 견이 보트로 수영해 옴 → 지도수가 들어 올려줌",
    ],
    note: "체력 미달 판단 시 심사위원이 중단·0점 처리.",
    schema: null,
  },
  "장거리 수영 (8분·최대 500m)": {
    summary: "A단계: 정지 보트에서 뛰어들어 8분간 수영합니다.",
    steps: [
      "성부/시부로 정지 보트에서 물로 뛰어듦",
      "보트가 약 10m 간격 유지하며 출발 → 견이 뒤따라 수영",
      "보트 정지 → '와' 신호 → 견 귀환 → 지도수가 보트로 들어 올려줌",
    ],
    note: "A단계부터 자발적으로 뛰어들어야 함.",
    schema: null,
  },
  "장거리 수영 (12분·최대 800m)": {
    summary: "B단계: 정지 보트에서 뛰어들어 12분간 수영합니다.",
    steps: [
      "성부/시부로 정지 보트에서 물로 뛰어듦",
      "보트가 10m 간격으로 출발 → 견이 뒤따라 수영",
      "보트 정지 → '와' 신호 → 견 귀환 → 지도수가 들어 올려줌",
    ],
    note: "가장 높은 체력 요구 단계. 시험 중단 기준: 심사위원 재량.",
    schema: null,
  },
  "설원에서 흔적 따르기 (150보)": {
    summary: "눈 위에서 지도수의 스키/설피 흔적을 따라가는 과목입니다.",
    steps: [
      "흔적 시작 지점 기본자세 → '따라' 성부/시부",
      "지도수가 앞서 이동, 견이 지도수 뒤에서 흔적을 따라 이동 (150보)",
      "지도수와 견 사이 일정 간격 유지",
    ],
    note: "머뭇거림·이탈·추월·뒤처짐 등 감점 요인.",
    schema: null,
  },
  "설원에서 흔적 따르기 (250보)": {
    summary: "눈 위에서 250보 흔적을 따라갑니다 (A단계).",
    steps: [
      "흔적 시작 기본자세 → '따라' 신호",
      "지도수가 앞서 이동 → 견이 뒤따라 250보 이동",
    ],
    note: "예각(급커브) 제외. 임의 형태의 진로 허용.",
    schema: null,
  },
  "설원에서 흔적 따르기 (350보)": {
    summary: "눈 위에서 350보 흔적을 따라갑니다 (B단계).",
    steps: [
      "흔적 시작 기본자세 → '따라' 신호",
      "지도수가 앞서 이동 → 견이 뒤따라 350보 이동",
    ],
    note: "B단계는 가장 높은 집중도 요구. 반복 신호 최소화 필수.",
    schema: null,
  },
  "운송수단 동승 (약 150m)": {
    summary: "구조 썰매·스노모빌·리프트·헬리콥터 등에 탑승하여 약 150m를 이동합니다.",
    steps: [
      "적당한 거리에서 기본자세 → 성부/시부로 운송수단에 탑승",
      "탑승 방식은 지도수 재량 (자발 탑승·들어 올리기 모두 허용)",
      "이동 중 견이 조용·태연하게 대기",
      "도착·착륙 후 견과 함께 하차 → 기본자세",
    ],
    note: "탑승·하차 비협조 시 0점. 이동 중 불안·급한 행동 시 감점.",
    schema: null,
  },
};


// ── SVG 도식 컴포넌트 — PDF 원본 이미지 충실 재현

// Image 1: 사회성 테스트 — 그룹 동선 (stop·group starts·group stops 범례)
function SchemaSocialTest({ color }) {
  return (
    <svg viewBox="0 0 500 280" style={{ width:"100%", maxWidth:500, display:"block", margin:"0 auto" }}>
      <rect width="500" height="280" rx="10" fill="#fff" stroke="#E2E8F0" strokeWidth="1"/>
      <text x="250" y="16" textAnchor="middle" fontSize="10" fill="#8B9EC0" fontWeight="700">시작보고 및 사회성 테스트 (PDF 3.3.4)</text>

      {/* Legend */}
      <circle cx="22" cy="40" r="6" fill="#222"/>
      <text x="32" y="44" fontSize="9" fill="#333">stop</text>
      <circle cx="22" cy="58" r="6" fill="none" stroke="#c00" strokeWidth="2"/>
      <text x="32" y="62" fontSize="9" fill="#333">group starts</text>
      <rect x="16" y="70" width="12" height="12" fill="none" stroke="#c00" strokeWidth="2"/>
      <text x="32" y="80" fontSize="9" fill="#333">group stops</text>

      {/* DH + dog at lower left walking to group */}
      {/* DH silhouette */}
      <rect x="28" y="175" width="12" height="28" rx="3" fill="#222"/>
      <circle cx="34" cy="170" r="7" fill="#222"/>
      {/* Dog */}
      <ellipse cx="54" cy="195" rx="10" ry="7" fill="#555"/>
      {/* Dashed green line: DH approach path */}
      <line x1="66" y1="195" x2="238" y2="195" stroke="#4a7c4e" strokeWidth="2" strokeDasharray="8,4"/>
      {/* Arrow right */}
      <polygon points="238,191 248,195 238,199" fill="#4a7c4e"/>
      {/* group starts circle at mid-path */}
      <circle cx="165" cy="195" r="8" fill="none" stroke="#c00" strokeWidth="2"/>

      {/* Group circle (right side) */}
      {/* Outer dashed green circle (DH path) */}
      <circle cx="330" cy="155" r="85" fill="none" stroke="#4a7c4e" strokeWidth="2.5" strokeDasharray="8,4"/>
      {/* Inner red dashed circle (group path) */}
      <circle cx="330" cy="155" r="55" fill="none" stroke="#c00" strokeWidth="2" strokeDasharray="6,4"/>

      {/* Group people around inner circle */}
      {/* Top person */}
      <rect x="322" y="78" width="10" height="22" rx="3" fill="#222"/>
      <circle cx="327" cy="74" r="6" fill="#222"/>
      {/* Right person */}
      <rect x="378" y="142" width="10" height="22" rx="3" fill="#222"/>
      <circle cx="383" cy="138" r="6" fill="#222"/>
      {/* Bottom person */}
      <rect x="322" y="208" width="10" height="22" rx="3" fill="#222"/>
      <circle cx="327" cy="204" r="6" fill="#222"/>

      {/* Test dog in group */}
      <ellipse cx="310" cy="175" rx="11" ry="8" fill="#888"/>
      <text x="310" y="179" textAnchor="middle" fontSize="7" fill="white" fontWeight="700">견</text>

      {/* DH in center */}
      <rect x="322" y="143" width="10" height="20" rx="3" fill="#222"/>
      <circle cx="327" cy="139" r="5" fill="#222"/>

      {/* stop dot center */}
      <circle cx="327" cy="158" r="6" fill="#222"/>

      {/* group stops square (right side of outer circle) */}
      <rect x="410" y="147" width="12" height="12" fill="none" stroke="#c00" strokeWidth="2"/>
      <circle cx="416" cy="153" r="4" fill="#222"/>

      {/* Green arrows around outer circle (clockwise direction cues) */}
      {[30, 90, 150, 210, 270, 330].map((deg, i) => {
        const r = 85, cx2 = 330, cy2 = 155;
        const rad = (deg - 90) * Math.PI / 180;
        const x = cx2 + r * Math.cos(rad), y = cy2 + r * Math.sin(rad);
        const rad2 = (deg - 60) * Math.PI / 180;
        const dx = Math.cos(rad2) * 10, dy = Math.sin(rad2) * 10;
        return <polygon key={i} points={`${x},${y} ${x-dx-dy*0.4},${y-dy+dx*0.4} ${x-dx+dy*0.4},${y-dy-dx*0.4}`} fill="#4a7c4e"/>;
      })}

      {/* Red arrows inside (group direction) */}
      {[60, 180, 300].map((deg, i) => {
        const r = 55, cx2 = 330, cy2 = 155;
        const rad = (deg - 90) * Math.PI / 180;
        const x = cx2 + r * Math.cos(rad), y = cy2 + r * Math.sin(rad);
        const rad2 = (deg - 60) * Math.PI / 180;
        const dx = Math.cos(rad2) * 9, dy = Math.sin(rad2) * 9;
        return <polygon key={i} points={`${x},${y} ${x-dx-dy*0.4},${y-dy+dx*0.4} ${x-dx+dy*0.4},${y-dy-dx*0.4}`} fill="#c00"/>;
      })}

      {/* Figure-8 path indication (red arrow from dog area curving) */}
      <path d="M310,167 Q295,185 310,195" fill="none" stroke="#c00" strokeWidth="1.5" strokeDasharray="3,2"/>
      <polygon points="310,195 305,186 315,187" fill="#c00"/>

      <text x="250" y="262" textAnchor="middle" fontSize="8" fill="#555">그룹(반시계)과 RDT가 교차 → 8자 동선으로 그룹 통과 → DH 그룹 중앙 정지</text>
    </svg>
  );
}

// Image 13: 줄메고/줄없이 따라걷기 — 공식 경로 도식 (approx.40 normal / 50 normal paces, RW/LW/KW)
function SchemaLeashedHeeling({ color }) {
  return (
    <svg viewBox="0 0 520 420" style={{ width:"100%", maxWidth:520, display:"block", margin:"0 auto" }}>
      <rect width="520" height="420" rx="10" fill="#fff" stroke="#E2E8F0" strokeWidth="1"/>
      <text x="260" y="16" textAnchor="middle" fontSize="10" fill="#8B9EC0" fontWeight="700">줄메고 따라걷기 경로 (PDF 3.3.5 On-leash)</text>

      {/* Female dog marker top-left */}
      <ellipse cx="68" cy="68" rx="10" ry="7" fill="#222" opacity="0.7"/>
      <circle cx="60" cy="60" r="5" fill="#222"/>
      <text x="90" y="65" fontSize="9" fill="#333">female dog</text>
      <ellipse cx="68" cy="98" rx="10" ry="7" fill="#222" opacity="0.5"/>
      <circle cx="60" cy="90" r="5" fill="#222"/>
      <text x="90" y="95" fontSize="9" fill="#333">male dog</text>
      {/* 6m bracket */}
      <line x1="56" y1="66" x2="56" y2="96" stroke="#c00" strokeWidth="1.5"/>
      <text x="40" y="84" fontSize="9" fill="#c00" fontWeight="700">6 m</text>

      {/* approx 40 normal label top */}
      <text x="350" y="38" textAnchor="middle" fontSize="9" fill="#c00" fontWeight="700">approx. 40 normal</text>
      <line x1="195" y1="42" x2="505" y2="42" stroke="#c00" strokeWidth="1.5" strokeDasharray="4,3"/>
      <circle cx="195" cy="42" r="4" fill="#222"/>
      <circle cx="505" cy="42" r="4" fill="#222"/>

      {/* Main route — faithful to Image 13 */}
      {/* Start: bottom right, DH+dog silhouettes */}
      {/* DH start bottom right */}
      <rect x="454" y="355" width="12" height="24" rx="3" fill="#222"/>
      <circle cx="460" cy="350" r="7" fill="#222"/>
      <rect x="470" y="358" width="12" height="20" rx="3" fill="#222" opacity="0.6"/>
      <circle cx="476" cy="354" r="6" fill="#222" opacity="0.6"/>

      {/* approx 50 normal paces — go up */}
      <line x1="460" y1="350" x2="460" y2="120" stroke="#222" strokeWidth="2.5"/>
      <polygon points="460,113 456,125 464,125" fill="#222"/>
      <text x="472" y="240" fontSize="8.5" fill="#222" transform="rotate(90,472,240)">approx. 50 normal paces</text>

      {/* KW (u-turn) top right */}
      <path d="M460,120 Q460,95 435,95" fill="none" stroke="#222" strokeWidth="2.5"/>
      <text x="468" y="108" fontSize="9" fill="#222" fontWeight="700">KW</text>

      {/* 10-15 normal paces left after KW */}
      <line x1="435" y1="95" x2="360" y2="95" stroke="#222" strokeWidth="2.5"/>
      <text x="395" y="88" textAnchor="middle" fontSize="8" fill="#222">10 – 15 normal paces</text>

      {/* fast pace section */}
      <line x1="360" y1="95" x2="285" y2="95" stroke="#222" strokeWidth="2" strokeDasharray="6,3"/>
      <text x="320" y="88" textAnchor="middle" fontSize="8" fill="#222">10 – 15 fast paces</text>

      {/* slow pace section */}
      <line x1="285" y1="95" x2="215" y2="95" stroke="#222" strokeWidth="2" strokeDasharray="3,3"/>
      <text x="250" y="88" textAnchor="middle" fontSize="8" fill="#222">10 – 15 slow paces</text>

      {/* normal paces back */}
      <line x1="215" y1="95" x2="195" y2="95" stroke="#222" strokeWidth="2.5"/>
      <text x="165" y="88" textAnchor="middle" fontSize="8" fill="#222">10 – 15 normal paces</text>

      {/* RW right turn going down */}
      <path d="M195,95 Q175,95 175,118" fill="none" stroke="#222" strokeWidth="2.5"/>
      <text x="148" y="112" fontSize="9" fill="#222" fontWeight="700">KW</text>

      {/* 10-15 normal paces down left side */}
      <line x1="175" y1="118" x2="175" y2="200" stroke="#222" strokeWidth="2.5"/>
      <text x="140" y="162" fontSize="8" fill="#222" transform="rotate(90,140,162)">10 – 15 normal paces</text>

      {/* RW turn */}
      <circle cx="175" cy="200" r="4" fill="#222"/>

      {/* 25-30 normal paces down */}
      <line x1="175" y1="204" x2="175" y2="320" stroke="#222" strokeWidth="2.5"/>
      <text x="140" y="265" fontSize="8" fill="#222" transform="rotate(90,140,265)">25 – 30 normal paces</text>

      {/* RW bottom left */}
      <text x="148" y="332" fontSize="9" fill="#222" fontWeight="700">RW</text>
      <path d="M175,320 Q175,340 198,340" fill="none" stroke="#222" strokeWidth="2.5"/>

      {/* 20-25 normal paces right (bottom) */}
      <line x1="198" y1="340" x2="340" y2="340" stroke="#222" strokeWidth="2.5"/>
      <text x="268" y="355" textAnchor="middle" fontSize="8" fill="#222">20 - 25 normal paces</text>

      {/* LW bottom left area */}
      <text x="148" y="358" fontSize="9" fill="#222" fontWeight="700">LW</text>
      <line x1="198" y1="356" x2="340" y2="356" stroke="#222" strokeWidth="2.5"/>
      <text x="268" y="370" textAnchor="middle" fontSize="8" fill="#222">20 - 25 normal paces</text>

      {/* RW bottom right */}
      <text x="346" y="332" fontSize="9" fill="#222" fontWeight="700">RW</text>
      <path d="M340,340 Q360,340 360,318" fill="none" stroke="#222" strokeWidth="2.5"/>

      {/* up right side 10-15 + 10-15 */}
      <line x1="360" y1="318" x2="360" y2="230" stroke="#222" strokeWidth="2.5"/>
      <text x="375" y="278" fontSize="8" fill="#222" transform="rotate(90,375,278)">10 – 15 normal paces</text>
      <circle cx="360" cy="230" r="4" fill="#222"/>
      <line x1="360" y1="226" x2="360" y2="160" stroke="#222" strokeWidth="2.5"/>
      <text x="375" y="196" fontSize="8" fill="#222" transform="rotate(90,375,196)">10 – 15 normal paces</text>

      {/* Final DH position top right side */}
      <rect x="348" y="42" width="12" height="24" rx="3" fill="#222"/>
      <circle cx="354" cy="38" r="7" fill="#222"/>
      <text x="380" y="55" fontSize="9" fill="#222" fontWeight="700">DH</text>

      {/* Legend bottom */}
      <text x="30" y="395" fontSize="9" fill="#333" fontWeight="700">RW = right turn</text>
      <text x="30" y="408" fontSize="9" fill="#333" fontWeight="700">LW = left turn</text>
      <text x="160" y="395" fontSize="9" fill="#333" fontWeight="700">KW = u-turn</text>
    </svg>
  );
}

function SchemaHeeling({ color }) {
  return (
    <svg viewBox="0 0 520 420" style={{ width:"100%", maxWidth:520, display:"block", margin:"0 auto" }}>
      <rect width="520" height="420" rx="10" fill="#fff" stroke="#E2E8F0" strokeWidth="1"/>
      <text x="260" y="16" textAnchor="middle" fontSize="10" fill="#8B9EC0" fontWeight="700">줄없이 따라걷기 경로 (PDF 3.3.5 Off-leash)</text>

      <ellipse cx="68" cy="68" rx="10" ry="7" fill="#222" opacity="0.7"/>
      <circle cx="60" cy="60" r="5" fill="#222"/>
      <text x="90" y="65" fontSize="9" fill="#333">female dog</text>
      <ellipse cx="68" cy="98" rx="10" ry="7" fill="#222" opacity="0.5"/>
      <circle cx="60" cy="90" r="5" fill="#222"/>
      <text x="90" y="95" fontSize="9" fill="#333">male dog</text>
      <line x1="56" y1="66" x2="56" y2="96" stroke="#c00" strokeWidth="1.5"/>
      <text x="40" y="84" fontSize="9" fill="#c00" fontWeight="700">6 m</text>

      <text x="350" y="38" textAnchor="middle" fontSize="9" fill="#c00" fontWeight="700">approx. 40 normal</text>
      <line x1="195" y1="42" x2="505" y2="42" stroke="#c00" strokeWidth="1.5" strokeDasharray="4,3"/>
      <circle cx="195" cy="42" r="4" fill="#222"/>
      <circle cx="505" cy="42" r="4" fill="#222"/>

      <rect x="454" y="355" width="12" height="24" rx="3" fill="#222"/>
      <circle cx="460" cy="350" r="7" fill="#222"/>
      <rect x="470" y="358" width="12" height="20" rx="3" fill="#222" opacity="0.6"/>
      <circle cx="476" cy="354" r="6" fill="#222" opacity="0.6"/>

      <line x1="460" y1="350" x2="460" y2="120" stroke="#222" strokeWidth="2.5"/>
      <polygon points="460,113 456,125 464,125" fill="#222"/>
      <text x="472" y="240" fontSize="8.5" fill="#222" transform="rotate(90,472,240)">approx. 50 normal paces</text>

      <path d="M460,120 Q460,95 435,95" fill="none" stroke="#222" strokeWidth="2.5"/>
      <text x="468" y="108" fontSize="9" fill="#222" fontWeight="700">KW</text>
      <line x1="435" y1="95" x2="360" y2="95" stroke="#222" strokeWidth="2.5"/>
      <text x="395" y="88" textAnchor="middle" fontSize="8" fill="#222">10 – 15 normal paces</text>
      <line x1="360" y1="95" x2="285" y2="95" stroke="#222" strokeWidth="2" strokeDasharray="6,3"/>
      <text x="320" y="88" textAnchor="middle" fontSize="8" fill="#222">10 – 15 fast paces</text>
      <line x1="285" y1="95" x2="215" y2="95" stroke="#222" strokeWidth="2" strokeDasharray="3,3"/>
      <text x="250" y="88" textAnchor="middle" fontSize="8" fill="#222">10 – 15 slow paces</text>
      <line x1="215" y1="95" x2="195" y2="95" stroke="#222" strokeWidth="2.5"/>
      <text x="165" y="88" textAnchor="middle" fontSize="8" fill="#222">10 – 15 normal paces</text>

      <path d="M195,95 Q175,95 175,118" fill="none" stroke="#222" strokeWidth="2.5"/>
      <text x="148" y="112" fontSize="9" fill="#222" fontWeight="700">KW</text>
      <line x1="175" y1="118" x2="175" y2="200" stroke="#222" strokeWidth="2.5"/>
      <text x="140" y="162" fontSize="8" fill="#222" transform="rotate(90,140,162)">10 – 15 normal paces</text>
      <circle cx="175" cy="200" r="4" fill="#222"/>
      <line x1="175" y1="204" x2="175" y2="320" stroke="#222" strokeWidth="2.5"/>
      <text x="140" y="265" fontSize="8" fill="#222" transform="rotate(90,140,265)">25 – 30 normal paces</text>
      <text x="148" y="332" fontSize="9" fill="#222" fontWeight="700">RW</text>
      <path d="M175,320 Q175,340 198,340" fill="none" stroke="#222" strokeWidth="2.5"/>
      <line x1="198" y1="340" x2="340" y2="340" stroke="#222" strokeWidth="2.5"/>
      <text x="268" y="355" textAnchor="middle" fontSize="8" fill="#222">20 - 25 normal paces</text>
      <text x="148" y="358" fontSize="9" fill="#222" fontWeight="700">LW</text>
      <line x1="198" y1="356" x2="340" y2="356" stroke="#222" strokeWidth="2.5"/>
      <text x="268" y="370" textAnchor="middle" fontSize="8" fill="#222">20 - 25 normal paces</text>
      <text x="346" y="332" fontSize="9" fill="#222" fontWeight="700">RW</text>
      <path d="M340,340 Q360,340 360,318" fill="none" stroke="#222" strokeWidth="2.5"/>
      <line x1="360" y1="318" x2="360" y2="230" stroke="#222" strokeWidth="2.5"/>
      <text x="375" y="278" fontSize="8" fill="#222" transform="rotate(90,375,278)">10 – 15 normal paces</text>
      <circle cx="360" cy="230" r="4" fill="#222"/>
      <line x1="360" y1="226" x2="360" y2="160" stroke="#222" strokeWidth="2.5"/>
      <text x="375" y="196" fontSize="8" fill="#222" transform="rotate(90,375,196)">10 – 15 normal paces</text>

      <rect x="348" y="42" width="12" height="24" rx="3" fill="#222"/>
      <circle cx="354" cy="38" r="7" fill="#222"/>
      <text x="380" y="55" fontSize="9" fill="#222" fontWeight="700">DH</text>

      <rect x="330" y="390" width="150" height="18" rx="5" fill={color} opacity="0.12" stroke={color} strokeWidth="1"/>
      <text x="405" y="402" textAnchor="middle" fontSize="8.5" fill={color} fontWeight="700">줄 없음 (A · B 단계)</text>

      <text x="30" y="395" fontSize="9" fill="#333" fontWeight="700">RW = right turn</text>
      <text x="30" y="408" fontSize="9" fill="#333" fontWeight="700">LW = left turn</text>
      <text x="160" y="395" fontSize="9" fill="#333" fontWeight="700">KW = u-turn</text>
    </svg>
  );
}

// Image 12: 이동중 앉아 및 부르기 — Phase 1/2/3
function SchemaMovingSit({ color }) {
  return (
    <svg viewBox="0 0 420 340" style={{ width:"100%", maxWidth:420, display:"block", margin:"0 auto" }}>
      <rect width="420" height="340" rx="10" fill="#fff" stroke="#E2E8F0" strokeWidth="1"/>
      <text x="210" y="16" textAnchor="middle" fontSize="10" fill="#8B9EC0" fontWeight="700">이동중 앉아 및 부르기 (PDF 3.3.6)</text>

      {/* Phase labels */}
      <text x="70" y="38" textAnchor="middle" fontSize="10" fill="#222" fontWeight="800">Phase 1</text>
      <text x="210" y="38" textAnchor="middle" fontSize="10" fill="#222" fontWeight="800">Phase 2</text>
      <text x="340" y="38" textAnchor="middle" fontSize="10" fill="#222" fontWeight="800">Phase 3</text>

      {/* Phase 1 */}
      {/* DH at top (walking up) */}
      <rect x="62" y="50" width="14" height="26" rx="3" fill="#222"/>
      <circle cx="69" cy="46" r="8" fill="#222"/>
      {/* Red up arrow */}
      <line x1="69" y1="76" x2="69" y2="200" stroke="#c00" strokeWidth="2.5"/>
      <polygon points="69,76 64,88 74,88" fill="#c00"/>
      {/* Dog sitting */}
      <ellipse cx="55" cy="215" rx="12" ry="9" fill="#222" opacity="0.5"/>
      <rect x="63" y="204" width="8" height="14" rx="2" fill="#222" opacity="0.7"/>
      {/* 30 normal paces label */}
      <text x="30" y="148" fontSize="9" fill="#222" fontWeight="700">30 normal paces</text>
      <line x1="85" y1="78" x2="95" y2="78" stroke="#222" strokeWidth="1"/>
      <line x1="85" y1="200" x2="95" y2="200" stroke="#222" strokeWidth="1"/>
      {/* 10-15 paces */}
      <text x="30" y="248" fontSize="9" fill="#222" fontWeight="700">10 - 15 normal paces</text>
      {/* Start position */}
      <rect x="55" y="256" width="16" height="26" rx="3" fill="#222" opacity="0.4"/>
      <circle cx="63" cy="252" r="7" fill="#222" opacity="0.4"/>
      <text x="63" y="298" textAnchor="middle" fontSize="9" fill="#222" fontWeight="700">Start Position</text>
      {/* Flag */}
      <line x1="48" y1="255" x2="48" y2="285" stroke="#222" strokeWidth="2"/>
      <polygon points="48,255 60,260 48,266" fill="#222"/>

      {/* Phase 2 */}
      {/* DH + dog at front sit */}
      <rect x="196" y="120" width="14" height="26" rx="3" fill="#222"/>
      <circle cx="203" cy="116" r="8" fill="#222"/>
      {/* Dog in front sit */}
      <ellipse cx="190" cy="150" rx="11" ry="8" fill="#222" opacity="0.6"/>
      <rect x="198" y="140" width="7" height="12" rx="2" fill="#222" opacity="0.7"/>
      {/* Black up arrow */}
      <line x1="203" y1="146" x2="203" y2="260" stroke="#222" strokeWidth="2.5"/>
      <polygon points="203,146 198,158 208,158" fill="#222"/>

      {/* Phase 3 */}
      {/* DH + dog GS */}
      <rect x="328" y="120" width="14" height="26" rx="3" fill="#222"/>
      <circle cx="335" cy="116" r="8" fill="#222"/>
      <ellipse cx="350" cy="140" rx="10" ry="7" fill="#222" opacity="0.6"/>
      <rect x="354" y="130" width="7" height="12" rx="2" fill="#222" opacity="0.7"/>

      {/* Notes */}
      <rect x="10" y="305" width="400" height="28" rx="4" fill="#f5f5f5"/>
      <text x="210" y="316" textAnchor="middle" fontSize="8.5" fill="#333">DH 멈추지 않고 이동 → 30보 후 정지·반전 → '와!' 신호</text>
      <text x="210" y="327" textAnchor="middle" fontSize="8" fill="#c00">앉아 후 엎드려/서 자세 → 5점 감점</text>
    </svg>
  );
}

// Image 11: 원격통제 — Phase 1/2/3/4 (빨간선, B표시)
function SchemaRemoteControl({ color }) {
  return (
    <svg viewBox="0 0 420 420" style={{ width:"100%", maxWidth:420, display:"block", margin:"0 auto" }}>
      <rect width="420" height="420" rx="10" fill="#fff" stroke="#E2E8F0" strokeWidth="1"/>
      <text x="210" y="16" textAnchor="middle" fontSize="10" fill="#8B9EC0" fontWeight="700">원격통제 (PDF 3.3.7 Distance Control)</text>

      {/* Phase labels */}
      {["Phase 1","Phase 2","Phase 3","Phase 4"].map((p,i)=>(
        <text key={i} x={55+i*100} y="38" textAnchor="middle" fontSize="10" fill="#222" fontWeight="800">{p}</text>
      ))}

      {/* Phase 1 — DH at top, red line going up */}
      <rect x="47" y="50" width="14" height="26" rx="3" fill="#222"/>
      <circle cx="54" cy="46" r="8" fill="#222"/>
      {/* Red arrow up */}
      <line x1="54" y1="76" x2="54" y2="230" stroke="#c00" strokeWidth="3"/>
      <polygon points="54,76 49,88 59,88" fill="#c00"/>
      {/* 40 normal paces label */}
      <text x="20" y="160" fontSize="8.5" fill="#222" transform="rotate(90,20,160)">40 Normalschritte</text>
      {/* Dog at bottom of red line (sitting) */}
      <ellipse cx="40" cy="242" rx="11" ry="8" fill="#222" opacity="0.5"/>
      <rect x="48" y="232" width="8" height="13" rx="2" fill="#222" opacity="0.7"/>
      {/* Start dot */}
      <circle cx="54" cy="260" r="6" fill="#222"/>
      {/* 10-15 label */}
      <text x="20" y="310" fontSize="8.5" fill="#222" transform="rotate(90,20,310)">10 - 15 Normalschritte</text>
      {/* DH at very bottom */}
      <rect x="47" y="340" width="14" height="26" rx="3" fill="#222" opacity="0.6"/>
      <circle cx="54" cy="336" r="8" fill="#222" opacity="0.6"/>
      {/* Dog next to DH */}
      <ellipse cx="70" cy="352" rx="10" ry="7" fill="#222" opacity="0.4"/>

      {/* Phase 2 — DH stopped, turned */}
      <rect x="147" y="50" width="14" height="26" rx="3" fill="#222"/>
      <circle cx="154" cy="46" r="8" fill="#222"/>
      {/* dotted line down */}
      <line x1="154" y1="76" x2="154" y2="260" stroke="#222" strokeWidth="2" strokeDasharray="6,4"/>
      {/* dot */}
      <circle cx="154" cy="260" r="6" fill="#222"/>

      {/* Phase 3 — DH + dog mid-recall with B label */}
      <rect x="247" y="50" width="14" height="26" rx="3" fill="#222"/>
      <circle cx="254" cy="46" r="8" fill="#222"/>
      {/* Dog in down position mid-path */}
      <ellipse cx="238" cy="175" rx="13" ry="9" fill="#222" opacity="0.6"/>
      {/* Dog sitting behind */}
      <ellipse cx="265" cy="182" rx="10" ry="7" fill="#222" opacity="0.4"/>
      <rect x="270" y="172" width="7" height="12" rx="2" fill="#222" opacity="0.5"/>
      {/* B label */}
      <text x="285" y="178" fontSize="14" fill="#222" fontWeight="900">B</text>
      {/* Black up arrow */}
      <line x1="254" y1="76" x2="254" y2="260" stroke="#222" strokeWidth="2.5"/>
      <polygon points="254,76 249,88 259,88" fill="#222"/>
      {/* dot */}
      <circle cx="254" cy="260" r="6" fill="#222"/>

      {/* Phase 4 — DH + dog at heel */}
      <rect x="347" y="50" width="14" height="26" rx="3" fill="#222"/>
      <circle cx="354" cy="46" r="8" fill="#222"/>
      <ellipse cx="370" cy="70" rx="10" ry="7" fill="#222" opacity="0.5"/>
      <rect x="372" y="60" width="7" height="12" rx="2" fill="#222" opacity="0.6"/>

      {/* Note */}
      <rect x="10" y="385" width="400" height="28" rx="4" fill="#f5f5f5"/>
      <text x="210" y="396" textAnchor="middle" fontSize="8.5" fill="#333">A단계: 앉아→와→엎드려→와 / B단계: 앉아→와→엎드려→서→와</text>
      <text x="210" y="407" textAnchor="middle" fontSize="8" fill="#c00">10보 이상 초과해서 자세 취하면 → 최대 만족함(B)</text>
    </svg>
  );
}

// Image 8: 원격조정 V단계 — 2개 테이블 (40m, 20m, 8.5m)
function SchemaSendAwayV({ color }) {
  return (
    <svg viewBox="0 0 500 320" style={{ width:"100%", maxWidth:500, display:"block", margin:"0 auto" }}>
      <rect width="500" height="320" rx="10" fill="#fff" stroke="#E2E8F0" strokeWidth="1"/>
      <text x="250" y="16" textAnchor="middle" fontSize="10" fill="#8B9EC0" fontWeight="700">원격조정 V단계 — 2개 (PDF 3.3.11 Level V)</text>

      {/* DH at bottom center */}
      <rect x="235" y="258" width="14" height="26" rx="3" fill="#222"/>
      <circle cx="242" cy="254" r="8" fill="#222"/>
      {/* Dog next to DH */}
      <ellipse cx="220" cy="268" rx="10" ry="7" fill="#222" opacity="0.5"/>
      {/* Green start line */}
      <line x1="210" y1="275" x2="270" y2="275" stroke="#4a7c4e" strokeWidth="3"/>

      {/* 8.5m up to start dot */}
      <circle cx="242" cy="240" r="5" fill="#222"/>
      <line x1="242" y1="254" x2="242" y2="242" stroke="#222" strokeWidth="1.5" strokeDasharray="3,2"/>
      <text x="255" y="250" fontSize="8" fill="#c00" fontWeight="700">8,5 m</text>

      {/* 20m up to cone/marker */}
      <line x1="242" y1="240" x2="242" y2="155" stroke="#222" strokeWidth="1.5" strokeDasharray="3,2"/>
      <text x="255" y="200" fontSize="8" fill="#c00" fontWeight="700">20 m</text>
      {/* Cone at center */}
      <polygon points="242,145 234,168 250,168" fill="#c00" opacity="0.8"/>
      <rect x="234" y="168" width="16" height="5" rx="2" fill="#c00" opacity="0.6"/>

      {/* Table 1 — left */}
      <rect x="75" y="68" width="90" height="40" rx="4" fill="#c8a050" stroke="#a07830" strokeWidth="2"/>
      <text x="120" y="92" textAnchor="middle" fontSize="11" fill="#222" fontWeight="800">T1</text>
      {/* Backpack icon left of T1 */}
      <rect x="162" y="78" width="18" height="22" rx="4" fill="#4a7c4e" opacity="0.7"/>
      <circle cx="171" cy="76" r="5" fill="#4a7c4e" opacity="0.7"/>

      {/* Table 2 — right */}
      <rect x="330" y="68" width="90" height="40" rx="4" fill="#c8a050" stroke="#a07830" strokeWidth="2"/>
      <text x="375" y="92" textAnchor="middle" fontSize="11" fill="#222" fontWeight="800">T2</text>
      {/* Backpack icon right of T2 */}
      <rect x="316" y="78" width="18" height="22" rx="4" fill="#4a7c4e" opacity="0.7"/>
      <circle cx="325" cy="76" r="5" fill="#4a7c4e" opacity="0.7"/>

      {/* 40m label between tables */}
      <line x1="80" y1="52" x2="418" y2="52" stroke="#222" strokeWidth="1.5"/>
      <line x1="80" y1="48" x2="80" y2="56" stroke="#222" strokeWidth="1.5"/>
      <line x1="418" y1="48" x2="418" y2="56" stroke="#222" strokeWidth="1.5"/>
      <text x="249" y="48" textAnchor="middle" fontSize="9" fill="#222" fontWeight="700">40 m</text>

      {/* Corner dots */}
      <circle cx="80" cy="52" r="5" fill="#222"/>
      <circle cx="418" cy="52" r="5" fill="#222"/>
      <circle cx="80" cy="108" r="5" fill="#222"/>
      <circle cx="418" cy="108" r="5" fill="#222"/>

      {/* Lines from tables to cone */}
      <line x1="165" y1="88" x2="238" y2="150" stroke="#222" strokeWidth="1.5"/>
      <line x1="330" y1="88" x2="246" y2="150" stroke="#222" strokeWidth="1.5"/>

      {/* 23m label */}
      <text x="310" y="130" fontSize="9" fill="#c00" fontWeight="700">23 m</text>

      {/* Note */}
      <rect x="10" y="292" width="480" height="22" rx="4" fill="#f5f5f5"/>
      <text x="250" y="306" textAnchor="middle" fontSize="8.5" fill="#333">중앙마커(20m) → T1 → T2 → '와' · 각 최소 3초 대기 · 중앙마커 미경유 → 부족함(M)</text>
    </svg>
  );
}

// Image 7: 원격조정 A·B단계 — 3개 테이블 (R=23m arc, 40m, 34.64m, 8.45m)
function SchemaSendAwayAB({ color }) {
  return (
    <svg viewBox="0 0 520 380" style={{ width:"100%", maxWidth:520, display:"block", margin:"0 auto" }}>
      <rect width="520" height="380" rx="10" fill="#fff" stroke="#E2E8F0" strokeWidth="1"/>
      <text x="260" y="16" textAnchor="middle" fontSize="10" fill="#8B9EC0" fontWeight="700">원격조정 A·B단계 — 3개 (PDF 3.3.11 Level A·B)</text>

      {/* DH at bottom */}
      <rect x="248" y="305" width="14" height="26" rx="3" fill="#222"/>
      <circle cx="255" cy="301" r="8" fill="#222"/>
      <line x1="222" y1="320" x2="288" y2="320" stroke="#4a7c4e" strokeWidth="3"/>

      {/* 8.45m */}
      <circle cx="255" cy="288" r="5" fill="#222"/>
      <text x="270" y="298" fontSize="8" fill="#c00" fontWeight="700">8,45 m</text>
      {/* 20m to cone */}
      <line x1="255" y1="288" x2="255" y2="210" stroke="#222" strokeWidth="1.5" strokeDasharray="3,2"/>
      <text x="268" y="252" fontSize="8" fill="#c00" fontWeight="700">20 m</text>
      {/* Cone center */}
      <polygon points="255,200 246,222 264,222" fill="#c00" opacity="0.85"/>
      <rect x="246" y="222" width="18" height="6" rx="2" fill="#c00" opacity="0.6"/>

      {/* Dashed arc R=23m */}
      <ellipse cx="255" cy="145" rx="130" ry="110" fill="none" stroke="#222" strokeWidth="1.5" strokeDasharray="6,4"/>
      <text x="310" y="160" fontSize="9" fill="#c00" fontWeight="700">R = 23 m</text>

      {/* Table top (T1) */}
      <rect x="195" y="28" width="90" height="40" rx="4" fill="#c8a050" stroke="#a07830" strokeWidth="2"/>
      <text x="240" y="52" textAnchor="middle" fontSize="11" fill="#222" fontWeight="800">T1</text>
      <rect x="228" y="20" width="18" height="22" rx="4" fill="#4a7c4e" opacity="0.7"/>
      <circle cx="237" cy="18" r="5" fill="#4a7c4e" opacity="0.7"/>

      {/* Table left (T2) */}
      <rect x="52" y="138" width="90" height="40" rx="4" fill="#c8a050" stroke="#a07830" strokeWidth="2"/>
      <text x="97" y="162" textAnchor="middle" fontSize="11" fill="#222" fontWeight="800">T2</text>
      <rect x="138" y="148" width="18" height="22" rx="4" fill="#4a7c4e" opacity="0.7"/>
      <circle cx="147" cy="146" r="5" fill="#4a7c4e" opacity="0.7"/>

      {/* Table right (T3) */}
      <rect x="378" y="138" width="90" height="40" rx="4" fill="#c8a050" stroke="#a07830" strokeWidth="2"/>
      <text x="423" y="162" textAnchor="middle" fontSize="11" fill="#222" fontWeight="800">T3</text>
      <rect x="362" y="148" width="18" height="22" rx="4" fill="#4a7c4e" opacity="0.7"/>
      <circle cx="371" cy="146" r="5" fill="#4a7c4e" opacity="0.7"/>

      {/* Corner dots */}
      <circle cx="57" cy="30" r="5" fill="#222"/>
      <circle cx="457" cy="30" r="5" fill="#222"/>
      <circle cx="57" cy="178" r="5" fill="#222"/>
      <circle cx="457" cy="178" r="5" fill="#222"/>

      {/* 40m top */}
      <line x1="57" y1="22" x2="457" y2="22" stroke="#222" strokeWidth="1.5"/>
      <line x1="57" y1="18" x2="57" y2="26" stroke="#222" strokeWidth="1.5"/>
      <line x1="457" y1="18" x2="457" y2="26" stroke="#222" strokeWidth="1.5"/>
      <text x="257" y="18" textAnchor="middle" fontSize="9" fill="#222" fontWeight="700">40 m</text>

      {/* 34.64m left side */}
      <line x1="30" y1="30" x2="30" y2="178" stroke="#222" strokeWidth="1.5"/>
      <line x1="26" y1="30" x2="34" y2="30" stroke="#222" strokeWidth="1.5"/>
      <line x1="26" y1="178" x2="34" y2="178" stroke="#222" strokeWidth="1.5"/>
      <text x="18" y="108" fontSize="8" fill="#c00" fontWeight="700" transform="rotate(90,18,108)">34,64 m</text>

      {/* Lines from tables to cone */}
      <line x1="240" y1="68" x2="253" y2="200" stroke="#222" strokeWidth="1.2"/>
      <line x1="142" y1="158" x2="250" y2="202" stroke="#222" strokeWidth="1.2"/>
      <line x1="378" y1="158" x2="258" y2="202" stroke="#222" strokeWidth="1.2"/>

      {/* 40m diagonal labels */}
      <text x="152" y="100" fontSize="9" fill="#c00" fontWeight="700">40 m</text>
      <text x="320" y="100" fontSize="9" fill="#c00" fontWeight="700">40 m</text>

      {/* Note */}
      <rect x="10" y="342" width="500" height="32" rx="4" fill="#f5f5f5"/>
      <text x="260" y="355" textAnchor="middle" fontSize="8.5" fill="#333">중앙마커(20m) → 추첨 순서로 T1→T2→T3 · 각 3초 대기</text>
      <text x="260" y="367" textAnchor="middle" fontSize="8.5" fill="#c00">중앙마커 미경유 또는 순서 불이행 → 부족함(M)</text>
    </svg>
  );
}

// Image 9: 들고 건네주기 — 10 Schritte × 2
function SchemaCarryHandover({ color }) {
  return (
    <svg viewBox="0 0 500 180" style={{ width:"100%", maxWidth:500, display:"block", margin:"0 auto" }}>
      <rect width="500" height="180" rx="10" fill="#fff" stroke="#E2E8F0" strokeWidth="1"/>
      <text x="250" y="16" textAnchor="middle" fontSize="10" fill="#8B9EC0" fontWeight="700">들고 건네주기 (PDF 3.3.9 Carry and Hand-over)</text>

      {/* 10 Schritte labels */}
      <line x1="60" y1="38" x2="200" y2="38" stroke="#c00" strokeWidth="1.5"/>
      <text x="130" y="33" textAnchor="middle" fontSize="9" fill="#c00" fontWeight="700">10 Schritte</text>
      <line x1="60" y1="35" x2="60" y2="41" stroke="#c00" strokeWidth="1.5"/>
      <line x1="200" y1="35" x2="200" y2="41" stroke="#c00" strokeWidth="1.5"/>

      <line x1="200" y1="38" x2="380" y2="38" stroke="#c00" strokeWidth="1.5"/>
      <text x="290" y="33" textAnchor="middle" fontSize="9" fill="#c00" fontWeight="700">10 Schritte</text>
      <line x1="380" y1="35" x2="380" y2="41" stroke="#c00" strokeWidth="1.5"/>

      {/* top alignment dots */}
      <circle cx="60" cy="42" r="4" fill="#222"/>
      <circle cx="200" cy="42" r="4" fill="#222"/>
      <circle cx="380" cy="42" r="4" fill="#222"/>

      {/* Scene 1: DH + dog on table, left side */}
      {/* Table */}
      <rect x="62" y="95" width="35" height="18" rx="3" fill="#c8a050" stroke="#a07830" strokeWidth="1.5"/>
      {/* Dog on table */}
      <ellipse cx="85" cy="90" rx="11" ry="7" fill="#888"/>
      {/* DH */}
      <rect x="40" y="80" width="12" height="22" rx="3" fill="#222"/>
      <circle cx="46" cy="76" r="6" fill="#222"/>
      {/* Arrow right (DH carrying dog) */}
      <line x1="100" y1="95" x2="185" y2="95" stroke="#c00" strokeWidth="2.5"/>
      <polygon points="185,91 195,95 185,99" fill="#c00"/>

      {/* Scene 2: HP receiving dog, center */}
      {/* HP figure */}
      <rect x="188" y="72" width="12" height="22" rx="3" fill="#222"/>
      <circle cx="194" cy="68" r="6" fill="#222"/>
      {/* DH figure */}
      <rect x="202" y="72" width="12" height="22" rx="3" fill="#222" opacity="0.6"/>
      <circle cx="208" cy="68" r="6" fill="#222" opacity="0.6"/>
      {/* Dog being handed over */}
      <ellipse cx="200" cy="90" rx="10" ry="7" fill="#888"/>
      {/* Arrow right */}
      <line x1="220" y1="95" x2="365" y2="95" stroke="#c00" strokeWidth="2" strokeDasharray="6,4"/>
      <polygon points="365,91 375,95 365,99" fill="#c00"/>

      {/* Scene 3: HP + dog walking right with DH */}
      <rect x="368" y="72" width="12" height="22" rx="3" fill="#222"/>
      <circle cx="374" cy="68" r="6" fill="#222"/>
      <rect x="382" y="75" width="12" height="20" rx="3" fill="#222" opacity="0.5"/>
      <circle cx="388" cy="71" r="6" fill="#222" opacity="0.5"/>
      {/* Dog at feet */}
      <ellipse cx="400" cy="92" rx="10" ry="7" fill="#888"/>

      {/* Note */}
      <rect x="10" y="145" width="480" height="28" rx="4" fill="#f5f5f5"/>
      <text x="250" y="157" textAnchor="middle" fontSize="8.5" fill="#333">V단계: HP가 견 머리를 DH 방향으로 향하게 하고 10보 이동 후 내려놓음 → GS</text>
      <text x="250" y="168" textAnchor="middle" fontSize="8.5" fill="#333">A·B단계: 내려놓은 후 '와' 신호 → 전면 앉아 → GS</text>
    </svg>
  );
}

// Image 10: 자세변경 — 테이블 위 Sit/Down/Stand (Tisch 1x1m H=60cm)
function SchemaPositionChange({ color }) {
  return (
    <svg viewBox="0 0 440 360" style={{ width:"100%", maxWidth:440, display:"block", margin:"0 auto" }}>
      <rect width="440" height="360" rx="10" fill="#fff" stroke="#E2E8F0" strokeWidth="1"/>
      <text x="220" y="16" textAnchor="middle" fontSize="10" fill="#8B9EC0" fontWeight="700">자세변경 (PDF 3.3.8 Change of Position)</text>

      {/* 10 steps label */}
      <line x1="30" y1="40" x2="200" y2="40" stroke="#c00" strokeWidth="1.5"/>
      <text x="115" y="35" textAnchor="middle" fontSize="9" fill="#c00" fontWeight="700">10 Schritte</text>
      <line x1="30" y1="37" x2="30" y2="43" stroke="#c00" strokeWidth="1.5"/>
      <line x1="200" y1="37" x2="200" y2="43" stroke="#c00" strokeWidth="1.5"/>

      {/* Table spec */}
      <rect x="280" y="28" width="140" height="32" rx="4" fill="#f5f5f5" stroke="#ddd" strokeWidth="1"/>
      <text x="350" y="40" textAnchor="middle" fontSize="8.5" fill="#222" fontWeight="700">Tisch</text>
      <text x="350" y="51" textAnchor="middle" fontSize="8" fill="#222">1 x 1 m · H = 60 cm</text>

      {/* Row 1: DH sends dog to table — dog sits */}
      <rect x="15" y="68" width="12" height="22" rx="3" fill="#222"/>
      <circle cx="21" cy="64" r="6" fill="#222"/>
      <ellipse cx="37" cy="80" rx="9" ry="6" fill="#888" opacity="0.6"/>
      {/* Flag */}
      <line x1="10" y1="68" x2="10" y2="90" stroke="#222" strokeWidth="2"/>
      <polygon points="10,68 22,73 10,78" fill="#222"/>
      {/* Arrow */}
      <line x1="46" y1="79" x2="170" y2="79" stroke="#222" strokeWidth="1.5"/>
      <polygon points="170,75 180,79 170,83" fill="#222"/>
      {/* Table */}
      <rect x="182" y="70" width="100" height="18" rx="3" fill="#c8a050" stroke="#a07830" strokeWidth="1.5"/>
      <rect x="182" y="88" width="12" height="22" rx="2" fill="#a07830" opacity="0.5"/>
      <rect x="270" y="88" width="12" height="22" rx="2" fill="#a07830" opacity="0.5"/>
      {/* Dog sitting on table */}
      <rect x="256" y="62" width="7" height="12" rx="2" fill="#888"/>
      <ellipse cx="252" cy="70" rx="9" ry="6" fill="#888"/>
      {/* Sit marker */}
      <polygon points="240,90 244,82 248,90" fill="#333"/>
      {/* Position markers */}
      <polygon points="265,90 269,82 273,90" fill="#333" opacity="0.5"/>
      <rect x="276" y="82" width="8" height="8" fill="#333" opacity="0.3"/>

      {/* Row 2: dog lies down */}
      <rect x="15" y="138" width="12" height="22" rx="3" fill="#222"/>
      <circle cx="21" cy="134" r="6" fill="#222"/>
      <ellipse cx="37" cy="150" rx="9" ry="6" fill="#888" opacity="0.6"/>
      <line x1="10" y1="138" x2="10" y2="160" stroke="#222" strokeWidth="2"/>
      <polygon points="10,138 22,143 10,148" fill="#222"/>
      <rect x="182" y="140" width="100" height="18" rx="3" fill="#c8a050" stroke="#a07830" strokeWidth="1.5"/>
      <rect x="182" y="158" width="12" height="22" rx="2" fill="#a07830" opacity="0.5"/>
      <rect x="270" y="158" width="12" height="22" rx="2" fill="#a07830" opacity="0.5"/>
      {/* Dog lying */}
      <ellipse cx="248" cy="138" rx="14" ry="7" fill="#888"/>
      <polygon points="240,160 244,152 248,160" fill="#333" opacity="0.5"/>
      <rect x="256" y="152" width="8" height="8" fill="#333"/>
      <rect x="276" y="152" width="8" height="8" fill="#333" opacity="0.3"/>
      <text x="260" y="158" textAnchor="middle" fontSize="7" fill="white" fontWeight="700">●</text>

      {/* Row 3: dog stands */}
      <rect x="15" y="208" width="12" height="22" rx="3" fill="#222"/>
      <circle cx="21" cy="204" r="6" fill="#222"/>
      <ellipse cx="37" cy="220" rx="9" ry="6" fill="#888" opacity="0.6"/>
      <line x1="10" y1="208" x2="10" y2="230" stroke="#222" strokeWidth="2"/>
      <polygon points="10,208 22,213 10,218" fill="#222"/>
      <rect x="182" y="210" width="100" height="18" rx="3" fill="#c8a050" stroke="#a07830" strokeWidth="1.5"/>
      <rect x="182" y="228" width="12" height="22" rx="2" fill="#a07830" opacity="0.5"/>
      <rect x="270" y="228" width="12" height="22" rx="2" fill="#a07830" opacity="0.5"/>
      {/* Dog standing */}
      <ellipse cx="255" cy="207" rx="13" ry="6" fill="#888"/>
      <rect x="248" y="207" width="8" height="8" rx="1" fill="#888"/>
      <polygon points="240,230 244,222 248,230" fill="#333" opacity="0.5"/>
      <rect x="256" y="222" width="8" height="8" fill="#333" opacity="0.3"/>
      <rect x="276" y="222" width="8" height="8" fill="#333"/>

      {/* Row 4: dog back to DH */}
      <rect x="15" y="278" width="12" height="22" rx="3" fill="#222"/>
      <circle cx="21" cy="274" r="6" fill="#222"/>
      <ellipse cx="37" cy="290" rx="9" ry="6" fill="#888" opacity="0.6"/>
      <line x1="10" y1="278" x2="10" y2="300" stroke="#222" strokeWidth="2"/>
      <polygon points="10,278 22,283 10,288" fill="#222"/>
      <rect x="182" y="280" width="100" height="18" rx="3" fill="#c8a050" stroke="#a07830" strokeWidth="1.5"/>
      <rect x="182" y="298" width="12" height="22" rx="2" fill="#a07830" opacity="0.5"/>
      <rect x="270" y="298" width="12" height="22" rx="2" fill="#a07830" opacity="0.5"/>
      {/* Dog running back */}
      <ellipse cx="100" cy="286" rx="13" ry="7" fill="#888"/>
      <polygon points="240,300 244,292 248,300" fill="#333" opacity="0.5"/>
      <rect x="256" y="292" width="8" height="8" fill="#333" opacity="0.3"/>
      <rect x="276" y="292" width="8" height="8" fill="#333"/>

      {/* Legend */}
      <polygon points="10,328 14,320 18,328" fill="#333"/>
      <text x="24" y="328" fontSize="8.5" fill="#333">= Sitzposition (앉아)</text>
      <rect x="10" y="336" width="8" height="8" fill="#333"/>
      <text x="24" y="344" fontSize="8.5" fill="#333">= Platzposition (엎드려)</text>
      <rect x="10" y="348" width="8" height="8" fill="#333" opacity="0.4"/>
      <text x="24" y="356" fontSize="8.5" fill="#333">= Stehposition (서)</text>
    </svg>
  );
}

// Image 6: 터널 — 300cm+300cm, 3단계 진행
function SchemaTunnel({ color }) {
  return (
    <svg viewBox="0 0 480 320" style={{ width:"100%", maxWidth:480, display:"block", margin:"0 auto" }}>
      <rect width="480" height="320" rx="10" fill="#fff" stroke="#E2E8F0" strokeWidth="1"/>
      <text x="240" y="16" textAnchor="middle" fontSize="10" fill="#8B9EC0" fontWeight="700">터널통과 (PDF 3.3.13 Tunnel with tube)</text>

      {/* === Stage 1: top view with dimensions === */}
      {/* 300cm + 300cm labels */}
      <line x1="80" y1="38" x2="240" y2="38" stroke="#222" strokeWidth="1.5"/>
      <text x="160" y="33" textAnchor="middle" fontSize="9" fill="#222" fontWeight="700">300 cm</text>
      <line x1="80" y1="35" x2="80" y2="41" stroke="#222" strokeWidth="1.5"/>
      <line x1="240" y1="35" x2="240" y2="41" stroke="#222" strokeWidth="1.5"/>
      <line x1="240" y1="38" x2="430" y2="38" stroke="#222" strokeWidth="1.5"/>
      <text x="335" y="33" textAnchor="middle" fontSize="9" fill="#222" fontWeight="700">300 cm</text>
      <line x1="430" y1="35" x2="430" y2="41" stroke="#222" strokeWidth="1.5"/>

      {/* Tunnel D label (red) */}
      <text x="160" y="54" textAnchor="middle" fontSize="9" fill="#c00" fontWeight="700">Tunnel D = 50 cm</text>
      <text x="335" y="54" textAnchor="middle" fontSize="9" fill="#c00" fontWeight="700">Schlauch D = 50 cm</text>

      {/* DH + dog left */}
      <rect x="28" y="62" width="12" height="22" rx="3" fill="#222"/>
      <circle cx="34" cy="58" r="6" fill="#222"/>
      <ellipse cx="52" cy="74" rx="9" ry="6" fill="#888" opacity="0.6"/>
      {/* Flag */}
      <line x1="20" y1="62" x2="20" y2="84" stroke="#222" strokeWidth="2"/>
      <polygon points="20,62 32,67 20,72" fill="#222"/>

      {/* Tunnel body (hard section) — blue hatching */}
      <rect x="80" y="62" width="160" height="32" fill="#c8e0f4" stroke="#4a7c4e" strokeWidth="2"/>
      {Array.from({length:16}).map((_,i)=>(
        <line key={i} x1={80+i*10} y1="62" x2={80+i*10} y2="94" stroke="#4a7c4e" strokeWidth="1" opacity="0.4"/>
      ))}

      {/* Soft tube (lighter, tapered) */}
      <path d="M240,62 L430,68 L430,88 L240,94 Z" fill="#d4e8f4" stroke="#4a7c4e" strokeWidth="2"/>
      {Array.from({length:19}).map((_,i)=>(
        <line key={i} x1={240+i*10} y1={62+(i*0.3)} x2={240+i*10} y2={94-(i*0.3)} stroke="#4a7c4e" strokeWidth="1" opacity="0.3"/>
      ))}

      {/* === Stage 2: dog exits, stays === */}
      <rect x="28" y="140" width="12" height="22" rx="3" fill="#222"/>
      <circle cx="34" cy="136" r="6" fill="#222"/>
      <ellipse cx="52" cy="152" rx="9" ry="6" fill="#888" opacity="0.6"/>
      <line x1="20" y1="140" x2="20" y2="162" stroke="#222" strokeWidth="2"/>
      <polygon points="20,140 32,145 20,150" fill="#222"/>
      <rect x="80" y="138" width="160" height="32" fill="#c8e0f4" stroke="#4a7c4e" strokeWidth="2"/>
      {Array.from({length:16}).map((_,i)=>(<line key={i} x1={80+i*10} y1="138" x2={80+i*10} y2="170" stroke="#4a7c4e" strokeWidth="1" opacity="0.4"/>))}
      <path d="M240,138 L430,144 L430,164 L240,170 Z" fill="#d4e8f4" stroke="#4a7c4e" strokeWidth="2"/>
      {/* Dog lying at exit */}
      <ellipse cx="440" cy="156" rx="13" ry="7" fill="#888"/>
      <text x="440" y="174" textAnchor="middle" fontSize="8" fill="#222" fontWeight="700">V (멈춰)</text>

      {/* === Stage 3: DH walks to dog === */}
      <rect x="28" y="220" width="12" height="22" rx="3" fill="#222"/>
      <circle cx="34" cy="216" r="6" fill="#222"/>
      <ellipse cx="52" cy="232" rx="9" ry="6" fill="#888" opacity="0.6"/>
      <line x1="20" y1="220" x2="20" y2="242" stroke="#222" strokeWidth="2"/>
      <polygon points="20,220 32,225 20,230" fill="#222"/>
      <rect x="80" y="218" width="160" height="32" fill="#c8e0f4" stroke="#4a7c4e" strokeWidth="2"/>
      {Array.from({length:16}).map((_,i)=>(<line key={i} x1={80+i*10} y1="218" x2={80+i*10} y2="250" stroke="#4a7c4e" strokeWidth="1" opacity="0.4"/>))}
      <path d="M240,218 L430,224 L430,244 L240,250 Z" fill="#d4e8f4" stroke="#4a7c4e" strokeWidth="2"/>
      {/* DH walking to right */}
      <rect x="415" y="218" width="12" height="22" rx="3" fill="#222"/>
      <circle cx="421" cy="214" r="6" fill="#222"/>
      {/* Dog at heel */}
      <ellipse cx="440" cy="238" rx="9" ry="6" fill="#888"/>

      {/* Note */}
      <rect x="10" y="270" width="460" height="40" rx="4" fill="#f5f5f5"/>
      <text x="240" y="282" textAnchor="middle" fontSize="8.5" fill="#333">기본자세 → '통과' 성부/시부 1회 → 터널 통과 → '멈춰' → 심사위원 지시 → DH 접근 → 기본자세</text>
      <text x="240" y="294" textAnchor="middle" fontSize="8" fill="#333">하드터널: 직경 50cm · 길이 3m / 소프트 튜브: 직경 50cm · 길이 3m</text>
      <text x="240" y="305" textAnchor="middle" fontSize="8" fill="#c00">통과 후 '멈춰' 미이행 → 부족함(M) / 장애물 거부 → 0점</text>
    </svg>
  );
}

// Image 5: 고정 나무다리 — 4단계 (400cm, 40cm, 20cm)
function SchemaFixedBridge({ color }) {
  return (
    <svg viewBox="0 0 440 380" style={{ width:"100%", maxWidth:440, display:"block", margin:"0 auto" }}>
      <rect width="440" height="380" rx="10" fill="#fff" stroke="#E2E8F0" strokeWidth="1"/>
      <text x="220" y="16" textAnchor="middle" fontSize="10" fill="#8B9EC0" fontWeight="700">고정된 나무다리 건너기 (PDF 3.3.14 Rigid Wooden Board)</text>

      {/* Dimensions header */}
      <line x1="80" y1="35" x2="400" y2="35" stroke="#222" strokeWidth="1.5"/>
      <text x="240" y="30" textAnchor="middle" fontSize="9" fill="#222" fontWeight="700">400 cm</text>
      <line x1="80" y1="32" x2="80" y2="38" stroke="#222" strokeWidth="1.5"/>
      <line x1="400" y1="32" x2="400" y2="38" stroke="#222" strokeWidth="1.5"/>
      {/* Height */}
      <text x="415" y="75" fontSize="8" fill="#222" fontWeight="700">40 cm</text>
      <line x1="405" y1="58" x2="425" y2="58" stroke="#222" strokeWidth="1"/>
      <line x1="405" y1="82" x2="425" y2="82" stroke="#222" strokeWidth="1"/>
      {/* 20cm ramp */}
      <text x="32" y="72" fontSize="8" fill="#222">20 cm</text>

      const drawBoard = (yBase) => (<g>
        {/* Ramp */}
        <line x1="40" y1={yBase+20} x2="80" y2={yBase} stroke="#a07830" strokeWidth="3" strokeLinecap="round"/>
        {/* Board */}
        <rect x="80" y={yBase-6} width="320" height="12" rx="2" fill="#c8a050" stroke="#a07830" strokeWidth="1.5"/>
        {/* Supports */}
        <rect x="80" y={yBase+6} width="16" height="22" rx="2" fill="#888" opacity="0.6"/>
        <rect x="384" y={yBase+6} width="16" height="22" rx="2" fill="#888" opacity="0.6"/>
      </g>);

      {/* Stage 1: dog going up ramp */}
      <line x1="40" y1="100" x2="80" y2="80" stroke="#a07830" strokeWidth="3" strokeLinecap="round"/>
      <rect x="80" y="74" width="320" height="12" rx="2" fill="#c8a050" stroke="#a07830" strokeWidth="1.5"/>
      <rect x="80" y="86" width="16" height="22" rx="2" fill="#888" opacity="0.6"/>
      <rect x="384" y="86" width="16" height="22" rx="2" fill="#888" opacity="0.6"/>
      <rect x="14" y="80" width="12" height="22" rx="3" fill="#222"/>
      <circle cx="20" cy="76" r="6" fill="#222"/>
      <line x1="8" y1="80" x2="8" y2="102" stroke="#222" strokeWidth="2"/>
      <polygon points="8,80 20,85 8,90" fill="#222"/>
      <ellipse cx="105" cy="70" rx="11" ry="7" fill="#888"/>

      {/* Stage 2: DH alongside dog (A-level) */}
      <line x1="40" y1="175" x2="80" y2="155" stroke="#a07830" strokeWidth="3" strokeLinecap="round"/>
      <rect x="80" y="149" width="320" height="12" rx="2" fill="#c8a050" stroke="#a07830" strokeWidth="1.5"/>
      <rect x="80" y="161" width="16" height="22" rx="2" fill="#888" opacity="0.6"/>
      <rect x="384" y="161" width="16" height="22" rx="2" fill="#888" opacity="0.6"/>
      <rect x="14" y="155" width="12" height="22" rx="3" fill="#222"/>
      <circle cx="20" cy="151" r="6" fill="#222"/>
      <line x1="8" y1="155" x2="8" y2="177" stroke="#222" strokeWidth="2"/>
      <polygon points="8,155 20,160 8,165" fill="#222"/>
      <rect x="150" y="145" width="12" height="22" rx="3" fill="#222"/>
      <circle cx="156" cy="141" r="6" fill="#222"/>
      <ellipse cx="170" cy="148" rx="11" ry="7" fill="#888"/>
      <text x="380" y="178" fontSize="9" fill="#c00" fontWeight="700">V</text>

      {/* Stage 3: DH waiting, dog at end (B-level) */}
      <line x1="40" y1="250" x2="80" y2="230" stroke="#a07830" strokeWidth="3" strokeLinecap="round"/>
      <rect x="80" y="224" width="320" height="12" rx="2" fill="#c8a050" stroke="#a07830" strokeWidth="1.5"/>
      <rect x="80" y="236" width="16" height="22" rx="2" fill="#888" opacity="0.6"/>
      <rect x="384" y="236" width="16" height="22" rx="2" fill="#888" opacity="0.6"/>
      <rect x="14" y="230" width="12" height="22" rx="3" fill="#222"/>
      <circle cx="20" cy="226" r="6" fill="#222"/>
      <line x1="8" y1="230" x2="8" y2="252" stroke="#222" strokeWidth="2"/>
      <polygon points="8,230 20,235 8,240" fill="#222"/>
      <rect x="330" y="220" width="12" height="22" rx="3" fill="#222"/>
      <circle cx="336" cy="216" r="6" fill="#222"/>
      <ellipse cx="352" cy="224" rx="11" ry="7" fill="#888"/>
      <text x="380" y="252" fontSize="9" fill="#c00" fontWeight="700">V</text>

      {/* Stage 4: DH right, dog GS */}
      <line x1="40" y1="325" x2="80" y2="305" stroke="#a07830" strokeWidth="3" strokeLinecap="round"/>
      <rect x="80" y="299" width="320" height="12" rx="2" fill="#c8a050" stroke="#a07830" strokeWidth="1.5"/>
      <rect x="80" y="311" width="16" height="22" rx="2" fill="#888" opacity="0.6"/>
      <rect x="384" y="311" width="16" height="22" rx="2" fill="#888" opacity="0.6"/>
      <rect x="14" y="305" width="12" height="22" rx="3" fill="#222"/>
      <circle cx="20" cy="301" r="6" fill="#222"/>
      <line x1="8" y1="305" x2="8" y2="327" stroke="#222" strokeWidth="2"/>
      <polygon points="8,305 20,310 8,315" fill="#222"/>
      <rect x="400" y="305" width="12" height="22" rx="3" fill="#222"/>
      <circle cx="406" cy="301" r="6" fill="#222"/>
      <ellipse cx="418" cy="318" rx="9" ry="6" fill="#888"/>
    </svg>
  );
}

// Image 4: 비고정 나무다리 — 4단계 (400cm, Mobility=20cm, 40cm)
function SchemaMovingBridge({ color }) {
  return (
    <svg viewBox="0 0 500 400" style={{ width:"100%", maxWidth:500, display:"block", margin:"0 auto" }}>
      <rect width="500" height="400" rx="10" fill="#fff" stroke="#E2E8F0" strokeWidth="1"/>
      <text x="250" y="16" textAnchor="middle" fontSize="10" fill="#8B9EC0" fontWeight="700">비고정 나무다리 (PDF 3.3.15 Unstable Plank · A단계 전용)</text>

      {/* Stage 1: dimensions + dog at start */}
      <line x1="100" y1="35" x2="420" y2="35" stroke="#222" strokeWidth="1.5"/>
      <text x="260" y="30" textAnchor="middle" fontSize="9" fill="#222" fontWeight="700">400 cm</text>
      <line x1="100" y1="32" x2="100" y2="38" stroke="#222" strokeWidth="1.5"/>
      <line x1="420" y1="32" x2="420" y2="38" stroke="#222" strokeWidth="1.5"/>
      {/* Mobility red arrow */}
      <line x1="175" y1="80" x2="340" y2="80" stroke="#c00" strokeWidth="2"/>
      <polygon points="175,77 165,80 175,83" fill="#c00"/>
      <polygon points="340,77 350,80 340,83" fill="#c00"/>
      <text x="258" y="75" textAnchor="middle" fontSize="9" fill="#c00" fontWeight="700">Mobility = 20 cm</text>
      {/* Height */}
      <text x="440" y="90" fontSize="8" fill="#222" fontWeight="700">40 cm</text>

      {/* Board + barrels stage 1 */}
      <ellipse cx="145" cy="88" rx="30" ry="18" fill="#d4c87e" stroke="#a07830" strokeWidth="2"/>
      <ellipse cx="380" cy="88" rx="30" ry="18" fill="#d4c87e" stroke="#a07830" strokeWidth="2"/>
      <rect x="100" y="65" width="320" height="14" rx="3" fill="#c8a050" stroke="#a07830" strokeWidth="2"/>
      {/* Corner dots */}
      <circle cx="100" cy="65" r="5" fill="#222"/>
      <circle cx="420" cy="65" r="5" fill="#222"/>
      <circle cx="100" cy="92" r="5" fill="#222"/>
      <circle cx="420" cy="92" r="5" fill="#222"/>
      {/* Small square near barrel */}
      <rect x="372" y="74" width="8" height="8" rx="1" fill="#222" opacity="0.5"/>
      {/* DH + dog left */}
      <rect x="28" y="58" width="12" height="22" rx="3" fill="#222"/>
      <circle cx="34" cy="54" r="6" fill="#222"/>
      <ellipse cx="50" cy="66" rx="9" ry="6" fill="#888" opacity="0.6"/>
      <line x1="18" y1="58" x2="18" y2="80" stroke="#222" strokeWidth="2"/>
      <polygon points="18,58 30,63 18,68" fill="#222"/>
      {/* Dog on board */}
      <ellipse cx="165" cy="60" rx="13" ry="8" fill="#888"/>
      <text x="145" y="102" textAnchor="middle" fontSize="8" fill="#222" fontWeight="700">V</text>

      {/* Stage 2: DH alongside dog center */}
      <ellipse cx="145" cy="172" rx="30" ry="18" fill="#d4c87e" stroke="#a07830" strokeWidth="2"/>
      <ellipse cx="380" cy="172" rx="30" ry="18" fill="#d4c87e" stroke="#a07830" strokeWidth="2"/>
      <rect x="100" y="149" width="320" height="14" rx="3" fill="#c8a050" stroke="#a07830" strokeWidth="2"/>
      <rect x="372" y="158" width="8" height="8" rx="1" fill="#222" opacity="0.5"/>
      <rect x="28" y="148" width="12" height="22" rx="3" fill="#222"/>
      <circle cx="34" cy="144" r="6" fill="#222"/>
      <line x1="18" y1="148" x2="18" y2="170" stroke="#222" strokeWidth="2"/>
      <polygon points="18,148 30,153 18,158" fill="#222"/>
      <rect x="175" y="140" width="12" height="22" rx="3" fill="#222"/>
      <circle cx="181" cy="136" r="6" fill="#222"/>
      <ellipse cx="198" cy="148" rx="13" ry="8" fill="#888"/>

      {/* Stage 3: DH right side, dog at end */}
      <ellipse cx="145" cy="258" rx="30" ry="18" fill="#d4c87e" stroke="#a07830" strokeWidth="2"/>
      <ellipse cx="380" cy="258" rx="30" ry="18" fill="#d4c87e" stroke="#a07830" strokeWidth="2"/>
      <rect x="100" y="235" width="320" height="14" rx="3" fill="#c8a050" stroke="#a07830" strokeWidth="2"/>
      <rect x="372" y="244" width="8" height="8" rx="1" fill="#222" opacity="0.5"/>
      <rect x="28" y="238" width="12" height="22" rx="3" fill="#222"/>
      <circle cx="34" cy="234" r="6" fill="#222"/>
      <line x1="18" y1="238" x2="18" y2="260" stroke="#222" strokeWidth="2"/>
      <polygon points="18,238 30,243 18,248" fill="#222"/>
      <rect x="310" y="228" width="12" height="22" rx="3" fill="#222"/>
      <circle cx="316" cy="224" r="6" fill="#222"/>
      <ellipse cx="338" cy="240" rx="13" ry="8" fill="#888"/>
      <text x="145" y="275" textAnchor="middle" fontSize="8" fill="#222" fontWeight="700">V</text>

      {/* Stage 4: DH far right, dog GS */}
      <ellipse cx="145" cy="340" rx="30" ry="18" fill="#d4c87e" stroke="#a07830" strokeWidth="2"/>
      <ellipse cx="380" cy="340" rx="30" ry="18" fill="#d4c87e" stroke="#a07830" strokeWidth="2"/>
      <rect x="100" y="317" width="320" height="14" rx="3" fill="#c8a050" stroke="#a07830" strokeWidth="2"/>
      <rect x="372" y="326" width="8" height="8" rx="1" fill="#222" opacity="0.5"/>
      <rect x="28" y="320" width="12" height="22" rx="3" fill="#222"/>
      <circle cx="34" cy="316" r="6" fill="#222"/>
      <line x1="18" y1="320" x2="18" y2="342" stroke="#222" strokeWidth="2"/>
      <polygon points="18,320 30,325 18,330" fill="#222"/>
      <rect x="430" y="320" width="12" height="22" rx="3" fill="#222"/>
      <circle cx="436" cy="316" r="6" fill="#222"/>
      <ellipse cx="452" cy="332" rx="9" ry="6" fill="#888"/>

      {/* Note */}
      <rect x="10" y="368" width="480" height="25" rx="4" fill="#f5f5f5"/>
      <text x="250" y="382" textAnchor="middle" fontSize="8.5" fill="#333">전반부 이탈→0점 / 후반부 이탈→부족함(M) · 원통 2개(Ø40cm) 위 4m 판자(너비 30cm)</text>
    </svg>
  );
}

// Image 3: 사다리 — 4단계 진행 (50cm 표시)
function SchemaLadder({ color }) {
  return (
    <svg viewBox="0 0 440 420" style={{ width:"100%", maxWidth:440, display:"block", margin:"0 auto" }}>
      <rect width="440" height="420" rx="10" fill="#fff" stroke="#E2E8F0" strokeWidth="1"/>
      <text x="220" y="16" textAnchor="middle" fontSize="10" fill="#8B9EC0" fontWeight="700">사다리 건너기 (PDF 3.3.16 Horizontal Ladder)</text>

      {/* Helper function to draw ladder at yBase */}
      {[0,1,2,3].map((stage)=>{
        const yBase = 42 + stage * 95;
        const hasRamp = true;
        return (
          <g key={stage}>
            {/* Flag */}
            <line x1="16" y1={yBase+22} x2="16" y2={yBase+44} stroke="#222" strokeWidth="2"/>
            <polygon points={`16,${yBase+22} 28,${yBase+27} 16,${yBase+32}`} fill="#222"/>
            {/* Ramp */}
            <line x1="38" y1={yBase+36} x2="80" y2={yBase+14} stroke="#a07830" strokeWidth="3.5" strokeLinecap="round"/>
            {/* Ladder main */}
            <rect x="80" y={yBase+8} width="310" height="18" rx="2" fill="#c8a050" stroke="#a07830" strokeWidth="2"/>
            {/* Rungs */}
            {Array.from({length:14}).map((_,i)=>(
              <line key={i} x1={80+i*22} y1={yBase+8} x2={80+i*22} y2={yBase+26}
                stroke="#a07830" strokeWidth="2" opacity="0.5"/>
            ))}
            {/* Supports */}
            <rect x="80" y={yBase+26} width="16" height="18" rx="2" fill="#888" opacity="0.5"/>
            <rect x="374" y={yBase+26} width="16" height="18" rx="2" fill="#888" opacity="0.5"/>
            {/* DH silhouette */}
            <rect x="28" y={yBase+14} width="12" height="22" rx="3" fill="#222"/>
            <circle cx="34" cy={yBase+10} r="6" fill="#222"/>
            {/* Stage-specific dog + DH positions */}
            {stage === 0 && (
              <g>
                {/* Dog just getting on ramp */}
                <ellipse cx="68" cy={yBase+20} rx="10" ry="7" fill="#888"/>
                {/* 50cm label */}
                <text x="65" y={yBase+50} fontSize="8" fill="#c00" fontWeight="700">50 cm</text>
                <line x1="80" y1={yBase+44} x2="80" y2={yBase+26} stroke="#c00" strokeWidth="1"/>
              </g>
            )}
            {stage === 1 && (
              <g>
                {/* DH alongside dog on ladder */}
                <rect x="108" y={yBase+4} width="12" height="22" rx="3" fill="#222"/>
                <circle cx="114" cy={yBase} r="6" fill="#222"/>
                <ellipse cx="132" cy={yBase+14} rx="11" ry="7" fill="#888"/>
              </g>
            )}
            {stage === 2 && (
              <g>
                {/* DH and dog further along */}
                <rect x="260" y={yBase+4} width="12" height="22" rx="3" fill="#222"/>
                <circle cx="266" cy={yBase} r="6" fill="#222"/>
                <ellipse cx="288" cy={yBase+14} rx="11" ry="7" fill="#888"/>
                {/* V marker */}
                <text x="376" y={yBase+46} fontSize="9" fill="#c00" fontWeight="700">V</text>
              </g>
            )}
            {stage === 3 && (
              <g>
                {/* DH right, dog at end being lifted */}
                <rect x="390" y={yBase+14} width="12" height="22" rx="3" fill="#222"/>
                <circle cx="396" cy={yBase+10} r="6" fill="#222"/>
                <ellipse cx="412" cy={yBase+24} rx="9" ry="6" fill="#888"/>
              </g>
            )}
          </g>
        );
      })}

      {/* Note */}
      <rect x="10" y="395" width="420" height="20" rx="4" fill="#f5f5f5"/>
      <text x="220" y="408" textAnchor="middle" fontSize="8.5" fill="#333">전반부 이탈→0점 / 후반부 이탈→부족함(M) / 마지막 디딤대 후 이탈→최대 만족함(B)</text>
    </svg>
  );
}

// Image 2: 그네 — PDF 원본 (Schaukel ist in Bewegung + GS arrows)
function SchemaSeesaw({ color }) {
  return (
    <svg viewBox="0 0 500 260" style={{ width:"100%", maxWidth:500, display:"block", margin:"0 auto" }}>
      <rect width="500" height="260" rx="10" fill="#fff" stroke="#E2E8F0" strokeWidth="1"/>
      <text x="250" y="16" textAnchor="middle" fontSize="10" fill="#8B9EC0" fontWeight="700">그네 건너기 (PDF 3.3.17 Swing · B단계 전용)</text>

      {/* GS left */}
      <rect x="18" y="120" width="12" height="24" rx="3" fill="#222"/>
      <circle cx="24" cy="116" r="7" fill="#222"/>
      <text x="24" y="155" textAnchor="middle" fontSize="9" fill="#222" fontWeight="700">GS</text>

      {/* Support frames */}
      {/* Left frame */}
      <line x1="95" y1="55" x2="95" y2="130" stroke="#222" strokeWidth="3"/>
      <line x1="80" y1="55" x2="110" y2="55" stroke="#222" strokeWidth="2.5"/>
      <line x1="75" y1="60" x2="80" y2="130" stroke="#222" strokeWidth="1.5"/>
      <line x1="115" y1="60" x2="110" y2="130" stroke="#222" strokeWidth="1.5"/>
      {/* Right frame */}
      <line x1="400" y1="55" x2="400" y2="130" stroke="#222" strokeWidth="3"/>
      <line x1="385" y1="55" x2="415" y2="55" stroke="#222" strokeWidth="2.5"/>
      <line x1="380" y1="60" x2="385" y2="130" stroke="#222" strokeWidth="1.5"/>
      <line x1="420" y1="60" x2="415" y2="130" stroke="#222" strokeWidth="1.5"/>

      {/* Chains */}
      <line x1="95" y1="60" x2="110" y2="100" stroke="#555" strokeWidth="1.5" strokeDasharray="4,2"/>
      <line x1="400" y1="60" x2="385" y2="100" stroke="#555" strokeWidth="1.5" strokeDasharray="4,2"/>

      {/* Moving plank (slightly angled to show motion) */}
      <rect x="110" y="98" width="275" height="16" rx="4" fill="#c8a050" stroke="#a07830" strokeWidth="2"/>
      {/* "Schaukel ist in Bewegung" label */}
      <text x="247" y="93" textAnchor="middle" fontSize="8.5" fill="#555" fontStyle="italic">Schaukel ist in Bewegung</text>

      {/* Mounting ramps */}
      <rect x="38" y="118" width="75" height="14" rx="3" fill="#c8a050" stroke="#a07830" strokeWidth="1.5"/>
      <rect x="385" y="118" width="75" height="14" rx="3" fill="#c8a050" stroke="#a07830" strokeWidth="1.5"/>

      {/* Dog on plank */}
      <ellipse cx="200" cy="94" rx="14" ry="9" fill="#888"/>

      {/* Action arrows at bottom */}
      <text x="24" y="175" fontSize="9" fill="#222" fontWeight="700">GS</text>
      <line x1="38" y1="172" x2="82" y2="172" stroke="#222" strokeWidth="2"/>
      <polygon points="82,169 90,172 82,175" fill="#222"/>
      <text x="92" y="175" fontSize="8" fill="#222">Aufsteigen und ver-</text>
      <text x="92" y="186" fontSize="8" fill="#222">harren auf HZ/SZ</text>

      <line x1="195" y1="172" x2="248" y2="172" stroke="#222" strokeWidth="2"/>
      <polygon points="248,169 256,172 248,175" fill="#222"/>
      <text x="258" y="175" fontSize="8" fill="#222">verharren HF und H</text>

      <line x1="340" y1="172" x2="393" y2="172" stroke="#222" strokeWidth="2"/>
      <polygon points="393,169 401,172 393,175" fill="#222"/>
      <text x="403" y="172" fontSize="9" fill="#222" fontWeight="700">GS</text>

      {/* Lower arrows */}
      <line x1="92" y1="200" x2="145" y2="200" stroke="#555" strokeWidth="1.5"/>
      <polygon points="145,197 153,200 145,203" fill="#555"/>
      <text x="155" y="203" fontSize="8" fill="#555">Weitergehen auf HZ oder SZ</text>

      <line x1="292" y1="200" x2="345" y2="200" stroke="#555" strokeWidth="1.5"/>
      <polygon points="345,197 353,200 345,203" fill="#555"/>
      <text x="355" y="203" fontSize="8" fill="#555">Weitergehen</text>
      <text x="355" y="213" fontSize="8" fill="#555">auf HZ oder SZ</text>

      {/* Note */}
      <rect x="10" y="225" width="480" height="28" rx="4" fill="#f5f5f5"/>
      <text x="250" y="237" textAnchor="middle" fontSize="8.5" fill="#333">전반부 이탈→0점 / 후반부 이탈→부족함(M) / L=300cm · B=30cm · H=40cm</text>
      <text x="250" y="248" textAnchor="middle" fontSize="8.5" fill="#333">탑승판·하강판: 약 150cm · 높이 35cm · B단계 전용</text>
    </svg>
  );
}

// 대기 도식
function SchemaWait({ color }) {
  return (
    <svg viewBox="0 0 320 155" style={{ width:"100%", maxWidth:320, display:"block", margin:"0 auto" }}>
      <rect width="320" height="155" rx="10" fill="#fff" stroke="#E2E8F0" strokeWidth="1"/>
      <text x="160" y="17" textAnchor="middle" fontSize="9.5" fill="#8B9EC0" fontWeight="700">산만한 상황에서의 대기 — 단계별 위치 (PDF 3.3.12)</text>
      <text x="35" y="40" textAnchor="middle" fontSize="9" fill={color} fontWeight="700">V단계</text>
      <circle cx="20" cy="85" r="8" fill={color} opacity="0.3" stroke={color} strokeWidth="1.2"/>
      <text x="20" y="89" textAnchor="middle" fontSize="7" fill={color} fontWeight="700">견</text>
      <circle cx="62" cy="85" r="8" fill={color} opacity="0.7"/>
      <text x="62" y="89" textAnchor="middle" fontSize="7" fill="white" fontWeight="700">DH</text>
      <line x1="28" y1="85" x2="54" y2="85" stroke={color} strokeWidth="1.5"/>
      <text x="41" y="100" textAnchor="middle" fontSize="7.5" fill="#555">20보 (정면)</text>
      <text x="115" y="40" textAnchor="middle" fontSize="9" fill={color} fontWeight="700">A단계</text>
      <circle cx="95" cy="85" r="8" fill={color} opacity="0.3" stroke={color} strokeWidth="1.2"/>
      <text x="95" y="89" textAnchor="middle" fontSize="7" fill={color} fontWeight="700">견</text>
      <circle cx="150" cy="85" r="8" fill={color} opacity="0.7"/>
      <text x="150" y="89" textAnchor="middle" fontSize="7" fill="white" fontWeight="700">DH</text>
      <line x1="103" y1="85" x2="142" y2="85" stroke={color} strokeWidth="1.5"/>
      <text x="125" y="100" textAnchor="middle" fontSize="7.5" fill="#555">40보 (등 돌림)</text>
      <text x="240" y="40" textAnchor="middle" fontSize="9" fill={color} fontWeight="700">B단계</text>
      <circle cx="200" cy="85" r="8" fill={color} opacity="0.3" stroke={color} strokeWidth="1.2"/>
      <text x="200" y="89" textAnchor="middle" fontSize="7" fill={color} fontWeight="700">견</text>
      <rect x="258" y="72" width="30" height="28" rx="4" fill="#555" opacity="0.5"/>
      <text x="273" y="90" textAnchor="middle" fontSize="7" fill="white" fontWeight="700">은폐</text>
      <line x1="208" y1="85" x2="258" y2="85" stroke={color} strokeWidth="1.5" strokeDasharray="4,2"/>
      <text x="234" y="100" textAnchor="middle" fontSize="7.5" fill="#555">완전 은폐</text>
      <rect x="10" y="115" width="300" height="32" rx="4" fill="#f5f5f5"/>
      <text x="160" y="126" textAnchor="middle" fontSize="7.5" fill="#555">2번째 과목 완료 후 3m 이상 이탈 → 부족함(M)</text>
      <text x="160" y="137" textAnchor="middle" fontSize="7.5" fill="#c00">2번째 과목 이전에 3m 이상 이탈 → 0점</text>
    </svg>
  );
}

// 수상 원격조정
function SchemaWaterRemote({ color }) {
  return (
    <svg viewBox="0 0 310 175" style={{ width:"100%", maxWidth:310, display:"block", margin:"0 auto" }}>
      <rect width="310" height="175" rx="10" fill="#E1F5FE" stroke="#E2E8F0" strokeWidth="1"/>
      <text x="155" y="17" textAnchor="middle" fontSize="9.5" fill="#8B9EC0" fontWeight="700">수상 원격조정 (PDF 3.3.24)</text>
      <rect x="8" y="125" width="62" height="22" rx="4" fill="#1A1E2E" opacity="0.7"/>
      <text x="39" y="139" textAnchor="middle" fontSize="9" fill="white" fontWeight="700">지도수(육지)</text>
      <rect x="162" y="28" width="52" height="22" rx="4" fill={color} opacity="0.8"/>
      <text x="188" y="43" textAnchor="middle" fontSize="9" fill="white" fontWeight="700">보트1</text>
      <rect x="238" y="100" width="52" height="22" rx="4" fill={color} opacity="0.8"/>
      <text x="264" y="115" textAnchor="middle" fontSize="9" fill="white" fontWeight="700">보트2</text>
      <circle cx="100" cy="95" r="9" fill="#FFB300" opacity="0.9" stroke="#E65100" strokeWidth="1.5"/>
      <text x="100" y="99" textAnchor="middle" fontSize="9" fill="#7A5000" fontWeight="700">견</text>
      <line x1="70" y1="130" x2="94" y2="100" stroke="#1A1E2E" strokeWidth="1.5" strokeDasharray="4,2"/>
      <line x1="109" y1="90" x2="167" y2="47" stroke={color} strokeWidth="2"/>
      <polygon points="167,47 161,52 169,57" fill={color}/>
      <line x1="210" y1="47" x2="241" y2="100" stroke={color} strokeWidth="2"/>
      <polygon points="241,100 235,95 246,96" fill={color}/>
      <line x1="246" y1="114" x2="72" y2="130" stroke="#E53E3E" strokeWidth="2" strokeDasharray="5,3"/>
      <polygon points="72,127 79,130 72,133" fill="#E53E3E"/>
      <text x="155" y="155" textAnchor="middle" fontSize="8" fill="#E53E3E" fontWeight="700">마지막 지점 후 '와' → 전면앉아</text>
      <text x="155" y="166" textAnchor="middle" fontSize="7.5" fill="#888">A단계=20m · B단계=40m 거리</text>
    </svg>
  );
}

function SchemaRenderer({ schemaKey, color }) {
  if (!schemaKey) return null;
  const map = {
    heeling:        <SchemaHeeling color={color} />,
    leashedHeeling: <SchemaLeashedHeeling color={color} />,
    socialTest:     <SchemaSocialTest color={color} />,
    movingSit:      <SchemaMovingSit color={color} />,
    remoteControl:  <SchemaRemoteControl color={color} />,
    sendAwayV:      <SchemaSendAwayV color={color} />,
    sendAwayAB:     <SchemaSendAwayAB color={color} />,
    ladder:         <SchemaLadder color={color} />,
    seesaw:         <SchemaSeesaw color={color} />,
    tunnel:         <SchemaTunnel color={color} />,
    fixedbridge:    <SchemaFixedBridge color={color} />,
    movingbridge:   <SchemaMovingBridge color={color} />,
    waterRemote:    <SchemaWaterRemote color={color} />,
    waitSchema:     <SchemaWait color={color} />,
    carryHandover:  <SchemaCarryHandover color={color} />,
    positionChange: <SchemaPositionChange color={color} />,
  };
  return map[schemaKey] || null;
}
function ProcedureCard({ itemName, color }) {
  const data = procedureMap[itemName];
  if (!data) return null;
  return (
    <div style={{ marginTop: 8, background: "#F8FAFF", borderRadius: 10, padding: "13px 14px", border: `1.5px solid ${color}30` }}>
      <div style={{ fontSize: 12, fontWeight: 800, color, marginBottom: 6 }}>📖 시행 방법</div>
      <p style={{ margin: "0 0 9px", fontSize: 12, color: "#374151", lineHeight: 1.65 }}>{data.summary}</p>
      <ol style={{ margin: 0, paddingLeft: 18 }}>
        {data.steps.map((s, i) => (
          <li key={i} style={{ fontSize: 12, color: "#374151", marginBottom: 4, lineHeight: 1.6 }}>{s}</li>
        ))}
      </ol>
      {data.note && (
        <div style={{ marginTop: 8, background: `${color}10`, borderRadius: 7, padding: "6px 10px", fontSize: 11, color: "#555", fontStyle: "italic" }}>
          ⚠️ {data.note}
        </div>
      )}
      {data.schema && (
        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 10, color: "#8B9EC0", fontWeight: 700, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>도식 (Schema)</div>
          <SchemaRenderer schemaKey={data.schema} color={color} />
        </div>
      )}
    </div>
  );
}

// ── MAIN APP
export default function IRORulebookApp() {
  const [activeDiscipline, setActiveDiscipline] = useState("area");
  const [activeLevel, setActiveLevel] = useState("V");
  const [activeTab, setActiveTab] = useState("obedience");
  const [expandedItem, setExpandedItem] = useState(null);
  const [mainView, setMainView] = useState("main");
  const [expandedGeneral, setExpandedGeneral] = useState(null);

  const disc = disciplines.find(d => d.id === activeDiscipline);
  const level = levels.find(l => l.id === activeLevel);
  const items = obedData[activeDiscipline]?.[activeLevel] || [];
  const obedTotal = items.reduce((s, i) => s + i.pts, 0);
  const nw = noseworkData[activeDiscipline]?.[activeLevel] || { pts: 100, items: [] };

  const generalRules = [
    { title: "합격 기준 (Bestehenskriterien)", content: "영역A(후각작업)와 영역B(복종·장애물) 각각에서 가능한 점수의 최소 70%를 획득해야 합격입니다. 두 영역 모두 합격해야 훈련자격이 부여됩니다." },
    { title: "단계별 응시 자격 (Zulassung)", content: "V단계: 조건 없음 / A단계: 동일 분야 V단계 합격 / B단계: 동일 분야 A단계 최소 2회 합격(GUT 이상). 눈사태·수상은 A단계 1회 G(좋음) 성적으로 B 응시 가능." },
    { title: "참가견 최소 연령 (Mindestalter)", content: "V단계: 15개월 / A단계: 18개월 / B단계: 20개월. 테스트 당일에 해당 연령이 만료되어야 합니다." },
    { title: "재시험 규정 (Wiederholung)", content: "불합격 후 5일 경과 후 재응시 가능. 모든 단계는 임의로 재반복 가능. A단계 2회 합격(GUT↑) 시 다음 날 B단계 응시 가능." },
    { title: "경고·중단·실격 (Verwarnung / Abbruch / Disqualifikation)", content: "1차 경고: 5점 감점 / 2차 경고: 해당 영역 중단. 공격 행동, 강제도구 사용, 무단 이탈 등은 즉시 실격. 중단 시 영역A는 61점, 영역B는 31점 의무 감점." },
    { title: "이의 제기 (Einspruch)", content: "심사위원 결정이 아닌 규정 위반에 대해서만 가능. 마지막 테스트 종료 30분 이내에 300유로 보증금과 함께 서면 제출." },
    { title: "허용/금지 보조수단 (Hilfsmittel)", content: "허용: 호각, 물/스펀지(심사위원 허가), 하네스, 점멸등·야광막대, 맨트레일링 GPS(신고 필수). 금지: 후각작업 중 GPS(맨트레일링 제외), 동기부여 물품, 사료." },
    { title: "심사위원 단위 제한 (Richter-Einheiten)", content: "심사위원 1명당 하루 최대 36단위. V단계=각 1단위, A단계=영역A 2단위·영역B 1단위, B단계=영역A 3단위·영역B 1단위." },
  ];

  return (
    <div style={{ fontFamily: "'Apple SD Gothic Neo','Noto Sans KR','Malgun Gothic',sans-serif", minHeight: "100vh", background: "#F0F2F8", color: "#1A1E2E" }}>
      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg,#1A1E2E 0%,#2D3452 100%)", color: "white" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "18px 14px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 3, color: "#8B9EC0", fontWeight: 700, textTransform: "uppercase" }}>FCI / IRO 2025</div>
              <h1 style={{ margin: "3px 0 0", fontSize: "clamp(17px,4vw,24px)", fontWeight: 900, letterSpacing: -0.5 }}>국제 인명구조견 시험규정</h1>
              <div style={{ color: "#8B9EC0", fontSize: 11, marginTop: 3 }}>Internationale Prüfungsordnung Rettungshunde · KKCRD · 2025.01.01</div>
            </div>
            <div style={{ display: "flex", gap: 6, alignSelf: "center" }}>
              {[["main","종목별 규정"],["general","일반 규정"]].map(([v,label]) => (
                <button key={v} onClick={() => setMainView(v)}
                  style={{ padding: "6px 13px", borderRadius: 7, border: "none", background: mainView === v ? "white" : "rgba(255,255,255,0.12)", color: mainView === v ? "#1A1E2E" : "white", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          {/* Grade strip */}
          <div style={{ display: "flex", gap: 4, marginTop: 12, flexWrap: "wrap", paddingBottom: 14 }}>
            {grades.map(g => (
              <div key={g.code} style={{ background: "rgba(255,255,255,0.07)", borderRadius: 6, padding: "3px 9px", display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: g.color }} />
                <span style={{ fontSize: 10, color: "#C8D0E0", fontWeight: 700 }}>{g.code}</span>
                <span style={{ fontSize: 10, color: "#8B9EC0" }}>{g.kr}</span>
                <span style={{ fontSize: 9, color: "#6B7BA0", fontStyle: "italic" }}>{g.de}</span>
                <span style={{ fontSize: 9, color: "#5B6A90" }}>{g.range}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 14px 48px" }}>

        {/* GENERAL RULES */}
        {mainView === "general" ? (
          <div style={{ paddingTop: 22 }}>
            <h2 style={{ margin: "0 0 14px", fontSize: 17, fontWeight: 900 }}>일반 규정 (Allgemeine Regelungen)</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {generalRules.map((r, i) => (
                <div key={i} onClick={() => setExpandedGeneral(expandedGeneral === i ? null : i)}
                  style={{ background: "white", borderRadius: 11, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", cursor: "pointer", border: expandedGeneral === i ? "2px solid #3D5AFE" : "2px solid transparent" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 16px" }}>
                    <span style={{ fontWeight: 700, fontSize: 13 }}>{r.title}</span>
                    <span style={{ fontSize: 18, color: "#8B9EC0", fontWeight: 700 }}>{expandedGeneral === i ? "−" : "+"}</span>
                  </div>
                  {expandedGeneral === i && (
                    <div style={{ padding: "0 16px 14px", fontSize: 13, color: "#4A5568", lineHeight: 1.7, borderTop: "1px solid #F0F2F8" }}>{r.content}</div>
                  )}
                </div>
              ))}
            </div>
            {/* Score table */}
            <div style={{ marginTop: 24 }}>
              <h2 style={{ margin: "0 0 12px", fontSize: 17, fontWeight: 900 }}>점수 등급 기준표 (Bewertungstabelle)</h2>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, background: "white", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", fontSize: 12 }}>
                  <thead>
                    <tr style={{ background: "#1A1E2E", color: "white" }}>
                      <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 700 }}>만점</th>
                      {grades.map(g => (
                        <th key={g.code} style={{ padding: "10px 8px", textAlign: "center" }}>
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                            <div style={{ width: 7, height: 7, borderRadius: "50%", background: g.color }} />
                            <span style={{ fontSize: 10, fontWeight: 700 }}>{g.code}</span>
                            <span style={{ fontSize: 9, color: "#C8D0E0" }}>{g.kr}</span>
                            <span style={{ fontSize: 8, color: "#8B9EC0", fontStyle: "italic" }}>{g.de}</span>
                            <span style={{ fontSize: 8, color: "#6B7BA0" }}>{g.range}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { max: 100, rows: ["96–100","90–95","80–89","70–79","0–69"] },
                      { max: 200, rows: ["192–200","180–191","160–179","140–159","0–139"] },
                      { max: 300, rows: ["288–300","270–287","240–269","210–239","0–209"] },
                    ].map((row, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? "#FAFBFF" : "white" }}>
                        <td style={{ padding: "10px 12px", fontWeight: 700 }}>{row.max}점</td>
                        {row.rows.map((r, j) => (
                          <td key={j} style={{ padding: "10px 8px", textAlign: "center", color: grades[j].color, fontWeight: 700 }}>{r}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        ) : (
          /* MAIN DISCIPLINE VIEW */
          <>
            {/* Discipline selector */}
            <div style={{ paddingTop: 18 }}>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {disciplines.map(d => (
                  <button key={d.id} onClick={() => { setActiveDiscipline(d.id); setActiveLevel("V"); setExpandedItem(null); }}
                    style={{ padding: "8px 11px", borderRadius: 9, border: activeDiscipline === d.id ? `2px solid ${d.color}` : "2px solid #E2E8F0", background: activeDiscipline === d.id ? d.bg : "white", color: activeDiscipline === d.id ? d.color : "#4A5568", fontWeight: 700, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, transition: "all 0.15s" }}>
                    <span>{d.emoji}</span>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                      <span>{d.name}</span>
                      <span style={{ fontSize: 8, opacity: 0.65, fontStyle: "italic", fontWeight: 500 }}>{d.de}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Level selector */}
            <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
              {levels.map(l => (
                <button key={l.id} onClick={() => { setActiveLevel(l.id); setExpandedItem(null); }}
                  style={{ flex: 1, padding: "11px 6px", borderRadius: 10, border: activeLevel === l.id ? `2px solid ${disc.color}` : "2px solid #E2E8F0", background: activeLevel === l.id ? disc.bg : "white", color: activeLevel === l.id ? disc.color : "#4A5568", fontWeight: 800, cursor: "pointer", textAlign: "center", transition: "all 0.15s" }}>
                  <div style={{ fontSize: 20 }}>{l.id}</div>
                  <div style={{ fontSize: 10, fontWeight: 600, marginTop: 1 }}>{l.desc}</div>
                  <div style={{ fontSize: 9, opacity: 0.65, fontStyle: "italic" }}>{l.de}</div>
                  <div style={{ fontSize: 9, opacity: 0.6 }}>최소 {l.minAge}</div>
                </button>
              ))}
            </div>

            {/* Score summary */}
            <div style={{ marginTop: 14, background: `linear-gradient(135deg,${disc.color}20,${disc.color}06)`, borderRadius: 14, padding: "14px 16px", border: `1.5px solid ${disc.color}30`, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ flex: 1, minWidth: 130 }}>
                <div style={{ fontSize: 11, color: "#6B7280", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>종목</div>
                <div style={{ fontSize: 15, fontWeight: 900, color: disc.color, marginTop: 2 }}>{disc.emoji} {disc.name}</div>
                <div style={{ fontSize: 10, color: "#6B7280", fontStyle: "italic" }}>{disc.de}</div>
                <div style={{ fontSize: 10, color: "#6B7280" }}>{disc.code} · {level.name} · {level.de}</div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[{ label: "후각작업 (Nase)", val: nw.pts }, { label: "복종·장애물 (UO)", val: obedTotal }].map((s, i) => (
                  <div key={i} style={{ textAlign: "center", background: "white", borderRadius: 10, padding: "9px 13px", minWidth: 78 }}>
                    <div style={{ fontSize: 9, color: "#6B7280", fontWeight: 700, lineHeight: 1.3 }}>{s.label}</div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: disc.color }}>{s.val}</div>
                    <div style={{ fontSize: 9, color: "#9CA3AF" }}>합격 {Math.ceil(s.val * 0.7)}점↑</div>
                  </div>
                ))}
                <div style={{ textAlign: "center", background: disc.color, borderRadius: 10, padding: "9px 13px", minWidth: 78 }}>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.7)", fontWeight: 700 }}>합산 (Gesamt)</div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "white" }}>{nw.pts + obedTotal}</div>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.6)" }}>총점</div>
                </div>
              </div>
            </div>

            {/* Grade reference strip */}
            <div style={{ marginTop: 8, display: "flex", gap: 5, flexWrap: "wrap" }}>
              {grades.map(g => {
                const minPct = g.code === "V" ? 0.96 : g.code === "SG" ? 0.90 : g.code === "G" ? 0.80 : g.code === "B" ? 0.70 : 0;
                return (
                  <div key={g.code} style={{ background: g.bg, border: `1.5px solid ${g.color}40`, borderRadius: 8, padding: "5px 9px", minWidth: 62, textAlign: "center" }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: g.color }}>{g.code}</div>
                    <div style={{ fontSize: 9, color: g.color, fontStyle: "italic", marginBottom: 2 }}>{g.de}</div>
                    {g.code === "M" ? (
                      <div style={{ fontSize: 9, color: "#555" }}>불합격</div>
                    ) : (
                      <>
                        <div style={{ fontSize: 9, color: "#555" }}>복종 {Math.ceil(obedTotal * minPct)}+</div>
                        <div style={{ fontSize: 9, color: "#555" }}>후각 {Math.ceil(nw.pts * minPct)}+</div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Tab switch */}
            <div style={{ display: "flex", marginTop: 12, background: "#E4E8F4", borderRadius: 9, padding: 3 }}>
              {[["obedience","복종·장애물 (영역 B)"],["nosework","후각작업 (영역 A)"]].map(([id, label]) => (
                <button key={id} onClick={() => { setActiveTab(id); setExpandedItem(null); }}
                  style={{ flex: 1, padding: "9px 0", border: "none", borderRadius: 7, background: activeTab === id ? "white" : "transparent", color: activeTab === id ? "#1A1E2E" : "#6B7280", fontWeight: activeTab === id ? 700 : 500, fontSize: 13, cursor: "pointer", boxShadow: activeTab === id ? "0 1px 4px rgba(0,0,0,0.1)" : "none", transition: "all 0.15s" }}>
                  {label}
                </button>
              ))}
            </div>

            {/* OBEDIENCE */}
            {activeTab === "obedience" ? (
              <div style={{ marginTop: 10 }}>
                <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 8, fontWeight: 600 }}>
                  {items.length}개 과목 · 합격 최소 {Math.ceil(obedTotal * 0.7)}점 · <span style={{ color: disc.color }}>과목명 탭하면 시행방법·도식 확인</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  {items.map((item, i) => {
                    const hasProcedure = !!procedureMap[item.name];
                    const isOpen = expandedItem === i;
                    return (
                      <div key={i} style={{ background: "white", borderRadius: 10, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", border: isOpen ? `2px solid ${disc.color}` : "2px solid transparent", transition: "border 0.15s" }}>
                        <div onClick={() => hasProcedure && setExpandedItem(isOpen ? null : i)}
                          style={{ padding: "11px 13px", display: "flex", alignItems: "center", gap: 11, cursor: hasProcedure ? "pointer" : "default" }}>
                          <div style={{ width: 25, height: 25, borderRadius: "50%", background: `${disc.color}18`, color: disc.color, fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#1A1E2E", display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
                              <span>{item.icon}</span>
                              <span>{item.name}</span>
                              {hasProcedure && <span style={{ fontSize: 9, background: `${disc.color}20`, color: disc.color, borderRadius: 4, padding: "1px 6px", fontWeight: 700 }}>방법+도식</span>}
                            </div>
                          </div>
                          <div style={{ fontSize: 15, fontWeight: 900, color: disc.color, flexShrink: 0, minWidth: 36, textAlign: "right" }}>
                            {item.pts}<span style={{ fontSize: 9, fontWeight: 500, color: "#9CA3AF" }}>P</span>
                          </div>
                          {hasProcedure && <span style={{ fontSize: 12, color: "#9CA3AF", flexShrink: 0 }}>{isOpen ? "▲" : "▼"}</span>}
                        </div>
                        {isOpen && (
                          <div style={{ padding: "0 13px 13px" }}>
                            <ProcedureCard itemName={item.name} color={disc.color} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* NOSEWORK */
              <div style={{ marginTop: 10 }}>
                <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 8, fontWeight: 600 }}>
                  합격 최소 {Math.ceil(nw.pts * 0.7)}점 (70%) · 최대 {nw.pts}점
                </div>
                <div style={{ background: "white", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                  <div style={{ background: `${disc.color}12`, padding: "13px 15px", borderBottom: "1px solid #F0F2F8" }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: disc.color }}>{disc.emoji} {disc.name} — {level.name} 후각작업</div>
                    <div style={{ fontSize: 10, color: "#6B7280", fontStyle: "italic" }}>{disc.de} · {level.de}</div>
                  </div>
                  <div style={{ padding: "12px 15px", display: "flex", flexDirection: "column", gap: 8 }}>
                    {nw.items.map((item, i) => (
                      <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: disc.color, marginTop: 6, flexShrink: 0 }} />
                        <span style={{ fontSize: 13, color: "#374151", lineHeight: 1.65 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notification methods */}
                {["tracking","area","disaster","mantrailing","avalanche"].includes(activeDiscipline) && (
                  <div style={{ marginTop: 10, background: "white", borderRadius: 12, padding: "13px 15px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: "#1A1E2E", marginBottom: 10 }}>📢 통보 방식 (Meldeverhalten) — 지도수 선택</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                      {[
                        { name: "짖음통보 / Verbellen", desc: "은폐인 발견 후 지도수 도착 시까지 지속적으로 방향을 가리키며 짖음" },
                        ...(!["avalanche"].includes(activeDiscipline) ? [{ name: "스틱통보 / Apportieren (Stick)", desc: "발견 후 목의 스틱을 지도수에게 가져가 인도 (추적·야지·재난)" }] : []),
                        { name: "자유통보 / Freiverweisen", desc: "지도수와 은폐인 사이를 반복 왕복하며 유도" },
                        ...(["tracking","mantrailing"].includes(activeDiscipline) ? [{ name: "지시·인지통보 / Verweisen", desc: "물품 또는 트레일구축자 앞에서 앉아·엎드려·서 자세로 위치 지시" }] : []),
                        ...(activeDiscipline === "avalanche" ? [{ name: "파헤침·진입 통보 / Graben", desc: "눈사태 전용. 매몰 지점을 파헤쳐 진입 시도로 위치 알림" }] : []),
                      ].map((n, i) => (
                        <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start", padding: "8px 10px", background: "#FAFBFF", borderRadius: 8 }}>
                          <div style={{ background: disc.color, color: "white", borderRadius: 5, padding: "2px 8px", fontSize: 10, fontWeight: 700, flexShrink: 0, marginTop: 1, lineHeight: 1.4, whiteSpace: "nowrap" }}>{n.name}</div>
                          <div style={{ fontSize: 12, color: "#4B5563", lineHeight: 1.55 }}>{n.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div style={{ marginTop: 18, padding: "11px 14px", background: "#EEF2FF", borderRadius: 9, fontSize: 11, color: "#4338CA", lineHeight: 1.7 }}>
              <strong>📌 참고:</strong> IRO 국제 인명구조견 시험규정 한국어판(2025) 기반 제작. 실제 시험 시 반드시 원문 규정을 확인하세요. 한국인명구조견협회 KKCRD | 역자: 이태원·이한나
            </div>
          </>
        )}
      </div>
    </div>
  );
}
