import { TranslationDict } from './types';

const hi: TranslationDict = {
  weekdaysShort: ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'],
  weekdaysLong: ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'],

  tabs: {
    home: 'होम',
    history: 'इतिहास',
    sideEffects: 'साइड इफेक्ट्स',
    inventory: 'स्टॉक',
    settings: 'सेटिंग्स',
  },

  drugNames: {
    wegovy: 'वेगोवी',
    mounjaro: 'माउंजारो',
    ozempic: 'ओज़ेम्पिक',
    other: 'अन्य',
  },

  sites: {
    abdomen: 'पेट',
    thigh_left: 'जांघ - बाईं',
    thigh_right: 'जांघ - दाईं',
    arm_left: 'बांह - बाईं',
    arm_right: 'बांह - दाईं',
  },

  symptoms: {
    nausea: 'जी मिचलाना',
    constipation: 'कब्ज़',
    diarrhea: 'दस्त',
    headache: 'सिरदर्द',
    other: 'अन्य',
  },

  onboarding: {
    title: 'GLP-1 रिमाइंडर शुरू करें',
    subtitle: 'कृपया अपनी दवा की जानकारी बताएं।',
    selectDrug: 'दवा चुनें',
    customDrugLabel: 'दवा का नाम लिखें',
    customDrugPlaceholder: 'उदा: सैक्सेंडा',
    doseLabel: 'वर्तमान खुराक (mg)',
    dosePlaceholder: '0.25',
    dayLabel: 'इंजेक्शन का दिन',
    start: 'शुरू करें',
  },

  home: {
    emptyProfile: 'पहले अपनी दवा की जानकारी सेट करें।',
    currentDose: (mg) => `वर्तमान खुराक ${mg}mg`,
    upcomingDoseChange: (date, mg) => `${date} से ${mg}mg खुराक बढ़ेगी`,
    untilNextDose: 'अगली खुराक तक',
    ddayLabel: 'आज',
    dMinus: (n) => `D-${n}`,
    dPlus: (n) => `D+${n}`,
    recommendedSite: 'सुझाई गई इंजेक्शन जगह',
    rotationHint: 'एक ही जगह बार-बार न आए, इसलिए अपने आप सुझाई जाती है।',
    remainingPens: 'बची हुई पेन',
    pensUnit: (n) => `${n}`,
    logDose: 'खुराक पूरी हुई',
    logSuccessTitle: 'पूर्ण',
    logSuccessBody: 'खुराक रिकॉर्ड सेव हो गया।',
    logErrorTitle: 'त्रुटि',
    logErrorBody: 'खुराक रिकॉर्ड सेव करने में विफल।',
  },

  history: {
    title: 'खुराक इतिहास',
    empty: 'अभी तक कोई खुराक दर्ज नहीं है।',
  },

  sideEffects: {
    title: 'साइड इफेक्ट रिकॉर्ड',
    symptomsLabel: 'लक्षण (एक से अधिक चुनें)',
    intensityLabel: 'तीव्रता (1-5)',
    notesLabel: 'नोट्स',
    notesPlaceholder: 'वैकल्पिक',
    addButton: 'रिकॉर्ड जोड़ें',
    summaryTitle: 'पिछले 30 दिनों का सारांश',
    summaryEmpty: 'पिछले 30 दिनों में कोई रिकॉर्ड नहीं है।',
    listTitle: 'रिकॉर्ड सूची',
    listEmpty: 'कोई रिकॉर्ड नहीं है।',
    timesSuffix: (n) => `${n} बार`,
    intensityPrefix: 'तीव्रता',
  },

  inventory: {
    title: 'पेन स्टॉक',
    remainingLabel: 'बची हुई पेन की संख्या',
    manualInputLabel: 'खुद दर्ज करें',
    save: 'सेव करें',
    refillTitle: 'रिफिल की अनुमानित तारीख',
    runOutLabel: (date) => `स्टॉक खत्म होने की अनुमानित तारीख: ${date}`,
  },

  settings: {
    title: 'सेटिंग्स',
    notificationTimeLabel: 'रिमाइंडर का समय',
    save: 'सेव करें',
    savedTitle: 'सेव हो गया',
    savedBody: 'रिमाइंडर का समय बदल दिया गया है।',
    dayLabel: 'इंजेक्शन का दिन',
    doseScheduleLabel: 'खुराक बढ़ोतरी शेड्यूल',
    escalationDatePlaceholder: 'YYYY-MM-DD',
    escalationDosePlaceholder: 'mg',
    add: 'जोड़ें',
    languageLabel: 'भाषा',
    systemLanguageLabel: 'सिस्टम भाषा के अनुसार',
    resetButton: 'सभी डेटा रीसेट करें',
    resetTitle: 'सभी डेटा रीसेट करें',
    resetBody: 'सभी रिकॉर्ड हटा दिए जाएंगे। जारी रखें?',
    resetCancel: 'रद्द करें',
    resetConfirm: 'रीसेट करें',
  },

  notifications: {
    doseTitle: 'दवा रिमाइंडर',
    doseBody: (drug) => `आज आपकी ${drug} लगाने का दिन है। भूलें नहीं!`,
    refillTitle: 'पेन स्टॉक जल्द खत्म होने वाला है',
    refillBody: 'आपका पेन स्टॉक जल्द खत्म होने वाला है। रिफिल की तैयारी करें।',
  },
};

export default hi;
