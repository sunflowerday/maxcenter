# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the shadcn/ui monorepo containing:
- **apps/v4** — The ui.shadcn.com Next.js website
- **packages/shadcn** — The `shadcn` CLI for adding components to projects
- **packages/tests** — Test utilities and fixtures
- **templates/** — Project templates for `shadcn init`

Uses pnpm workspaces + Turborepo + changesets for versioning.

## Key Commands

```bash
# Install dependencies
pnpm install

# Development
pnpm dev                          # Run all workspaces in parallel
pnpm --filter=v4 dev              # Run website only (Next.js on port 4000)
pnpm --filter=shadcn dev          # Run CLI in watch mode

# Build & Test
pnpm build                        # Build all workspaces
pnpm check                        # Run lint, typecheck, format:check
pnpm test                         # Run e2e tests (requires dev server)
pnpm --filter=shadcn test         # Run CLI unit tests only

# Registry (component registry system)
pnpm registry:build               # Build registry after component changes
pnpm validate:registries           # Validate registry consistency

# Release
pnpm release                      # Version packages with changesets
pnpm pub:release                  # Publish shadcn package
```

## Architecture

### Registry System

Components live in `apps/v4/registry/` with a multi-style architecture:

```
apps/v4/registry/
├── new-york-v4/          # "New York" style (default)
│   ├── ui/               # Component source files
│   └── example/          # Example usages
├── bases/                # Two parallel base registries
│   ├── base/             # Base UI-backed components
│   └── radix/            # Radix UI-backed components
└── styles/               # Additional style variants
```

**Critical rule (`.cursor/rules/registry-bases-parity.mdc`)**: When editing `bases/base/` you must apply the same change to `bases/radix/` and vice versa. Only diverge for API differences (import paths, prop differences).

### shadcn CLI (`packages/shadcn`)

The CLI is built with tsup and exports multiple entry points:
- `shadcn/index.js` — Main CLI entry
- `shadcn/registry` — Component registry utilities
- `shadcn/schema` — Zod schemas
- `shadcn/utils` — Utility functions
- `shadcn/mcp` — Model Context Protocol server

### Website (`apps/v4`)

- Next.js 16 with App Router and Turbopack
- Tailwind CSS v4 with `@tailwindcss/postcss`
- MDX documentation via fumadocs
- Styled with multiple component styles (new-york-v4 default)

## Commit Convention

Follow conventional commits: `category(scope): message`

Categories: `feat`, `fix`, `refactor`, `docs`, `build`, `test`, `ci`, `chore`
