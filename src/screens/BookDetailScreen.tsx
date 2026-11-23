import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BookCover from '../components/BookCover';
import { Book } from '../types/book';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'BookDetail'>;

export default function BookDetailScreen({ route, navigation }: Props) {
  const [book, setBook] = useState<Book>(route.params.book);
  const onSave = route.params.onSave;

  const handleEdit = () => {
    navigation.navigate('BookForm', {
      bookToEdit: book,
      onSave: (updated: Book) => {
        setBook(updated); 
        onSave(updated); 
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BookCover uri={book.coverImage} width={180} height={250} style={styles.cover} />

      <Text style={styles.title}>{book.title}</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Autor</Text>
        <Text style={styles.value}>{book.author}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Gênero</Text>
        <Text style={styles.value}>{book.genre}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Status</Text>
        <View style={[styles.badge, book.isRead ? styles.read : styles.pending]}>
          <Text style={styles.badgeText}>{book.isRead ? 'Lido' : 'Pendente'}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={handleEdit} activeOpacity={0.8}>
        <Text style={styles.editButtonText}>Editar livro</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center', backgroundColor: '#f2f2f2', flexGrow: 1 },
  cover: { marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1a1a1a', textAlign: 'center', marginBottom: 20 },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    marginBottom: 8,
  },
  label: { fontSize: 14, color: '#888', fontWeight: '600' },
  value: { fontSize: 16, color: '#1a1a1a', flexShrink: 1, textAlign: 'right', marginLeft: 12 },
  badge: { borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4 },
  read: { backgroundColor: '#2c6e49' },
  pending: { backgroundColor: '#b7791f' },
  badgeText: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
  editButton: {
    width: '100%',
    backgroundColor: '#6200ee',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  editButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
