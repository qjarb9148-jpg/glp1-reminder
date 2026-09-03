import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppData } from '../context/AppDataContext';
import { useLanguage } from '../i18n/LanguageContext';
import { SYMPTOMS, Symptom } from '../types';
import { formatDate, toDateKey } from '../utils/dateUtils';

const INTENSITY_LEVELS = [1, 2, 3, 4, 5];
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export default function SideEffectsScreen() {
  const { sideEffectLogs, addSideEffectLog } = useAppData();
  const { t } = useLanguage();
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [intensity, setIntensity] = useState(1);
  const [notes, setNotes] = useState('');

  const toggleSymptom = (symptom: Symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const handleSubmit = async () => {
    if (selectedSymptoms.length === 0) return;
    await addSideEffectLog({
      date: toDateKey(new Date()),
      symptoms: selectedSymptoms,
      intensity,
      notes: notes.trim() || undefined,
    });
    setSelectedSymptoms([]);
    setIntensity(1);
    setNotes('');
  };

  const recentLogs = useMemo(
    () =>
      [...sideEffectLogs]
        .filter((log) => Date.now() - new Date(log.date).getTime() <= THIRTY_DAYS_MS)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [sideEffectLogs]
  );

  const summary = useMemo(() => {
    const counts: Partial<Record<Symptom, number>> = {};
    recentLogs.forEach((log) => {
      log.symptoms.forEach((symptom) => {
        counts[symptom] = (counts[symptom] ?? 0) + 1;
      });
    });
    return counts;
  }, [recentLogs]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <FlatList
        data={recentLogs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>{t.sideEffects.title}</Text>

            <Text style={styles.label}>{t.sideEffects.symptomsLabel}</Text>
            <View style={styles.chipRow}>
              {SYMPTOMS.map((symptom) => (
                <TouchableOpacity
                  key={symptom}
                  style={[styles.chip, selectedSymptoms.includes(symptom) && styles.chipSelected]}
                  onPress={() => toggleSymptom(symptom)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      selectedSymptoms.includes(symptom) && styles.chipTextSelected,
                    ]}
                  >
                    {t.symptoms[symptom]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>{t.sideEffects.intensityLabel}</Text>
            <View style={styles.chipRow}>
              {INTENSITY_LEVELS.map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[styles.levelChip, intensity === level && styles.chipSelected]}
                  onPress={() => setIntensity(level)}
                >
                  <Text style={[styles.chipText, intensity === level && styles.chipTextSelected]}>
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>{t.sideEffects.notesLabel}</Text>
            <TextInput
              style={styles.input}
              value={notes}
              onChangeText={setNotes}
              placeholder={t.sideEffects.notesPlaceholder}
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>{t.sideEffects.addButton}</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>{t.sideEffects.summaryTitle}</Text>
            {Object.keys(summary).length === 0 ? (
              <Text style={styles.emptyText}>{t.sideEffects.summaryEmpty}</Text>
            ) : (
              <View style={styles.summaryRow}>
                {(Object.entries(summary) as [Symptom, number][]).map(([symptom, count]) => (
                  <View key={symptom} style={styles.summaryPill}>
                    <Text style={styles.summaryPillText}>
                      {t.symptoms[symptom]} {t.sideEffects.timesSuffix(count)}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            <Text style={styles.sectionTitle}>{t.sideEffects.listTitle}</Text>
          </View>
        }
        ListEmptyComponent={<Text style={styles.emptyText}>{t.sideEffects.listEmpty}</Text>}
        renderItem={({ item }) => (
          <View style={styles.logRow}>
            <Text style={styles.logDate}>{formatDate(item.date)}</Text>
            <Text style={styles.logSymptoms}>
              {item.symptoms.map((s) => t.symptoms[s]).join(', ')} · {t.sideEffects.intensityPrefix} {item.intensity}
            </Text>
            {item.notes ? <Text style={styles.logNotes}>{item.notes}</Text> : null}
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  listContent: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', marginTop: 16, marginBottom: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginTop: 28, marginBottom: 10 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f7f7f7',
  },
  levelChip: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    marginTop: 20,
    backgroundColor: '#5B6CFF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitButtonText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  emptyText: { color: '#666', marginTop: 4 },
  summaryRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  summaryPill: {
    backgroundColor: '#F5F6FA',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  summaryPillText: { fontSize: 13, fontWeight: '600' },
  logRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logDate: { fontSize: 14, fontWeight: '700' },
  logSymptoms: { fontSize: 13, color: '#444', marginTop: 2 },
  logNotes: { fontSize: 12, color: '#888', marginTop: 2 },
});
