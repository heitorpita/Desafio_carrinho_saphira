🛒 Desafio Carrinho — Instruções para Rodar o Projeto

🚀 Projeto online:
https://desafio-carrinho-saphira.onrender.com/products

📦 Como rodar o projeto localmente
1️⃣ Clonar o repositório
git clone https://github.com/heitorpita/Desafio_carrinho_saphira
cd Desafio_carrinho_saphira

2️⃣ Instalar dependências
npm install

3️⃣ Configurar variáveis de ambiente

Crie um arquivo .env na raiz do projeto com sua string de conexão PostgreSQL:

DATABASE_URL="postgresql://usuario:senha@host:port/database"

🗄️ Configurar o Banco de Dados (Prisma)
Criar as tabelas (migrations)
npx prisma migrate dev --name init

Gerar o client do Prisma
npx prisma generate

(Opcional) Rodar o seed, se configurado
npm run seed

▶️ Rodar o servidor de desenvolvimento
npm run dev


Acesse: http://localhost:3000

🛠️ Tecnologias e Decisões de Arquitetura

Next.js (App Router) – usado pela estrutura moderna de rotas e suporte a Server Components.

Prisma ORM – para comunicação direta com PostgreSQL com tipagem forte.

PostgreSQL – persistência de produtos, carrinho e itens.

Render – utilizado para o deploy.

🎨 Design da Interface

Tailwind CSS – utilizado para todo o estilo da aplicação.

Heroicons (@heroicons/react) – ícones usados no layout.

TailwindFlex (https://tailwindflex.com/

) – site utilizado como referência/modelo para o design da página.

Desenvolvido por: Heitor Pita
