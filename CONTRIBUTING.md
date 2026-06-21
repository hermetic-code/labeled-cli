# Contributing to labeled

Thank you for your interest in improving labeled. Because this project operates under a Custom Source-Available License (Upstream-First), all public modifications, features, and fixes must go through the Pull Request funnel here before they can be distributed anywhere else.

To maintain code quality and respect the maintainers' time, please strictly adhere to the following guidelines. Failure to follow these rules may result in your issue or PR being closed without review.

## Critical Safeguards

### Security Vulnerabilities
DO NOT open a public Issue or Pull Request for security flaws or vulnerabilities. Publicly exposing a security flaw puts all users at risk. Please navigate to the Security tab of this repository and follow the instructions to submit a private vulnerability report.

### Zero Tolerance for Spam
Low-effort, duplicate, AI-generated spam, or non-functional Pull Requests/Issues designed purely to inflate commit counts will be closed immediately. Users engaging in this behavior will be permanently blocked from contributing to this repository or participating in discussions.

## The Development Workflow

### 1. Find or Open an Issue
* Always look through existing issues before creating a new one.
* You must use the appropriate Issue Template provided by the repository.
* Do not start writing code or working on a fix until a maintainer has explicitly assigned the issue to you. Unassigned PRs will be automatically closed.

### 2. Branch Naming Convention
Once an issue is assigned to you, create a local working branch off main. Your branch name must strictly adhere to the following kebab-case format:
```text
issue_id-issue_name-fixed_x_y_z
```
* Example with ID: 42-wifi-crash-fixed-dnf-autoremove
* Example without ID: wifi-crash-fixed-dnf-autoremove

### 3. Title Prefixes
To help maintainers categorize submissions at a glance, all Issue and Pull Request titles must start with a standardized uppercase prefix inside brackets:
* [FIX]: for bug fixes.
* [ERROR]: for breaking faults or system errors.
* [ENHANCEMENT]: for feature additions or optimizations.
* [DOCS]: for documentation upgrades.

Example: [FIX]: Resolve DNF5 mark dependency syntax error

## Pull Request Rules and Etiquette

* Scope Rule: 1 PR per Issue. Do not pack unrelated fixes or features into a single Pull Request.
* Templates: You must use the appropriate PR Template provided by the repository.
* The PR Description: Your description must be highly detailed and answer the following three pillars:
  1. What changed? (A clear high-level summary of the modifications).
  2. What approach did you choose? (The architectural strategy or specific functions you targeted).
  3. What was your thought process? (Why did you choose this solution over alternatives?).

## Coding Standards

* Write clean, readable JavaScript (Node.js) code.
* Avoid deep if-else branching ladders. Leverage our data-driven Strategy Patterns and object maps when adding new package managers or rules.
* Test your changes locally across different distros (if possible) before submitting the PR.

## Growth Inside the Project

We value dedicated, long-term collaborators. Consistent, high-quality activity on this repository, such as resolving complex assigned issues, reviewing other users' PRs, and maintaining documentation, will be recognized. 

Active community members who demonstrate code excellence and positive etiquette will be considered for promotions to Maintainer or Core Contributor status, granting direct write access and decision-making capabilities inside the labeled ecosystem.