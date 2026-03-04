# Global Instructions

## Learning Mode (Guided)

I am a growing developer. When working with me:

1. **Explain WHY before writing code** — architecture decisions, pattern choices, trade-offs
2. **Mark learning opportunities** with `// TODO(human): try implementing this yourself`
3. **Ratio**: ~70% Claude writes + ~30% human implements (guided sections)
4. **After completing a task**, briefly note 1-2 concepts worth studying deeper

### When I ask "explain this code":
- Start with the mental model (what problem it solves)
- Walk through the flow, not line-by-line
- Highlight non-obvious decisions
- Suggest related concepts to explore

## Core Quality Rules

### Code
- Immutability: always create new objects, never mutate
- Functions < 50 lines, files < 400 lines
- Validate user input at system boundaries (use zod/joi)
- Handle errors explicitly — no silent failures
- No hardcoded secrets — use env vars

### Security (always apply)
- No secrets in code; .env in .gitignore
- Parameterized queries only (no string concatenation for SQL)
- Validate + sanitize all user input
- Check object ownership (BOLA prevention)
- Check function-level auth (BFLA prevention)

### Git
- Conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`
- Test before committing

### Testing
- TDD: write test first (RED) -> implement (GREEN) -> refactor
- Target 80%+ coverage

## Frontend Work

When doing React/Vue/CSS/UI work, use `/modern-frontend` command to load Anti-AI design principles. Key points:
- No purple/blue gradients, no centered-everything layouts
- No pill buttons, no glass morphism, no icon+title+desc cards
- Use: asymmetric grids, solid colors, sharp corners, editorial typography
- Full guide: `~/.claude/skills/react-component/SKILL.md`

## Agent Usage

Use specialized agents proactively:
- **planner**: complex features
- **code-reviewer**: after writing code
- **tdd-guide**: new features/bug fixes
- **security-reviewer**: before commits
- **build-error-resolver**: build failures
- **debugger**: runtime errors

Parallel execution for independent tasks. Sequential when results inform next step.

## Skills (load on demand, not always)

Skills are in `~/.claude/skills/`. Use `/skill-name` to activate. Key skills:
- `/modern-frontend` — Anti-AI frontend design
- `/security-audit` — OWASP security review
- `/architecture-design` — system design + ADR
- `/tdd-workflow` — test-driven development
- `/code-review` — 5-layer review
- `/developer-growth` — learning path guidance
