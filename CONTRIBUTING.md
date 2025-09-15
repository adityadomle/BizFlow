# 📌 Contributing to BizFlow

Welcome! This file contains all supporting documentation for contributing, code of conduct, and license.

---

## 📚 Table of Contents

1. [How to Contribute](#how-to-contribute)
2. [Code Standards](#code-standards)
3. [Pull Request Guidelines](#pull-request-guidelines)
4. [Reporting Issues](#reporting-issues)
5. [Code of Conduct](#code-of-conduct)
6. [License](#license)
7. [Changelog](#changelog)

---

## 🛠 How to Contribute

### 1. Fork & Clone the Repository
```bash
git clone https://github.com/<your-username>/BizFlow.git
cd BizFlow
```

### 2. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Make Your Changes
- Keep code clean, readable, and consistent.
- Use TailwindCSS for styling and Framer Motion for animations.
- Place reusable components in `/src/components`, pages in `/src/pages`, assets in `/src/assets`.

### 5. Test Your Changes
```bash
npm run dev
```
- Ensure everything works on desktop & mobile.
- Check for console errors/warnings.

### 6. Commit Your Changes
We follow [Conventional Commits](https://www.conventionalcommits.org/):
```bash
git commit -m "feat: add search filter to task list"
```

---

## 📝 Code Standards

- **JavaScript/React** — ES6+ syntax, functional components, hooks.
- **Styling** — TailwindCSS utility classes.
- **Animations** — Framer Motion for smooth effects.
- **File Naming** — PascalCase for components, camelCase for hooks.

---

## 🔄 Pull Request Guidelines

- Test your code and check for linting errors.
- Rebase with the latest `main` branch:
  ```bash
  git fetch origin
  git rebase origin/main
  ```
- Use Conventional Commit style for PR titles.
- Fill out the PR description template:
  ```
  ## Changes
  - Added dark mode toggle in header.
  ## Reason
  Improves accessibility and UI customization.
  ## Testing
  Tested on Chrome, Firefox, and mobile view.
  Fixes #45
  ```

---

## 🐞 Reporting Issues

- Clear description of the problem.
- Steps to reproduce.
- Expected vs actual behavior.
- Screenshots (if applicable).

---

## 📜 Code of Conduct

BizFlow is dedicated to maintaining an inclusive, respectful, and collaborative environment for all contributors.

**Unacceptable Behavior**
- Harassment, discrimination, or bullying.
- Offensive language, spam, plagiarism, disruptive conduct.

**Community Values**
- Respect, constructive communication, mentorship, fair recognition.

**Scope**
- Applies to all BizFlow spaces: GitHub, Discord, social media, events.

**Reporting Violations**
- Contact mentors or maintainers via Discord/LinkedIn/GitHub.
- All reports are confidential.

**Enforcement**
- Warning, temporary suspension, or permanent removal.

**Contributor Responsibilities**
- Engage respectfully, provide attribution, assist others.

**Vision**
- BizFlow aims to be a leading open-source platform for business process automation.

Adapted from [Contributor Covenant v3.0](https://www.contributor-covenant.org/version/3/0/code_of_conduct/).

---

## 📄 License

This project is licensed under the MIT License.

---

## 📜 Changelog

See [GitHub Releases](https://github.com/adityadomle/BizFlow/releases) for the latest updates.

---

## 💬 Need Help?

- Open a discussion in GitHub Discussions.
- Tag maintainers: @adityadomle
- Check the [README.md](README.md) for setup help.


