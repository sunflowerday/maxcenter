# MaxCenter Dashboard - Design Specification

## Overview

MaxCenter is an AI product team management and evaluation platform organized around three dimensions:
- **Product-Market Fit (PMF)**: Use cases and customers
- **Product-Technology Fit (PTF/Tech)**: Benchmarking
- **Product-Team Fit (PTF/Team)**: Team and AI agents

## Implementation Strategy

### App Location
- **Path**: `apps/maxcenter` (separate from `apps/v4` documentation site)
- **Type**: Next.js 16 app with App Router
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **Reuse**: Can import components from `packages/shadcn` registry

### Architecture

```
apps/maxcenter/
├── app/
│   ├── layout.tsx              # Root layout with sidebar
│   ├── page.tsx               # Redirect to /max/use-cases
│   ├── max/
│   │   ├── layout.tsx         # MaxCenter layout (sidebar + content)
│   │   ├── use-cases/         # PMF: Use case library
│   │   │   ├── page.tsx       # Card grid + filters
│   │   │   └── [id]/page.tsx  # Use case detail
│   │   ├── customers/
│   │   │   └── page.tsx       # PMF: Customer clustering
│   │   ├── bench/
│   │   │   └── page.tsx       # PTF/Tech: Benchmark views
│   │   ├── humans/
│   │   │   └── page.tsx       # PTF/Team: Team members
│   │   └── agents/
│   │       └── page.tsx       # PTF/Team: AI agents
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── layout/
│   │   ├── sidebar.tsx        # Collapsible sidebar
│   │   ├── sidebar-nav.tsx    # Navigation items
│   │   └── sidebar-group.tsx  # Collapsible section group
│   └── max/
│       ├── use-case-card.tsx
│       ├── use-case-filters.tsx
│       ├── use-case-detail.tsx
│       ├── customer-scatter.tsx
│       ├── bench-chart.tsx
│       ├── human-card.tsx
│       └── agent-card.tsx
├── lib/
│   ├── mock-data.ts           # All mock data
│   └── utils.ts
└── package.json
```

## Phase 1: Skeleton (Navigation Shell)

### Layout Structure

```
┌──────────────────────────────────────────────────────────────┐
│ [≡] MaxCenter                                              │  ← Header
├────────────┬───────────────────────────────────────────────┤
│            │                                                │
│  Product   │   Main Content Area                           │
│  Market    │   (Route-dependent)                            │
│  Fit       │                                                │
│  ─────────│                                                │
│  > Use Cases│                                               │
│  > Customers│                                               │
│            │                                                │
│  Product   │                                                │
│  Technology│                                                │
│  Fit       │                                                │
│  ─────────│                                                │
│  > Bench   │                                                │
│            │                                                │
│  Product   │                                                │
│  Team Fit  │                                                │
│  ─────────│                                                │
│  > Humans  │                                                │
│  > Agents  │                                                │
│            │                                                │
└────────────┴────────────────────────────────────────────────┘
         ↑ Sidebar (collapsible)
```

### Components

1. **Sidebar** (`components/layout/sidebar.tsx`)
   - Collapsible (expanded ~240px, collapsed ~60px)
   - Toggle button at top
   - Three sections: PMF, PTF/Tech, PTF/Team
   - Each section collapsible
   - Active route highlighting

2. **SidebarGroup** (`components/layout/sidebar-group.tsx`)
   - Section header (e.g., "Product Market Fit")
   - Collapsible children items
   - Chevron indicator for collapse state

3. **SidebarNavItem** (`components/layout/sidebar-nav.tsx`)
   - Icon + label (label hidden when collapsed)
   - Active state with background highlight
   - Hover state

## Phase 2: Max Use Cases

### Use Case List Page (`/max/use-cases`)

```
┌──────────────────────────────────────────────────────────────┐
│ Use Cases                                      [filter icon] │
├──────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐  │
│ │ Filters: [Domain ▼] [Difficulty ▼] [Skills ▼] [Region ▼]│  │
│ │                                                         │  │
│ │ Selected: [Finance ×] [Advanced ×]           [Clear all] │  │
│ └─────────────────────────────────────────────────────────┘  │
│                                                              │
│ ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │
│ │ Use Case 1  │  │ Use Case 2  │  │ Use Case 3  │           │
│ │ ───────────│  │ ───────────│  │ ───────────│           │
│ │ Summary...  │  │ Summary...  │  │ Summary...  │           │
│ │ [Tags]      │  │ [Tags]      │  │ [Tags]      │           │
│ └─────────────┘  └─────────────┘  └─────────────┘           │
│                                                              │
│ ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │
│ │ Use Case 4  │  │ Use Case 5  │  │ Use Case 6  │           │
│ └─────────────┘  └─────────────┘  └─────────────┘           │
└──────────────────────────────────────────────────────────────┘
```

### Filter System

Four filter dimensions (all multi-select):

| Filter    | Options (Mock)                    |
|-----------|-----------------------------------|
| Domain    | Finance, Healthcare, Education, E-commerce, Productivity |
| Difficulty| Beginner, Intermediate, Advanced, Expert |
| Skills    | Coding, Writing, Analysis, Design, Communication |
| Region    | North America, Europe, Asia, Latin America |

**Filter UI:**
- Dropdown trigger showing current selections
- Dropdown panel with checkboxes
- Selected items shown as chips below filter bar
- "Clear all" button when any filter active

### Use Case Card

Fields displayed:
- Title
- Domain tags
- Difficulty badge
- Skills tags
- Region flag/icon
- Score indicator (if available)

### Use Case Detail Page (`/max/use-cases/[id]`)

Five information sections:

1. **Background** (5W1H narrative)
   - Who, When, Where, What, Why, How

2. **Duration**
   - Product hours
   - Technology hours

3. **Market**
   - User voices (quote cards)
   - Typical users (avatar + name + role)
   - Click user → links to profile/social media
   - User profiles badges

4. **Product**
   - Benchmark score display
   - Score breakdown if applicable

5. **Technical**
   - Token count
   - Environment specs
   - Charts/metrics
   - **Comments section**: swipe comments with author, upvote/downvote counts, vote user lists

## Phase 3: Max Customers

### Customer Scatter Plot (`/max/customers`)

- 2D scatter visualization
- Points colored by K-means cluster
- Hover: show customer name tooltip
- Click: open customer detail panel

### Customer Detail Panel

- Name, avatar
- Belongs to profiles (multi-select badges)
- Typical use cases count + list
- Cluster assignment

## Phase 4: Remaining Modules

### Maxbench (`/max/bench`)
- Tab views: By Architecture, By Model, Dataset
- Run selector dropdown
- Chart components

### Max Humans (`/max/humans`)
- Team member cards
- Hourly activity view
- Online status indicators

### Max Agents (`/max/agents`)
- AI suggestion cards
- Confidence scores
- Category badges

## Data Models (Mock)

### UseCase
```typescript
interface UseCase {
  id: string
  name: string
  domain: string[]
  difficulty: string
  skills: string[]
  region: string[]
  background: {
    who: string
    when: string
    where: string
    what: string
    need: string
  }
  duration: {
    product: number  // hours
    technology: number  // hours
  }
  userVoices: UserVoice[]
  score?: {
    value: number
    type: string
    date: string
  }
  tech: {
    tokens: number
    environment: string
    metrics: Record<string, number>
  }
  comments: Comment[]
}
```

### Customer
```typescript
interface Customer {
  id: string
  name: string
  avatar: string
  x: number  // 0-1 for scatter position
  y: number  // 0-1 for scatter position
  clusterId: number
  profiles: string[]
  typicalUseCases: string[]
  tags: string[]
}
```

## Technical Stack

- **Framework**: Next.js 16
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui (from registry)
- **Charts**: Recharts (already in dependencies)
- **Icons**: Lucide React
- **State**: React hooks (useState, useContext for filters)
- **Data**: Mock data in `lib/mock-data.ts`
