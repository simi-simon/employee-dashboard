import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import EmployeeForm from './pages/EmployeeForm';

function App() {
  const [localEmployees, setLocalEmployees] = useState([]);

  const handleAddEmployee = (employee) => {
    setLocalEmployees((prev) => [...prev, employee]);
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route
              path="/"
              element={<Dashboard localEmployees={localEmployees} />}
            />
            <Route
              path="/employee"
              element={<EmployeeForm onAddEmployee={handleAddEmployee} />}
            />
          </Routes>
        </main>
        <footer className="footer">
          © {new Date().getFullYear()} Employee Dashboard. Built with React &amp; Bootstrap.
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
