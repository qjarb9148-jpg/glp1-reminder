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
import { DRUG_NAMES, DrugName } from '../types';
import { WEEKDAY_LABELS_KO, toDateKey } from '../utils/dateUtils';
import { ensureNotificationPermissions } from '../utils/notifications';

export default function OnboardingScreen() {
  const { saveProfile } = useAppData();
  const [drugName, setDrugName] = useState<DrugName>('위고비');
  const [customDrugName, setCustomDrugName] = useState('');
  const [doseMg, setDoseMg] = useState('0.25');
  const [dayOfWeek, setDayOfWeek] = useState(new Date().getDay());
  const [submitting, setSubmitting] = useState(false);

  const handleComplete = async () => {
    const parsedDose = parseFloat(doseMg);
    if (Number.isNaN(parsedDose) || parsedDose <= 0) return;
    if (drugName === '기타' && customDrugName.trim().length === 0) return;

    setSubmitting(true);
    try {
      await ensureNotificationPermissions();
      await saveProfile({
        drugName,
        customDrugName: drugName === '기타' ? customDrugName.trim() : undefined,
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
          <Text style={styles.title}>GLP-1 리마인더 시작하기</Text>
          <Text style={styles.subtitle}>복용 중인 약물 정보를 알려주세요.</Text>

          <Text style={styles.label}>약물 선택</Text>
          <View style={styles.chipRow}>
            {DRUG_NAMES.map((name) => (
              <TouchableOpacity
                key={name}
                style={[styles.chip, drugName === name && styles.chipSelected]}
                onPress={() => setDrugName(name)}
              >
                <Text style={[styles.chipText, drugName === name && styles.chipTextSelected]}>
                  {name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {drugName === '기타' && (
            <>
              <Text style={styles.label}>약물명 직접 입력</Text>
              <TextInput
                style={styles.input}
                value={customDrugName}
                onChangeText={setCustomDrugName}
                placeholder="예: 삭센다"
              />
            </>
          )}

          <Text style={styles.label}>현재 용량 (mg)</Text>
          <TextInput
            style={styles.input}
            value={doseMg}
            onChangeText={setDoseMg}
            keyboardType="decimal-pad"
            placeholder="0.25"
          />

          <Text style={styles.label}>투여 요일</Text>
          <View style={styles.chipRow}>
            {WEEKDAY_LABELS_KO.map((label, index) => (
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
            <Text style={styles.submitButtonText}>시작하기</Text>
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
