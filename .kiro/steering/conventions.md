# Code Conventions

## File Naming

- All files must use **kebab-case** naming (e.g. `mock-data.ts`, `my-component.tsx`, `api-client.ts`).
- This applies to all source files: components, utilities, routes, hooks, etc.

## Components

- Only **one React component per file**.
- Extract sub-components into their own files.

## Functions

- All functions must be declared as **arrow functions** (e.g. `const myFunction = () => {}`).
- This includes React components, utility functions, event handlers, and server functions.
- Do not use the `function` keyword for declarations.

```tsx
// ✅ Good
const HomePage = () => {
  return <div>Hello</div>
}

const fetchUser = async () => {
  return mockUser
}

// ❌ Bad
function HomePage() {
  return <div>Hello</div>
}

async function fetchUser() {
  return mockUser
}
```
