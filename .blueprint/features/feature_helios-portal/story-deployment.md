# User Story — Deployment Configuration

## Story

As the portal operator,
I want the portal correctly configured for deployment to Azure Static Web Apps,
so that the site is accessible via its deployed URL without routing errors and served over HTTPS by default.

---

## Acceptance Criteria

**AC1 — staticwebapp.config.json is present**
Given the portal repository,
When I inspect the root directory,
Then a `staticwebapp.config.json` file is present and contains valid JSON.

**AC2 — Direct URL access does not return a 404**
Given the portal is deployed to Azure Static Web Apps,
When a reader navigates directly to the portal root URL (e.g. `https://<app>.azurestaticapps.net/`),
Then the portal HTML is served and the password gate is displayed — a 404 or routing error is not returned.

**AC3 — Fallback route is configured**
Given the `staticwebapp.config.json`,
When I inspect its routing configuration,
Then a fallback route is defined that rewrites unmatched paths to `index.html` with HTTP status 200 (not a 301 redirect) — consistent with Azure Static Web Apps SPA routing conventions.

**AC4 — HTTPS is the access protocol**
Given the portal is deployed to Azure Static Web Apps,
When a reader accesses the portal URL,
Then the connection is served over HTTPS; Azure Static Web Apps provides this by default and no additional configuration is required.

**AC5 — No server-side runtime is configured**
Given the `staticwebapp.config.json` and the deployed application,
When I inspect the configuration,
Then no API routes, serverless functions, or backend runtime settings are defined — the deployment is static files only.

---

## Out of Scope

- Custom domain configuration (operator responsibility post-deployment)
- CI/CD pipeline or GitHub Actions workflow for automated deployment
- Staging vs. production environment configuration
- CDN cache configuration or cache-control headers
- Azure subscription provisioning or resource group setup
