# 🛒 Desafio Carrinho — Instruções para Rodar o Projeto

🚀 **Projeto online:**
[https://desafio-carrinho-saphira.onrender.com/products](https://desafio-carrinho-saphira.onrender.com/products)

---

## 📦 Como rodar o projeto localmente

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/heitorpita/Desafio_carrinho_saphira
cd Desafio_carrinho_saphira
```

### 2️⃣ Instalar dependências

```bash
npm install
```

### 3️⃣ Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com a sua conexão PostgreSQL:

```env
DATABASE_URL="postgresql://usuario:senha@host:port/database"
```

---

## 🗄️ Configurar o Banco de Dados (Prisma)

### Criar as tabelas (migrations)

```bash
npx prisma migrate dev --name init
```

### Gerar o client do Prisma

```bash
npx prisma generate
```

### (Opcional) Rodar o seed

```bash
npx prisma db seed
```

---

## ▶️ Rodar o servidor de desenvolvimento

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Tecnologias e Decisões de Arquitetura

* **Next.js (App Router)** – estrutura moderna de rotas e suporte a Server Components.
* **Prisma ORM** – comunicação segura e tipada com PostgreSQL.
* **PostgreSQL** – persistência de produtos, carrinho e itens.
* **Render** – utilizado para deploy simplificado.

---

## 🎨 Design da Interface

* **Tailwind CSS** – utilizado para todo o estilo da aplicação.
* **Heroicons (@heroicons/react)** – ícones usados no layout.
* **TailwindFlex** ([https://tailwindflex.com](https://tailwindflex.com)) – referência/modelo de design da página.

---

**Desenvolvido por:** Heitor Pita
