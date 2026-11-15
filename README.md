# EasyLearning

A course management app I'm building to practice and showcase the MERN stack. I need to add more functionallity and use cases but for now you can sign up (email/password or Google), then create, edit and browse courses.

## Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, React Query, React Router, Axios, Tanstack Query
- **Backend:** Node.js 22, Express 5, TypeScript, MongoDB with Mongoose, 
- **Auth:** JWT, bcrypt, Passport (Google OAuth)
- **Testing:** Jest, ts-jest, Supertest
- **Tooling:** ESLint, Prettier, Docker, GitHub Actions, npm workspaces

## How it's structured

It's a monorepo with `frontend/` and `backend/`.

The backend is split into layers: routes → controllers → services → repositories → models. Each layer handles its own part and responsibility.

I use a custom AppError that I handle in one error middleware to get a united look of the errors and remove reudandancy.

On the frontend, components don't call the API directly. They use React Query hooks (`useCourses`, `useCreateCourse` and so on), which go through a shared Axios instance. Its interceptors add the token to every request and send you back to login on a 401. I also use TanStack query that sits between the frontend and the API calls. Tanstack Query makes error, caching and refetching data easier to handle.

## Auth

Email/password login returns a JWT that the frontend sends as a Bearer token. Google login sets the token in an httpOnly cookie instead. The auth middleware accepts either.

A few details I cared about:
- Passwords are hashed with bcrypt and never returned by the API.
- Google sign-in won't silently take over an existing password account with the same email.

## Tests and CI

The tests cover the auth service: registering, duplicate emails, login with right and wrong passwords, and fetching the current user. There's also an HTTP test for the health endpoint using Supertest.

```bash
npm test --workspace=backend
```

GitHub Actions runs ESLint, a Prettier check and a TypeScript build for both the frontend and the backend on every push and PR to `main`.

The API also has a multi-stage Dockerfile. It compiles TypeScript in one stage and ships only the built code and production dependencies.

API docs (Swagger) are at http://localhost:3000/api/docs.

## TO DO

- Run the tests in CI and deploy to Azure
- More app functionallity
- Different roles, like teacher, adminstrator, user
