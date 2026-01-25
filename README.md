# Vavnota - Loom Project Manager

A modern React web application designed for weavers to plan, manage, and document their weaving projects. Vavnota helps you organize yarn information, track warp and weft specifications, and visualize your loom projects.

## Features

- **Project Management**: Create and manage multiple weaving projects with detailed metadata
- **Yarn Tracking**: Store and edit yarn specifications including fiber content, thickness, and color information
- **Warp/Weft Planning**: Define and modify warp and weft chain specifications for your projects
- **Project List View**: Browse and manage all your projects in an organized list
- **Project Details**: View comprehensive project information including metrics and yarn details
- **Print Support**: Generate printable versions of your project specifications
- **State Management**: Seamless state persistence using Jotai atoms for reactive updates
- **Responsive Design**: Works smoothly across different screen sizes

## Tech Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **State Management**: Jotai 2.16.2
- **Routing**: React Router 7.12.0
- **Forms**: React Hook Form 7.71.0
- **Icons**: React Icons 5.5.0
- **Styling**: CSS Modules and custom CSS
- **Code Quality**: ESLint with React plugin support

## Project Structure

```
src/
├── pages/
│   ├── Home.jsx              # Home/dashboard page
│   └── ProjectView.jsx       # Detailed project view
├── components/
│   ├── ShowProjectList.jsx   # Project list display
│   ├── YarnForm.jsx          # Yarn input form
│   ├── YarnEditing.jsx       # Yarn editing interface
│   ├── CreateWarpChain.jsx   # Warp chain creation
│   ├── ShowWarpChains.jsx    # Warp chain display
│   ├── UpdateProjectInfo.jsx # Project metadata editor
│   ├── UpdateProjectMetrics.jsx # Project metrics editor
│   ├── PrintButton.jsx       # Print functionality
│   └── WarpingHelp.jsx       # Help/guidance component
├── atoms/
│   ├── currentProjectAtom.js # Current project state
│   ├── projectListAtom.js    # Projects list state
│   ├── warpAtom.js           # Warp specifications state
│   └── weftAtom.js           # Weft specifications state
├── constants/
│   ├── projectStatus.js      # Project status constants
│   └── yarnConstants.js      # Yarn-related constants
├── services/
│   └── projectHelpers.js     # Project utility functions
├── css/
│   └── ProjectView.css       # Project view styles
├── assets/                   # Images and static assets
└── App.jsx                   # Root component
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Vavnota-React
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

### Building

Create a production build:
```bash
npm run build
```

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## Code Quality

Run ESLint to check code quality:
```bash
npm run lint
```

## Usage

1. **Create a New Project**: Start by creating a new weaving project with basic information (name, description, etc.)
2. **Add Yarns**: Define the yarns you'll be using, including fiber type, weight, and color
3. **Plan Warp/Weft**: Set up your warp and weft specifications with chain details
4. **Manage Projects**: View all projects, edit details, and track project status
5. **Print**: Generate a printable version of your project for reference at the loom

## Features in Detail

### Project Management
- Create new weaving projects
- Edit project information and metrics
- View project lists with filtering options
- Delete or archive projects

### Yarn Management
- Add multiple yarn entries
- Edit yarn specifications (fiber, thickness, color)
- View yarn information in project context
- Organize yarns by project

### Warp/Weft Planning
- Create warp chains with specific counts
- Define weft specifications
- Use warp as weft when applicable
- Visual representation of warping setup

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is provided as-is for personal use and collaboration.

## Author

Created for weavers, by weaving enthusiasts.

---

Happy Weaving! 🧵
