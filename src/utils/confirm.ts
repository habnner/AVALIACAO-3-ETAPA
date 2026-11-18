import { Alert, Platform } from 'react-native';

// Alert.alert com botões não funciona na web, então usamos window.confirm lá
export function confirmDelete(title: string, onConfirm: () => void) {
  const message = 'Essa ação não pode ser desfeita.';

  if (Platform.OS === 'web') {
    const ok = (globalThis as any).confirm?.(`${title}\n${message}`);
    if (ok) onConfirm();
    return;
  }

  Alert.alert(title, message, [
    { text: 'Cancelar', style: 'cancel' },
    { text: 'Excluir', style: 'destructive', onPress: onConfirm },
  ]);
}
