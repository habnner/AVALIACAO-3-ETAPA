import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import BookCover from './BookCover';
import { Book } from '../types/book';

interface BookFormProps {
  initialBook?: Book; // quando informado, o formulário está em modo de edição
  onSubmit: (book: Book) => void;
}

export default function BookForm({ initialBook, onSubmit }: BookFormProps) {
  const [title, setTitle] = useState(initialBook?.title ?? '');
  const [author, setAuthor] = useState(initialBook?.author ?? '');
  const [genre, setGenre] = useState(initialBook?.genre ?? '');
  const [coverImage, setCoverImage] = useState<string | undefined>(initialBook?.coverImage);
  const [error, setError] = useState('');

  // Recurso nativo: galeria de imagens
  const pickImage = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        setError('Permissão negada: libere o acesso à galeria nas configurações para escolher uma capa.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.4,
        base64: true, // a imagem é salva junto com o livro, então não some ao fechar o app
      });

      if (!result.canceled && result.assets.length > 0) {
        const asset = result.assets[0];
        setCoverImage(
          asset.base64
            ? `data:${asset.mimeType ?? 'image/jpeg'};base64,${asset.base64}`
            : asset.uri
        );
        setError('');
      }
    } catch {
      setError('Não foi possível acessar a galeria neste dispositivo.');
    }
  };

  const handleSave = () => {
    if (!title.trim() || !author.trim() || !genre.trim()) {
      setError('Preencha todos os campos obrigatórios: título, autor e gênero.');
      return;
    }

    onSubmit({
      id: initialBook?.id ?? Date.now().toString(),
      title: title.trim(),
      author: author.trim(),
      genre: genre.trim(),
      isRead: initialBook?.isRead ?? false,
      coverImage,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.headerTitle}>{initialBook ? 'Editar Livro' : 'Cadastrar Novo Livro'}</Text>

      <Text style={styles.label}>Título do Livro *</Text>
      <TextInput style={styles.input} placeholder="Digite o título" value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Autor *</Text>
      <TextInput style={styles.input} placeholder="Digite o autor" value={author} onChangeText={setAuthor} />

      <Text style={styles.label}>Gênero *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Ficção, Romance, Técnico"
        value={genre}
        onChangeText={setGenre}
      />

      <Text style={styles.label}>Capa do Livro</Text>
      <TouchableOpacity style={styles.imageButton} onPress={pickImage} activeOpacity={0.8}>
        <Text style={styles.imageButtonText}>
          {coverImage ? 'Trocar capa da galeria' : 'Selecionar capa da galeria'}
        </Text>
      </TouchableOpacity>

      {coverImage ? (
        <BookCover uri={coverImage} width={100} height={140} style={styles.preview} />
      ) : null}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.8}>
        <Text style={styles.saveButtonText}>{initialBook ? 'Salvar alterações' : 'Salvar Livro'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  label: { fontSize: 14, fontWeight: '600', color: '#444', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  imageButton: {
    backgroundColor: '#6200ee',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  imageButtonText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  preview: { alignSelf: 'center', marginBottom: 16 },
  error: {
    color: '#c0392b',
    backgroundColor: '#fdecea',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: '#03dac6',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 4,
  },
  saveButtonText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
});
