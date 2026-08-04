# Taste — verification & tooling

- Verifies UI work by taking real screenshots: xcsim (iOS Simulator) for mobile views, and ego browser / pinchtab for web views — "use xcsim to check your work" / "use pinchtab to check ur work". Confidence: 0.9
- Runs build and repo checks (e.g., bun run build, git diff --check) before declaring work deploy-ready, and reports which checks passed. Confidence: 0.7
- For factual claims (audits, application answers), checks the codebase before asserting accuracy ("is this section accurate? check the codebase"). Confidence: 0.7
