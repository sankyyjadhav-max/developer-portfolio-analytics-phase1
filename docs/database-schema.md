# Database schema — Phase 1

**User** stores identity and password-reset metadata. One user has one portfolio.

**Portfolio** stores profile, about, skills, experience, education, social links, selected template, accent, dark-mode preference, publication state and unique slug.

**Project** belongs to a portfolio and stores title, description, image, technologies, external links and featured state.

Relations: `User 1 — 1 Portfolio`; `Portfolio 1 — N Project`. Cascade deletion removes portfolio projects. Indexes support email lookup, user ownership, and published slug lookup. No analytics/visitor tables are included in Phase 1.
