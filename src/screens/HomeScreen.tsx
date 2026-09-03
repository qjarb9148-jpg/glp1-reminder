import React, { useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AdBanner from '../ads/AdBanner';
import { preloadInterstitialAd, showInterstitialAfterDoseLogged } from '../ads/interstitial';
import LanguagePicker from '../components/LanguagePicker';
import { useAppData } from '../context/AppDataContext';
import { useLanguage } from '../i18n/LanguageContext';
import { SUPPORTED_LANGUAGES } from '../i18n/languages';
import { formatDate } from '../utils/dateUtils';
import { recommendNextSite } from '../utils/rotation';
import {
  getCurrentDoseMg,
  getDaysUntilNextDose,
  getNextDoseDate,
  getUpcomingDoseChange,
} from '../utils/schedule';

export default function HomeScreen() {
  const { profile, doseRecords, addDoseRecord, inventory } = useAppData();
  const { t, languagePreference } = useLanguage();
  const [logging, setLogging] = useState(false);
  const [languagePickerVisible, setLanguagePickerVisible] = useState(false);

  const currentLanguageLabel =
    languagePreference === 'system'
      ? t.settings.systemLanguageLabel
      : SUPPORTED_LANGUAGES.find((l) => l.code === languagePreference)?.nativeName ?? languagePreference;

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
    ? profile.drugName === 'other'
      ? profile.customDrugName ?? t.drugNames.other
      : t.drugNames[profile.drugName]
    : '';

  const handleLogDose = async () => {
    setLogging(true);
    try {
      await addDoseRecord(nextSite);
      showInterstitialAfterDoseLogged();
      Alert.alert(t.home.logSuccessTitle, t.home.logSuccessBody);
    } catch (e) {
      Alert.alert(t.home.logErrorTitle, t.home.logErrorBody);
    } finally {
      setLogging(false);
    }
  };

  const languageButton = (
    <TouchableOpacity style={styles.languageButton} onPress={() => setLanguagePickerVisible(true)}>
      <Text style={styles.languageButtonText}>🌐 {currentLanguageLabel}</Text>
    </TouchableOpacity>
  );

  if (!profile) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {languageButton}
          <Text style={styles.emptyText}>{t.home.emptyProfile}</Text>
        </View>
        <LanguagePicker visible={languagePickerVisible} onClose={() => setLanguagePickerVisible(false)} />
      </SafeAreaView>
    );
  }

  const dDayLabel =
    daysUntil === null
      ? ''
      : daysUntil === 0
        ? t.home.ddayLabel
        : daysUntil > 0
          ? t.home.dMinus(daysUntil)
          : t.home.dPlus(Math.abs(daysUntil));

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container}>
        {languageButton}

        <Text style={styles.drugName}>{drugLabel}</Text>
        <Text style={styles.doseText}>{t.home.currentDose(currentDoseMg ?? 0)}</Text>
        {upcomingDoseChange && (
          <Text style={styles.upcomingText}>
            {t.home.upcomingDoseChange(formatDate(upcomingDoseChange.date), upcomingDoseChange.doseMg)}
          </Text>
        )}

        <View style={styles.card}>
          <Text style={styles.cardLabel}>{t.home.untilNextDose}</Text>
          <Text style={styles.dday}>{dDayLabel}</Text>
          {nextDoseDate && (
            <Text style={styles.cardSub}>
              {formatDate(nextDoseDate.toISOString())} ({t.weekdaysLong[nextDoseDate.getDay()]})
            </Text>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>{t.home.recommendedSite}</Text>
          <Text style={styles.siteText}>{t.sites[nextSite]}</Text>
          <Text style={styles.cardSub}>{t.home.rotationHint}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>{t.home.remainingPens}</Text>
          <Text style={styles.siteText}>{t.home.pensUnit(inventory.pensRemaining)}</Text>
        </View>

        <TouchableOpacity style={styles.doseButton} onPress={handleLogDose} disabled={logging}>
          <Text style={styles.doseButtonText}>{t.home.logDose}</Text>
        </TouchableOpacity>
      </ScrollView>

      <AdBanner />
      <LanguagePicker visible={languagePickerVisible} onClose={() => setLanguagePickerVisible(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 20, paddingBottom: 12 },
  languageButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: '#F5F6FA',
    marginBottom: 12,
  },
  languageButtonText: { fontSize: 12, fontWeight: '600', color: '#333' },
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
