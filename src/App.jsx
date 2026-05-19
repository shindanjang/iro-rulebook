import { useState } from "react";

const disciplines = [
  { id: "tracking",    code: "RH-F",  name: "추적 구조견",      emoji: "🐾", color: "#B8860B", bg: "#FFF8E1", de: "Fährtenrettungshund" },
  { id: "area",        code: "RH-FL", name: "야지 수색 구조견",  emoji: "🌲", color: "#2D6A3F", bg: "#E8F5E9", de: "Flächenrettungshund" },
  { id: "disaster",    code: "RH-T",  name: "재난 수색 구조견",  emoji: "🏚️", color: "#C0392B", bg: "#FEECEB", de: "Trümmerrettungshund" },
  { id: "mantrailing", code: "RH-MT", name: "맨트레일링 구조견", emoji: "👃", color: "#6A1B9A", bg: "#F3E5F5", de: "Mantrailing-Rettungshund" },
  { id: "water",       code: "RH-W",  name: "수상 구조견",       emoji: "🌊", color: "#0277BD", bg: "#E1F5FE", de: "Wasserrettungshund" },
  { id: "avalanche",   code: "RH-L",  name: "눈사태 구조견",     emoji: "🏔️", color: "#37474F", bg: "#ECEFF1", de: "Lawinenrettungshund" },
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
    schema: null,
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
    schema: null,
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
    schema: null,
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

// ── SVG 도식 컴포넌트
function SchemaHeeling({ color }) {
  return (
    <svg viewBox="0 0 340 230" style={{ width: "100%", maxWidth: 340, display: "block", margin: "0 auto" }}>
      <rect width="340" height="230" rx="10" fill="#F8FAFF" stroke="#E2E8F0" strokeWidth="1" />
      <text x="170" y="18" textAnchor="middle" fontSize="10" fill="#8B9EC0" fontWeight="700">줄없이 따라걷기 — 경로 도식 (Unterordnung ohne Leine)</text>
      <g fill="none" stroke={color} strokeWidth="2">
        <line x1="30" y1="185" x2="30" y2="80" />
        <polygon points="30,72 25,84 35,84" fill={color} />
        <path d="M30,80 Q30,58 52,58" />
        <line x1="52" y1="58" x2="145" y2="58" />
        <path d="M145,58 Q165,58 165,78" />
        <line x1="165" y1="78" x2="165" y2="148" />
        <path d="M165,148 Q165,168 185,168" />
        <line x1="185" y1="168" x2="295" y2="168" />
        <path d="M295,168 Q315,168 315,148" />
        <line x1="315" y1="148" x2="315" y2="100" />
        <path d="M315,100 Q315,80 295,80" />
        <line x1="295" y1="80" x2="60" y2="80" />
        <polygon points="62,76 72,80 62,84" fill={color} />
      </g>
      <circle cx="30" cy="185" r="6" fill={color} />
      <text x="30" y="202" textAnchor="middle" fontSize="9" fill={color} fontWeight="700">START</text>
      <text x="10" y="132" fontSize="8.5" fill={color} fontWeight="700">①50보</text>
      <text x="55" y="52" fontSize="8" fill={color} fontWeight="700">②180°</text>
      <text x="169" y="112" fontSize="8" fill={color} fontWeight="700">③R90°</text>
      <text x="205" y="163" fontSize="8" fill={color} fontWeight="700">④R90°</text>
      <text x="318" y="127" fontSize="8" fill={color} fontWeight="700">⑤180°</text>
      <text x="195" y="76" fontSize="8" fill={color} fontWeight="700">⑥L90°</text>
      <text x="85" y="52" fontSize="8" fill="#888">속보↔완보</text>
    </svg>
  );
}

function SchemaRemoteControl({ color }) {
  return (
    <svg viewBox="0 0 320 160" style={{ width: "100%", maxWidth: 320, display: "block", margin: "0 auto" }}>
      <rect width="320" height="160" rx="10" fill="#F8FAFF" stroke="#E2E8F0" strokeWidth="1" />
      <text x="160" y="17" textAnchor="middle" fontSize="10" fill="#8B9EC0" fontWeight="700">원격통제 (Fernsteuerung)</text>
      <rect x="248" y="50" width="48" height="24" rx="6" fill={color} opacity="0.15" stroke={color} strokeWidth="1" />
      <text x="272" y="66" textAnchor="middle" fontSize="9" fill={color} fontWeight="700">지도수</text>
      <circle cx="48" cy="95" r="11" fill={color} opacity="0.2" stroke={color} strokeWidth="1.5" />
      <text x="48" y="99" textAnchor="middle" fontSize="9" fill={color} fontWeight="700">견</text>
      <line x1="59" y1="92" x2="152" y2="74" stroke={color} strokeWidth="1.5" strokeDasharray="5,3" />
      <circle cx="155" cy="73" r="7" fill="#E53E3E" />
      <text x="155" y="77" textAnchor="middle" fontSize="8" fill="white" fontWeight="800">↓</text>
      <text x="155" y="98" textAnchor="middle" fontSize="8" fill="#E53E3E" fontWeight="700">엎드려!</text>
      <line x1="161" y1="71" x2="242" y2="60" stroke={color} strokeWidth="2" />
      <polygon points="242,57 236,60 240,65" fill={color} />
      <circle cx="244" cy="85" r="7" fill={color} opacity="0.6" />
      <text x="244" y="110" textAnchor="middle" fontSize="8" fill={color} fontWeight="700">전면앉아</text>
      <text x="10" y="140" fontSize="8.5" fill="#555">①10–15보 앉아 → ②40보 이동 후 와! → ③중간 엎드려 → [B:서] → ④전면앉아</text>
    </svg>
  );
}

function SchemaSendAwayV({ color }) {
  return (
    <svg viewBox="0 0 300 180" style={{ width: "100%", maxWidth: 300, display: "block", margin: "0 auto" }}>
      <rect width="300" height="180" rx="10" fill="#F8FAFF" stroke="#E2E8F0" strokeWidth="1" />
      <text x="150" y="17" textAnchor="middle" fontSize="10" fill="#8B9EC0" fontWeight="700">원격조정 V단계 (2개)</text>
      <rect x="8" y="80" width="44" height="22" rx="6" fill={color} opacity="0.15" stroke={color} strokeWidth="1" />
      <text x="30" y="94" textAnchor="middle" fontSize="9" fill={color} fontWeight="700">지도수</text>
      <circle cx="140" cy="90" r="9" fill="#FFB300" opacity="0.8" />
      <text x="140" y="94" textAnchor="middle" fontSize="8" fill="#7A5000" fontWeight="700">중앙</text>
      <rect x="172" y="50" width="40" height="22" rx="5" fill={color} opacity="0.2" stroke={color} strokeWidth="1.5" />
      <text x="192" y="64" textAnchor="middle" fontSize="11" fill={color} fontWeight="800">T1</text>
      <rect x="240" y="108" width="40" height="22" rx="5" fill={color} opacity="0.2" stroke={color} strokeWidth="1.5" />
      <text x="260" y="122" textAnchor="middle" fontSize="11" fill={color} fontWeight="800">T2</text>
      <line x1="52" y1="90" x2="131" y2="90" stroke={color} strokeWidth="2" strokeDasharray="4,2" />
      <polygon points="131,87 124,90 131,93" fill={color} />
      <line x1="148" y1="86" x2="178" y2="68" stroke={color} strokeWidth="2" />
      <polygon points="178,68 172,72 176,78" fill={color} />
      <line x1="210" y1="68" x2="244" y2="108" stroke={color} strokeWidth="2" />
      <polygon points="244,108 238,103 248,104" fill={color} />
      <line x1="248" y1="120" x2="62" y2="102" stroke="#E53E3E" strokeWidth="2" strokeDasharray="5,3" />
      <polygon points="62,99 68,102 62,105" fill="#E53E3E} " />
      <text x="130" y="155" textAnchor="middle" fontSize="8" fill="#E53E3E" fontWeight="700">마지막 T에서 '와' → 전면앉아</text>
    </svg>
  );
}

function SchemaSendAwayAB({ color }) {
  return (
    <svg viewBox="0 0 300 195" style={{ width: "100%", maxWidth: 300, display: "block", margin: "0 auto" }}>
      <rect width="300" height="195" rx="10" fill="#F8FAFF" stroke="#E2E8F0" strokeWidth="1" />
      <text x="150" y="17" textAnchor="middle" fontSize="10" fill="#8B9EC0" fontWeight="700">원격조정 A·B단계 (3개)</text>
      <rect x="8" y="90" width="44" height="22" rx="6" fill={color} opacity="0.15" stroke={color} strokeWidth="1" />
      <text x="30" y="104" textAnchor="middle" fontSize="9" fill={color} fontWeight="700">지도수</text>
      <circle cx="140" cy="100" r="9" fill="#FFB300" opacity="0.8" />
      <text x="140" y="104" textAnchor="middle" fontSize="8" fill="#7A5000" fontWeight="700">중앙</text>
      {[[170,52],[230,52],[260,125]].map(([x,y],i)=>(
        <g key={i}>
          <rect x={x-20} y={y-12} width="40" height="24" rx="5" fill={color} opacity="0.2" stroke={color} strokeWidth="1.5" />
          <text x={x} y={y+5} textAnchor="middle" fontSize="11" fill={color} fontWeight="800">T{i+1}</text>
        </g>
      ))}
      <line x1="52" y1="100" x2="131" y2="100" stroke={color} strokeWidth="2" strokeDasharray="4,2" />
      <polygon points="131,97 124,100 131,103" fill={color} />
      <line x1="148" y1="96" x2="157" y2="56" stroke={color} strokeWidth="2" />
      <polygon points="157,56 152,62 161,62" fill={color} />
      <line x1="190" y1="52" x2="212" y2="52" stroke={color} strokeWidth="2" />
      <polygon points="212,49 206,52 212,55" fill={color} />
      <line x1="246" y1="62" x2="256" y2="114" stroke={color} strokeWidth="2" />
      <polygon points="256,114 250,109 261,110" fill={color} />
      <line x1="248" y1="130" x2="62" y2="112" stroke="#E53E3E" strokeWidth="2" strokeDasharray="5,3" />
      <polygon points="62,109 69,112 62,115" fill="#E53E3E" />
      <text x="148" y="165" textAnchor="middle" fontSize="8" fill="#E53E3E" fontWeight="700">마지막 T에서 '와' → 전면앉아</text>
      <text x="148" y="178" textAnchor="middle" fontSize="7.5" fill="#888">추첨 순서로 T1→T2→T3 이동, 각 3초 대기</text>
    </svg>
  );
}

function SchemaLadder({ color }) {
  return (
    <svg viewBox="0 0 280 150" style={{ width: "100%", maxWidth: 280, display: "block", margin: "0 auto" }}>
      <rect width="280" height="150" rx="10" fill="#F8FAFF" stroke="#E2E8F0" strokeWidth="1" />
      <text x="140" y="17" textAnchor="middle" fontSize="10" fill="#8B9EC0" fontWeight="700">사다리 구성도 (Leiter)</text>
      <rect x="60" y="30" width="8" height="90" rx="2" fill={color} opacity="0.6" />
      <rect x="212" y="30" width="8" height="90" rx="2" fill={color} opacity="0.6" />
      {Array.from({length:14}).map((_,i)=>(
        <rect key={i} x="60" y={30+i*6.4} width="160" height="3" rx="1" fill={color} opacity="0.3" />
      ))}
      <rect x="10" y="108" width="58" height="12" rx="3" fill={color} opacity="0.25" stroke={color} strokeWidth="1" />
      <rect x="212" y="108" width="58" height="12" rx="3" fill={color} opacity="0.25" stroke={color} strokeWidth="1" />
      <text x="39" y="118" textAnchor="middle" fontSize="7.5" fill={color} fontWeight="600">디딤판(120cm)</text>
      <text x="241" y="118" textAnchor="middle" fontSize="7.5" fill={color} fontWeight="600">디딤판(120cm)</text>
      <text x="140" y="26" textAnchor="middle" fontSize="8" fill="#555" fontWeight="700">← 4m · 14 디딤대 · 간격 30cm →</text>
      <text x="140" y="138" textAnchor="middle" fontSize="8" fill="#888">높이 50cm · 너비 30cm · 디딤대 두께 5cm</text>
    </svg>
  );
}

function SchemaSeesaw({ color }) {
  return (
    <svg viewBox="0 0 280 150" style={{ width: "100%", maxWidth: 280, display: "block", margin: "0 auto" }}>
      <rect width="280" height="150" rx="10" fill="#F8FAFF" stroke="#E2E8F0" strokeWidth="1" />
      <text x="140" y="17" textAnchor="middle" fontSize="10" fill="#8B9EC0" fontWeight="700">그네 구성도 (Hängebrücke)</text>
      <rect x="20" y="90" width="50" height="14" rx="3" fill={color} opacity="0.25" stroke={color} strokeWidth="1" />
      <text x="45" y="101" textAnchor="middle" fontSize="8" fill={color} fontWeight="600">디딤판</text>
      <rect x="210" y="90" width="50" height="14" rx="3" fill={color} opacity="0.25" stroke={color} strokeWidth="1" />
      <text x="235" y="101" textAnchor="middle" fontSize="8" fill={color} fontWeight="600">디딤판</text>
      <line x1="60" y1="75" x2="60" y2="40" stroke={color} strokeWidth="2" strokeDasharray="4,2" />
      <line x1="220" y1="75" x2="220" y2="40" stroke={color} strokeWidth="2" strokeDasharray="4,2" />
      <line x1="60" y1="40" x2="60" y2="34" stroke={color} strokeWidth="3" />
      <line x1="220" y1="40" x2="220" y2="34" stroke={color} strokeWidth="3" />
      <rect x="60" y="65" width="160" height="14" rx="4" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5" />
      <text x="140" y="76" textAnchor="middle" fontSize="9" fill={color} fontWeight="700">← 3m 널빤지 (자유 좌우이동) →</text>
      <rect x="35" y="30" width="50" height="10" rx="3" fill={color} opacity="0.5" />
      <rect x="195" y="30" width="50" height="10" rx="3" fill={color} opacity="0.5" />
      <text x="60" y="39" textAnchor="middle" fontSize="7" fill="white" fontWeight="700">지지대</text>
      <text x="220" y="39" textAnchor="middle" fontSize="7" fill="white" fontWeight="700">지지대</text>
      <text x="140" y="125" textAnchor="middle" fontSize="8" fill="#888">높이 40cm · 이동폭 최대 25cm · B단계 전용</text>
    </svg>
  );
}

function SchemaTunnel({ color }) {
  return (
    <svg viewBox="0 0 260 120" style={{ width: "100%", maxWidth: 260, display: "block", margin: "0 auto" }}>
      <rect width="260" height="120" rx="10" fill="#F8FAFF" stroke="#E2E8F0" strokeWidth="1" />
      <text x="130" y="17" textAnchor="middle" fontSize="10" fill="#8B9EC0" fontWeight="700">터널통과 구성도 (Tunnel)</text>
      <ellipse cx="55" cy="70" rx="22" ry="28" fill="none" stroke={color} strokeWidth="2.5" />
      <ellipse cx="205" cy="70" rx="22" ry="28" fill="none" stroke={color} strokeWidth="2.5" />
      <line x1="55" y1="42" x2="205" y2="42" stroke={color} strokeWidth="2.5" />
      <line x1="55" y1="98" x2="205" y2="98" stroke={color} strokeWidth="2.5" />
      <rect x="55" y="42" width="150" height="56" fill={color} opacity="0.08" />
      <text x="130" y="74" textAnchor="middle" fontSize="9" fill={color} fontWeight="700">직경 50cm</text>
      <line x1="20" y1="105" x2="240" y2="105" stroke={color} strokeWidth="1" strokeDasharray="3,3" />
      <text x="130" y="114" textAnchor="middle" fontSize="8" fill="#888">길이 3m (하드터널) / 소프트터널 동일 길이</text>
    </svg>
  );
}

function SchemaFixedBridge({ color }) {
  return (
    <svg viewBox="0 0 280 120" style={{ width: "100%", maxWidth: 280, display: "block", margin: "0 auto" }}>
      <rect width="280" height="120" rx="10" fill="#F8FAFF" stroke="#E2E8F0" strokeWidth="1" />
      <text x="140" y="17" textAnchor="middle" fontSize="10" fill="#8B9EC0" fontWeight="700">고정 나무다리 (Starre Brücke)</text>
      <rect x="30" y="55" width="12" height="35" rx="3" fill={color} opacity="0.6" />
      <rect x="238" y="55" width="12" height="35" rx="3" fill={color} opacity="0.6" />
      <rect x="30" y="48" width="220" height="14" rx="4" fill={color} opacity="0.35" stroke={color} strokeWidth="1.5" />
      <text x="140" y="59" textAnchor="middle" fontSize="9" fill={color} fontWeight="700">← 약 4m (너비 30cm) →</text>
      <text x="140" y="100" textAnchor="middle" fontSize="8" fill="#888">지지대 높이 50cm 내외 · V단계 전용</text>
      <text x="30" y="46" fontSize="8" fill={color} fontWeight="700">지지대</text>
      <text x="213" y="46" fontSize="8" fill={color} fontWeight="700">지지대</text>
    </svg>
  );
}

function SchemaMovingBridge({ color }) {
  return (
    <svg viewBox="0 0 280 130" style={{ width: "100%", maxWidth: 280, display: "block", margin: "0 auto" }}>
      <rect width="280" height="130" rx="10" fill="#F8FAFF" stroke="#E2E8F0" strokeWidth="1" />
      <text x="140" y="17" textAnchor="middle" fontSize="10" fill="#8B9EC0" fontWeight="700">비고정 나무다리 (Wackelbrücke)</text>
      <ellipse cx="75" cy="80" rx="22" ry="14" fill="none" stroke={color} strokeWidth="2" />
      <ellipse cx="205" cy="80" rx="22" ry="14" fill="none" stroke={color} strokeWidth="2" />
      <text x="75" y="84" textAnchor="middle" fontSize="8" fill={color} fontWeight="600">원통</text>
      <text x="205" y="84" textAnchor="middle" fontSize="8" fill={color} fontWeight="600">원통</text>
      <text x="75" y="97" textAnchor="middle" fontSize="7.5" fill="#888">Ø40cm</text>
      <text x="205" y="97" textAnchor="middle" fontSize="7.5" fill="#888">Ø40cm</text>
      <rect x="53" y="58" width="174" height="16" rx="4" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5" />
      <text x="140" y="70" textAnchor="middle" fontSize="9" fill={color} fontWeight="700">← 4m 판자 (이동폭 약 20cm) →</text>
      <text x="140" y="118" textAnchor="middle" fontSize="8" fill="#888">A단계 전용 · 너비 30cm</text>
    </svg>
  );
}

function SchemaWaterRemote({ color }) {
  return (
    <svg viewBox="0 0 310 170" style={{ width: "100%", maxWidth: 310, display: "block", margin: "0 auto" }}>
      <rect width="310" height="170" rx="10" fill="#E1F5FE" stroke="#E2E8F0" strokeWidth="1" />
      <text x="155" y="17" textAnchor="middle" fontSize="10" fill="#8B9EC0" fontWeight="700">수상 원격조정 (Wasser-Fernsteuerung)</text>
      <rect x="8" y="125" width="60" height="20" rx="4" fill="#1A1E2E" opacity="0.7" />
      <text x="38" y="138" textAnchor="middle" fontSize="8" fill="white" fontWeight="700">지도수(육지)</text>
      <rect x="165" y="30" width="50" height="20" rx="4" fill={color} opacity="0.8" />
      <text x="190" y="43" textAnchor="middle" fontSize="8" fill="white" fontWeight="700">보트1</text>
      <rect x="240" y="100" width="50" height="20" rx="4" fill={color} opacity="0.8" />
      <text x="265" y="113" textAnchor="middle" fontSize="8" fill="white" fontWeight="700">보트2</text>
      <circle cx="100" cy="95" r="9" fill="#FFB300" opacity="0.9" />
      <text x="100" y="99" textAnchor="middle" fontSize="8" fill="#7A5000" fontWeight="700">견</text>
      <line x1="68" y1="130" x2="95" y2="100" stroke="#1A1E2E" strokeWidth="1.5" strokeDasharray="4,2" />
      <line x1="109" y1="90" x2="170" y2="47" stroke={color} strokeWidth="2" />
      <polygon points="170,47 164,52 172,57" fill={color} />
      <line x1="213" y1="47" x2="243" y2="100" stroke={color} strokeWidth="2" />
      <polygon points="243,100 237,95 248,96" fill={color} />
      <line x1="248" y1="112" x2="72" y2="130" stroke="#E53E3E" strokeWidth="2" strokeDasharray="5,3" />
      <polygon points="72,127 79,130 72,133" fill="#E53E3E" />
      <text x="155" y="155" textAnchor="middle" fontSize="8" fill="#E53E3E" fontWeight="700">마지막 지점 후 '와' → 전면앉아</text>
      <text x="155" y="166" textAnchor="middle" fontSize="7.5" fill="#888">A=20m·B=40m 거리</text>
    </svg>
  );
}

function SchemaWait({ color }) {
  return (
    <svg viewBox="0 0 300 150" style={{ width: "100%", maxWidth: 300, display: "block", margin: "0 auto" }}>
      <rect width="300" height="150" rx="10" fill="#F8FAFF" stroke="#E2E8F0" strokeWidth="1" />
      <text x="150" y="17" textAnchor="middle" fontSize="10" fill="#8B9EC0" fontWeight="700">대기 위치 비교 (단계별)</text>
      <text x="35" y="40" textAnchor="middle" fontSize="9" fill={color} fontWeight="700">V단계</text>
      <circle cx="20" cy="85" r="8" fill={color} opacity="0.3" />
      <text x="20" y="89" textAnchor="middle" fontSize="7" fill={color} fontWeight="700">견</text>
      <circle cx="62" cy="85" r="8" fill={color} opacity="0.7" />
      <text x="62" y="89" textAnchor="middle" fontSize="7" fill="white" fontWeight="700">지도</text>
      <line x1="28" y1="85" x2="54" y2="85" stroke={color} strokeWidth="1.5" />
      <text x="41" y="100" textAnchor="middle" fontSize="7.5" fill="#555">20보 (정면)</text>
      <text x="115" y="40" textAnchor="middle" fontSize="9" fill={color} fontWeight="700">A단계</text>
      <circle cx="95" cy="85" r="8" fill={color} opacity="0.3" />
      <text x="95" y="89" textAnchor="middle" fontSize="7" fill={color} fontWeight="700">견</text>
      <circle cx="150" cy="85" r="8" fill={color} opacity="0.7" />
      <text x="150" y="89" textAnchor="middle" fontSize="7" fill="white" fontWeight="700">지도</text>
      <line x1="103" y1="85" x2="142" y2="85" stroke={color} strokeWidth="1.5" />
      <text x="125" y="100" textAnchor="middle" fontSize="7.5" fill="#555">40보 (등 돌림)</text>
      <text x="230" y="40" textAnchor="middle" fontSize="9" fill={color} fontWeight="700">B단계</text>
      <circle cx="200" cy="85" r="8" fill={color} opacity="0.3" />
      <text x="200" y="89" textAnchor="middle" fontSize="7" fill={color} fontWeight="700">견</text>
      <rect x="255" y="72" width="28" height="28" rx="4" fill="#555" opacity="0.5" />
      <text x="269" y="88" textAnchor="middle" fontSize="7" fill="white" fontWeight="700">은폐</text>
      <line x1="208" y1="85" x2="255" y2="85" stroke={color} strokeWidth="1.5" strokeDasharray="4,2" />
      <text x="232" y="100" textAnchor="middle" fontSize="7.5" fill="#555">완전 은폐</text>
      <text x="150" y="130" textAnchor="middle" fontSize="8" fill="#888">대기 중 3m 이상 이탈 시: 과목 후 = 부족함, 이전 = 0점</text>
    </svg>
  );
}

function SchemaRenderer({ schemaKey, color }) {
  if (!schemaKey) return null;
  const map = {
    heeling: <SchemaHeeling color={color} />,
    remoteControl: <SchemaRemoteControl color={color} />,
    sendAwayV: <SchemaSendAwayV color={color} />,
    sendAwayAB: <SchemaSendAwayAB color={color} />,
    ladder: <SchemaLadder color={color} />,
    seesaw: <SchemaSeesaw color={color} />,
    tunnel: <SchemaTunnel color={color} />,
    fixedbridge: <SchemaFixedBridge color={color} />,
    movingbridge: <SchemaMovingBridge color={color} />,
    waterRemote: <SchemaWaterRemote color={color} />,
    waitSchema: <SchemaWait color={color} />,
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
  const [activeDiscipline, setActiveDiscipline] = useState("tracking");
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
                    const pct = (item.pts / obedTotal) * 100;
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
                            <div style={{ marginTop: 4, height: 4, background: "#F0F2F8", borderRadius: 2, overflow: "hidden" }}>
                              <div style={{ height: "100%", width: `${pct}%`, background: disc.color, borderRadius: 2 }} />
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
