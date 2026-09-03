import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppData } from '../context/AppDataContext';
import { useLanguage } from '../i18n/LanguageContext';
import { formatDate } from '../utils/dateUtils';
import { getRefillInfo } from '../utils/schedule';

export default function InventoryScreen() {
  const { profile, doseRecords, inventory, setPensRemaining } = useAppData();
  const { t } = useLanguage();
  const [input, setInput] = useState(String(inventory.pensRemaining));

  const refillInfo = useMemo(
    () => (profile ? getRefillInfo(profile, doseRecords, inventory.pensRemaining) : null),
    [profile, doseRecords, inventory.pensRemaining]
  );

  const handleSave = async () => {
    const parsed = parseInt(input, 10);
    if (Number.isNaN(parsed) || parsed < 0) return;
    await setPensRemaining(parsed);
  };

  const handleAdjust = async (delta: number) => {
    const next = Math.max(inventory.pensRemaining + delta, 0);
    setInput(String(next));
    await setPensRemaining(next);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <Text style={styles.title}>{t.inventory.title}</Text>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>{t.inventory.remainingLabel}</Text>
          <View style={styles.stepperRow}>
            <TouchableOpacity style={styles.stepperButton} onPress={() => handleAdjust(-1)}>
              <Text style={styles.stepperButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.pensCount}>{inventory.pensRemaining}</Text>
            <TouchableOpacity style={styles.stepperButton} onPress={() => handleAdjust(1)}>
              <Text style={styles.stepperButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.label}>{t.inventory.manualInputLabel}</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            keyboardType="number-pad"
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>{t.inventory.save}</Text>
          </TouchableOpacity>
        </View>

        {refillInfo && (
          <View style={styles.card}>
            <Text style={styles.cardLabel}>{t.inventory.refillTitle}</Text>
            <Text style={styles.refillDate}>{formatDate(refillInfo.refillReminderDate.toISOString())}</Text>
            <Text style={styles.cardSub}>
              {t.inventory.runOutLabel(formatDate(refillInfo.runOutDate.toISOString()))} (
              {refillInfo.daysUntilRunOut >= 0
                ? t.home.dMinus(refillInfo.daysUntilRunOut)
                : t.home.dPlus(Math.abs(refillInfo.daysUntilRunOut))}
              )
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 16 },
  card: {
    backgroundColor: '#F5F6FA',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  cardLabel: { fontSize: 13, color: '#666', marginBottom: 10 },
  cardSub: { fontSize: 12, color: '#888', marginTop: 8 },
  stepperRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 24 },
  stepperButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#5B6CFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperButtonText: { color: '#fff', fontSize: 22, fontWeight: '700' },
  pensCount: { fontSize: 36, fontWeight: '800', minWidth: 60, textAlign: 'center' },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
  inputRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#5B6CFF',
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  saveButtonText: { color: '#fff', fontWeight: '700' },
  refillDate: { fontSize: 24, fontWeight: '800', color: '#5B6CFF' },
});
