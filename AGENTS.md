<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This project targets Next.js 16. APIs, conventions, routing behavior, and build defaults may differ from older Next.js versions. Before writing application code, install dependencies with `npm ci` and read the relevant guide in `node_modules/next/dist/docs/`. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# DukeCrea Project Protocol

## Git Flow

- `main` is production. Do not commit directly to `main`.
- `antonio` and `noe` are working branches for changes, updates, experiments, and feature work.
- `principal` is the integration and QA branch.
- Merge flow: `antonio` or `noe` -> `principal` -> `main`.
- Before merging into `principal`, push the working branch and verify the diff is focused.
- Before merging `principal` into `main`, verify that there are no conflicts, the UI works, and all required checks pass.

## Required Checks

- Use `npm ci` for reproducible installs.
- Run `npm run lint` before approving changes.
- Run `npm run build` before merging into `principal` or `main`.
- Run `npm audit --audit-level=high` and review any high or critical dependency issues.
- Review desktop and mobile layouts for the Home page and service pages.
- Confirm metadata, sitemap, robots, canonical URLs, CTAs, and external links work.

## Credentials Protocol

- `credenciales de acceso dukecrea.txt` may be opened only when direct access to the hosting server is necessary.
- Do not commit this file.
- Do not paste credentials into chat, logs, reports, commits, or generated files.
- If server access is needed, use the minimum required information and document only the technical result, never the secret values.

## Frontend Standards

- Preserve the existing DukeCrea dark visual identity and improve incrementally instead of rebuilding from scratch.
- Keep Spanish copy polished, readable, and free of mojibake.
- Prefer Server Components by default. Move browser APIs, state, effects, and Motion interactions into focused Client Components.
- Use Tailwind CSS v4 patterns already present in the project.
- Respect `prefers-reduced-motion` for animations.
- Use `next/link` for internal routes and `rel="noopener noreferrer"` for external links opened in a new tab.
- Maintain accessible labels, semantic sections, visible focus states, and strong contrast.
