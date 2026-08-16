# All-in-One API Testing Framework

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vitest](https://img.shields.io/badge/-Vitest-729B1B?style=for-the-badge&logo=vitest&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![Qase](https://img.shields.io/badge/Qase-0056D2?style=for-the-badge&logo=qase&logoColor=white)

Automated, multi-protocol testing framework for modern web services.

Tests REST endpoints, GraphQL queries/mutations, and complex WebSocket connections under a single, strongly-typed architecture using TypeScript and Vitest. Integrates natively with Qase.io for test reporting.

<!-- Replace the src URL below with the URL of your uploaded screenshot -->
<img width="100%" alt="Qase Reporting Dashboard" src="https://via.placeholder.com/1200x600?text=Upload+your+Qase+screenshot+to+GitHub+and+paste+URL+here" />

---

## The problem this solves

Testing modern applications often requires bouncing between different tools—Postman for REST, Apollo Studio for GraphQL, and browser consoles for WebSockets. This framework unifies all three protocols under a single architecture. It allows QA engineers and developers to run comprehensive integration tests in one place, with dynamic data generation and centralized CI/CD reporting.

---

## Architecture

```text
Test Cases (Vitest)
      ↓
API Clients — REST, GraphQL, WebSockets (Axios / ws)
(dynamically generates payloads using Faker.js)
      ↓
Target APIs
(evaluates the responses and connection stability)
      ↓
Structured Assertions
      ↓
Qase Dashboard + HTML/JUnit Reports
```

---

## Why this architecture?

Using a unified TypeScript testing framework ensures that data models (interfaces) remain consistent across all protocols. 

Instead of maintaining separate test suites for REST and WebSockets in entirely different languages or applications, everything runs in a single `vitest` pass. This strict typing allows for complex cross-protocol scenarios (e.g., triggering a REST mutation and verifying a WebSocket broadcast) while ensuring total type safety.

---

## What it evaluates

The framework handles three major API patterns:

| Protocol | What it checks |
|---|---|
| REST | HTTP status codes, payload structures, data persistence, and error handling. |
| GraphQL | Query execution, mutation state changes, nested data retrieval, and schema adherence. |
| WebSockets | Connection stability, real-time message broadcasting, and auto-reconnection logic handling. |

---

## Stack

- **Language:** TypeScript / Node.js
- **Test Runner:** Vitest
- **HTTP Client:** Axios (with custom interceptors for auth)
- **Data Generation:** Faker.js (prevents static data collisions)
- **Validation:** Zod (strict environment variable checking)
- **CI/CD:** GitHub Actions (Matrix strategy)
- **Reporting:** Qase.io (TestOps)

---

## Project structure

```text
api-client-practicev1/
├── src/
│   ├── client/         # Protocol-specific clients (REST, GraphQL, WS)
│   ├── config/         # Zod environment validation
│   ├── data/           # Random Payload Generation & Queries
│   ├── interceptors/   # Axios interceptors (Auth injection, Logging)
│   ├── interfaces/     # TypeScript interfaces for strict typing
│   └── tests/          # Vitest test suites
├── .github/
│   └── workflows/      # CI matrix and Qase publishing pipelines
├── .env                # Local secrets (gitignored)
├── eslint.config.js    # Linting rules
├── .prettierrc         # Code formatting rules
├── package.json
├── tsconfig.json
└── README.md
```

---

## Setup

### Prerequisites

- Node.js 20+
- A GitHub Personal Access Token (for the GraphQL testing)
- A Qase.io account for reporting (optional but recommended)

### Installation

```bash
git clone https://github.com/puja-ui/all-in-one-api-testing-client.git
cd all-in-one-api-testing-client
npm install
```

### Environment variables

Create a `.env` file in the root directory and fill in your keys:

```text
# Required for testing the GitHub GraphQL API
GH_ACCESS_TOKEN="your_github_personal_access_token"
```

The framework uses Zod to validate these keys on startup. If they are missing, the test runner will immediately crash with a clear error message.

### Run

```bash
# Run tests in console
npm test

# Run tests with interactive UI
npm run test:ui

# Format code
npm run format
```

---

## Adding test cases

Test cases live in `src/tests/`. To add a new test, utilize the dynamic data generated in `src/data/testData.ts` and the pre-configured clients.

Example REST test:

```typescript
import { describe, it, expect } from 'vitest';
import { RestClient } from '../client/rest.client.js';
import { restTestData } from '../data/testData.js';

describe('REST API Tests', () => {
  const restClient = new RestClient();

  it('should successfully create a new user', async () => {
    // Uses Faker.js to dynamically generate names and emails
    const response = await restClient.createUser(restTestData.newUser);
    
    expect(response.status).toBe(201);
    expect(response.data.name).toBeDefined();
  });
});
```

---

## CI pipeline

The GitHub Actions workflow runs on every push to `main`. It provisions a test matrix to run all 6 test files in parallel.

To add secrets for CI: **GitHub repo → Settings → Secrets → Actions → New secret**

Add:
- `GH_ACCESS_TOKEN`
- `QASE_PROJECT_CODE`
- `QASE_API_TOKEN`

The matrix uses `fail-fast: false`, ensuring all test files finish and upload their independent results to the Qase dashboard, even if one file fails. HTML and JUnit XML reports are also saved as GitHub build artifacts.

---

## Key design decisions

**Why Vitest instead of Jest?**
Vitest is significantly faster, supports native ESM out of the box, and uses the exact same API as Jest. It also comes with a brilliant interactive UI mode.

**Why Faker.js for test data?**
Using static hardcoded data (like `user1@test.com`) often leads to database collisions during repeated test runs. Dynamically generating names and emails ensures a clean state and tests the system against a wider variety of inputs.

**Why Zod for environment variables?**
Cryptic "Unauthorized" errors caused by a missing `.env` variable waste developer time. Zod validates the environment on startup, immediately failing the test run with a clear error if required variables are missing.

---

## What's next

- Add Git Hooks (Husky) to automatically format and test code before pushing
- Dockerize the framework for zero-setup execution
- Add performance and load testing capabilities using K6

- Add performance and load testing capabilities using K6
