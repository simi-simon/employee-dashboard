import React, { useState, useEffect } from 'react';

function Dashboard({ localEmployees = [] }) {
  const [apiEmployees, setApiEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        );
        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }
        const data = await response.json();
        setApiEmployees(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  /* Merge API employees with locally-added ones */
  const allEmployees = [
    ...apiEmployees,
    ...localEmployees.map((emp, i) => ({
      id: apiEmployees.length + i + 1,
      name: emp.name,
      email: '—',
      phone: '—',
      company: { name: emp.designation },
    })),
  ];

  /* Derived stats */
  const uniqueCompanies = new Set(allEmployees.map((e) => e.company?.name)).size;
  const uniqueCities = new Set(
    apiEmployees.map((e) => e.address?.city).filter(Boolean)
  ).size;

  return (
    <div className="page-wrapper">
      {/* ── Header ── */}
      <div className="page-header" id="dashboard-header">
        <h1>Employee Directory</h1>
        <p>
          Real-time employee data fetched from JSONPlaceholder API
        </p>
      </div>

      {/* ── Error ── */}
      {error && (
        <div className="error-box" id="dashboard-error" role="alert">
          <span className="error-icon">
            <i className="bi bi-exclamation-triangle-fill"></i>
          </span>
          <div>
            <strong>Failed to load employees.</strong>
            <br />
            {error}
          </div>
        </div>
      )}

      {/* ── Loading ── */}
      {loading && (
        <div className="loading-container" id="dashboard-loading">
          <div className="spinner-custom" role="status" />
          <p>Fetching employee data…</p>
        </div>
      )}

      {/* ── Content ── */}
      {!loading && !error && (
        <>
          {/* Stats */}
          <div className="stats-bar" id="stats-bar">
            <div className="stat-card">
              <div className="stat-value">{allEmployees.length}</div>
              <div className="stat-label">Total Employees</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{uniqueCompanies}</div>
              <div className="stat-label">Companies</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{uniqueCities}</div>
              <div className="stat-label">Cities</div>
            </div>
          </div>

          {/* Table */}
          <div className="card-panel" id="employee-table-panel">
            <div className="table-wrapper">
              <table className="table employee-table" id="employee-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Company</th>
                  </tr>
                </thead>
                <tbody>
                  {allEmployees.map((emp) => (
                    <tr key={emp.id}>
                      <td>
                        <span className="id-badge">{emp.id}</span>
                      </td>
                      <td className="fw-semibold">{emp.name}</td>
                      <td>{typeof emp.email === 'string' ? emp.email.toLowerCase() : emp.email}</td>
                      <td>{emp.phone}</td>
                      <td>{emp.company?.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
