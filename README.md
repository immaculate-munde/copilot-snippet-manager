# 🚀 CodeVault AI - AI-Powered Code Snippet Manager

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://github.com/immaculate-munde/copilot-snippet-manager)
[![GitHub](https://img.shields.io/github/license/immaculate-munde/copilot-snippet-manager)](LICENSE)

**Built at the GitHub Copilot Event** - A modern, full-stack snippet manager with AI superpowers.

## ✨ Features

### 🎯 Core Features
- **📝 Snippet Management** - Create, edit, delete, and organize code snippets
- **🔍 Smart Search** - Find snippets instantly with text search
- **🎨 Syntax Highlighting** - Beautiful code display for 20+ languages
- **📁 Collections** - Organize snippets into custom collections
- **📋 Copy to Clipboard** - One-click code copying
- **🌙 Dark/Light Mode** - Beautiful themes for any preference

### 🤖 AI-Powered Features
- **🧠 Code Explanation** - AI explains what your code does in plain English
- **🏷️ Auto-Tagging** - Automatically generate relevant tags
- **🔎 Semantic Search** - Find code by concept, not just keywords
- **💡 Code Improvements** - Get AI suggestions for better code
- **🔗 Similar Snippets** - Discover related code automatically

### ⚡ Developer Experience
- **⌨️ Keyboard Shortcuts** - Navigate like a pro
- **🎯 Toast Notifications** - Clean, non-intrusive feedback
- **📱 Responsive Design** - Works on all devices
- **🚀 Fast Performance** - Built with Vite for instant loading
- **♿ Accessible** - Keyboard navigation and ARIA labels

## 🛠️ Tech Stack

**Frontend:**
- React 18 with JavaScript
- Vite (Build tool)
- React Router (Navigation)
- Prism.js (Syntax highlighting)
- Zustand (State management)
- Axios (HTTP client)

**Backend:**
- Node.js + Express
- PostgreSQL (Database)
- OpenAI API (AI features)
- Morgan (Logging)

## 📋 Prerequisites

- Node.js v16+
- PostgreSQL v12+
- OpenAI API Key (optional, for AI features)

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/immaculate-munde/copilot-snippet-manager.git
cd copilot-snippet-manager
```

### 2. Database Setup
```bash
# Create database
createdb codevault

# Or using psql
psql -U postgres -c "CREATE DATABASE codevault;"

# Run schema
psql -U postgres -d codevault -f server/src/models/schema.sql
```

### 3. Environment Configuration
```bash
# Copy example env file
cp .env.example .env

# Edit .env with your credentials
nano .env
```

**Required Environment Variables:**
```env
# Database
DB_USER=postgres
DB_HOST=localhost
DB_NAME=codevault
DB_PASSWORD=your_password
DB_PORT=5432

# Server
PORT=5000

# OpenAI (optional - works in demo mode without it)
OPENAI_API_KEY=sk-your-api-key-here
```

### 4. Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd ../client
npm install
```

### 5. Run Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

🎉 **Application running!**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `N` | Create new snippet |
| `Esc` | Close modal/form |
| `?` | Show keyboard shortcuts |
| `Ctrl + K` | Focus search |

## 🎨 Features Showcase

### Code Snippet Management
- Create snippets with title, description, code, language, and tags
- Beautiful syntax highlighting for all major programming languages
- Copy code to clipboard with one click
- Edit and delete snippets easily

### Collections
- Organize snippets into custom collections
- Add/remove snippets from collections
- View all snippets in a collection
- Collection counter shows snippet count

### AI Assistant (Requires OpenAI API Key)
- **Explain**: Get plain English explanation of your code
- **Improve**: Receive AI-powered improvement suggestions
- **Tags**: Auto-generate relevant tags for categorization
- **Similar**: Find related snippets automatically

### Theme System
- Toggle between dark and light themes
- Theme preference persists across sessions
- Smooth transitions between themes
- Fully styled for both modes

## 📁 Project Structure

```
copilot-snippet-manager/
├── client/                     # React frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── AIPanel.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── SnippetCard.jsx
│   │   │   ├── SnippetForm.jsx
│   │   │   ├── ThemeToggle.jsx
│   │   │   └── Toast.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── SnippetPage.jsx
│   │   │   └── CollectionPage.jsx
│   │   ├── services/          # API client
│   │   ├── hooks/             # Custom React hooks
│   │   ├── styles/            # CSS files
│   │   └── utils/             # Helper functions
│   └── package.json
├── server/                    # Node.js backend
│   ├── src/
│   │   ├── routes/           # API routes
│   │   ├── controllers/      # Business logic
│   │   ├── models/           # Database schema
│   │   ├── services/         # AI & external services
│   │   ├── middleware/       # Express middleware
│   │   └── config/           # Configuration
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

### Snippets
```
GET    /api/snippets              # List all snippets
GET    /api/snippets/:id          # Get single snippet
POST   /api/snippets              # Create snippet
PUT    /api/snippets/:id          # Update snippet
DELETE /api/snippets/:id          # Delete snippet
POST   /api/snippets/search       # Search snippets
```

### Collections
```
GET    /api/collections           # List all collections
GET    /api/collections/:id       # Get collection with snippets
POST   /api/collections           # Create collection
PUT    /api/collections/:id       # Update collection
DELETE /api/collections/:id       # Delete collection
POST   /api/collections/:id/snippets/:sid  # Add snippet
DELETE /api/collections/:id/snippets/:sid  # Remove snippet
```

### AI Features
```
POST   /api/snippets/:id/ai/explain      # Explain code
POST   /api/snippets/:id/ai/improve      # Suggest improvements
POST   /api/snippets/ai/generate-tags    # Generate tags
POST   /api/snippets/ai/semantic-search  # Semantic search
GET    /api/snippets/:id/ai/similar      # Find similar
```

## 🎯 Demo Script (For Presentations)

1. **Opening** - Show empty state, explain the problem
2. **Create** - Add a sorting algorithm, auto-tag it
3. **Search** - Demonstrate text search
4. **AI Explain** - Click explain to see AI breakdown
5. **Collections** - Create "Algorithms" collection, add snippet
6. **Theme** - Toggle between dark/light mode
7. **Similar** - Show AI finding related snippets
8. **Polish** - Demonstrate keyboard shortcuts

## 🚀 Deployment

### Option 1: Vercel (Frontend) + Railway (Backend)

**Frontend (Vercel):**
```bash
cd client
vercel
```

**Backend (Railway):**
```bash
cd server
# Connect to GitHub and Railway will auto-deploy
```

### Option 2: Docker

```bash
# Coming soon: Docker Compose setup
```

## 🤝 Contributing

Built during GitHub Copilot Event. Contributions welcome!

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

## 📝 License

MIT License - See [LICENSE](LICENSE) file

## 🙏 Acknowledgments

- Built with [GitHub Copilot](https://github.com/features/copilot)
- Powered by [OpenAI](https://openai.com)
- Syntax highlighting by [Prism.js](https://prismjs.com)
- Icons from Unicode Emoji

## 📧 Contact

Immaculate Munde - [@immaculate-munde](https://github.com/immaculate-munde)

Project Link: [https://github.com/immaculate-munde/copilot-snippet-manager](https://github.com/immaculate-munde/copilot-snippet-manager)

---

**⭐ Star this repo if you find it useful!**
