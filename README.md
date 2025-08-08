# Hotel System - Backend <img src="https://nestjs.com/img/logo-small.svg" width="32" alt="Nest Logo" style="vertical-align:middle;" />

![Status](https://img.shields.io/badge/Status-Finalizado-green)
![NestJS](https://img.shields.io/badge/NestJS-10.0.0-red?logo=nestjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-20.x-green?logo=node.js)
![Prisma](https://img.shields.io/badge/Prisma-5.10.2-black?logo=prisma)
![JWT](https://img.shields.io/badge/JWT-9.0.0-black?logo=jsonwebtokens)
![bcrypt](https://img.shields.io/badge/bcrypt-5.1.1-yellow)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.3-blue?logo=postgresql)
![ESLint](https://img.shields.io/badge/ESLint-9.0.0-purple?logo=eslint)
![dotenv](https://img.shields.io/badge/dotenv-16.4.5-yellow?logo=dotenv)

## 🏨 Sobre o Projeto

API para gerenciamento de usuários, hotéis e reservas do sistema DncHotel, construída com NestJS, Prisma ORM e JWT.  
Inclui autenticação, proteção de rotas, upload de imagens, testes automatizados e integração com banco de dados relacional.

## 🗂️ Estrutura do Projeto

```
src/
  app.module.ts
  main.ts
  modules/
    users/
      controller/
      service/
      domain/
      dto/
    hotels/
      controller/
      service/
      domain/
      dto/
    reservations/
      controller/
      service/
      domain/
      dto/
    prisma/
      prisma.service.ts
shared/
  decorators/
  guards/
  interceptors/
  middlewares/
  app.module.ts
  main.ts

test/
  hotels.e2e-spec.ts
  jest-e2e.json

uploads/
uploads-hotel/

.env
.gitignore
.prettierrc
eslint.config.mjs
nest-cli.json
package.json
package-lock.json
README.md
tsconfig.build.json
tsconfig.json
```

## 🗄️ Banco de Dados

Utiliza **Prisma ORM** com PostgreSQL (compatível com MySQL/SQLite).

### Exemplo de Modelos (schema.prisma)

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  role      Role
  hotels    Hotel[]  @relation("HotelOwner")
  reservations Reservation[]
}

model Hotel {
  id          Int      @id @default(autoincrement())
  name        String
  description String
  price       Int
  image       String?
  address     String
  ownerId     Int
  owner       User     @relation("HotelOwner", fields: [ownerId], references: [id])
  reservations Reservation[]
}

model Reservation {
  id        Int    @id @default(autoincrement())
  userId    Int
  hotelId   Int
  startDate DateTime
  endDate   DateTime
  user      User   @relation(fields: [userId], references: [id])
  hotel     Hotel  @relation(fields: [hotelId], references: [id])
}

enum Role {
  ADMIN
  USER
}
```

## ✨ Funcionalidades

- Cadastro e autenticação de usuários (JWT)
- CRUD de hotéis (admin)
- Listagem de hotéis (usuário)
- Upload de imagem para hotéis
- CRUD de reservas
- Recuperação e reset de senha
- Proteção de rotas por autenticação e autorização (roles)
- Validação de dados (DTOs)
- Testes automatizados (e2e)

## 🚦 Endpoints Principais

### Usuários

- `POST /auth/register` — Cadastro de usuário
- `POST /auth/login` — Login e geração de JWT
- `POST /auth/forgot-password` — Recuperação de senha
- `POST /auth/reset-password` — Reset de senha via token

### Hotéis

- `POST /hotels` — Criar hotel (admin)
- `GET /hotels` — Listar hotéis (autenticado)
- `GET /hotels/:id` — Detalhes de hotel
- `PATCH /hotels/:id` — Atualizar hotel (admin)
- `PATCH /hotels/image/:id` — Upload de imagem (admin)
- `DELETE /hotels/:id` — Remover hotel (admin)

### Reservas

- `POST /reservations` — Criar reserva
- `GET /reservations` — Listar reservas do usuário
- `DELETE /reservations/:id` — Cancelar reserva

## 🧪 Testes

Os testes e2e estão em `test/hotels.e2e-spec.ts` e cobrem:

- Criação de usuários e hotéis
- Autenticação e geração de tokens
- CRUD de hotéis (POST, GET, PATCH, DELETE)
- Upload de imagem
- Proteção de rotas
- Limpeza do banco antes/depois dos testes

Para rodar os testes:

```bash
npm run test:e2e
```

## 🚀 Como rodar o projeto

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Configure o arquivo `.env` com suas variáveis.
    ```bash
   Exemplo no arquivo .env.exemple
   ```
3. Rode as migrations do Prisma:
   ```bash
   npx prisma migrate dev
   ```
4. Inicie o servidor:
   ```bash
   npm run start:dev
   ```

## 🛠️ Padrão de Código e Ferramentas

- **ESLint**: Padronização e linting do código
- **Prettier**: Formatação automática
- **Jest**: Testes unitários e e2e
- **Dotenv**: Variáveis de ambiente

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch: `git checkout -b minha-feature`
3. Commit suas alterações: `git commit -m 'feat: minha feature'`
4. Push para o fork: `git push origin minha-feature`
5. Abra um Pull Request

## 🧑‍💻 Boas práticas
- Princípios SOLID aplicados.
- Separação de interfaces em models.
- Repositórios e serviços desacoplados.
- Validação de dados e tratamento de erros centralizado.
- Uso de migrations para versionamento do banco.

🔹 Projeto criado para aprendizado e prática! 🚀 Sinta-se à vontade para contribuir ou sugerir melhorias. 😊