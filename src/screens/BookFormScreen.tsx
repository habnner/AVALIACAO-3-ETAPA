import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  Image, 
  ScrollView, 
  Alert 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Book } from '../types/book';

export default function BookFormScreen({ route, navigation }: { route?: any; navigation: any }) {
  const bookToEdit = route?.params?.bookToEdit;
  const onSave = route?.params?.onSave;

  const [title, setTitle] = useState(bookToEdit ? bookToEdit.title : '');
  const [author, setAuthor] = useState(bookToEdit ? bookToEdit.author : '');
  const [genre, setGenre] = useState(bookToEdit ? bookToEdit.genre : '');
  const [coverImage, setCoverImage] = useState<string | undefined>(bookToEdit ? bookToEdit.coverImage : undefined);

  // Função para selecionar imagem da galeria (Recurso Nativo)
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permissionResult.granted) {
      Alert.alert("Permissão negada", "Precisamos de permissão para acessar sua galeria de fotos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setCoverImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!title.trim() || !author.trim() || !genre.trim()) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios (Título, Autor e Gênero).");
      return;
    }

    const bookData: Book = {
      id: bookToEdit ? bookToEdit.id : Date.now().toString(),
      title,
      author,
      genre,
      coverImage,
    };

    if (onSave) {
      onSave(bookData);
    }
    
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>
        {bookToEdit ? "Editar Livro" : "Cadastrar Novo Livro"}
      </Text>

      <Text style={styles.label}>Título do Livro *</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o título"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Autor *</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o autor"
        value={author}
        onChangeText={setAuthor}
      />

      <Text style={styles.label}>Gênero *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Ficção, Romance, Técnico"
        value={genre}
        onChangeText={setGenre}
      />

      <Text style={styles.label}>Capa do Livro (Recurso Nativo)</Text>
      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>Selecionar Capa da Galeria</Text>
      </TouchableOpacity>

      {coverImage && (
        <Image source={{ uri: coverImage }} style={styles.previewImage} />
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar Livro</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 6,
  },
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
  imageButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  previewImage: {
    width: 100,
    height: 140,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 16,
    resizeMode: 'cover',
  },
  saveButton: {
    backgroundColor: '#03dac6',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});