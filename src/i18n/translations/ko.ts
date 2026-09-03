const ko = {
  weekdaysShort: ['일', '월', '화', '수', '목', '금', '토'],
  weekdaysLong: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],

  tabs: {
    home: '홈',
    history: '기록',
    sideEffects: '부작용',
    inventory: '재고',
    settings: '설정',
  },

  drugNames: {
    wegovy: '위고비',
    mounjaro: '마운자로',
    ozempic: '오젬픽',
    other: '기타',
  },

  sites: {
    abdomen: '복부',
    thigh_left: '허벅지-좌',
    thigh_right: '허벅지-우',
    arm_left: '팔-좌',
    arm_right: '팔-우',
  },

  symptoms: {
    nausea: '메스꺼움',
    constipation: '변비',
    diarrhea: '설사',
    headache: '두통',
    other: '기타',
  },

  onboarding: {
    title: 'GLP-1 리마인더 시작하기',
    subtitle: '복용 중인 약물 정보를 알려주세요.',
    selectDrug: '약물 선택',
    customDrugLabel: '약물명 직접 입력',
    customDrugPlaceholder: '예: 삭센다',
    doseLabel: '현재 용량 (mg)',
    dosePlaceholder: '0.25',
    dayLabel: '투여 요일',
    start: '시작하기',
  },

  home: {
    emptyProfile: '약물 정보를 먼저 설정해주세요.',
    currentDose: (mg: number) => `현재 용량 ${mg}mg`,
    upcomingDoseChange: (date: string, mg: number) => `${date}부터 ${mg}mg으로 증량 예정`,
    untilNextDose: '다음 투여까지',
    ddayLabel: 'D-day',
    dMinus: (n: number) => `D-${n}`,
    dPlus: (n: number) => `D+${n}`,
    recommendedSite: '추천 투여 부위',
    rotationHint: '같은 부위 연속 사용을 피해 자동으로 추천돼요.',
    remainingPens: '남은 펜',
    pensUnit: (n: number) => `${n}개`,
    logDose: '투여 완료',
    logSuccessTitle: '완료',
    logSuccessBody: '투여 기록이 저장되었어요.',
    logErrorTitle: '오류',
    logErrorBody: '투여 기록 저장에 실패했어요.',
  },

  history: {
    title: '투여 기록',
    empty: '아직 기록된 투여가 없어요.',
  },

  sideEffects: {
    title: '부작용 기록',
    symptomsLabel: '증상 (다중 선택)',
    intensityLabel: '강도 (1~5)',
    notesLabel: '메모',
    notesPlaceholder: '선택 입력',
    addButton: '기록 추가',
    summaryTitle: '최근 30일 요약',
    summaryEmpty: '최근 30일간 기록이 없어요.',
    listTitle: '기록 목록',
    listEmpty: '기록이 없어요.',
    timesSuffix: (n: number) => `${n}회`,
    intensityPrefix: '강도',
  },

  inventory: {
    title: '펜 재고',
    remainingLabel: '남은 펜 개수',
    manualInputLabel: '직접 입력',
    save: '저장',
    refillTitle: '처방 리필 예정일',
    runOutLabel: (date: string) => `펜 소진 예상일: ${date}`,
  },

  settings: {
    title: '설정',
    notificationTimeLabel: '알림 시간',
    save: '저장',
    savedTitle: '저장됨',
    savedBody: '알림 시간이 변경되었어요.',
    dayLabel: '투여 요일',
    doseScheduleLabel: '용량 증량 스케줄',
    escalationDatePlaceholder: 'YYYY-MM-DD',
    escalationDosePlaceholder: 'mg',
    add: '추가',
    languageLabel: '언어',
    systemLanguageLabel: '시스템 설정 따라가기',
    resetButton: '데이터 초기화',
    resetTitle: '데이터 초기화',
    resetBody: '모든 기록이 삭제돼요. 계속할까요?',
    resetCancel: '취소',
    resetConfirm: '초기화',
  },

  notifications: {
    doseTitle: '투약 알림',
    doseBody: (drug: string) => `오늘은 ${drug} 투여일이에요. 잊지 말고 맞아주세요!`,
    refillTitle: '펜 재고 부족 예정',
    refillBody: '펜 재고가 곧 소진될 예정이에요. 처방 리필을 준비하세요.',
  },
};

export default ko;
