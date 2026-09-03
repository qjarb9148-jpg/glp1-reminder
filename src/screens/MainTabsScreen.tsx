import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '../i18n/LanguageContext';
import { MainTabKey, RootStackParamList } from '../navigation/types';
import HistoryScreen from './HistoryScreen';
import HomeScreen from './HomeScreen';
import InventoryScreen from './InventoryScreen';
import SettingsScreen from './SettingsScreen';
import SideEffectsScreen from './SideEffectsScreen';

const TAB_ICONS: { key: MainTabKey; icon: string }[] = [
  { key: 'home', icon: '🏠' },
  { key: 'history', icon: '📋' },
  { key: 'sideEffects', icon: '🩺' },
  { key: 'inventory', icon: '💊' },
  { key: 'settings', icon: '⚙️' },
];

export default function MainTabsScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'Main'>>();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<MainTabKey>(route.params?.initialTab ?? 'home');
  const tabs = TAB_ICONS.map((tab) => ({ ...tab, label: t.tabs[tab.key] }));

  useEffect(() => {
    if (route.params?.initialTab) {
      setActiveTab(route.params.initialTab);
    }
  }, [route.params?.initialTab]);

  return (
    <View style={styles.container}>
      <View style={styles.screenArea}>
        {activeTab === 'home' && <HomeScreen />}
        {activeTab === 'history' && <HistoryScreen />}
        {activeTab === 'sideEffects' && <SideEffectsScreen />}
        {activeTab === 'inventory' && <InventoryScreen />}
        {activeTab === 'settings' && <SettingsScreen />}
      </View>

      <SafeAreaView edges={['bottom']} style={styles.tabBarSafeArea}>
        <View style={styles.tabBar}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabButton}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text style={styles.tabIcon}>{tab.icon}</Text>
              <Text style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  screenArea: { flex: 1 },
  tabBarSafeArea: { backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee' },
  tabBar: { flexDirection: 'row' },
  tabButton: { flex: 1, alignItems: 'center', paddingVertical: 10 },
  tabIcon: { fontSize: 18 },
  tabLabel: { fontSize: 11, color: '#999', marginTop: 2 },
  tabLabelActive: { color: '#5B6CFF', fontWeight: '700' },
});
