# Ghana Court Bulletin

A web platform for managing and distributing Ghana's legal documentation.

## Features

### Gazettes
- Year-based navigation with quarterly/monthly breakdown
- Bar chart visualization for gazette distribution
- Detailed gazette view with metadata and content preview
- Download functionality

### Bulletins
- Weekly bulletin listings with pagination
- PDF preview interface with page navigation
- Document type filtering
- Search functionality

### UI/UX
- Responsive layout for all screen sizes
- Framer Motion animations
- Interactive data visualizations
- Modern component architecture

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── bulletin/          # Bulletin-related pages
│   ├── gazettes/         # Gazette-related pages
│   └── layout.tsx        # Root layout
├── components/            # Reusable UI components
│   ├── layout/           # Layout components
│   ├── home/            # Home page components
│   ├── gazettes/        # Gazette-specific components
│   └── bulletin/        # Bulletin-specific components
├── data/                 # Mock data and types
├── hooks/               # Custom React hooks
└── utils/               # Utility functions
```

## Development Setup

### Prerequisites
- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone [ORGANIZATION_REPOSITORY_URL]
   cd court-bulletin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Development Status

✅ Home page with recent gazettes
✅ Gazette browsing and filtering
✅ Bulletin listing and reading interface
✅ Responsive design
🚧 Backend integration (in progress)
🚧 Authentication system (planned)
🚧 Document management system (planned)
