import React, { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppData } from '../context/AppDataContext';
import { useLanguage } from '../i18n/LanguageContext';
import { DoseRecord } from '../types';
import { formatDateTime } from '../utils/dateUtils';

export default function HistoryScreen() {
  const { doseRecords } = useAppData();
  const { t } = useLanguage();

  const sorted = useMemo<DoseRecord[]>(
    () => [...doseRecords].sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()),
    [doseRecords]
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <Text style={styles.title}>{t.history.title}</Text>
      <FlatList
        data={sorted}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>{t.history.empty}</Text>}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View>
              <Text style={styles.rowDate}>{formatDateTime(item.dateTime)}</Text>
              <Text style={styles.rowSub}>{t.sites[item.site]}</Text>
            </View>
            <Text style={styles.rowDose}>{item.doseMg}mg</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '700', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  listContent: { paddingHorizontal: 20, paddingBottom: 24 },
  emptyText: { textAlign: 'center', marginTop: 40, color: '#666' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  rowDate: { fontSize: 15, fontWeight: '600' },
  rowSub: { fontSize: 13, color: '#666', marginTop: 2 },
  rowDose: { fontSize: 15, fontWeight: '700', color: '#5B6CFF' },
});
