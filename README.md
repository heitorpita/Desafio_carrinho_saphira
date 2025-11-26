## PROJETO RODANDO EM : https://desafio-carrinho-saphira.onrender.com/products

## 🎯 Objetivo

Construir uma aplicação simples e eficiente que permita aos usuários visualizar uma lista de produtos, adicionar itens ao carrinho, remover itens e visualizar o resumo financeiro (subtotal e total), utilizando uma stack moderna e performática.

## 🚀 Funcionalidades

- **Listagem de Produtos:** Exibição de produtos disponíveis com nome, preço e imagem.
- **Gerenciamento de Carrinho:**
  - Adicionar produtos ao carrinho.
  - Remover produtos do carrinho.
  - Persistência de dados no banco.
- **Resumo do Pedido:** Cálculo automático de quantidade, subtotal e total.
- **API RESTful:** Endpoints dedicados para manipulação de dados.


## 🏗️ Arquitetura e Decisões

1.  **Next.js App Router:** Escolhido para aproveitar a renderização híbrida (Server e Client Components) e o roteamento simplificado baseados em arquivos.
2.  **Prisma ORM:** Utilizado pela facilidade de migração, tipagem segura (type-safety) e produtividade na comunicação com o PostgreSQL.
3.  **Estrutura do Banco de Dados:**
    *   `products`: Armazena o catálogo fixo de itens.
    *   `cart` e `cart_items`: Modelo relacional para separar a "sessão" de compra dos itens individuais, permitindo escalabilidade (ex: múltiplos carrinhos futuros).
4.  **Render:** Escolhido para o deploy por oferecer suporte nativo a PostgreSQL e Node.js com configuração simplificada de variáveis de ambiente.

## 🔧 Instalação e Configuração

1. **Clone o repositório:**

git clone https://github.com/heitorpita/Desafio_carrinho_saphira
cd Desafio_carrinho_saphira

2. **Instale as dependências:**
npm install

3. **Configure as variáveis de ambiente:**
Crie um arquivo `.env` na raiz do projeto (você pode usar `.env.example` como base se existir) e adicione suas credenciais:

## 🔐 Variáveis de Ambiente

O projeto necessita das seguintes variáveis no arquivo `.env`:

## 🗄️ Banco de Dados

Este projeto utiliza o [Prisma ORM](https://www.prisma.io/). Siga os passos para configurar o banco:

1. **Gerar as tabelas (Migrations):**
   Execute o comando para criar as tabelas (`products`, `cart`, `cart_items`) no seu banco de dados configurado.

npx prisma migrate dev --name init

text

2. **Gerar o Client do Prisma:**
Sempre que houver mudanças no schema ou após a instalação:

npx prisma generate

text

3. **Popular o banco (Seed) - *Opcional*:**
Se houver um script de seed configurado no `package.json` ou na pasta `prisma`:

## ⚡ Rodando o Projeto

Para iniciar o servidor de desenvolvimento localmente:

npm run dev


Desenvolvido por Heitor Pita
