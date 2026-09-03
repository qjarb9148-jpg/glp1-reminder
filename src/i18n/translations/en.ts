import { TranslationDict } from './types';

const en: TranslationDict = {
  weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  weekdaysLong: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

  tabs: {
    home: 'Home',
    history: 'History',
    sideEffects: 'Side Effects',
    inventory: 'Inventory',
    settings: 'Settings',
  },

  drugNames: {
    wegovy: 'Wegovy',
    mounjaro: 'Mounjaro',
    ozempic: 'Ozempic',
    other: 'Other',
  },

  sites: {
    abdomen: 'Abdomen',
    thigh_left: 'Thigh - Left',
    thigh_right: 'Thigh - Right',
    arm_left: 'Arm - Left',
    arm_right: 'Arm - Right',
  },

  symptoms: {
    nausea: 'Nausea',
    constipation: 'Constipation',
    diarrhea: 'Diarrhea',
    headache: 'Headache',
    other: 'Other',
  },

  onboarding: {
    title: 'Get Started with GLP-1 Reminder',
    subtitle: 'Tell us about the medication you are taking.',
    selectDrug: 'Select Medication',
    customDrugLabel: 'Enter Medication Name',
    customDrugPlaceholder: 'e.g. Saxenda',
    doseLabel: 'Current Dose (mg)',
    dosePlaceholder: '0.25',
    dayLabel: 'Injection Day',
    start: 'Get Started',
  },

  home: {
    emptyProfile: 'Please set up your medication first.',
    currentDose: (mg) => `Current dose ${mg}mg`,
    upcomingDoseChange: (date, mg) => `Increasing to ${mg}mg starting ${date}`,
    untilNextDose: 'Until Next Dose',
    ddayLabel: 'D-day',
    dMinus: (n) => `D-${n}`,
    dPlus: (n) => `D+${n}`,
    recommendedSite: 'Recommended Injection Site',
    rotationHint: 'Automatically suggested to avoid repeating the same site.',
    remainingPens: 'Pens Remaining',
    pensUnit: (n) => `${n}`,
    logDose: 'Mark as Done',
    logSuccessTitle: 'Done',
    logSuccessBody: 'Your dose has been logged.',
    logErrorTitle: 'Error',
    logErrorBody: 'Failed to save the dose record.',
  },

  history: {
    title: 'Dose History',
    empty: 'No doses logged yet.',
  },

  sideEffects: {
    title: 'Side Effects',
    symptomsLabel: 'Symptoms (multiple choice)',
    intensityLabel: 'Intensity (1-5)',
    notesLabel: 'Notes',
    notesPlaceholder: 'Optional',
    addButton: 'Add Entry',
    summaryTitle: 'Last 30 Days',
    summaryEmpty: 'No entries in the last 30 days.',
    listTitle: 'Entries',
    listEmpty: 'No entries yet.',
    timesSuffix: (n) => `x${n}`,
    intensityPrefix: 'Intensity',
  },

  inventory: {
    title: 'Pen Inventory',
    remainingLabel: 'Pens Remaining',
    manualInputLabel: 'Enter Manually',
    save: 'Save',
    refillTitle: 'Refill By',
    runOutLabel: (date) => `Estimated run-out date: ${date}`,
  },

  settings: {
    title: 'Settings',
    notificationTimeLabel: 'Reminder Time',
    save: 'Save',
    savedTitle: 'Saved',
    savedBody: 'Reminder time updated.',
    dayLabel: 'Injection Day',
    doseScheduleLabel: 'Dose Escalation Schedule',
    escalationDatePlaceholder: 'YYYY-MM-DD',
    escalationDosePlaceholder: 'mg',
    add: 'Add',
    languageLabel: 'Language',
    systemLanguageLabel: 'Follow System Language',
    resetButton: 'Reset All Data',
    resetTitle: 'Reset All Data',
    resetBody: 'All your records will be deleted. Continue?',
    resetCancel: 'Cancel',
    resetConfirm: 'Reset',
  },

  notifications: {
    doseTitle: 'Dose Reminder',
    doseBody: (drug) => `It's your ${drug} injection day today. Don't forget!`,
    refillTitle: 'Refill Coming Up',
    refillBody: 'Your pen supply is about to run out. Time to arrange a refill.',
  },
};

export default en;
