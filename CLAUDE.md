# Sidewalks - Development Guide for Claude

## Project Overview

Sidewalks is a full-stack TypeScript web application designed to curate activities for users and friends. It's built with Next.js 15.4.5 (React 19) on the frontend and Express.js on the backend, featuring a modern development setup with comprehensive tooling.

**Target Domain**: sidewalkshq.com  
**Architecture**: Full-stack TypeScript with separate frontend (Next.js) and backend (Express.js) servers

## Development Commands

### Quick Start
```bash
# Frontend only (port 3000)
./bin/dev
# or
npm run dev

# Backend only (port 3001) 
./bin/dev-server
# or
npm run dev:server

# Full stack development (both servers)
./bin/dev-all
# or
npm run dev:all
```

### Other Commands
```bash
npm run build        # Build Next.js for production
npm run start        # Start production Next.js server
npm run lint         # Run ESLint
```

## Architecture Overview

### Frontend (Next.js App Router)
- **Framework**: Next.js 15.4.5 with App Router
- **Port**: 3000
- **Styling**: Tailwind CSS v4 with custom CSS variables
- **Fonts**: Geist Sans & Geist Mono (optimized Google Fonts)
- **Structure**: 
  - `/src/app/` - App Router pages and layouts
  - Custom CSS variables for theming (light/dark mode support)

### Backend (Express.js)
- **Framework**: Express.js v5.1.0
- **Port**: 3001
- **Security**: Helmet.js for security headers, CORS enabled
- **Hot Reload**: Nodemon with ts-node for development
- **Health Check**: `/api/health` endpoint available

### Key Technologies
- **TypeScript**: Strict mode enabled, ES2017 target
- **Build Tools**: Next.js built-in bundler
- **Linting**: ESLint with Next.js recommended configs
- **Development**: Nodemon + ts-node for backend hot reload

## Project Structure

```
/
├── src/app/                 # Next.js App Router
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles + Tailwind
├── server/
│   └── index.ts            # Express.js server entry
├── bin/                    # Development scripts
│   ├── dev                 # Frontend only
│   ├── dev-server          # Backend only  
│   └── dev-all             # Full stack
├── plans/                  # Project specifications
│   └── specifications_v0.md # Detailed feature requirements
└── public/                 # Static assets
```

## Configuration Details

### TypeScript Configuration
- Path aliases: `@/*` maps to `./src/*`
- Strict mode enabled with incremental compilation
- Next.js plugin integrated for optimal bundling

### Styling System
- **Tailwind CSS v4** with PostCSS integration
- CSS custom properties for theming:
  - `--background` / `--foreground` with dark mode support
  - Font variables for Geist Sans/Mono
- Automatic dark mode detection via `prefers-color-scheme`

### ESLint Setup
- Next.js core web vitals rules
- TypeScript integration
- Flat config format (ESLint v9)

## Development Workflow

### Starting Development
1. **Full Stack**: Use `./bin/dev-all` to run both servers simultaneously
2. **Frontend Only**: Use `./bin/dev` for UI development
3. **Backend Only**: Use `./bin/dev-server` for API development

### Server Communication
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Health check: http://localhost:3001/api/health

### Key Development Features
- **Hot Reload**: Both frontend (Next.js) and backend (nodemon) support hot reload
- **TypeScript**: Full-stack TypeScript with strict type checking
- **Path Aliases**: Use `@/` imports for cleaner src/ references
- **Security**: Helmet.js and CORS configured for backend

## Important Notes for Future Development

### Current State
- **Fresh Setup**: Project is in initial state with default Next.js structure
- **Backend Ready**: Express server configured with security middleware
- **Styling Ready**: Tailwind CSS v4 configured with custom theming
- **Development Scripts**: Comprehensive bin scripts for different dev scenarios

### Planned Features (per specifications_v0.md)
- User authentication system
- Activity management with CRUD operations  
- Google Calendar integration
- Playlist and friend invitation system
- Activity coordination algorithms
- PostgreSQL database integration

### Development Best Practices
- Use path aliases (`@/`) for src imports
- Follow RESTful API conventions for backend routes
- Implement standard resource attributes (id, slug, created_at, etc.)
- Archive resources instead of hard deletion (archived_at field)
- Maintain TypeScript strict mode compliance

### Missing Integrations (Future)
- Database layer (PostgreSQL planned)
- Authentication system
- Google Calendar API
- Environment variable configuration
- Testing framework setup
- Production deployment configuration

This setup provides a solid foundation for rapid full-stack TypeScript development with modern tooling and best practices.