import AsyncStorage from '@react-native-async-storage/async-storage';
import { Book } from '../types/book';

const STORAGE_KEY = '@appBiblioteca:books';

// Retorna null quando ainda não existe nada salvo (primeira abertura do app)
export async function loadBooks(): Promise<Book[] | null> {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? (JSON.parse(json) as Book[]) : null;
}

export async function saveBooks(books: Book[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}
