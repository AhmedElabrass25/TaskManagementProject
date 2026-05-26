# Task Management Application

A modern, full-featured task management system built with cutting-edge web technologies. This application helps teams organize, track, and manage projects, tasks, epics, and team members efficiently with real-time collaboration features.

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture & Structure](#architecture--structure)
- [Performance Optimizations](#performance-optimizations)
- [Installation & Setup](#installation--setup)
- [Development](#development)
- [Project Folder Structure](#project-folder-structure)
- [State Management](#state-management)
- [Authentication & Security](#authentication--security)
- [Contributing](#contributing)

---

## 🎯 About the Project

**Task Management Application** is a comprehensive project and task management platform designed for teams to collaborate effectively. It provides a complete suite of tools for:

- **Project Management**: Create, manage, and track multiple projects
- **Task Tracking**: Organize tasks with detailed information, priorities, and deadlines
- **Epic Planning**: Break down large initiatives into manageable epics and tasks
- **Team Collaboration**: Invite team members, assign tasks, and track progress
- **Statistics & Analytics**: Monitor project progress with visual charts and metrics
- **User Authentication**: Secure login, registration, and password reset functionality

The application is built with modern, production-ready technologies and follows industry best practices for scalability, performance, and maintainability.

---

## ✨ Key Features

### 🔐 Authentication System

- User registration with email validation
- Secure login with session management
- Forgot password functionality
- Password reset with secure token verification
- JWT-based authentication via Supabase

### 📊 Dashboard

- Real-time project overview
- Statistics and analytics with charts
- Weekly calendar view
- Performance metrics and summary cards
- Customizable toolbar filters

### 🗂️ Project Management

- Create and manage multiple projects
- Edit project details
- Project search and filtering
- Infinite scroll for large project lists
- Mobile-responsive project cards

### 📝 Task Management

- Create, read, update, and delete tasks
- Assign tasks to team members
- Set priorities and deadlines
- Drag-and-drop task organization
- Task filtering and sorting
- Mobile and desktop task views

### 🎬 Epic Planning

- Break down projects into epics
- Organize epics by project
- Track epic progress
- Link tasks to epics

### 👥 Team Collaboration

- Invite team members to projects
- Manage team member roles
- Real-time member status updates
- Accept project invitations

### 📈 Analytics & Reporting

- Interactive charts and graphs
- Project statistics
- Team performance metrics
- Weekly activity tracking

---

## 🛠️ Tech Stack

### Frontend Framework

- **Next.js 16.2.3** - React framework with App Router, Server Components, and built-in optimization
- **React 19.2.4** - Latest React version with new features and performance improvements
- **TypeScript 5** - Statically typed JavaScript for better code reliability

### State Management & Forms

- **@reduxjs/toolkit 2.11.2** - Simplified Redux development with powerful middleware
- **react-redux 9.2.0** - React bindings for Redux
- **react-hook-form 7.72.1** - Performant, flexible form validation
- **@hookform/resolvers 5.2.2** - Validation resolver library for hook-form
- **zod 4.3.6** - TypeScript-first schema validation library

### UI & Styling

- **Tailwind CSS 4** - Utility-first CSS framework for rapid UI development
- **PostCSS 8.5.10** - CSS transformation tool with Tailwind plugin
- **react-select 5.10.2** - Accessible select component with filtering

### Drag & Drop

- **@dnd-kit/react 0.4.0** - Modern drag-and-drop library for React
- **@dnd-kit/sortable 10.0.0** - Sortable plugin for drag-and-drop
- **@dnd-kit/dom 0.4.0** - DOM utilities for drag-and-drop
- **@dnd-kit/utilities 3.2.2** - Utility functions for dnd-kit

### Backend & Database

- **@supabase/supabase-js 2.103.2** - JavaScript client for Supabase (PostgreSQL backend)
- Supabase provides: Database, Authentication, Real-time features, Storage

### Notifications

- **sonner 2.0.7** - Lightweight toast notification library with smooth animations

### Development Tools

- **ESLint 9** - Code quality and consistency linting
- **TypeScript Compiler** - Type checking and transpilation

---

## 🏗️ Architecture & Structure

### Project Layout

```
task_management/
├── app/                          # Next.js app directory
│   ├── (auth)/                   # Authentication routes (login, register, etc.)
│   │   ├── login/                # Login page with form
│   │   ├── register/             # Registration with validation
│   │   ├── forgot-password/      # Forgot password flow
│   │   └── reset-password/       # Password reset with token
│   │
│   ├── (dashboard)/              # Protected dashboard routes
│   │   ├── projects/             # Projects listing and management
│   │   │   ├── add/              # Create new project
│   │   │   └── [projectId]/      # Project details and sub-routes
│   │   │       ├── tasks/        # Task management for project
│   │   │       ├── epics/        # Epic management
│   │   │       ├── members/      # Team member management
│   │   │       └── edit/         # Edit project details
│   │   │
│   │   └── my-statistics/        # User dashboard with analytics
│   │       ├── Charts.tsx        # Chart components
│   │       ├── Header.tsx        # Dashboard header
│   │       ├── SummaryCards.tsx  # Key metrics cards
│   │       └── WeeklyCalender.tsx # Calendar view
│   │
│   ├── invite/                   # Invitation acceptance routes
│   ├── Providers.tsx             # Redux provider wrapper
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
│
├── components/                   # Shared components
│   ├── Navbar.tsx                # Navigation bar
│   ├── Sidebar.tsx               # Sidebar navigation
│   ├── Pagination.tsx            # Pagination component
│   ├── InfiniteList.tsx          # Infinite scroll wrapper
│   ├── Spinner.tsx               # Loading spinner
│   ├── InitUser.tsx              # User initialization
│   └── ui/                       # UI primitives
│       ├── Button.tsx            # Button component
│       └── Input.tsx             # Input component
│
├── hooks/                        # Custom React hooks
│   └── useInfiniteScroll.ts      # Infinite scroll hook
│
├── lib/                          # Utility libraries
│   ├── api.ts                    # API client setup
│   └── auth/
│       └── refresh.ts            # Token refresh logic
│
├── services/                     # Business logic services
│   ├── user.service.ts           # User operations
│   └── logout.service.ts         # Logout handler
│
├── store/                        # Redux store
│   ├── index.ts                  # Store configuration
│   ├── hooks.ts                  # Custom Redux hooks
│   └── slices/                   # Redux slices
│       ├── userSlice.ts          # User state
│       └── tasks/                # Task-related slices
│           ├── taskSlice.ts      # Task state
│           ├── taskModalSlice.ts # Modal state
│           └── tasksThunk.ts     # Async actions
│
├── types/                        # TypeScript type definitions
│   └── types.ts                  # Global types
│
├── public/                       # Static assets
│   └── icons/                    # Icon assets
│
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── postcss.config.mjs           # PostCSS configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── eslint.config.mjs            # ESLint configuration
├── pnpm-workspace.yaml          # PNPM workspace config
└── package.json                 # Dependencies
```

### Directory Purposes

| Directory     | Purpose                                         |
| ------------- | ----------------------------------------------- |
| `app/`        | Next.js App Router pages and layouts            |
| `components/` | Reusable React components                       |
| `hooks/`      | Custom React hooks for shared logic             |
| `lib/`        | Utility functions and API clients               |
| `services/`   | Business logic and external service integration |
| `store/`      | Redux state management                          |
| `types/`      | TypeScript interfaces and types                 |
| `public/`     | Static assets (images, icons, fonts)            |

---

## ⚡ Performance Optimizations

### 1. **Next.js Optimizations**

- **App Router**: Latest routing system with improved performance
- **Server Components**: Render components on the server to reduce client JS
- **Code Splitting**: Automatic route-based code splitting for faster page loads
- **Image Optimization**: Automatic image optimization and lazy loading
- **Font Optimization**: Geist font is pre-loaded and optimized

### 2. **React Performance**

- **React 19**: Latest version with concurrent rendering and automatic batching
- **Memoization**: Components use `React.memo()` where beneficial
- **Lazy Loading**: Dynamic imports for dashboard features

### 3. **State Management**

- **Redux Toolkit**: Immer integration for efficient state updates
- **Thunks**: Async operations are handled efficiently with thunks
- **Selectors**: Memoized selectors prevent unnecessary re-renders

### 4. **Data Fetching**

- **Infinite Scroll**: Paginated data loading prevents loading entire datasets
- **Caching**: Supabase client caching reduces redundant API calls
- **Server-Side Rendering**: Initial page loads are faster with SSR

### 5. **Bundle Size**

- **Tree Shaking**: Unused code is eliminated during build
- **Code Splitting**: Large features are split into separate bundles
- **Compression**: Gzip compression for production builds

### 6. **CSS Performance**

- **Tailwind CSS**: Utility-first CSS with automatic purging
- **PostCSS**: Optimized CSS processing and minification
- **Critical CSS**: Inlines critical CSS for first paint

### 7. **Form Performance**

- **React Hook Form**: Minimal re-renders during form input
- **Zod**: Lightweight validation with zero dependencies
- **Uncontrolled Components**: Reduces component overhead

### 8. **Rendering Strategy**

- **Static Generation**: Pre-rendered pages where possible
- **Incremental Static Regeneration**: Pages update on demand
- **Client-Side Rendering**: Interactive features use CSR for interactivity

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** (v8 or higher) - Fast package manager
- **Supabase Account** - For backend services

### Step 1: Clone and Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd task_management

# Install dependencies using pnpm
pnpm install
```

### Step 2: Environment Variables

Create a `.env.local` file in the project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# API Configuration (if applicable)
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Step 3: Database Setup

Ensure your Supabase project has the following tables:

- `users` - User accounts and profiles
- `projects` - Project data
- `tasks` - Task information
- `epics` - Epic planning data
- `project_members` - Team member assignments
- `invitations` - Project invitations

### Step 4: Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 💻 Development

### Available Scripts

```bash
# Start development server with hot reload
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run ESLint for code quality
pnpm lint
```

### Development Workflow

1. **Create a new branch** for features or fixes
2. **Make changes** and test locally with `pnpm dev`
3. **Run linting** with `pnpm lint` to ensure code quality
4. **Build and test** with `pnpm build` before committing
5. **Commit with descriptive messages** following conventional commits

### Hot Module Replacement (HMR)

- Edit files in `app/` or `components/` and see changes instantly
- State is preserved between reloads (with proper Providers setup)

---

## 📁 Project Folder Structure Explained

### Authentication Flow (`app/(auth)/`)

Handles user authentication with multiple routes:

- `/login` - Existing user login
- `/register` - New user registration
- `/forgot-password` - Password recovery
- `/reset-password` - Token-based password reset

Each route contains:

- `page.tsx` - Page component
- `action.ts` - Server actions for form handling
- `schema.ts` - Zod validation schemas
- `features/` - Feature components

### Dashboard (`app/(dashboard)/`)

Protected routes requiring authentication:

- `/projects` - List all projects with infinite scroll
- `/projects/add` - Create new project
- `/projects/[projectId]/*` - Project details and sub-features
- `/my-statistics` - User dashboard with charts

### Components (`components/`)

Shared UI components:

- **Layout Components**: Navbar, Sidebar
- **Data Display**: Pagination, InfiniteList, Spinner
- **UI Primitives**: Button, Input
- **Initialization**: InitUser for setup logic

### Store (`store/`)

Redux state management:

- **Slices**: Individual feature state (user, tasks)
- **Thunks**: Async operations (API calls)
- **Hooks**: Custom Redux hooks for components
- **Selectors**: Memoized state selectors

---

## 🔄 State Management

### Redux Store Structure

```typescript
{
  user: {
    id: string
    email: string
    profile: UserProfile
    isAuthenticated: boolean
  },
  tasks: {
    items: Task[]
    loading: boolean
    error: string | null
    pagination: { page: number, total: number }
  },
  taskModal: {
    isOpen: boolean
    taskId: string | null
    mode: 'create' | 'edit'
  }
}
```

### Using Redux in Components

```typescript
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchTasks } from '@/store/slices/tasks/tasksThunk'

export function TaskList() {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(state => state.tasks.items)

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  return <div>{/* render tasks */}</div>
}
```

---

## 🔐 Authentication & Security

### Authentication Methods

- **Email/Password**: Standard authentication
- **JWT Tokens**: Supabase manages JWT lifecycle
- **Token Refresh**: Automatic token refresh in `lib/auth/refresh.ts`

### Security Features

- **Protected Routes**: Dashboard routes require authentication
- **Server Actions**: Server-side validation and execution
- **CORS**: Configured for secure cross-origin requests
- **Password Hashing**: Supabase handles bcrypt hashing
- **Session Management**: Automatic session management

### Protected Route Example

```typescript
// Redirect to login if not authenticated
const {
  data: { session },
} = await supabase.auth.getSession();
if (!session) redirect("/login");
```

---

## 📚 API Integration

### Supabase Client Setup

Located in `lib/api.ts`:

```typescript
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
```

### Common Operations

```typescript
// Fetch data
const { data, error } = await supabase.from("projects").select("*").limit(10);

// Insert data
const { data, error } = await supabase
  .from("tasks")
  .insert([{ title: "New Task", projectId: "123" }]);

// Update data
const { data, error } = await supabase
  .from("tasks")
  .update({ status: "completed" })
  .eq("id", taskId);

// Real-time subscriptions
const subscription = supabase
  .channel("tasks")
  .on("*", { event: "*" }, (payload) => console.log(payload))
  .subscribe();
```

---

## 🎨 Styling with Tailwind CSS

This project uses Tailwind CSS v4 for styling:

```tsx
// Class-based styling
<button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white">
  Click me
</button>

// Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* responsive grid */}
</div>

// Dark mode support
<div className="bg-white dark:bg-slate-900 text-black dark:text-white">
  Content
</div>
```

---

## 🎯 Contributing

### Code Style

- Follow TypeScript strict mode
- Use ESLint for code quality
- Add comments for complex logic
- Use meaningful variable and function names

### Commits

- Use conventional commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`
- Example: `feat: add task filtering by priority`

### Before Pushing

```bash
# Lint code
pnpm lint

# Build project
pnpm build

# Test locally
pnpm dev
```

---

## 📞 Support & Documentation

### Official Documentation

- **[Next.js Documentation](https://nextjs.org/docs)** - Next.js features and API
- **[React Documentation](https://react.dev)** - React patterns and hooks
- **[Tailwind CSS](https://tailwindcss.com)** - CSS utility classes
- **[Supabase Docs](https://supabase.com/docs)** - Backend services
- **[Redux Toolkit](https://redux-toolkit.js.org)** - State management

### Project Resources

- Issue Tracker: [GitHub Issues]
- Documentation: [Wiki]
- Discussions: [GitHub Discussions]

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## ✅ Summary of Technologies Used

| Category               | Technologies                                     |
| ---------------------- | ------------------------------------------------ |
| **Framework**          | Next.js 16.2.3, React 19.2.4                     |
| **Language**           | TypeScript 5                                     |
| **Styling**            | Tailwind CSS 4, PostCSS 8.5.10                   |
| **State Management**   | Redux Toolkit 2.11.2, React Redux 9.2.0          |
| **Forms & Validation** | React Hook Form 7.72.1, Zod 4.3.6                |
| **Drag & Drop**        | @dnd-kit suite (react, sortable, dom, utilities) |
| **Backend & DB**       | Supabase (PostgreSQL, Auth, Real-time)           |
| **UI Components**      | React Select 5.10.2, Custom UI Components        |
| **Notifications**      | Sonner 2.0.7                                     |
| **Dev Tools**          | ESLint 9, TypeScript Compiler                    |
| **Package Manager**    | pnpm                                             |

---

**Built with ❤️ for efficient project and task management**
