# Habittar - Gerenciador de Aluguel

O **Habittar** é uma plataforma completa e moderna desenvolvida para simplificar a gestão de aluguéis. Através de uma interface intuitiva e processos automatizados, permitimos que proprietários e administradores controlem pagamentos, contratos e imóveis em um só lugar, sem burocracia.

## 🏠 Sobre o Projeto

O objetivo principal do Habittar é transformar a experiência de gerenciar imóveis, focando em:
- **Praticidade:** Interface fluida e moderna.
- **Controle Total:** Visão clara de pagamentos pendentes, contratos ativos e disponibilidade de imóveis.
- **Rapidez:** Automação de tarefas rotineiras para economizar seu tempo.

---

## 🏗️ Estrutura do Projeto

O projeto é dividido em dois grandes pilares (Monorepo):

- **[Client (Frontend)](./client/README.md):** Aplicação web desenvolvida com **React 19**, **Vite** e **Tailwind CSS**, focada em performance e experiência do usuário.
- **[Server (Backend)](./server/README.md):** API robusta construída com **Fastify v5**, **Drizzle ORM** e **PostgreSQL**, garantindo segurança e escalabilidade.

---

## 🛠️ Tecnologias de Elite

### Frontend
- **Framework:** React 19 + TypeScript
- **Estilização:** Tailwind CSS v4 + Shadcn/UI
- **Estado:** TanStack Query (React Query) & Zustand

### Backend
- **Framework:** Fastify v5 (Performance Turbo)
- **Banco de Dados:** PostgreSQL via Drizzle ORM
- **Validação:** Zod (Tipagem de ponta a ponta)

---

## 🚀 Como Começar

### Pré-requisitos
- Node.js (v20 ou superior)
- PostgreSQL

### Configuração Inicial

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/habittar.git
   cd habittar
   ```

2. **Configuração do Backend:**
   Acesse a pasta `server`, instale as dependências e configure o `.env`:
   ```bash
   cd server
   npm install
   # Siga as instruções no README do server para configurar o banco
   ```

3. **Configuração do Frontend:**
   Acesse a pasta `client`, instale as dependências:
   ```bash
   cd client
   npm install
   npm run dev
   ```

---

## 📜 Padronização

Seguimos padrões rigorosos para garantir a qualidade do software:
- **Conventional Commits:** Todas as mensagens de commit seguem um padrão semântico.
- **Linting & Formatting:** ESLint e Prettier integrados.
- **Git Hooks:** Husky para evitar código irregular no repositório.

---

**Habittar Team** - Gerenciando espaços, conectando pessoas.
