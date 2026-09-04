import { TranslationDict } from './types';

const es: TranslationDict = {
  common: {
    ok: 'Aceptar',
  },

  weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  weekdaysLong: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],

  tabs: {
    home: 'Inicio',
    history: 'Historial',
    sideEffects: 'Efectos',
    inventory: 'Inventario',
    settings: 'Ajustes',
  },

  drugNames: {
    wegovy: 'Wegovy',
    mounjaro: 'Mounjaro',
    ozempic: 'Ozempic',
    other: 'Otro',
  },

  sites: {
    abdomen: 'Abdomen',
    thigh_left: 'Muslo - Izquierdo',
    thigh_right: 'Muslo - Derecho',
    arm_left: 'Brazo - Izquierdo',
    arm_right: 'Brazo - Derecho',
  },

  symptoms: {
    nausea: 'Náuseas',
    constipation: 'Estreñimiento',
    diarrhea: 'Diarrea',
    headache: 'Dolor de cabeza',
    other: 'Otro',
  },

  onboarding: {
    title: 'Comenzar con el recordatorio GLP-1',
    subtitle: 'Cuéntanos sobre el medicamento que estás tomando.',
    selectDrug: 'Selecciona el medicamento',
    customDrugLabel: 'Escribe el nombre del medicamento',
    customDrugPlaceholder: 'Ej: Saxenda',
    doseLabel: 'Dosis actual (mg)',
    dosePlaceholder: '0.25',
    dayLabel: 'Día de aplicación',
    start: 'Comenzar',
  },

  home: {
    emptyProfile: 'Primero configura tu medicamento.',
    currentDose: (mg) => `Dosis actual ${mg}mg`,
    upcomingDoseChange: (date, mg) => `Aumentará a ${mg}mg a partir del ${date}`,
    untilNextDose: 'Para la próxima dosis',
    ddayLabel: 'Hoy',
    dMinus: (n) => `D-${n}`,
    dPlus: (n) => `D+${n}`,
    recommendedSite: 'Sitio de inyección recomendado',
    rotationHint: 'Se sugiere automáticamente para evitar repetir el mismo sitio.',
    remainingPens: 'Plumas restantes',
    pensUnit: (n) => `${n}`,
    logDose: 'Marcar como aplicada',
    logSuccessTitle: 'Listo',
    logSuccessBody: 'Se guardó el registro de la dosis.',
    logErrorTitle: 'Error',
    logErrorBody: 'No se pudo guardar el registro de la dosis.',
    goHome: 'Ir al inicio',
  },

  history: {
    title: 'Historial de dosis',
    empty: 'Todavía no hay dosis registradas.',
  },

  sideEffects: {
    title: 'Efectos secundarios',
    symptomsLabel: 'Síntomas (selección múltiple)',
    intensityLabel: 'Intensidad (1-5)',
    notesLabel: 'Notas',
    notesPlaceholder: 'Opcional',
    addButton: 'Agregar registro',
    summaryTitle: 'Últimos 30 días',
    summaryEmpty: 'No hay registros en los últimos 30 días.',
    listTitle: 'Registros',
    listEmpty: 'Todavía no hay registros.',
    timesSuffix: (n) => `x${n}`,
    intensityPrefix: 'Intensidad',
  },

  inventory: {
    title: 'Inventario de plumas',
    remainingLabel: 'Plumas restantes',
    manualInputLabel: 'Ingresar manualmente',
    save: 'Guardar',
    refillTitle: 'Fecha estimada de reabastecimiento',
    runOutLabel: (date) => `Fecha estimada de agotamiento: ${date}`,
  },

  settings: {
    title: 'Ajustes',
    notificationTimeLabel: 'Hora del recordatorio',
    save: 'Guardar',
    savedTitle: 'Guardado',
    savedBody: 'Se actualizó la hora del recordatorio.',
    dayLabel: 'Día de aplicación',
    doseScheduleLabel: 'Calendario de aumento de dosis',
    escalationDatePlaceholder: 'AAAA-MM-DD',
    escalationDosePlaceholder: 'mg',
    add: 'Agregar',
    languageLabel: 'Idioma',
    systemLanguageLabel: 'Seguir el idioma del sistema',
    resetButton: 'Restablecer todos los datos',
    resetTitle: 'Restablecer todos los datos',
    resetBody: 'Se eliminarán todos tus registros. ¿Deseas continuar?',
    resetCancel: 'Cancelar',
    resetConfirm: 'Restablecer',
  },

  notifications: {
    doseTitle: 'Recordatorio de dosis',
    doseBody: (drug) => `Hoy te toca aplicar ${drug}. ¡No lo olvides!`,
    refillTitle: 'Reabastecimiento próximo',
    refillBody: 'Tu inventario de plumas está por agotarse. Es hora de preparar el reabastecimiento.',
  },
};

export default es;
