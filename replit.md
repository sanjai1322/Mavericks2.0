# Overview

The Mavericks Coding Platform is a comprehensive learning and competitive programming platform built with a modern full-stack architecture. It provides AI-powered skill analysis, coding challenges, hackathons, and personalized learning paths to help developers improve their programming skills. The platform features a sleek dark purple and yellow theme with smooth animations using Framer Motion, comprehensive user management, and progress tracking capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: TailwindCSS with custom dark purple (#1E003E) and yellow (#FFD700) color scheme
- **UI Components**: Shadcn/ui component library with Radix UI primitives for accessibility
- **Typography**: Poppins font family loaded from Google Fonts
- **Animations**: Framer Motion for page transitions and interactive elements
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state and React hooks for local state
- **Form Handling**: React Hook Form with Zod validation schemas

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints with proper HTTP status codes and error handling
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Schema Validation**: Shared Zod schemas between frontend and backend
- **Development**: Hot reload with custom middleware logging

### Data Storage Architecture
- **Database**: PostgreSQL with Neon Database hosting
- **Schema Design**: Modular table structure with users, challenges, learning resources, hackathons, and progress tracking
- **Migrations**: Drizzle Kit for database schema migrations
- **Connection**: @neondatabase/serverless for edge-compatible database connections

### Authentication and Authorization
- **Authentication**: Email/password based authentication with user session management
- **Password Security**: Plain text storage (should be upgraded to hashed passwords in production)
- **User Management**: Complete CRUD operations for user profiles with skills tracking and XP systems

### Component Architecture
- **Design System**: Consistent component library with Button, Card, Modal, and form components
- **Layout Components**: Responsive Navbar and collapsible Sidebar with mobile support
- **Custom Components**: Specialized components like ProgressStepper and FloatingCodeSnippets
- **Responsive Design**: Mobile-first approach with custom useIsMobile hook

### Development Environment
- **Development Server**: Vite development server with Express backend proxy
- **Type Checking**: TypeScript with strict configuration and path mapping
- **Code Quality**: Proper file organization with shared schemas and utilities
- **Hot Reload**: Both frontend and backend support hot reloading during development

## External Dependencies

### Database Services
- **Neon Database**: PostgreSQL hosting service for production database
- **Drizzle ORM**: Database toolkit with PostgreSQL adapter for type-safe queries

### UI and Design Libraries
- **Radix UI**: Unstyled, accessible UI primitives for building design system
- **TailwindCSS**: Utility-first CSS framework for rapid styling
- **Framer Motion**: Production-ready motion library for React animations
- **Lucide React**: Beautiful and consistent icon library

### Development Tools
- **Vite**: Build tool with TypeScript support and React plugin
- **React Query**: Data fetching and caching library for server state management
- **React Hook Form**: Performant forms library with easy validation
- **Zod**: TypeScript-first schema validation library

### Runtime Dependencies
- **Express.js**: Web framework for Node.js backend
- **Wouter**: Minimalist routing library for React applications
- **Date-fns**: Modern JavaScript date utility library
- **Nanoid**: URL-safe unique string ID generator

### Fonts and Assets
- **Google Fonts**: Poppins font family for consistent typography
- **Custom CSS Variables**: Theme-based color system with dark mode support