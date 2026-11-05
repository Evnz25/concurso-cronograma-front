# CONTEXTO DO PROJETO - FRONT-END (AprovaTech)

## Visão Geral
Este é o front-end do projeto "AprovaTech"[cite: 1, 5]. Trata-se de um aplicativo mobile focado na preparação de candidatos para concursos públicos de TI, utilizando a metodologia de Repetição Espaçada (SRS) e Ciclo de Estudos.

## Stack Tecnológica Front-end[cite: 1]
- **Framework Mobile:** React Native (utilizando o ecossistema Expo para agilidade na compilação para Android e iOS) (RNF01)[cite: 1, 4].
- **Linguagem:** JavaScript (com suporte a TypeScript para tipagem estática e segurança)[cite: 1].
- **Integração:** Consumo de API RESTful (via HTTPS com JWT) do back-end em Node.js[cite: 1, 4].

## Regras de Negócio e Requisitos Front-end[cite: 4]
- **Gestão de Conta:** O aplicativo deve conter telas de onboarding para criar conta, editar perfil, consultar dados e excluir a conta com modal de dupla checagem (RF01, RF02, RF03, RF04)[cite: 4].
- **Escolha de Trilhas:** Uma interface deve permitir a seleção de trilhas de estudo: Desenvolvimento, Redes/Infraestrutura, Dados, Segurança e Governança (RF05)[cite: 4].
- **Cronograma Dinâmico (Calendário):** A interface principal deve exibir uma timeline de blocos de estudo diários. **Regra de ouro (RNF02):** A interface deve limitar a exibição e geração de blocos de estudo para não ultrapassar 2 horas consecutivas por matéria e deve exibir pausas programadas[cite: 4].
- **Resolução de Questões e SRS:** O usuário deve resolver blocos de questões separados por temas (RF07) e a interface deve solicitar que ele avalie a dificuldade do exercício após respondê-lo (RF09)[cite: 4].
- **Home e Alertas:** A tela inicial deve exibir alertas de exercícios pendentes (RF10), listar oportunidades de concursos públicos abertos (RF11), e permitir que o usuário inicie um ciclo totalmente novo caso queira (RF08)[cite: 4]. O usuário deve interagir com o cronograma marcando atividades como concluídas (RF12), com indicativos visuais de que atividades não concluídas atrasam o ciclo (RF13)[cite: 4].
- **Dashboard:** Uma tela de estatísticas deve exibir o total de horas estudadas por matéria e o desempenho em questões do mesmo tema (RF14)[cite: 4].
- **Modo Offline Parcial:** O aplicativo deve possuir armazenamento local para salvar resultados de exercícios resolvidos em locais sem internet, sincronizando-os posteriormente com o back-end (RNF04)[cite: 4].