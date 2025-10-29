# 💰 FinanceApp

![Build
Status](https://github.com/Evandro-bz-Junior/FinanceApp/actions/workflows/ci.yml/badge.svg)
![Tests](https://img.shields.io/badge/tests-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-100%25-success)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

Um aplicativo de controle financeiro pessoal desenvolvido com
**Next.js**, **TypeScript**, **TailwindCSS**, **Cypress**, **Jest** e
**RTL (React Testing Library)**.

------------------------------------------------------------------------

## 🚀 Funcionalidades

-   📥 Cadastro de receitas e despesas
-   📊 Filtros por tipo e categoria
-   💾 Persistência com LocalStorage
-   🔄 Atualização dinâmica do saldo
-   🧮 Cálculo automático de saldo total
-   🧱 Testes completos com Jest, RTL e Cypress
-   ☁️ Deploy contínuo via **Vercel + GitHub Actions**

------------------------------------------------------------------------

## 🧰 Tecnologias Utilizadas

| Categoria             | Ferramenta                        |
|------------------------|-----------------------------------|
| **Framework**          | Next.js (App Router)              |
| **Linguagem**          | TypeScript                        |
| **Estilo**             | TailwindCSS                       |
| **Testes Unitários**   | Jest + React Testing Library      |
| **Testes de Integração** | Cypress                          |
| **CI/CD**              | GitHub Actions + Vercel           |
| **Armazenamento Local**| LocalStorage                      |

------------------------------------------------------------------------

## ⚙️ Instalação

``` bash
# Clone o repositório
git clone https://github.com/Evandro-bz-Junior/FinanceApp.git

# Acesse a pasta
cd FinanceApp

# Instale as dependências
npm install

# Rode o projeto localmente
npm run dev
```

Acesse em: **http://localhost:3000**

------------------------------------------------------------------------

## 🧪 Testes

### ▶️ Testes Unitários e de Integração (Jest + RTL)

``` bash
npm run test
```

### 🌐 Testes End-to-End (Cypress)

``` bash
npm run cypress:run
```

Todos os testes são executados automaticamente no **CI/CD do GitHub
Actions**.

------------------------------------------------------------------------

## 🔄 CI/CD com GitHub Actions

O pipeline executa automaticamente em cada `push` ou `pull request` para
a branch `main`:

1.  Instala dependências
2.  Roda testes unitários (Jest + RTL)
3.  Executa testes end-to-end (Cypress)
4.  Faz o deploy automático na **Vercel** se todos os testes passarem

Arquivo principal do workflow: `.github/workflows/ci.yml`

------------------------------------------------------------------------

## 🧑‍💻 Estrutura do Projeto

    📦 financeapp
    ├── src/
    │   ├── app/               # Páginas (Next.js App Router)
    │   ├── components/        # Componentes reutilizáveis
    │   ├── utils/             # Funções utilitárias e storage
    │   ├── __tests__/         # Testes com Jest + RTL
    │   └── types/             # Tipagens TypeScript
    ├── cypress/               # Testes E2E
    ├── public/                # Assets estáticos
    ├── package.json
    └── README.md

------------------------------------------------------------------------

## 💻 Scripts Principais

  |Script                  |Descrição|
  |----------------------- |-----------------------------
 |`npm run dev`           |Executa o servidor local |
 | `npm run build`         |Cria o build de produção  |
 | `npm run test`          |Executa os testes unitários |
 | `npm run cypress:run`  | Roda testes E2E do Cypress  |

------------------------------------------------------------------------

## 📦 Deploy

O deploy é feito automaticamente via **Vercel**, conectado ao GitHub.\
Cada commit em `main` dispara o workflow e atualiza o app online.

------------------------------------------------------------------------

## 🧑‍🎓 Autor

**Evandro B. Junior**\
📧 <evandro.bz.junior@gmail.com>\
🌐 [GitHub - Evandro-bz-Junior](https://github.com/Evandro-bz-Junior)

------------------------------------------------------------------------

## 🪪 Licença

Este projeto está sob a licença **MIT**.\
Sinta-se livre para usar, modificar e distribuir.

 
