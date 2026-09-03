import { TranslationDict } from './types';

const ja: TranslationDict = {
  weekdaysShort: ['日', '月', '火', '水', '木', '金', '土'],
  weekdaysLong: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],

  tabs: {
    home: 'ホーム',
    history: '記録',
    sideEffects: '副作用',
    inventory: '在庫',
    settings: '設定',
  },

  drugNames: {
    wegovy: 'ウゴービ',
    mounjaro: 'マンジャロ',
    ozempic: 'オゼンピック',
    other: 'その他',
  },

  sites: {
    abdomen: '腹部',
    thigh_left: '太もも（左）',
    thigh_right: '太もも（右）',
    arm_left: '腕（左）',
    arm_right: '腕（右）',
  },

  symptoms: {
    nausea: '吐き気',
    constipation: '便秘',
    diarrhea: '下痢',
    headache: '頭痛',
    other: 'その他',
  },

  onboarding: {
    title: 'GLP-1リマインダーを始める',
    subtitle: '服用中のお薬情報を教えてください。',
    selectDrug: '薬剤を選択',
    customDrugLabel: '薬剤名を入力',
    customDrugPlaceholder: '例: サクセンダ',
    doseLabel: '現在の用量 (mg)',
    dosePlaceholder: '0.25',
    dayLabel: '投与する曜日',
    start: '始める',
  },

  home: {
    emptyProfile: 'まずお薬情報を設定してください。',
    currentDose: (mg) => `現在の用量 ${mg}mg`,
    upcomingDoseChange: (date, mg) => `${date}から${mg}mgに増量予定`,
    untilNextDose: '次回投与まで',
    ddayLabel: '当日',
    dMinus: (n) => `D-${n}`,
    dPlus: (n) => `D+${n}`,
    recommendedSite: 'おすすめの投与部位',
    rotationHint: '同じ部位が続かないよう自動でおすすめしています。',
    remainingPens: '残りのペン',
    pensUnit: (n) => `${n}本`,
    logDose: '投与完了',
    logSuccessTitle: '完了',
    logSuccessBody: '投与記録を保存しました。',
    logErrorTitle: 'エラー',
    logErrorBody: '投与記録の保存に失敗しました。',
  },

  history: {
    title: '投与履歴',
    empty: 'まだ投与記録がありません。',
  },

  sideEffects: {
    title: '副作用の記録',
    symptomsLabel: '症状（複数選択可）',
    intensityLabel: '強さ (1〜5)',
    notesLabel: 'メモ',
    notesPlaceholder: '任意入力',
    addButton: '記録を追加',
    summaryTitle: '過去30日間のまとめ',
    summaryEmpty: '過去30日間の記録はありません。',
    listTitle: '記録一覧',
    listEmpty: '記録がありません。',
    timesSuffix: (n) => `${n}回`,
    intensityPrefix: '強さ',
  },

  inventory: {
    title: 'ペンの在庫',
    remainingLabel: '残りのペン本数',
    manualInputLabel: '手入力',
    save: '保存',
    refillTitle: '処方リフィル予定日',
    runOutLabel: (date) => `在庫切れ予想日: ${date}`,
  },

  settings: {
    title: '設定',
    notificationTimeLabel: '通知時刻',
    save: '保存',
    savedTitle: '保存しました',
    savedBody: '通知時刻を変更しました。',
    dayLabel: '投与する曜日',
    doseScheduleLabel: '増量スケジュール',
    escalationDatePlaceholder: 'YYYY-MM-DD',
    escalationDosePlaceholder: 'mg',
    add: '追加',
    languageLabel: '言語',
    systemLanguageLabel: '端末の言語設定に従う',
    resetButton: 'データを初期化',
    resetTitle: 'データを初期化',
    resetBody: 'すべての記録が削除されます。続けますか？',
    resetCancel: 'キャンセル',
    resetConfirm: '初期化',
  },

  notifications: {
    doseTitle: '投薬リマインダー',
    doseBody: (drug) => `今日は${drug}の投与日です。忘れずに投与しましょう！`,
    refillTitle: 'ペンの在庫がまもなく不足します',
    refillBody: 'ペンの在庫がまもなく切れます。処方のリフィルを準備しましょう。',
  },
};

export default ja;
