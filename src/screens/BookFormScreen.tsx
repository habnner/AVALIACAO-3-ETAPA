import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BookForm from '../components/BookForm';
import { Book } from '../types/book';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'BookForm'>;

export default function BookFormScreen({ route, navigation }: Props) {
  const bookToEdit = route.params?.bookToEdit;
  const onSave = route.params?.onSave;

  const handleSubmit = (book: Book) => {
    onSave?.(book);
    navigation.goBack();
  };

  return <BookForm initialBook={bookToEdit} onSubmit={handleSubmit} />;
}

