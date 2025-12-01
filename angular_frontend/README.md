# Angular Frontend - Ocean Professional

Micro front-end with reusable UI components, application shell, and authentication screens (Login, MFA, Forgot Password, Reset Password).

## Quick start

Prerequisites: Node 18+, npm, Angular CLI (optional).

1. Install dependencies:
```bash
npm install
```

2. Run the dev server (port 3000):
```bash
npm start
```
Open http://localhost:3000

3. Build:
```bash
npm run build
```

## Environment configuration

This app reads runtime config from NG_APP_* variables. Set them in your environment or container:

- NG_APP_API_BASE
- NG_APP_BACKEND_URL
- NG_APP_FRONTEND_URL
- NG_APP_WS_URL
- NG_APP_NODE_ENV
- NG_APP_NEXT_TELEMETRY_DISABLED
- NG_APP_ENABLE_SOURCE_MAPS
- NG_APP_PORT
- NG_APP_TRUST_PROXY
- NG_APP_LOG_LEVEL
- NG_APP_HEALTHCHECK_PATH
- NG_APP_FEATURE_FLAGS (JSON string)
- NG_APP_EXPERIMENTS_ENABLED

Mock vs real:
- When NG_APP_NODE_ENV !== 'production' the app uses a mock adapter for auth flows.
- In production, replace placeholder calls in AuthService with real HttpClient calls to your API using NG_APP_API_BASE.

## Routes

- / (protected)
- /login
- /mfa
- /forgot-password
- /reset-password

## UI Library

Shared UI components are available in src/app/shared/ui (buttons, inputs, form-field, card, modal, navbar, sidebar, tabs, alert/toast, loader).

## Theming

Ocean Professional theme with subtle shadows, rounded corners, gradients, and transitions. Runtime theme tokens are exposed via ThemeService.

## Testing

Run unit tests:
```bash
npm test
```

## Accessibility

All components include ARIA labels and focus-visible styles. Ensure descriptive labels when adding new UI.

