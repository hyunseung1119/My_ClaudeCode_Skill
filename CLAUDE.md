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

## Session Management

- Prefer `/clear` over `/compact` between tasks (no information loss)
- At 70% context, proactively compact or start new session
- 2x same fix on same issue -> `/clear` and restart with fresh context
- Complex features: research -> spec file -> new session for implementation
- On compaction: MUST preserve modified file list, test commands, and current task state

## Agent Usage

Use specialized agents proactively. Parallel for independent tasks, sequential when results inform next step.

## Skills (load on demand, not always)

Skills are in `~/.claude/skills/`. Use `/skill-name` to activate. Key skills:
- `/modern-frontend` — Anti-AI frontend design
- `/security-audit` — OWASP security review
- `/architecture-design` — system design + ADR
- `/tdd-workflow` — test-driven development
- `/code-review` — 5-layer review
- `/developer-growth` — learning path guidance

## Frontend Work

When doing React/Vue/CSS/UI work, use `/modern-frontend` command to load Anti-AI design principles.
