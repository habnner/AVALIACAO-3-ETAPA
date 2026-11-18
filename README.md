# Minha Biblioteca (appBiblioteca)

## Descrição
Aplicativo móvel para organizar a biblioteca pessoal: o usuário cadastra livros com autor, gênero e capa, acompanha o status de leitura (Lido/Pendente) e consulta os detalhes de cada livro. Desenvolvido com React Native, TypeScript e Expo para a Avaliação da 3ª Etapa de Desenvolvimento para Dispositivos Móveis.

## Funcionalidades
- Cadastro de livros (título, autor, gênero e capa) com validação dos campos obrigatórios
- Listagem dos livros com `FlatList` e tratamento de lista vazia
- Tela de detalhes com capa, autor, gênero e status
- Edição dos dados do livro (inclusive a capa)
- Alteração do status de leitura (Lido/Pendente) direto na lista
- Exclusão de livros, com confirmação
- Mensagens de sucesso e de erro na tela
- Navegação entre as telas Home, Cadastro/Edição e Detalhes
- Dados mantidos após fechar e reabrir o aplicativo

## Persistência de dados
`@react-native-async-storage/async-storage`. A lista de livros é salva em formato JSON a cada alteração e carregada ao iniciar o app. A capa é guardada junto com o livro (em base64), por isso não se perde ao reabrir o aplicativo.

## Recurso nativo
**Galeria de imagens** (`expo-image-picker`): o usuário escolhe uma foto da galeria para ser a capa do livro. O app trata a permissão negada e a indisponibilidade do recurso, exibindo uma mensagem de erro.

## Estrutura do projeto
```
App.tsx                      navegação (Stack)
src/
├── components/              BookItem, BookForm, BookCover, EmptyState
├── data/initialBooks.ts     livros exibidos na primeira abertura
├── screens/                 HomeScreen, BookFormScreen, BookDetailScreen
├── storage/bookStorage.ts   leitura e gravação no AsyncStorage
├── types/                   book.ts, navigation.ts
└── utils/confirm.ts         confirmação de exclusão (celular e web)
```

## Instalação e execução
Requisitos: Node.js instalado e o app Expo Go no celular (opcional).

```bash
npm install
npx expo start
```

Depois, escaneie o QR Code com o Expo Go ou pressione `w` para abrir na web. Se houver problemas de cache, use `npx expo start -c`.

## Bibliotecas adicionais
- `@react-navigation/native` e `@react-navigation/native-stack` (navegação)
- `@react-native-async-storage/async-storage` (persistência)
- `expo-image-picker` (galeria de imagens)
- `react-native-screens` e `react-native-safe-area-context` (dependências da navegação)
