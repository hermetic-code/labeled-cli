# Contributing to labeled

Thank you for your interest in improving labeled. Because this project operates under a Custom Source-Available License (Upstream-First), all public modifications, features, and fixes must go through the Pull Request funnel here before they can be distributed anywhere else.

To maintain code quality, avoid data bloat, and respect everyone's time, we strictly enforce automated validation guardrails on all entries. Failure to follow these rules may result in your issue or PR being closed automatically.

---

## Zero Tolerance for Spam
Low-effort, duplicate, AI-generated spam, or non-functional Pull Requests/Issues designed purely to inflate commit counts will be closed immediately. Users engaging in this behavior will be permanently blocked from contributing to this repository or participating in discussions.

## Security Vulnerabilities
DO NOT open a public Issue or Pull Request for security flaws or vulnerabilities. Publicly exposing an exploit puts host systems at risk. Please navigate to the [Security tab](https://github.com/hermetic-code/labeled-cli/security/advisories/new) of this repository and follow the instructions to submit a private vulnerability report.

---

## Codebase Architecture Reference

Before introducing modifications to the execution loops, familiarize yourself with how the codebase is modularized:

```text
labeled/
├── src/
│   ├── index.ts          # Application bootstrap and command routing core
│   ├── type.ts           # Global TypeScript type definitions and schema interfaces
│   ├── constants/
│   │   └── base.ts       # Global static configurations, path declarations, and mappings
│   ├── lib/              # Command Implementation Layer
│   │   ├── install.ts    # Package evaluation and addition lifecycle logic
│   │   ├── list.ts       # UI rendering logic for terminal configuration trees
│   │   ├── remove.ts     # Sequential package uninstallation orchestrator
│   │   └── untrack.ts    # State isolation mutation logic (severing records)
│   ├── managers/         # Native Package Manager Adaptation Layer
│   │   ├── index.ts      # Strategy Pattern dispatcher interface
│   │   ├── apt.ts        # Debian/Ubuntu execution strategy implementations
│   │   ├── dnf.ts        # RHEL/Fedora execution strategy implementations
│   │   └── pacman.ts     # Arch Linux execution strategy implementations
│   └── utils/            # Shared Functional Sub-routines
│       ├── extractor.ts  # String processing tokenizers and argument sanitizers
│       ├── getData.ts    # Secure read IO for tracking.json database state
│       ├── setData.ts   # Secure atomic serialization to the filesystem
│       ├── isSudo.ts     # Host system execution privilege validation
│       └── logger.ts     # Structured terminal output styling pipelines
└── tsconfig.json
```

### Component Guidelines
1. **Adding Package Managers (`src/managers/`)**: Avoid creating deep `if-else` branching conditions inside the execution loop. If you are adding support for a new manager (like Snap or Flatpak), implement the common interface declared in `src/managers/index.ts` and drop your mapping strategy into its own class file.
2. **State Mutation Safety (`src/utils/`)**: All mutations interacting with your target storage layers must use unified wrappers through `getData.ts` and `setData.ts`. This protects the engine from runtime synchronization corruption.
3. **Output Standardization (`src/utils/logger.ts`)**: Do not call raw `console.log` arrays directly inside deep logic layers. Use the unified terminal styling framework to keep user-facing telemetry outputs consistent.

---

## The Issue Pipeline

We enforce a strict issue triage routine to prevent duplicated efforts and tracking pollution.

### 1. Verification Search
Search the active issue tracker to ensure your topic has not already been opened. 
- **Exception**: Automated logs generated directly by an active run of labeled can be submitted immediately without checking duplicates.

### 2. Standardized Naming Convention
Your issue title must strictly start with an uppercase bracket prefix defining its technical scope, formatted exactly as `[TYPE]: <short-description>`. Valid types are:
- `[BUG]` - Code defects, runtime exceptions, or broken shell integrations.
- `[FEATURE]` - New utility behaviors, core extensions, or package manager support additions.
- `[CHORE]` - Maintenance tasks, dependency updates, or CI/CD adjustments.
- `[DOCS]` - Changes to the wiki, guides, or inline code documentation structures.
- `[PERF]` - Issues targeting execution delays, memory safety, or storage bloat optimizations.

Example: `[BUG]: Resolve DNF5 mark dependency syntax error`

### 3. Verification of Assignment
**Do not begin writing code for an issue until you are officially assigned.** 
- To claim an issue, leave a comment containing direct intent words like `"assign me" or "claim issue"`. 
- The automated system will verify if the issue is currently unassigned.
- If it is clear, the system will add you as the assignee and post a confirmation comment. 
- Unassigned contributions will be automatically rejected during the PR pipeline verification stage.

---

## The Pull Request (PR) Pipeline

### 1. Branch Naming Convention
Once an issue is assigned to you, create a local working branch off main. Your branch name must strictly adhere to the following kebab-case format:
```text
type-issue_id-issue_name-fixed_x_y_z
```
- Example with ID: `bug-42-wifi-crash-fixed-dnf-autoremove`
- Example without ID: `wifi-crash-fixed-dnf-autoremove`

### 2. Scope Containment
- **One issue per Pull Request.** Multi-issue mega-PRs will be automatically blocked. Keep your changes focused entirely on solving your assigned issue.

### 3. Do Linting and Formatting
Before submitting for PR you must run `npm run lint` and fix the issues then run the `npm run format`.

### 4. PR Naming Convention
PR titles must follow the exact same bracket prefix rules used for issues (e.g., `[FEATURE]: add flatpak tracking backend`).

### 5. Complete the Verification Checklist
When you open a PR, our template displays a checklist tracking system requirements. You must read through the text and change every single empty checkbox from `[ ]` to `[x]` to confirm your local verification passes. Leaving any box empty triggers an automatic CI failure.

### 6. Link Your Assigned Issue
You must explicitly link your assigned issue inside the PR body description using standard closing keywords (e.g., `close #12`, `fixes #42`, `resolves #11`). 

Our validation engine parses this link to double-check that you are the registered assignee of that issue. If the ownership check does not pass, the workflow blocks execution.

---

## Automated Merge Protocol

Once your PR passes all automated pipeline checks, it enters a pending state awaiting human review:
- Test your changes locally across different distros using your package manager setup before submitting.
- Runs must compile cleanly through our TypeScript engine pipeline via `node build.js`.
- A core maintainer must review your structural changes.
- As soon as **at least one maintainer** submits an official **Approved** review, GitHub's native automation activates.
- The system will execute a clean **Squash and Merge** to maintain a flat Git commit history and will automatically delete your development branch from the repository structure.

---

## Growth Inside the Project

We value dedicated, long-term collaborators. Consistent, high-quality activity on this repository, such as resolving complex assigned issues, reviewing other users' PRs, and maintaining documentation, will be recognized. 

Active community members who demonstrate code excellence and positive etiquette will be considered for performance-based promotions to Maintainer or Core Contributor status, granting direct write access and decision-making capabilities inside the labeled ecosystem. Conversely, performance metrics directly inform demotion actions if repository governance rules are bypassed.