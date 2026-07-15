# CI/CD Pipeline Automation Standards

Maintain high code quality and secure deployments by automating test and deployment pipelines.

---

## 1. Caching Dependencies

Automated builds can be slow. Save time by caching dependency managers (e.g. Node modules, Go modules, Python poetry virtual envs):

- **GitHub Actions NPM Cache Example:**
  ```yaml
  - name: Set up Node.js
    uses: actions/setup-node@v3
    with:
      node-version: 18
      cache: 'npm' # Automates dependencies caching based on package-lock.json
  ```

---

## 2. Job Dependency Mapping (`needs`)

Design pipelines to fail fast. Run checks first before compiling or deploying:

```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - name: Run Linters
        run: npm run lint

  test:
    runs-on: ubuntu-latest
    needs: lint # Only run tests if lint checks pass successfully
    steps:
      - name: Run Tests
        run: npm test

  build:
    runs-on: ubuntu-latest
    needs: test # Build only if tests pass
    steps:
      - name: Compile Docker Image
        run: docker build .
```

---

## 3. Secure Secrets Management

Never expose API keys, deployment tokens, or AWS credentials in pipeline definition files.

- Use environment variables bound to Github Repository Secrets (`${{ secrets.AWS_ACCESS_KEY_ID }}`).
- Mask sensitive output parameters in logs:
  ```bash
  echo "::add-mask::$SUPER_SECRET_TOKEN"
  ```
