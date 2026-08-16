# 🚀 All-in-One API Testing Framework

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vitest](https://img.shields.io/badge/-Vitest-729B1B?style=for-the-badge&logo=vitest&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![Qase](https://img.shields.io/badge/Qase-0056D2?style=for-the-badge&logo=qase&logoColor=white)

A robust, production-grade, multi-protocol API testing framework built with TypeScript and Vitest. This framework allows you to seamlessly test REST endpoints, GraphQL queries/mutations, and WebSocket connections (including auto-reconnecting flows) all in one unified architecture.

## ✨ Features

- **Multi-Protocol Support**: Dedicated clients for REST, GraphQL, and WebSockets.
- **Strict Typing**: 100% TypeScript with meticulously defined interfaces for API payloads.
- **Dynamic Data Generation**: Uses `faker.js` to ensure tests run with fresh, randomized data to prevent collisions.
- **Environment Validation**: Uses `Zod` to strictly validate all required `.env` variables (like access tokens) before tests run, preventing cryptic failures.
- **Automated CI/CD**: Fully configured GitHub Actions matrix strategy to run test suites in parallel.
- **Intelligent Reporting**: Integrates natively with [Qase.io](https://qase.io/) to auto-generate dashboards, track test runs, and log precise stack traces.
- **Built-in Formatting**: Standardized code style enforced automatically via Prettier and ESLint.

---

## 🛠️ Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v20+ recommended)
- A GitHub Personal Access Token (for the GraphQL testing)
- A Qase.io account (for CI reporting)

### 2. Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory. The framework will validate this file on startup.

```env
# Required for testing the GitHub GraphQL API
GH_ACCESS_TOKEN="your_github_personal_access_token"
```

---

## 🧪 Running Tests

This framework uses [Vitest](https://vitest.dev/) for blazing-fast execution.

**Run all tests in the console:**
```bash
npx vitest run
```

**Run tests with Vitest's interactive UI:**
```bash
npm run test:ui
```

**Run code formatting (Prettier):**
```bash
npm run format
```

---

## 🏗️ Architecture Overview

The repository is structured to separate concerns, making it easy to scale:

```text
├── src/
│   ├── client/         # API Clients (REST, GraphQL, WebSockets)
│   ├── config/         # Environment validation (Zod)
│   ├── data/           # Random Payload Generation (Faker.js) & Queries
│   ├── interceptors/   # Axios interceptors (Auth injection, Logging)
│   ├── interfaces/     # TypeScript types & definitions
│   └── tests/          # The actual Vitest test files
├── .github/workflows/  # CI/CD pipelines (Test Matrix & Qase Publishing)
├── .env                # Local secrets (ignored by Git)
├── eslint.config.js    # Linting rules
├── .prettierrc         # Code formatting rules
└── test-results.xml    # Auto-generated JUnit test reports
```

---

## 🤖 Continuous Integration (CI)

This repository includes a sophisticated GitHub Actions pipeline (`ci.yml` & `test-template.yml`). 

Whenever code is pushed to `main`, the CI matrix:
1. Provisions isolated Node.js environments.
2. Runs all 6 test files entirely in parallel.
3. Injects the necessary GitHub and Qase secrets.
4. Generates both HTML and JUnit XML reports (saved as artifacts).
5. Pushes the exact results (pass/fail status & logs) directly to your **Qase.io Test Runs Dashboard**.

*(Note: The matrix is configured with `fail-fast: false`, ensuring all test files finish and report to Qase, even if one file fails.)*
