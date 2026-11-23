# AprovaTech — front-end conectado à API

Aplicativo React Native/Expo que consome o projeto `../API-BddEstudos/api`. As telas usam o catálogo e o histórico do servidor; os arquivos antigos de `src/services/mocks` não são carregados.

## Executar

Primeiro configure e inicie o back-end seguindo o README de `API-BddEstudos`. Ele precisa de `MONGODB_URI`, `JWT_SECRET` e das dependências instaladas. A API deve responder em `http://localhost:3000/saude`. Os seeds apagam coleções; não são necessários para iniciar os serviços.

Na pasta deste front-end:

```powershell
npm install
```

### Navegador

A API já habilita CORS. Com o back-end rodando, execute nesta pasta:

```powershell
npm run web
```

O navegador acessa a API diretamente em `http://localhost:3000`, sem iniciar `npm run api:proxy`. No `.env` do front-end, use:

```dotenv
EXPO_PUBLIC_API_URL=http://localhost:3000
```

O back-end permite por padrão as origens `http://localhost:8081`, `http://127.0.0.1:8081` e suas variantes na porta 19006. Se o Expo usar outra porta, ou para acessar pelo IP da rede, ajuste `CORS_ORIGINS` no `.env` do **back-end**, com as origens completas separadas por vírgula. Essa lista substitui os valores padrão. Exemplo:

```dotenv
CORS_ORIGINS=http://localhost:8081,http://localhost:8082,http://192.168.1.10:8081
```

Reinicie a API após mudar `CORS_ORIGINS`. Reinicie o Expo após mudar `EXPO_PUBLIC_API_URL` (use `npx expo start --web --clear` para limpar o cache). Em produção, configure a URL HTTPS da API no front-end e a origem HTTPS do site em `CORS_ORIGINS`. O script de proxy continua disponível apenas como alternativa para outras APIs sem CORS.

### Celular / emulador

```powershell
npm start
```

Sem configuração explícita, o app usa o host informado pelo Expo na porta 3000. Para escolher o endereço, copie `.env.example` para `.env` e defina apenas o endereço adequado:

```dotenv
# Celular físico: IP do computador, ambos na mesma rede
EXPO_PUBLIC_API_URL=http://192.168.1.10:3000
```

No Android Emulator, use `http://10.0.2.2:3000`. No simulador iOS com a API no mesmo computador, use `http://localhost:3000`. O celular acessa a API diretamente, sem o proxy web. Reinicie o Expo após mudar `.env`; em caso de cache, use `npx expo start --clear`. `EXPO_PUBLIC_*` é público: não coloque segredos nessas variáveis.

## Fluxos conectados

| Tela / ação                                    | API                                                   |
| ---------------------------------------------- | ----------------------------------------------------- |
| Entrar / criar conta                           | `POST /auth/login`, `POST /auth/cadastro`             |
| Trilhas, matérias e temas                      | `GET /catalogo/trilhas`                               |
| Questões da trilha                             | `GET /catalogo/questoes`, com todas as páginas        |
| Concursos abertos                              | `GET /catalogo/concursos`                             |
| Perfil, cronogramas e respostas                | `GET /sync`, com paginação e deduplicação             |
| Salvar perfil / trocar senha                   | `PATCH /conta`, com `senhaAtual` quando necessário    |
| Excluir conta                                  | `POST /conta/excluir`, com senha e confirmação        |
| Criar ciclo, concluir estudo e salvar resposta | `POST /sync`, conferindo o resultado de cada operação |

- A sessão JWT fica no AsyncStorage; senhas não são persistidas. Um HTTP 401 em uma operação autenticada encerra a sessão. A troca de senha armazena o novo token retornado pela API.
- A trilha ativa é obtida do cronograma ativo. Ao selecionar outra trilha ou iniciar novo ciclo, o app desativa o cronograma anterior e cria um ciclo inicial de sete dias, uma sessão de 60 minutos por dia, alternando as matérias. O histórico é preservado. Esse gerador inicial não implementa ainda redistribuição adaptativa por desempenho.
- A resposta é enviada ao tocar em **Salvar e próxima questão** ou **Salvar e concluir sessão**, depois de avaliar a dificuldade. Acertos usam os intervalos de 1/3/7 dias já oferecidos pela interface; erros voltam em 1 dia. Não é uma implementação completa do SM-2.
- Estatísticas de semana/mês usam apenas tentativas e etapas concluídas recebidas da API. As revisões pendentes consideram a tentativa mais recente de cada questão.
- O calendário exibe as etapas do cronograma ativo na semana atual. Horários não são inventados: a API fornece data, duração e pausa, mas não horário de início.
- Concursos podem pertencer a várias trilhas. Salário/vagas ausentes são apresentados como não informados. Editais com URL podem ser abertos.
- **Atualizar dados** baixa novamente o estado do servidor e reinicia a sessão de questões da tela. Para repetir um salvamento que falhou, use o botão da própria ação antes de atualizar.

## Limites desta integração

Os dados carregados ficam em memória; a sessão é persistida. Ainda não existe banco SQLite, cache persistente de catálogo nem fila offline durável. Salvamentos exigem conexão e só mostram sucesso após confirmação do servidor. IDs de tentativas e de criação de ciclo são reutilizados em novas tentativas de envio enquanto o app permanece aberto.

O `GET /sync` atual pagina apenas por data. Se mais de 500 tentativas compartilharem a mesma data de atualização, o cursor pode parar de avançar. O cliente detecta isso e apresenta erro, sem congelar ou mostrar histórico incompleto como se estivesse completo. Resolver esse caso exige um cursor adicional no back-end.

## Verificação

```powershell
npm run typecheck
npm test
npx expo export --platform web
```

Os testes isolados cobrem conversões, paginação, autenticação HTTP, rejeições do `/sync`, cálculos, calendário e o encaminhamento do proxy. Usam respostas de teste com o contrato do back-end e não acessam o MongoDB.

O teste HTTP com sockets reais é opcional, para ambientes que permitem conexões locais:

```powershell
$env:RUN_HTTP_TESTS = '1'
npm test
Remove-Item Env:RUN_HTTP_TESTS
```

Para conferir com sua base, inicie a API, entre com uma conta existente ou crie uma conta, selecione uma trilha, conclua uma etapa e salve uma resposta. Atualize os dados e confirme que o progresso permanece. Depois confira a troca de perfil e os filtros de concursos. Uma base sem catálogo ou histórico aparece vazia, sem dados demonstrativos substitutos.
