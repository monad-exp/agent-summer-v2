# Project Guidelines

## Tech Stack
- Next.js 16 (App Router) + React 19 + TypeScript (strict)
- Tailwind CSS v4
- TanStack Query, Zod, react-hook-form, Zustand

## TypeScript Rules
- No `any`. Use `unknown` + type guards instead.
- Define Props as `{ComponentName}Props` interface.
- Prefer `interface` for extendable shapes, `type` for unions and utility types.
- Use `satisfies` operator when appropriate.

## Component & Code Conventions
- Only functional components + hooks.
- Keep components small and focused.
- Create custom hooks for reusable logic.
- Use early returns to reduce nesting.
- Clear, intention-revealing names.

## Folder Structure
src/
├── app/            # Next.js App Router (routes, layouts, pages)
├── components/     # Reusable UI components
├── features/       # Domain features
├── hooks/
├── lib/
├── types/
└── stores/

## Preferred Libraries
- Data fetching: TanStack Query
- Forms: react-hook-form + Zod
- State: Zustand
- Styling: Tailwind v4

## General Rules
- Always handle loading and error states explicitly.
- Consider accessibility.
- For complex features, propose architecture first before writing code.
- Follow existing code style and conventions in the project.