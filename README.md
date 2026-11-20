# SkillSwap Campus 🎓

**Learn Together. Teach Together. Grow Together.**

SkillSwap Campus is a peer-to-peer skill-sharing platform designed for the Rishihood University community. It helps students discover what others can teach, share the skills they already have, and build learning connections across academic backgrounds.

Instead of limiting learning to classrooms, SkillSwap Campus encourages students to exchange knowledge and learn from one another.

---

## 🎯 Project Objective

The objective of SkillSwap Campus is to create a common platform where members of the university community can:

- Share skills they can teach.
- Discover skills they want to learn.
- Explore skills offered by other students.
- Send and manage skill-exchange requests.
- Maintain a profile with academic and personal information.
- Build learning relationships across departments.

## ✨ Features Implemented

### Frontend

- Home page introducing the platform and how it works.
- Student registration and login pages.
- Show/hide password functionality on the login form.
- Protected application routes for signed-in users.
- Dashboard with dynamically loaded teaching and learning skill counts.
- Dashboard section displaying the user's saved skills.
- Explore Skills page with student skill listings, search and category filtering.
- My Skills page for adding and removing teaching and learning skills.
- Exchange Requests page with incoming and outgoing request views.
- Accept and reject actions for incoming pending requests.
- Profile page for viewing and updating a user's name, course, year of study and bio.
- Shared vertical sidebar for application navigation, with desktop collapse and mobile toggle controls.
- Light and dark theme support.
- Logout functionality.

### Backend

- Express.js server.
- User registration and login APIs.
- Password hashing using `bcryptjs`.
- JWT access-token generation and authentication middleware.
- Protected Skills API for retrieving, adding and removing a user's skill associations.
- Profile API for retrieving and updating the authenticated user's profile.
- Exchange Requests API for creating, listing, accepting and rejecting requests.
- PostgreSQL database connection using Prisma ORM.
- Server-side checks that derive the authenticated user from the verified JWT for protected operations.

### Authentication and Security

- Passwords are hashed before being stored.
- Email addresses are normalized to lowercase during registration.
- Basic email-format validation and duplicate-email prevention.
- JWT-based authentication for protected backend routes.
- Protected frontend routes check for a stored access token.
- Access token and basic user information are stored in browser `localStorage`.
- Logout clears the stored access token and user information.
- The user's email address is displayed as read-only in the Profile page; other supported profile fields can be edited.

**Security note:** The frontend currently uses `localStorage` for the access token. The backend verifies JWTs on protected endpoints, but a production deployment should include more robust session handling, token expiry/refresh handling, secure transport (HTTPS), and a security review. A token's presence in `localStorage` alone does not prove that it is valid.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React | Frontend user interface |
| Vite | Frontend development server and build tooling |
| JavaScript | Application logic |
| HTML and CSS | Structure, styling and responsive layouts |
| Node.js | Backend runtime |
| Express.js | Backend API |
| PostgreSQL | Relational database |
| Prisma ORM | Database access and schema management |
| `@prisma/adapter-pg` and `pg` | PostgreSQL adapter and driver |
| `bcryptjs` | Password hashing |
| JSON Web Token | Authentication |
| Git and GitHub | Version control |

## 📁 Project Structure

```text
SkillSwap/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── server/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── profile.controller.js
│   │   ├── requests.controller.js
│   │   └── skills.controller.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── profile.routes.js
│   │   ├── requests.routes.js
│   │   └── skills.routes.js
│   ├── db.js
│   └── index.js
├── src/
│   ├── components/
│   │   └── AppNavbar.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ExploreSkills.jsx
│   │   ├── Home.jsx
│   │   ├── MySkills.jsx
│   │   ├── Profile.jsx
│   │   ├── Requests.jsx
│   │   └── Welcome.jsx
│   ├── App.css
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── prisma7.config.ts
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

Install the following before running the project:

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

Create a `.env` file in the project root and add your local configuration:

```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/skillswap_db?schema=public"
JWT_SECRET="your_long_random_secret"
JWT_EXPIRES_IN="1d"
```

Replace the database username and password with your own PostgreSQL credentials. Make sure the database URL points to the database you intend to use.

**Important:** Never commit your `.env` file or expose your database password or JWT secret. The repository's `.gitignore` excludes `.env`.

### 5. Set up the database

Create a PostgreSQL database named `skillswap_db`, then run the Prisma migrations:

```bash
npx prisma migrate dev
```

Generate the Prisma Client:

```bash
npx prisma generate
```

### 6. Start the backend

In one terminal, from the project root, run:

```bash
node server/index.js
```

The backend runs at:

```text
http://localhost:5001
```

### 7. Start the frontend

Open a second terminal in the project directory and run:

```bash
npm run dev
```

The Vite development server normally runs at:

```text
http://localhost:5173
```

Keep both the backend and frontend terminals running while using the application.

## 🔌 API Overview

Protected endpoints require a valid JWT access token in the `Authorization` header:

```text
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### Authentication API

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate a user and issue an access token |
| GET | `/api/auth/protected` | Test authenticated access |

### Skills API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/skills` | Retrieve the authenticated user's skill associations |
| POST | `/api/skills` | Add a teaching or learning skill association |
| DELETE | `/api/skills/:id` | Remove a skill association owned by the authenticated user |

The Skills API supports the types `TEACHING` and `LEARNING`. New skills are assigned to the `General` category when needed.

### Profile API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/profile/me` | Retrieve the authenticated user's profile |
| PUT | `/api/profile/me` | Update supported profile fields for the authenticated user |

The profile update supports the user's name, course, year of study and bio. Email is not editable through this endpoint.

### Exchange Requests API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/requests` | Retrieve the authenticated user's incoming and outgoing requests |
| POST | `/api/requests` | Create a skill-exchange request |
| PATCH | `/api/requests/:id/status` | Update a request's status (accept or reject when permitted) |

Request status updates are restricted by the backend to the intended recipient of a pending request.

## ✅ Verification Performed

- `npm run lint` — passed.
- `npm run build` — passed.
- Registration and login flows — exercised during development.
- Protected backend routes — checked for authentication enforcement.
- Skills creation, retrieval and removal — implemented and exercised during development.
- Exchange request creation and accept/reject flows — exercised during development.
- Profile retrieval and update flow — implemented and exercised through the application.
- User name update — observed across application views after updating the profile.

These checks are development-stage verification, not a claim of a complete automated test suite or production-readiness.

## 🚧 Future Improvements

Potential next steps include:

- College membership verification through an official college email or college ID.
- Email verification and stronger account recovery flows.
- More complete student and professor role-based authorization.
- Notifications for new and updated exchange requests.
- In-app messaging and session scheduling after an exchange request is accepted.
- Enhanced skill matching and recommendation features.
- Feedback and reputation features for completed exchanges.
- Production deployment, monitoring and a broader security review.
- More comprehensive automated and end-to-end testing.

## 👩‍💻 Developer

**Debanshika Das**  
B.Tech – Computer Science and Artificial Intelligence  
Rishihood University

## 🔗 Repository

[GitHub – SkillSwap Campus](https://github.com/DDas12345/SkillSwap.git)

---

*SkillSwap Campus – Building a community where everyone has something to teach and something to learn.*
