# Copilot Instructions for CodeVault AI

## Project Overview

CodeVault AI is a full-stack code snippet manager with AI-powered features built using React, Node.js, Express, and PostgreSQL.

## Build & Run Commands

### Development
```bash
# Backend: cd server && npm run dev
# Frontend: cd client && npm run dev
```

### Database Setup
```bash
createdb codevault
psql -U postgres -d codevault -f server/src/models/schema.sql
```

## Architecture

- **Frontend**: React + Vite, React Router, Prism.js syntax highlighting
- **Backend**: Node.js + Express + PostgreSQL
- **AI**: OpenAI API (optional, works in demo mode without)
- **Styling**: CSS custom properties for theming

## Key Conventions

- JavaScript (no TypeScript)
- Async/await for async operations
- Arrow functions preferred
- CSS modules per component
- RESTful API structure
- Error handling with try/catch and toast notifications

See README.md for full documentation.
