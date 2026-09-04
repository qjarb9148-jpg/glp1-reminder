import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ConfirmModal from '../components/ConfirmModal';
import LanguagePicker from '../components/LanguagePicker';
import MessageModal from '../components/MessageModal';
import { useAppData } from '../context/AppDataContext';
import { useLanguage } from '../i18n/LanguageContext';
import { SUPPORTED_LANGUAGES } from '../i18n/languages';
import { formatDate, toDateKey } from '../utils/dateUtils';

export default function SettingsScreen() {
  const { profile, settings, updateSettings, saveProfile, resetAllData } = useAppData();
  const { t, languagePreference } = useLanguage();
  const [hour, setHour] = useState(String(settings.notificationHour));
  const [minute, setMinute] = useState(String(settings.notificationMinute));
  const [escalationDate, setEscalationDate] = useState(toDateKey(new Date()));
  const [escalationDose, setEscalationDose] = useState('');
  const [languagePickerVisible, setLanguagePickerVisible] = useState(false);
  const [savedModalVisible, setSavedModalVisible] = useState(false);
  const [resetConfirmVisible, setResetConfirmVisible] = useState(false);

  const currentLanguageLabel =
    languagePreference === 'system'
      ? t.settings.systemLanguageLabel
      : SUPPORTED_LANGUAGES.find((l) => l.code === languagePreference)?.nativeName ?? languagePreference;

  const handleSaveTime = async () => {
    const h = parseInt(hour, 10);
    const m = parseInt(minute, 10);
    if (Number.isNaN(h) || h < 0 || h > 23) return;
    if (Number.isNaN(m) || m < 0 || m > 59) return;
    await updateSettings({ notificationHour: h, notificationMinute: m });
    setSavedModalVisible(true);
  };

  const handleChangeDay = async (dayOfWeek: number) => {
    if (!profile) return;
    await saveProfile({ ...profile, dayOfWeek });
  };

  const upcomingSchedule = useMemo(
    () =>
      profile
        ? [...profile.doseSchedule].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        : [],
    [profile]
  );

  const handleAddEscalation = async () => {
    if (!profile) return;
    const dose = parseFloat(escalationDose);
    if (Number.isNaN(dose) || dose <= 0) return;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(escalationDate)) return;

    const nextSchedule = [
      ...profile.doseSchedule.filter((entry) => entry.date !== escalationDate),
      { date: escalationDate, doseMg: dose },
    ];
    await saveProfile({ ...profile, doseSchedule: nextSchedule });
    setEscalationDose('');
  };

  const handleConfirmReset = () => {
    setResetConfirmVisible(false);
    resetAllData();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{t.settings.title}</Text>

        <Text style={styles.label}>{t.settings.languageLabel}</Text>
        <TouchableOpacity style={styles.languageRow} onPress={() => setLanguagePickerVisible(true)}>
          <Text style={styles.languageRowText}>{currentLanguageLabel}</Text>
          <Text style={styles.languageRowChevron}>›</Text>
        </TouchableOpacity>

        <Text style={styles.label}>{t.settings.notificationTimeLabel}</Text>
        <View style={styles.timeRow}>
          <TextInput
            style={styles.timeInput}
            value={hour}
            onChangeText={setHour}
            keyboardType="number-pad"
            maxLength={2}
          />
          <Text style={styles.colon}>:</Text>
          <TextInput
            style={styles.timeInput}
            value={minute}
            onChangeText={setMinute}
            keyboardType="number-pad"
            maxLength={2}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveTime}>
            <Text style={styles.saveButtonText}>{t.settings.save}</Text>
          </TouchableOpacity>
        </View>

        {profile && (
          <>
            <Text style={styles.label}>{t.settings.dayLabel}</Text>
            <View style={styles.chipRow}>
              {t.weekdaysShort.map((label, index) => (
                <TouchableOpacity
                  key={label}
                  style={[styles.dayChip, profile.dayOfWeek === index && styles.chipSelected]}
                  onPress={() => handleChangeDay(index)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      profile.dayOfWeek === index && styles.chipTextSelected,
                    ]}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.label}>{t.settings.doseScheduleLabel}</Text>
            {upcomingSchedule.map((entry) => (
              <View key={entry.date} style={styles.scheduleRow}>
                <Text style={styles.scheduleDate}>{formatDate(entry.date)}</Text>
                <Text style={styles.scheduleDose}>{entry.doseMg}mg</Text>
              </View>
            ))}

            <View style={styles.escalationRow}>
              <TextInput
                style={[styles.input, { flex: 1.4 }]}
                value={escalationDate}
                onChangeText={setEscalationDate}
                placeholder={t.settings.escalationDatePlaceholder}
              />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                value={escalationDose}
                onChangeText={setEscalationDose}
                keyboardType="decimal-pad"
                placeholder={t.settings.escalationDosePlaceholder}
              />
              <TouchableOpacity style={styles.saveButton} onPress={handleAddEscalation}>
                <Text style={styles.saveButtonText}>{t.settings.add}</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        <TouchableOpacity style={styles.resetButton} onPress={() => setResetConfirmVisible(true)}>
          <Text style={styles.resetButtonText}>{t.settings.resetButton}</Text>
        </TouchableOpacity>
      </ScrollView>

      <LanguagePicker visible={languagePickerVisible} onClose={() => setLanguagePickerVisible(false)} />
      <MessageModal
        visible={savedModalVisible}
        title={t.settings.savedTitle}
        message={t.settings.savedBody}
        buttonLabel={t.common.ok}
        onClose={() => setSavedModalVisible(false)}
      />
      <ConfirmModal
        visible={resetConfirmVisible}
        title={t.settings.resetTitle}
        message={t.settings.resetBody}
        cancelLabel={t.settings.resetCancel}
        confirmLabel={t.settings.resetConfirm}
        destructive
        onCancel={() => setResetConfirmVisible(false)}
        onConfirm={handleConfirmReset}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 20, paddingBottom: 48 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', marginTop: 16, marginBottom: 8 },
  languageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F6FA',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  languageRowText: { fontSize: 15, color: '#333' },
  languageRowChevron: { fontSize: 18, color: '#999' },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  timeInput: {
    width: 60,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  colon: { fontSize: 18, fontWeight: '700' },
  saveButton: {
    marginLeft: 8,
    backgroundColor: '#5B6CFF',
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  saveButtonText: { color: '#fff', fontWeight: '700' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
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
  scheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  scheduleDate: { fontSize: 14, color: '#333' },
  scheduleDose: { fontSize: 14, fontWeight: '700', color: '#5B6CFF' },
  escalationRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  resetButton: {
    marginTop: 48,
    borderWidth: 1,
    borderColor: '#FF4D4F',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  resetButtonText: { color: '#FF4D4F', fontWeight: '700' },
});
