# 🚀 CodeVault AI

An AI-Powered Code Snippet Manager built with React, Node.js, and PostgreSQL.

## ✨ Features

- 📝 **Snippet Management** - Create, edit, delete, and organize code snippets
- 🔍 **Smart Search** - Find snippets instantly with text search
- 🤖 **AI-Powered** - Semantic search, auto-tagging, and code explanations
- 🎨 **Syntax Highlighting** - Beautiful code display for all languages
- 📁 **Collections** - Organize snippets into collections
- 🌙 **Dark Mode** - Eye-friendly interface
- ⚡ **Fast & Responsive** - Built with Vite for blazing-fast performance

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite
- React Router
- Axios
- Prism.js (syntax highlighting)
- Zustand (state management)

**Backend:**
- Node.js
- Express
- PostgreSQL
- Morgan (logging)

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd copilot-snippet-manager
```

### 2. Set up PostgreSQL database
```bash
# Create database
createdb codevault

# Or using psql
psql -U postgres
CREATE DATABASE codevault;
\q
```

### 3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your database credentials
```

### 4. Initialize database schema
```bash
psql -U postgres -d codevault -f server/src/models/schema.sql
```

### 5. Install dependencies

**Server:**
```bash
cd server
npm install
```

**Client:**
```bash
cd client
npm install
```

### 6. Run the application

**Terminal 1 - Start backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Start frontend:**
```bash
cd client
npm run dev
```

The app will be running at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Project Structure

```
copilot-snippet-manager/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API calls
│   │   ├── hooks/         # Custom hooks
│   │   ├── utils/         # Helper functions
│   │   └── styles/        # CSS files
│   └── package.json
├── server/                # Node.js backend
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── controllers/   # Business logic
│   │   ├── models/        # Database models
│   │   ├── services/      # External services
│   │   ├── middleware/    # Express middleware
│   │   └── config/        # Configuration
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

```
GET    /api/snippets              # Get all snippets
GET    /api/snippets/:id          # Get single snippet
POST   /api/snippets              # Create snippet
PUT    /api/snippets/:id          # Update snippet
DELETE /api/snippets/:id          # Delete snippet
POST   /api/snippets/search       # Search snippets
POST   /api/snippets/semantic     # AI semantic search (coming soon)
POST   /api/snippets/:id/explain  # AI explanation (coming soon)
```

## 🎯 Development Roadmap

- [x] Phase 1: Project setup & infrastructure
- [ ] Phase 2: Core snippet CRUD
- [ ] Phase 3: Collections & organization
- [ ] Phase 4: AI integration
- [ ] Phase 5: UI/UX polish
- [ ] Phase 6: Advanced features
- [ ] Phase 7: Deployment

## 🤝 Contributing

This project was built for the GitHub Copilot Event. Contributions are welcome!

## 📄 License

MIT

---

Built with ❤️ using GitHub Copilot
