# Habittar - Server

Bem-vindo ao repositório do backend do projeto **Habittar**. Esta API foi desenvolvida seguindo princípios de Clean Architecture e Modular Design, focada em alta performance, tipagem forte e escalabilidade.

## 🚀 Tecnologias Principais

- **Fastify v5** (Framework web focado em performance e baixo overhead)
- **TypeScript**
- **Drizzle ORM** (TypeScript ORM leve e performático)
- **PostgreSQL** (Banco de dados relacional)
- **Zod** (Validação de schemas e inferência de tipos)
- **Fastify Type Provider Zod** (Integração nativa para rotas tipo-seguras)
- **Scalar** (Documentação de API interativa)
- **Jest** (Framework de testes unitários e integração)

---

## 📂 Organização de Pastas

O projeto adota uma arquitetura **Modular**, onde cada domínio de negócio é isolado em um módulo próprio:

```text
src/
  ├── config/           # Configurações de ambiente e variáveis globais
  ├── core/             # Lógica central (erros globais, plugins, middlewares)
  ├── database/         # Configuração do banco, conexão e schemas do Drizzle
  ├── modules/          # Módulos de negócio (Feature-based)
  │   └── [nome]/       # Ex: example
  │       ├── controller.ts # Orquestração da requisição
  │       ├── repository.ts # Acesso direto ao banco de dados
  │       ├── routes.ts     # Definição dos endpoints e contratos
  │       ├── schema.ts     # Schemas de validação Zod
  │       ├── service.ts    # Lógica de negócio e regras
  │       └── types.ts      # Definições de tipos TypeScript
  ├── shared/           # Utilitários, helpers e tipos globais
  ├── tests/            # Testes de integração e unitários
  ├── app.ts            # Configuração da instância do Fastify e plugins
  └── server.ts         # Entry point do servidor (estabilização do socket)
```

---

## 🛠️ Como Contribuir

Para manter a base de código limpa e organizada, seguimos padrões rigorosos de desenvolvimento.

### 1. Padrões de Código

- **Linting:** ESLint com regras modernas para TypeScript.
- **Formatação:** Prettier para consistência de estilo.
- **Segurança:** **Husky** e **lint-staged** garantem que apenas código válido e formatado seja commitado.

### 2. Mensagens de Commit (Conventional Commits)

Nossas mensagens de commit devem seguir o padrão [Conventional Commits](https://www.conventionalcommits.org/):

`tipo(escopo): descrição curta`

**Tipos comuns:**

- `feat`: Uma nova funcionalidade.
- `fix`: Correção de um bug.
- `docs`: Mudanças na documentação.
- `style`: Mudanças que não afetam o sentido do código.
- `refactor`: Mudança de código que não corrige bug nem adiciona funcionalidade.
- `test`: Adição ou correção de testes.
- `chore`: Atualização de dependências ou tarefas de build.

**Exemplo:** `feat(auth): implementa validação de token JWT`

---

## 🏗️ Fluxo de Desenvolvimento

1. **Instalação:** `npm install`
2. **Ambiente:** Configure o arquivo `.env` baseado no `.env.example`.
3. **Banco de Dados:**
   - `npm run db:generate`: Gera as migrações baseadas nos schemas.
   - `npm run db:migrate`: Aplica as migrações ao banco de dados.
   - `npm run db:studio`: Abre uma interface visual para explorar os dados.
4. **Novas Features:**
   - Crie uma nova pasta em `modules/` para o novo domínio.
   - Registre as novas rotas no `app.ts`.

---

## 📜 Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo de desenvolvimento com `tsx`.
- `npm run build`: Compila o projeto para JavaScript puro em `dist/`.
- `npm run start`: Inicia o servidor em produção (após o build).
- `npm run lint`: Verifica erros de linting.
- `npm run format`: Formata os arquivos com Prettier.
- `npm run test`: Executa todos os testes com Jest.
- `npm run db:generate`: Cria arquivos de migração (Drizzle).
- `npm run db:push`: Empurra as alterações diretamente para o banco (ideal para dev).

---

**Habittar Team** - Backend robusto para uma experiência excepcional.
