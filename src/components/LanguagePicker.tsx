import React from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLanguage } from '../i18n/LanguageContext';
import { SUPPORTED_LANGUAGES } from '../i18n/languages';

interface LanguagePickerProps {
  visible: boolean;
  onClose: () => void;
}

export default function LanguagePicker({ visible, onClose }: LanguagePickerProps) {
  const { languagePreference, setLanguagePreference, t } = useLanguage();

  const handleSelect = async (preference: typeof languagePreference) => {
    await setLanguagePreference(preference);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.title}>{t.settings.languageLabel}</Text>

          <TouchableOpacity style={styles.row} onPress={() => handleSelect('system')}>
            <Text style={styles.rowText}>{t.settings.systemLanguageLabel}</Text>
            {languagePreference === 'system' && <Text style={styles.check}>✓</Text>}
          </TouchableOpacity>

          {SUPPORTED_LANGUAGES.map((lang) => (
            <TouchableOpacity key={lang.code} style={styles.row} onPress={() => handleSelect(lang.code)}>
              <Text style={styles.rowText}>{lang.nativeName}</Text>
              {languagePreference === lang.code && <Text style={styles.check}>✓</Text>}
            </TouchableOpacity>
          ))}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 36,
  },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  rowText: { fontSize: 16, color: '#333' },
  check: { fontSize: 16, fontWeight: '700', color: '#5B6CFF' },
});
