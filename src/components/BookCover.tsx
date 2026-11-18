import React from 'react';
import { Image, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

interface BookCoverProps {
  uri?: string;
  width: number;
  height: number;
  style?: StyleProp<ViewStyle>;
}

export default function BookCover({ uri, width, height, style }: BookCoverProps) {
  if (uri) {
    return <Image source={{ uri }} style={[{ width, height }, styles.image, style as any]} />;
  }

  return (
    <View style={[{ width, height }, styles.placeholder, style]}>
      <Text style={[styles.placeholderText, { fontSize: width > 100 ? 16 : 10 }]}>Sem capa</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: { borderRadius: 8, resizeMode: 'cover' },
  placeholder: {
    borderRadius: 8,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: { color: '#777' },
});
