# SkillSwap Campus 🎓

**Learn Together. Teach Together. Grow Together.**

SkillSwap Campus is a peer-to-peer skill-sharing and learning platform designed for the Rishihood University community.

The platform aims to connect students and professors from different academic backgrounds, allowing them to share their knowledge, discover new skills, and learn from one another.

Instead of limiting learning to classrooms, SkillSwap Campus encourages collaborative learning across departments.

---

## 🎯 Project Objective

The main objective of SkillSwap Campus is to create a common platform where members of the university community can:

- Share skills they can teach.
- Discover skills they want to learn.
- Connect with other students and professors.
- Send and manage skill-exchange requests.
- Build meaningful learning relationships across departments.

## ✨ Features Implemented

### Frontend
- Home page and navigation.
- Student registration interface.
- Login interface with show/hide password functionality.
- Dashboard.
- Explore Skills page.
- My Skills page.
- Frontend protected routes.
- Logout functionality.

### Backend
- Express.js server setup.
- User registration API.
- User login API.
- Password hashing using bcrypt.
- JWT access-token generation.
- JWT authentication middleware.
- Protected API endpoint.
- PostgreSQL database connection using Prisma ORM.

### Authentication and Security
- Passwords are hashed before being stored.
- Email addresses are normalized to lowercase.
- Basic email-format validation.
- Duplicate email registration prevention.
- JWT-based authentication.
- Protected backend routes.
- Frontend access restrictions for authenticated sessions.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Vite | Frontend development server |
| JavaScript | Application logic |
| HTML and CSS | Structure and styling |
| Node.js | Backend runtime |
| Express.js | Backend API |
| PostgreSQL | Database |
| Prisma ORM | Database management |
| bcryptjs | Password hashing |
| JSON Web Token | Authentication |
| Git and GitHub | Version control |

## 📁 Project Structure

```text
SkillSwap/
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── server/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── health.controller.js
│   │
│   ├── middleware/
│   │   └── auth.middleware.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── health.routes.js
│   │
│   ├── db.js
│   ├── index.js
│   └── test-db.js
│
├── src/
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ExploreSkills.jsx
│   │   ├── Home.jsx
│   │   └── MySkills.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── prisma7.config.ts
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- PostgreSQL

### 1. Clone the repository

```bash
git clone https://github.com/DDas12345/SkillSwap.git
```

### 2. Navigate to the project directory

```bash
cd SkillSwap
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root directory.

Add the following variables:

```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/skillswap_db?schema=public"

JWT_SECRET="your_long_random_secret"
JWT_EXPIRES_IN="1d"
```

Replace the database username, password and other values with your local configuration.

**Important:** Never commit your `.env` file or expose your JWT secret.

### 5. Set up the database

Create a PostgreSQL database named `skillswap_db`, then run:

```bash
npx prisma migrate dev
```

Generate the Prisma Client:

```bash
npx prisma generate
```

### 6. Start the backend

```bash
node --watch server/index.js
```

The backend runs on:

```text
http://localhost:5001
```

### 7. Start the frontend

Open another terminal in the project directory and run:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## 🔐 Authentication API

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate a user |
| GET | `/api/auth/protected` | Test JWT-protected access |
| GET | `/api/health` | Check backend health |

Protected endpoints require a valid JWT access token in the Authorization header:

```text
Authorization: Bearer YOUR_ACCESS_TOKEN
```

## 🚧 Upcoming Development

The following features are planned or still under development:

- College membership verification through college ID or official college email.
- Email verification.
- Student and professor role-based authorization.
- Dynamic user profiles.
- Add, edit and manage skills.
- Skill discovery and matching.
- Exchange request management.
- Dynamic dashboard statistics.
- Notifications.
- Production deployment and security improvements.

## 📌 Latest Development Update

**Latest pushed commit:** `fd28a3c`

**Commit message:** `Build SkillSwap Campus authentication and backend`

Recent development work includes:

1. Established the PostgreSQL database using Prisma ORM.
2. Created the initial database schema and migration.
3. Implemented user registration and login APIs.
4. Integrated bcrypt password hashing.
5. Implemented JWT token generation and verification.
6. Created authentication middleware for protected backend routes.
7. Connected the frontend login page to the backend.
8. Added protected frontend routes.
9. Implemented logout functionality.
10. Tested successful login, invalid credentials, missing tokens and invalid tokens.

**Current Status:** The core registration and authentication workflow is implemented and tested. Other platform features are being developed progressively.

---

## 👩‍💻 Developer

**Debanshika Das**

B.Tech – Computer Science and Artificial Intelligence

Rishihood University

### Repository

[GitHub – SkillSwap Campus](https://github.com/DDas12345/SkillSwap.git)

---

*SkillSwap Campus – Building a community where everyone has something to teach and something to learn.*