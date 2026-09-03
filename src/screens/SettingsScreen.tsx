import React, { useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppData } from '../context/AppDataContext';
import { WEEKDAY_LABELS_KO, formatDate, toDateKey } from '../utils/dateUtils';

export default function SettingsScreen() {
  const { profile, settings, updateSettings, saveProfile, resetAllData } = useAppData();
  const [hour, setHour] = useState(String(settings.notificationHour));
  const [minute, setMinute] = useState(String(settings.notificationMinute));
  const [escalationDate, setEscalationDate] = useState(toDateKey(new Date()));
  const [escalationDose, setEscalationDose] = useState('');

  const handleSaveTime = async () => {
    const h = parseInt(hour, 10);
    const m = parseInt(minute, 10);
    if (Number.isNaN(h) || h < 0 || h > 23) return;
    if (Number.isNaN(m) || m < 0 || m > 59) return;
    await updateSettings({ notificationHour: h, notificationMinute: m });
    Alert.alert('저장됨', '알림 시간이 변경되었어요.');
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

  const handleReset = () => {
    Alert.alert('데이터 초기화', '모든 기록이 삭제돼요. 계속할까요?', [
      { text: '취소', style: 'cancel' },
      { text: '초기화', style: 'destructive', onPress: () => resetAllData() },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>설정</Text>

        <Text style={styles.label}>알림 시간</Text>
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
            <Text style={styles.saveButtonText}>저장</Text>
          </TouchableOpacity>
        </View>

        {profile && (
          <>
            <Text style={styles.label}>투여 요일</Text>
            <View style={styles.chipRow}>
              {WEEKDAY_LABELS_KO.map((label, index) => (
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
            <Text style={styles.label}>용량 증량 스케줄</Text>
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
                placeholder="YYYY-MM-DD"
              />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                value={escalationDose}
                onChangeText={setEscalationDose}
                keyboardType="decimal-pad"
                placeholder="mg"
              />
              <TouchableOpacity style={styles.saveButton} onPress={handleAddEscalation}>
                <Text style={styles.saveButtonText}>추가</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>데이터 초기화</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 20, paddingBottom: 48 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', marginTop: 16, marginBottom: 8 },
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
