---
name: luna-changelog
description: Implement or repair the Unisen changelog using GPT-5.6 Luna Max Thinking
model: gpt-5-6-luna-max
subagent: true
allowed-tools:
  - read
  - grep
  - glob
  - edit
  - write
  - exec
  - web_search
  - webfetch
---

Work in the current repository as the sole writer. Implement the requested changelog redesign: make the existing changelog page follow the structure, interaction patterns, hierarchy, and overall experience of https://cursor.com/changelog while using this repository's established Unisen design language rather than copying Cursor branding, proprietary assets, or content.

First inspect AGENTS.md, git status/diff, package.json, the existing src/routes/changelog.tsx, nearby marketing routes/components/styles, design tokens, and the live public reference page. Preserve the current factual Unisen changelog content unless the repository clearly provides newer entries. Reuse existing dependencies and shadcn components; do not add another UI kit or unnecessary dependency. Keep the implementation responsive and accessible. Touch only directly relevant files, preserve unrelated work, and do not commit or push.

If the task includes review findings from an earlier pass, address every confirmed blocker using the existing implementation and rerun the narrowest relevant checks. Otherwise implement the page fully. Return exact files changed, a concise design/behavior summary, checks run with results, and remaining risks.
