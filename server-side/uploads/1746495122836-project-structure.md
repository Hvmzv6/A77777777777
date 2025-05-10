# Cabinet Plus - Training Management System

## Project Structure

```
cabinet-plus/
├── frontend/                # React 19 + Vite 6
│   ├── src/
│   │   ├── api/             # API calls with Axios
│   │   ├── assets/          # Static assets
│   │   ├── components/      # Reusable components
│   │   ├── features/        # Feature-specific components
│   │   │   ├── auth/        # Authentication
│   │   │   ├── dashboard/   # Dashboard UI
│   │   │   ├── programs/    # Program management
│   │   │   ├── users/       # User management
│   │   │   └── evaluation/  # Evaluation system
│   │   ├── layouts/         # Layout components
│   │   ├── pages/           # Page components
│   │   ├── store/           # Redux store
│   │   ├── utils/           # Utility functions
│   │   ├── schemas/         # Zod validation schemas
│   │   ├── hooks/           # Custom hooks
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # Entry point
│   │   └── routes.jsx       # Route definitions
│   ├── index.html           # HTML template
│   ├── vite.config.js       # Vite configuration
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   └── package.json         # Package dependencies
│
├── backend/                 # .NET 8 API
│   ├── CabinetPlus.Api/          # API project
│   │   ├── Controllers/          # API controllers
│   │   ├── Services/             # Business logic
│   │   ├── Models/               # Data models
│   │   ├── Data/                 # Data access
│   │   │   └── ApplicationDbContext.cs
│   │   ├── Middleware/           # Custom middleware
│   │   ├── Extensions/           # Extension methods
│   │   ├── Program.cs            # Entry point
│   │   └── appsettings.json      # Configuration
│   ├── CabinetPlus.Core/         # Core business logic
│   │   ├── Entities/             # Domain entities
│   │   ├── Interfaces/           # Abstractions
│   │   └── Services/             # Domain services
│   ├── CabinetPlus.Infrastructure/ # Infrastructure concerns
│   │   ├── Data/                 # EF Core implementation
│   │   ├── Identity/             # Authentication 
│   │   ├── Services/             # External services
│   │   └── FileStorage/          # File handling
│   └── CabinetPlus.Tests/        # Test project
│       ├── Unit/                 # Unit tests
│       └── Integration/          # Integration tests
│
└── README.md                # Project documentation
```

## Key Technologies

- **Frontend**:
  - React 19 with Vite 6
  - Redux Toolkit for state management
  - Tailwind CSS for styling
  - Zod for form validation
  - Axios for API requests
  - WebSockets for real-time updates

- **Backend**:
  - .NET 8 API with Clean Architecture
  - Entity Framework Core
  - JWT Authentication
  - SignalR for WebSockets
  - File storage for document management
