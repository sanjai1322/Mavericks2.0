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
- **Database**: Replit Database for data persistence and user management
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **AI Integration**: OpenRouter API integration for intelligent skill extraction
- **CORS**: Enabled for cross-origin requests with credentials support
- **Middleware**: Custom authentication, request logging, and error handling
- **Development**: Hot reload with custom middleware logging

### Data Storage Architecture
- **Database**: Replit Database for development and prototyping
- **Structure**: Key-value storage with user indexing by email and ID
- **User Management**: Comprehensive user profiles with bio, skills, level, and XP tracking
- **AI-Enhanced**: Automated skill extraction and profile analysis using OpenRouter AI
- **Authentication**: Secure password hashing with bcrypt and JWT token management

### Authentication and Authorization
- **Authentication**: JWT-based authentication with secure token generation
- **Password Security**: Bcrypt hashing for secure password storage
- **User Management**: Complete CRUD operations for user profiles with AI-powered skills tracking
- **Profile Features**: Bio analysis with automatic skill extraction using OpenRouter AI
- **Token Management**: 7-day expiration with Bearer token authentication

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
- **Replit Database**: Key-value database for development and user data storage
- **OpenRouter AI**: AI-powered skill extraction and profile analysis service

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
- **JWT**: JSON Web Token implementation for authentication
- **Bcrypt**: Password hashing library for security
- **CORS**: Cross-Origin Resource Sharing middleware
- **Node-fetch**: HTTP client for AI API integration

### Fonts and Assets
- **Google Fonts**: Poppins font family for consistent typography
- **Custom CSS Variables**: Theme-based color system with dark mode support