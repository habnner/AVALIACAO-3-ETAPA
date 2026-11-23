import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


interface EmptyStateProps {
  message: string;
  hint?: string;
}

export default function EmptyState({ message, hint }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 24 },
  message: { color: '#555', fontSize: 16, fontWeight: '600' },
  hint: { color: '#888', fontSize: 14, marginTop: 6, textAlign: 'center' },
});
