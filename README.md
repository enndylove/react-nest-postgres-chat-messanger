# React Nest PostgreSQL Chat Messenger

A real-time chat messenger application built with React, NestJS, and PostgreSQL, featuring WebSocket communication for instant messaging.

## 🚀 Features

- Real-time messaging using WebSocket Gateway
- Message operations:
  - Get messages history
  - Send new messages
  - Update messages
  - Delete messages
  - Clear message history
- PostgreSQL database for persistent storage
- Docker support for easy deployment

## 🛠️ Tech Stack

- **Frontend**: React
- **Backend**: NestJS
- **Database**: PostgreSQL
- **Real-time Communication**: WebSocket
- **Language**: TypeScript
- **Containerization**: Docker

## 📦 Project Structure

```
├── client/          # React frontend application
├── server/          # NestJS backend application
├── prisma/          # Database schema and migrations
├── docker-compose.yml
└── package.json
```

## 📸 Screenshots
### Wellcome page
![](./screenshots/screenshot-1.png)
### Chat page
#### Notification | User `enndy` disconnected 
![](./screenshots/screenshot-2.png)
#### Notification | User `enndy` connected
![](./screenshots/screenshot-3.png)
#### Chat | Message history
![](./screenshots/screenshot-4.png)
#### Chat | Edit message (right chat-screen), user `notEnndy` edit message using the edit button
![](./screenshots/screenshot-5.png)
#### Chat | Deleted message (left chat-screen), user `enndy` deleting each message individually using the delete button
![](./screenshots/screenshot-6.png)
### Database in Prisma Studio ( `npx prisma studio` )
![](./screenshots/screenshot-7.png)
### LocalStorage data (user-info)
![](./screenshots/screenshot-8.png)

### To clear all messages, you can call the `clearMessages()` method in the browser console.
```bash
clearMessages()
```

## 🚦 Getting Started

### Prerequisites

- Node.js
- Docker and Docker Compose
- PostgreSQL

### Installation

1. Clone the repository:
```bash
git clone https://github.com/enndylove/react-nest-postgres-chat-messanger.git
cd react-nest-postgres-chat-messanger
```

2. Install dependencies:
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Start the database using Docker:
```bash
docker-compose up -d
```

4. Start the development servers:
```bash
# Start the backend server
cd server
npm run dev:server

# In a new terminal, start the frontend
cd client
npm run dev:client
```

3. Install dependencies:
```bash
# Install root dependencies

npm install

# Install client dependencies

cd client
npm install

# Install server dependencies

cd ../server
npm install
```

4. Set .env file in the root directory (example in file `.env.example`):
```env
POSTGRES_USER=YOUR_POSTGRES_USERNAME
POSTGRES_PASSWORD=YOUR_POSTGRES_PASSWORD
POSTGRES_DB=YOUR_POSTGRES_DATABASE_NAME

DATABASE_URL="postgresql://{YOUR_POSTGRES_USERNAME}:{YOUR_POSTGRES_PASSWORD}@localhost:5432/{YOUR_POSTGRES_DATABASE_NAME}?schema=public"
```

5. Set up the database:
```bash
# Generate Prisma Client

npx prisma generate

# Run database migrations

npx prisma migrate dev

# (Optional) Seed the database

npx prisma db seed
```

6. Start the database using Docker:
```bash
docker-compose up -d
```
7. Start the development servers:
##### Server link: `http://localhost:3001/`
##### Client link: `http://localhost:5173/`
```bash
npm run dev
```

### Run only backend (server) 
#### Default start follow `http://localhost:3001/`
```bash
npm run dev:server
```

### Run only frontend (client)
#### Default start follow `http://localhost:5173/`
```bash
npm run dev:client
```

## 📝 Database Management

### Prisma Commands

- Generate Prisma Client:
```bash
npx prisma generate
```
- Create a new migration:
```bash
npx prisma migrate dev --name migration_name
```
- Apply migrations:
```bash
npx prisma migrate deploy
```
- Reset database:
```bash
npx prisma migrate reset
```
- View database in Prisma Studio:
```bash
npx prisma studio
```

## 🔌 WebSocket Events

The application supports the following WebSocket events:

- `messages:get` - Retrieve message history
- `messages:clear` - Clear all messages
- `message:post` - Send a new message
- `message:put` - Update an existing message
- `message:delete` - Delete a message

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE file](https://github.com/enndylove/react-nest-postgres-chat-messanger/blob/main/LICENSE) for details.

## 👤 Author

**enndylove**

* GitHub: [@enndylove](https://github.com/enndylove)
* LinkedIn: [Andrii Khomitskyi](https://www.linkedin.com/in/andriy-khomitskyi/)

---
⭐️ Star this repository if you find it helpful!