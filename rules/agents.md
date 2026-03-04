# Agent Orchestration

## Core Agents (use proactively)
| Agent | When to Use |
|-------|-------------|
| planner | Complex features, refactoring |
| code-reviewer | After writing/modifying code |
| tdd-guide | New features, bug fixes |
| security-reviewer | Before commits |
| build-error-resolver | Build failures |
| debugger | Runtime errors, test failures |
| architect | System design decisions |

## Auto-Trigger Rules
- Complex feature request -> **planner**
- Code just written -> **code-reviewer**
- Bug fix or new feature -> **tdd-guide**
- Build fails -> **build-error-resolver**

## Execution
- **Parallel**: Independent operations (security + performance + type check)
- **Sequential**: When results inform next step
- Use split-role sub-agents for complex analysis (security, performance, consistency)
