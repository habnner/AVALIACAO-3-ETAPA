import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BookItem from '../components/BookItem';
import EmptyState from '../components/EmptyState';
import { loadBooks, saveBooks } from '../storage/bookStorage';
import { INITIAL_BOOKS } from '../data/initialBooks';
import { confirmDelete } from '../utils/confirm';
import { Book } from '../types/book';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const showMessage = (text: string, error = false) => {
    setMessage(text);
    setIsError(error);
  };

  // A mensagem some sozinha depois de 2,5 segundos
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(''), 2500);
    return () => clearTimeout(timer);
  }, [message]);

  // Carrega os livros salvos ao abrir o app
  useEffect(() => {
    loadBooks()
      .then((saved) => setBooks(saved ?? INITIAL_BOOKS))
      .catch(() => showMessage('Não foi possível carregar os livros salvos.', true))
      .finally(() => setLoaded(true));
  }, []);

  // Salva sempre que a lista mudar (depois do carregamento inicial)
  useEffect(() => {
    if (!loaded) return;
    saveBooks(books).catch(() => showMessage('Não foi possível salvar as alterações.', true));
  }, [books, loaded]);

  const handleSave = (book: Book) => {
    const exists = books.some((b) => b.id === book.id);
    setBooks((prev) =>
      exists ? prev.map((b) => (b.id === book.id ? book : b)) : [book, ...prev]
    );
    showMessage(exists ? 'Livro atualizado com sucesso!' : 'Livro cadastrado com sucesso!');
  };

  const handleToggleRead = (id: string) => {
    setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, isRead: !b.isRead } : b)));
  };

  const handleDelete = (id: string) => {
    const book = books.find((b) => b.id === id);
    confirmDelete(`Excluir "${book?.title ?? 'livro'}"?`, () => {
      setBooks((prev) => prev.filter((b) => b.id !== id));
      showMessage('Livro excluído.');
    });
  };

  return (
    <View style={styles.container}>
      {message ? (
        <View style={[styles.banner, isError ? styles.bannerError : styles.bannerSuccess]}>
          <Text style={styles.bannerText}>{message}</Text>
        </View>
      ) : null}

      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          loaded ? (
            <EmptyState message="Nenhum livro cadastrado ainda." hint='Toque em "+ Novo Livro" para começar.' />
          ) : undefined
        }
        renderItem={({ item }) => (
          <BookItem
            book={item}
            onToggleRead={handleToggleRead}
            onDelete={handleDelete}
            onPress={(book) => navigation.navigate('BookDetail', { book, onSave: handleSave })}
          />
        )}
      />

      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('BookForm', { onSave: handleSave })}
      >
        <Text style={styles.fabText}>+ Novo Livro</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  list: { padding: 16, paddingBottom: 90, flexGrow: 1 },
  banner: { paddingVertical: 10, paddingHorizontal: 16 },
  bannerSuccess: { backgroundColor: '#2c6e49' },
  bannerError: { backgroundColor: '#c0392b' },
  bannerText: { color: '#fff', fontWeight: '600', textAlign: 'center' },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    backgroundColor: '#6200ee',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 28,
    elevation: 4,
  },
  fabText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
