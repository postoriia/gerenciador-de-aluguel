# Habittar - Client

Bem-vindo ao repositório do frontend do projeto **Habittar**. Este projeto utiliza uma stack moderna focada em performance, produtividade e padronização.

## 🚀 Tecnologias Principais

- **React 19** + **Vite**
- **TypeScript**
- **Tailwind CSS v4** (Estilização baseada em utilitários)
- **Shadcn/UI** (Componentes de interface reutilizáveis)
- **TanStack Query (React Query) v5** (Gerenciamento de estado de dados assíncronos)
- **Zustand** (Gerenciamento de estado global leve)
- **Axios** (Cliente HTTP com interceptores configurados)
- **React Router 7** (Roteamento progressivo)

---

## 📂 Organização de Pastas

O projeto adota uma arquitetura baseada em **Features**, o que facilita a escalabilidade e o isolamento de domínios:

```text
src/
  ├── components/       # Componentes globais e UI (Shadcn)
  │   └── ui/           # Primitivos do Shadcn
  ├── features/         # Módulos de negócio (ex: auth, dashboard)
  │   ├── [nome]/       # Ex: auth
  │   │   ├── components/
  │   │   ├── hooks/
  │   │   ├── pages/
  │   │   ├── services/
  │   │   └── types/
  ├── lib/              # Configurações de bibliotecas (axios, query-client)
  ├── routes/           # Definição de rotas e guards
  ├── store/            # Estados globais com Zustand
  ├── styles/           # CSS global
  ├── app.tsx           # Entry point da aplicação
  ├── main.tsx          # Renderização do Virtual DOM
  └── provider.tsx      # Provedores globais
```

---

## 🛠️ Como Contribuir

Para manter a base de código limpa e organizada, seguimos padrões rigorosos.

### 1. Padrões de Código

- **Linting:** Utilizamos ESLint com as regras mais recentes.
- **Formatação:** Prettier está configurado para garantir consistência visual.
- **Automação:** O **Husky** impede que códigos fora do padrão cheguem ao repositório através de hooks de `pre-commit`.

### 2. Mensagens de Commit (Conventional Commits)

Nossas mensagens de commit devem seguir o padrão [Conventional Commits](https://www.conventionalcommits.org/):

`tipo(escopo): descrição curta`

**Tipos comuns:**

- `feat`: Uma nova funcionalidade.
- `fix`: Correção de um bug.
- `docs`: Mudanças na documentação.
- `style`: Mudanças que não afetam o sentido do código (espaço em branco, formatação, etc).
- `refactor`: Mudança de código que não corrige um bug nem adiciona funcionalidade.
- `chore`: Atualização de tarefas de build, pacotes, etc.

**Exemplo:** `feat(auth): implementa integração com login do google`

---

## 🏗️ Fluxo de Desenvolvimento

1. **Instalação:** `npm install`
2. **Desenvolvimento:** `npm run dev`
3. **Novas Features:**
   - Crie uma nova pasta em `features/` para o seu domínio.
   - Centralize serviços de API e hooks relacionados dentro da respectiva feature.
4. **Verificação:** Antes de subir, você pode rodar:
   - `npm run lint`: Verificar erros de código.
   - `npm run type-check`: Validar tipos do TypeScript.
   - `npm run format:fix`: Formatar todos os arquivos (o Husky fará isso nos arquivos alterados automaticamente).

---

## 📜 Scripts Disponíveis

- `npm run dev`: Inicia o servidor local.
- `npm run build`: Compila o projeto para produção.
- `npm run lint`: Valida o código com ESLint.
- `npm run format:fix`: Corrige a formatação com Prettier.
- `npm run type-check`: Executa o compilador TypeScript para validar tipos.
- `npm run preview`: Testa o build de produção localmente.

---

**Habittar Team** - Desenvolvendo com excelência e organização.
