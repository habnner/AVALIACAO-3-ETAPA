import { Book } from './book';

export type RootStackParamList = {
  Home: undefined;
  BookForm: { bookToEdit?: Book; onSave?: (book: Book) => void } | undefined;
  BookDetail: { book: Book; onSave: (book: Book) => void };
};
