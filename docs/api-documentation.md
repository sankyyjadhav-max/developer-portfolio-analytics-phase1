# API documentation — Phase 1
Base URL: `http://localhost:5000/api`. JSON responses use `{success,data}` or `{success:false,message}`. Authenticated private endpoints use an HttpOnly JWT cookie.

## Auth
- `POST /auth/register` body `{name,email,password}` — public.
- `POST /auth/login` body `{email,password}` — public.
- `POST /auth/logout` — public, clears cookie.
- `GET /auth/me` — authenticated.
- `POST /auth/forgot-password` body `{email}` — public; development response includes a reset token so the local flow can be demonstrated without an email provider.
- `POST /auth/reset-password` body `{token,password}` — public.

## Portfolio
- `GET /portfolio` — authenticated.
- `POST /portfolio` — authenticated, accepts the full portfolio object.
- `PUT /portfolio` — authenticated, accepts the full portfolio object.
- `POST /portfolio/publish` — authenticated.
- `POST /portfolio/unpublish` — authenticated.
- `GET /portfolio/public/:slug` — public and only returns published portfolios.

## Projects
- `GET /projects` — authenticated.
- `POST /projects` — authenticated; title, description, technologies and featured are required.
- `GET /projects/:id` — authenticated and ownership checked.
- `PUT /projects/:id` — authenticated and ownership checked.
- `DELETE /projects/:id` — authenticated and ownership checked.

Validation is performed with Zod; unauthorized access returns 401, missing resources 404, conflicts 409 and invalid input 400.
