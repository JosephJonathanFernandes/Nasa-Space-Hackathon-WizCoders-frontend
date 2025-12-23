# Developer Experience & Tooling

## Linting & Formatting
- **ESLint**: Enforce code quality and style. Run with `npm run lint`.
- **Prettier**: Consistent code formatting. Run with `npm run format`.

## Pre-commit Hooks
- **Husky**: Set up pre-commit hooks to run lint and tests automatically.
- **lint-staged**: Only check staged files for faster feedback.

### Example Husky Setup
```
npx husky install
npx husky add .husky/pre-commit "npm run lint && npm run test"
```

## Continuous Integration
- **GitHub Actions**: See `README.md` for a sample CI pipeline.
- Run lint, test (with coverage), and build on every PR.

## Recommended NPM Scripts
- `lint`: Run ESLint
- `format`: Run Prettier
- `test`: Run Vitest
- `test:coverage`: Run tests with coverage
- `build`: Build for production
- `dev`: Start development server

---

For more, see [Vitest](https://vitest.dev/), [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [Husky](https://typicode.github.io/husky/), and [lint-staged](https://github.com/okonet/lint-staged).
