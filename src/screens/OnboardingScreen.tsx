import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppData } from '../context/AppDataContext';
import { useLanguage } from '../i18n/LanguageContext';
import { DRUG_NAMES, DrugName } from '../types';
import { toDateKey } from '../utils/dateUtils';
import { ensureNotificationPermissions } from '../utils/notifications';

export default function OnboardingScreen() {
  const { saveProfile } = useAppData();
  const { t } = useLanguage();
  const [drugName, setDrugName] = useState<DrugName>('wegovy');
  const [customDrugName, setCustomDrugName] = useState('');
  const [doseMg, setDoseMg] = useState('0.25');
  const [dayOfWeek, setDayOfWeek] = useState(new Date().getDay());
  const [submitting, setSubmitting] = useState(false);

  const handleComplete = async () => {
    const parsedDose = parseFloat(doseMg);
    if (Number.isNaN(parsedDose) || parsedDose <= 0) return;
    if (drugName === 'other' && customDrugName.trim().length === 0) return;

    setSubmitting(true);
    try {
      await ensureNotificationPermissions();
      await saveProfile({
        drugName,
        customDrugName: drugName === 'other' ? customDrugName.trim() : undefined,
        doseMg: parsedDose,
        doseSchedule: [{ date: toDateKey(new Date()), doseMg: parsedDose }],
        dayOfWeek,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>{t.onboarding.title}</Text>
          <Text style={styles.subtitle}>{t.onboarding.subtitle}</Text>

          <Text style={styles.label}>{t.onboarding.selectDrug}</Text>
          <View style={styles.chipRow}>
            {DRUG_NAMES.map((name) => (
              <TouchableOpacity
                key={name}
                style={[styles.chip, drugName === name && styles.chipSelected]}
                onPress={() => setDrugName(name)}
              >
                <Text style={[styles.chipText, drugName === name && styles.chipTextSelected]}>
                  {t.drugNames[name]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {drugName === 'other' && (
            <>
              <Text style={styles.label}>{t.onboarding.customDrugLabel}</Text>
              <TextInput
                style={styles.input}
                value={customDrugName}
                onChangeText={setCustomDrugName}
                placeholder={t.onboarding.customDrugPlaceholder}
              />
            </>
          )}

          <Text style={styles.label}>{t.onboarding.doseLabel}</Text>
          <TextInput
            style={styles.input}
            value={doseMg}
            onChangeText={setDoseMg}
            keyboardType="decimal-pad"
            placeholder={t.onboarding.dosePlaceholder}
          />

          <Text style={styles.label}>{t.onboarding.dayLabel}</Text>
          <View style={styles.chipRow}>
            {t.weekdaysShort.map((label, index) => (
              <TouchableOpacity
                key={label}
                style={[styles.dayChip, dayOfWeek === index && styles.chipSelected]}
                onPress={() => setDayOfWeek(index)}
              >
                <Text style={[styles.chipText, dayOfWeek === index && styles.chipTextSelected]}>
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleComplete}
            disabled={submitting}
          >
            <Text style={styles.submitButtonText}>{t.onboarding.start}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 24, paddingBottom: 48 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 24 },
  label: { fontSize: 14, fontWeight: '600', marginTop: 20, marginBottom: 8 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f7f7f7',
  },
  dayChip: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipSelected: { backgroundColor: '#5B6CFF', borderColor: '#5B6CFF' },
  chipText: { color: '#333', fontSize: 14 },
  chipTextSelected: { color: '#fff', fontWeight: '700' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
  },
  submitButton: {
    marginTop: 36,
    backgroundColor: '#5B6CFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
