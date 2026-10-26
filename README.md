# Employee Dashboard

A responsive React Employee Dashboard built with **Vite**, **React Router DOM**, and **Bootstrap**.

## Features

- **Employee Directory** – Fetches and displays employee data from the JSONPlaceholder API in a sortable, responsive table.
- **Add Employee Form** – Validated form with Name, Designation, Location, and Salary fields.
- **Client-side Routing** – Navigate between Dashboard (`/`) and Employee Form (`/employee`).
- **Loading & Error States** – Graceful spinners and error messages for API failures.
- **Responsive Design** – Looks great on desktop, tablet, and mobile.

## Tech Stack

| Technology       | Purpose              |
| ---------------- | -------------------- |
| React 18         | UI framework         |
| Vite             | Build tool / dev server |
| React Router DOM | Client-side routing  |
| Bootstrap 5      | CSS framework        |

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**.

## Project Structure

```
src/
├── components/
│   └── Navbar.jsx        # Navigation bar
├── pages/
│   ├── Dashboard.jsx     # Home – employee table
│   └── EmployeeForm.jsx  # Add employee form
├── App.jsx               # Router setup
├── main.jsx              # Entry point
└── index.css             # Custom styles
```

## Build for Production

```bash
npm run build
npm run preview
```
