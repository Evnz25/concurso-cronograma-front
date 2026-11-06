# AprovaTech - Mobile App (React Native + Expo)

Aplicativo mobile desenvolvido em React Native com ecossistema Expo e Expo Router, focado na preparação de candidatos para concursos públicos de TI utilizando repetição espaçada (SRS).

## Comandos Principais

- `npx expo start`: Inicia o servidor de desenvolvimento Metro (Expo Go)
- `npx expo start --android`: Executa no emulador ou dispositivo Android
- `npx expo start --ios`: Executa no simulador ou dispositivo iOS
- `npx expo start --web`: Executa a versão web para testes rápidos
- `npm run typecheck` ou `npx tsc --noEmit`: Verificação estática de tipos TypeScript

## Estrutura do Projeto

- `src/app/` - Rotas do Expo Router (navegação em abas e modais)
- `src/components/` - Componentes reutilizáveis (common, home, schedule, questions, stats, profile, modals)
- `src/views/` - Telas / views principais do app
- `src/context/` - Estado global e persistência (AppContext)
- `src/interfaces/` - Modelos de domínio e tipos TypeScript
- `src/services/` - Lógica de negócio e regras (SRS, cronograma, formatação)
- `src/theme/` - Tokens visuais (cores, tipografia, espaçamento, sombras)
- `assets/` - Imagens, ícones e splash screen
