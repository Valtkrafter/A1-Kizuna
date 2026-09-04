# Project Rules & Guidelines for A1 Kizuna

## Mandatory Git Version Control & Deployment Policy

- **Commit and Push Every Time:**
  - Every time changes, bug fixes, refactorings, or features are implemented, they must be committed and pushed immediately to remote (`origin/main`).
  - Never leave uncommitted or unpushed work at the end of a session.
- **Pre-Commit Verification:**
  - Before committing, always run:
    1. `npm run lint` (`oxlint`) - must pass with 0 errors and 0 warnings.
    2. `npm run build` (`tsc -b && vite build`) - must compile and build cleanly.
- **Commit Messages:**
  - Write clear, conventional commit messages (e.g. `feat: ...`, `fix: ...`, `docs: ...`).
- **Immediate Push:**
  - Always execute `git push origin <branch>` right after committing.

---

For full architecture and design system rules, see [AGENTS.md](./AGENTS.md).
