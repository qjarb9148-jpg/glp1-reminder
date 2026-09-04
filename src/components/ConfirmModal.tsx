import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  destructive?: boolean;
}

/**
 * A two-button confirm/cancel dialog. Used instead of Alert.alert, which
 * react-native-web stubs out as a no-op — that would leave a destructive
 * action's confirm button unreachable on web.
 */
export default function ConfirmModal({
  visible,
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  destructive,
}: ConfirmModalProps) {
  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onCancel}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
              <Text style={styles.cancelButtonText}>{cancelLabel}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, destructive ? styles.destructiveButton : styles.confirmButton]}
              onPress={onConfirm}
            >
              <Text style={destructive ? styles.destructiveButtonText : styles.confirmButtonText}>
                {confirmLabel}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
  },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  message: { fontSize: 14, color: '#555', textAlign: 'center', marginBottom: 20 },
  buttonRow: { flexDirection: 'row', gap: 10, width: '100%' },
  button: { flex: 1, borderRadius: 10, paddingVertical: 12, alignItems: 'center' },
  cancelButton: { backgroundColor: '#F5F6FA' },
  cancelButtonText: { color: '#333', fontWeight: '700', fontSize: 15 },
  confirmButton: { backgroundColor: '#5B6CFF' },
  confirmButtonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  destructiveButton: { backgroundColor: '#FF4D4F' },
  destructiveButtonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
