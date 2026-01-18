# Contributing

## Scope

Zazu Terminal is intentionally small.
PRs should preserve:
- short outputs
- deterministic behavior where possible
- minimal dependencies

## Development

```bash
npm install
npm run dev -- help
```

## Checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Style

- Keep command output stable.
- Prefer small pure functions.
- Avoid adding large frameworks.
