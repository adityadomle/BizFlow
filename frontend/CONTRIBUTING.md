# 📌 Contributing to BizFlow

First off, thank you for considering contributing to **BizFlow** 💼✨ — we truly appreciate your time and effort to make this project better for everyone.

We welcome **all** contributions — whether it’s a bug fix, UI improvement, new feature, or documentation update.

---

## 📚 Table of Contents
1. [How to Contribute](#-how-to-contribute)
2. [Code Standards](#-code-standards)
3. [Pull Request Guidelines](#-pull-request-guidelines)
4. [Reporting Issues](#-reporting-issues)
5. [Need Help?](#-need-help)


---

## 🛠 How to Contribute

### 1. Fork & Clone the Repository
```bash
# Fork this repository on GitHub
# Then clone your fork locally:
git clone https://github.com/<your-username>/BizFlow.git
cd BizFlow
```

### 2. Create a Feature Branch
Please use a descriptive branch name:
```bash
git checkout -b feature/your-feature-name
```

Examples:
- `feature/add-task-filter`
- `fix/mobile-navbar-bug`
- `docs/update-readme`

### 3. Install Dependencies
```bash
npm install
```

### 4. Make Your Changes
- Keep code **clean, readable, and consistent** with the existing style.
- Follow **TailwindCSS conventions** for styling.
- Use **Framer Motion** for animations where applicable.
- Place reusable components in `/src/components`.
- Keep pages in `/src/pages`.
- Store assets in `/src/assets`.

### 5. Test Your Changes
- Run the dev server:
```bash
npm run dev
```
- Ensure everything works on **desktop & mobile**.
- Check that no **console errors/warnings** appear.

### 6. Commit Your Changes
We follow [Conventional Commits](https://www.conventionalcommits.org/) for clear commit messages:
```bash
git commit -m "feat: add search filter to task list"
git commit -m "fix: responsive navbar alignment"
git commit -m "docs: update contribution guidelines"
```

---

## 📝 Code Standards

- **JavaScript/React** — ES6+ syntax, functional components, hooks.
- **Styling** — TailwindCSS utility classes.
- **Animations** — Framer Motion for smooth effects.
- **File Naming** —  
  - Components: `PascalCase` (e.g., `TaskCard.jsx`)  
  - Hooks: `camelCase` (e.g., `useFetchData.js`)  
  - CSS/Tailwind configs: `kebab-case`  

---

## 🔄 Pull Request Guidelines

A **Pull Request (PR)** is how you submit your changes for review and merging into the main codebase.

### **Before Submitting a PR**
- Make sure your code is **tested** and **working**.
- Run `npm run dev` and check for UI/UX issues.
- Ensure **no linting errors** or unused variables.
- Rebase your branch with the latest `main` branch to avoid conflicts:
```bash
git fetch origin
git rebase origin/main
```

### **PR Title Format**
We use **Conventional Commit** style for PR titles:
- `feat: <short description>` → for new features.
- `fix: <short description>` → for bug fixes.
- `docs: <short description>` → for documentation changes.
- `style: <short description>` → for code style changes.
- `refactor: <short description>` → for code restructuring without behavior change.

Examples:
- `feat: add dark mode toggle`
- `fix: navbar not collapsing on mobile`
- `docs: update README with setup steps`

### **PR Description Template**
When opening a PR, please include:
1. **What** changes you made.
2. **Why** these changes were necessary.
3. **How** you tested them.
4. Screenshots (if applicable).
5. Related issue numbers (e.g., `Fixes #12`).

Example:
```
## Changes
- Added dark mode toggle in header.
- Updated Tailwind config for theme switching.

## Reason
Improves accessibility and UI customization.

## Testing
Tested on Chrome, Firefox, and mobile view.

Fixes #45
```

### **After Submitting a PR**
- A maintainer will review your changes.
- Be open to feedback and requested changes.
- Once approved, it will be merged into `main`.

---

## 🐞 Reporting Issues
When creating a **GitHub Issue**, please include:
- **Description** — Clear explanation of the problem.
- **Steps to Reproduce** — How to see the bug.
- **Expected vs Actual** — What you thought would happen vs what happened.
- **Screenshots** (if applicable).

**Issue Title Format:**
- `bug: cannot add new task on mobile`
- `feature: add dark mode support`

---

## 💬 Need Help?
- Open a **discussion** in GitHub Discussions.
- Tag maintainers: @adityadomle
- Check the **README.md** for setup help.

---


