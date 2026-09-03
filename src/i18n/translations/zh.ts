import { TranslationDict } from './types';

const zh: TranslationDict = {
  weekdaysShort: ['日', '一', '二', '三', '四', '五', '六'],
  weekdaysLong: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],

  tabs: {
    home: '首页',
    history: '记录',
    sideEffects: '副作用',
    inventory: '库存',
    settings: '设置',
  },

  drugNames: {
    wegovy: '诺和盈',
    mounjaro: '穆峰达',
    ozempic: '诺和泰',
    other: '其他',
  },

  sites: {
    abdomen: '腹部',
    thigh_left: '大腿（左）',
    thigh_right: '大腿（右）',
    arm_left: '手臂（左）',
    arm_right: '手臂（右）',
  },

  symptoms: {
    nausea: '恶心',
    constipation: '便秘',
    diarrhea: '腹泻',
    headache: '头痛',
    other: '其他',
  },

  onboarding: {
    title: '开始使用GLP-1提醒',
    subtitle: '请告诉我们您正在使用的药物信息。',
    selectDrug: '选择药物',
    customDrugLabel: '手动输入药物名称',
    customDrugPlaceholder: '例如：赛纤达',
    doseLabel: '当前剂量 (mg)',
    dosePlaceholder: '0.25',
    dayLabel: '注射日',
    start: '开始使用',
  },

  home: {
    emptyProfile: '请先设置药物信息。',
    currentDose: (mg) => `当前剂量 ${mg}mg`,
    upcomingDoseChange: (date, mg) => `将于${date}起增量至${mg}mg`,
    untilNextDose: '距下次注射',
    ddayLabel: '就是今天',
    dMinus: (n) => `D-${n}`,
    dPlus: (n) => `D+${n}`,
    recommendedSite: '推荐注射部位',
    rotationHint: '自动推荐，避免连续使用同一部位。',
    remainingPens: '剩余笔数',
    pensUnit: (n) => `${n}支`,
    logDose: '完成注射',
    logSuccessTitle: '完成',
    logSuccessBody: '注射记录已保存。',
    logErrorTitle: '错误',
    logErrorBody: '保存注射记录失败。',
  },

  history: {
    title: '注射记录',
    empty: '暂无注射记录。',
  },

  sideEffects: {
    title: '副作用记录',
    symptomsLabel: '症状（可多选）',
    intensityLabel: '强度 (1~5)',
    notesLabel: '备注',
    notesPlaceholder: '可选填写',
    addButton: '添加记录',
    summaryTitle: '近30天摘要',
    summaryEmpty: '近30天暂无记录。',
    listTitle: '记录列表',
    listEmpty: '暂无记录。',
    timesSuffix: (n) => `${n}次`,
    intensityPrefix: '强度',
  },

  inventory: {
    title: '笔具库存',
    remainingLabel: '剩余笔数',
    manualInputLabel: '手动输入',
    save: '保存',
    refillTitle: '预计补充处方日期',
    runOutLabel: (date) => `预计用完日期：${date}`,
  },

  settings: {
    title: '设置',
    notificationTimeLabel: '提醒时间',
    save: '保存',
    savedTitle: '已保存',
    savedBody: '提醒时间已更新。',
    dayLabel: '注射日',
    doseScheduleLabel: '剂量递增计划',
    escalationDatePlaceholder: 'YYYY-MM-DD',
    escalationDosePlaceholder: 'mg',
    add: '添加',
    languageLabel: '语言',
    systemLanguageLabel: '跟随系统语言',
    resetButton: '重置所有数据',
    resetTitle: '重置所有数据',
    resetBody: '所有记录都将被删除，确定要继续吗？',
    resetCancel: '取消',
    resetConfirm: '重置',
  },

  notifications: {
    doseTitle: '用药提醒',
    doseBody: (drug) => `今天是您注射${drug}的日子，别忘了按时注射！`,
    refillTitle: '笔具库存即将不足',
    refillBody: '您的笔具库存即将用完，请准备补充处方。',
  },
};

export default zh;
