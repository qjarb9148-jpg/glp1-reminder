import React, { useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AdBanner from '../ads/AdBanner';
import { preloadInterstitialAd, showInterstitialAfterDoseLogged } from '../ads/interstitial';
import { useAppData } from '../context/AppDataContext';
import { WEEKDAY_LABELS_KO, formatDate } from '../utils/dateUtils';
import { recommendNextSite } from '../utils/rotation';
import {
  getCurrentDoseMg,
  getDaysUntilNextDose,
  getNextDoseDate,
  getUpcomingDoseChange,
} from '../utils/schedule';

export default function HomeScreen() {
  const { profile, doseRecords, addDoseRecord, inventory } = useAppData();
  const [logging, setLogging] = useState(false);

  React.useEffect(() => {
    preloadInterstitialAd();
  }, []);

  const nextSite = useMemo(() => recommendNextSite(doseRecords), [doseRecords]);

  const nextDoseDate = useMemo(
    () => (profile ? getNextDoseDate(profile, doseRecords) : null),
    [profile, doseRecords]
  );

  const daysUntil = useMemo(
    () => (nextDoseDate ? getDaysUntilNextDose(nextDoseDate) : null),
    [nextDoseDate]
  );

  const currentDoseMg = useMemo(() => (profile ? getCurrentDoseMg(profile) : null), [profile]);

  const upcomingDoseChange = useMemo(
    () => (profile ? getUpcomingDoseChange(profile) : null),
    [profile]
  );

  const drugLabel = profile
    ? profile.drugName === '기타'
      ? profile.customDrugName ?? '기타'
      : profile.drugName
    : '';

  const handleLogDose = async () => {
    setLogging(true);
    try {
      await addDoseRecord(nextSite);
      showInterstitialAfterDoseLogged();
      Alert.alert('완료', '투여 기록이 저장되었어요.');
    } catch (e) {
      Alert.alert('오류', '투여 기록 저장에 실패했어요.');
    } finally {
      setLogging(false);
    }
  };

  if (!profile) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.emptyText}>약물 정보를 먼저 설정해주세요.</Text>
      </SafeAreaView>
    );
  }

  const dDayLabel =
    daysUntil === null ? '' : daysUntil === 0 ? 'D-day' : daysUntil > 0 ? `D-${daysUntil}` : `D+${Math.abs(daysUntil)}`;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.drugName}>{drugLabel}</Text>
        <Text style={styles.doseText}>현재 용량 {currentDoseMg}mg</Text>
        {upcomingDoseChange && (
          <Text style={styles.upcomingText}>
            {formatDate(upcomingDoseChange.date)}부터 {upcomingDoseChange.doseMg}mg으로 증량 예정
          </Text>
        )}

        <View style={styles.card}>
          <Text style={styles.cardLabel}>다음 투여까지</Text>
          <Text style={styles.dday}>{dDayLabel}</Text>
          {nextDoseDate && (
            <Text style={styles.cardSub}>
              {formatDate(nextDoseDate.toISOString())} ({WEEKDAY_LABELS_KO[nextDoseDate.getDay()]}요일)
            </Text>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>추천 투여 부위</Text>
          <Text style={styles.siteText}>{nextSite}</Text>
          <Text style={styles.cardSub}>같은 부위 연속 사용을 피해 자동으로 추천돼요.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>남은 펜</Text>
          <Text style={styles.siteText}>{inventory.pensRemaining}개</Text>
        </View>

        <TouchableOpacity style={styles.doseButton} onPress={handleLogDose} disabled={logging}>
          <Text style={styles.doseButtonText}>투여 완료</Text>
        </TouchableOpacity>
      </ScrollView>

      <AdBanner />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 20, paddingBottom: 12 },
  emptyText: { textAlign: 'center', marginTop: 40, color: '#666' },
  drugName: { fontSize: 22, fontWeight: '700' },
  doseText: { fontSize: 14, color: '#666', marginTop: 4, marginBottom: 4 },
  upcomingText: { fontSize: 12, color: '#5B6CFF', marginBottom: 20 },
  card: {
    backgroundColor: '#F5F6FA',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  cardLabel: { fontSize: 13, color: '#666', marginBottom: 6 },
  cardSub: { fontSize: 12, color: '#888', marginTop: 6 },
  dday: { fontSize: 32, fontWeight: '800', color: '#5B6CFF' },
  siteText: { fontSize: 24, fontWeight: '700' },
  doseButton: {
    backgroundColor: '#5B6CFF',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 8,
  },
  doseButtonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
