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
- Skills API controllers for retrieving, adding and removing a student's skill associations.
- Protected Skills API routes using JWT authentication middleware.
- PostgreSQL database connection using Prisma ORM.

**Implementation note:** The Skills API controllers and routes are implemented. GET and POST have been tested successfully; DELETE still requires an end-to-end test. The My Skills frontend is not yet connected to these APIs.

### Authentication and Security
- Passwords are hashed before being stored.
- Email addresses are normalized to lowercase.
- Basic email-format validation.
- Duplicate email registration prevention.
- JWT-based authentication.
- Protected backend routes verify the supplied JWT.
- Frontend protected routes currently check for a stored access token.
- The access token and basic user information are stored in browser localStorage; the session remains present across page refreshes.
- Logout clears the stored access token and user information.

**Security follow-up:** Frontend startup/session handling still needs server-side token validation and expired-token handling. A token's presence in localStorage alone does not prove that it is valid.

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
│   │   ├── health.controller.js
│   │   └── skills.controller.js
│   │
│   ├── middleware/
│   │   └── auth.middleware.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── health.routes.js
│   │   └── skills.routes.js
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

### Skills API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/skills` | Retrieve the logged-in student's teaching and learning skills |
| POST | `/api/skills` | Add a skill association for the logged-in student |
| DELETE | `/api/skills/:id` | Remove a skill association owned by the logged-in student |

All Skills endpoints require JWT authentication. The POST endpoint accepts a JSON body with a skill name and a type of `TEACHING` or `LEARNING`. New skills are currently assigned to the `General` category when needed.

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

**Updated:** 12 November 2026  
**Latest pushed commit:** `775c1b8`  
**Commit message:** `Add skill management APIs and improve navigation`

### Work completed in this update

1. Updated the ESLint flat configuration so backend files use Node.js globals; removed an unused catch parameter in the authentication middleware.
2. Added conditional homepage navigation:
   - Logged-out visitors see **Log In** and **Sign Up**.
   - Logged-in visitors see **Dashboard** and **My Skills**.
3. Updated logout navigation so logging out clears the stored token and user information, then returns the user to the homepage.
4. Created `server/controllers/skills.controller.js` with:
   - `getMySkills` — retrieves the logged-in student's skill associations, including skill and category details.
   - `addSkill` — validates the skill name and type, finds or creates the `General` category and skill, and creates the user's association inside a Prisma transaction.
   - `deleteSkill` — removes a skill association only when it belongs to the logged-in student.
5. Created `server/routes/skills.routes.js` and registered the protected routes under `/api/skills`.
6. Kept the student's identity server-derived from the verified JWT rather than accepting a user ID from the request body.

### Verification performed

- `npm run lint` — passed.
- `npm run build` — passed.
- Prisma PostgreSQL connection test — passed against `skillswap_db`.
- Backend health endpoint — returned a successful response.
- Registration duplicate-email handling — verified; an existing email was rejected rather than creating a duplicate account.
- Login and dashboard navigation — verified using an existing account.
- JWT-protected API — verified successfully.
- Session behaviour — the stored login remained present after refreshing the dashboard and homepage; logging out cleared the local session and returned the user to the homepage.
- Skills API GET — returned the logged-in student's skill associations.
- Skills API POST — successfully saved a `Python` skill with type `TEACHING` under the `General` category.
- Duplicate Skills API POST — returned HTTP `409 Conflict`, preventing a duplicate association.

**Not yet completed:** The DELETE Skills API has been implemented but still needs end-to-end testing. The `MySkills.jsx` page currently uses frontend component state and has not yet been connected to the GET, POST and DELETE APIs. Frontend session restoration also needs proper token validation and expired-token handling; checking only whether a token exists is not sufficient.

### Current development focus

- Connect the My Skills page to the protected Skills APIs so additions and removals persist in PostgreSQL and remain visible after refresh.
- Test the DELETE endpoint.
- Build dynamic skill discovery and matching.
- Implement exchange-request workflows and dynamic student profiles.
- Complete dashboard statistics, end-to-end testing and evaluation preparation.

**Current Status:** Registration, login and the initial authentication foundation are implemented and tested. The Skills backend endpoints are in place, with GET and POST verified. Frontend integration and remaining application workflows are in progress.

---

## 👩‍💻 Developer

**Debanshika Das**

B.Tech – Computer Science and Artificial Intelligence

Rishihood University

### Repository

[GitHub – SkillSwap Campus](https://github.com/DDas12345/SkillSwap.git)

---

*SkillSwap Campus – Building a community where everyone has something to teach and something to learn.*