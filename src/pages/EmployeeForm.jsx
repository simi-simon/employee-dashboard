import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const INITIAL = { name: '', designation: '', location: '', salary: '' };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Name is required.';
  if (!values.designation.trim()) errors.designation = 'Designation is required.';
  if (!values.location.trim()) errors.location = 'Location is required.';
  if (!values.salary) {
    errors.salary = 'Salary is required.';
  } else if (isNaN(values.salary) || Number(values.salary) <= 0) {
    errors.salary = 'Enter a valid positive number.';
  }
  return errors;
}

function EmployeeForm({ onAddEmployee }) {
  const navigate = useNavigate();
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    /* Clear field error on change */
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    /* Validate single field on blur */
    const fieldErrors = validate(values);
    if (fieldErrors[name]) {
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setTouched({ name: true, designation: true, location: true, salary: true });

    if (Object.keys(validationErrors).length > 0) return;

    /* Register the employee in the shared state */
    onAddEmployee({ ...values });
    console.log('Employee submitted:', values);

    setSubmitted(true);
    setValues(INITIAL);
    setTouched({});

    /* Redirect to dashboard after a short delay so the user sees the success message */
    setTimeout(() => {
      setSubmitted(false);
      navigate('/');
    }, 1500);
  };

  const fields = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'e.g. Jane Doe',
    },
    {
      name: 'designation',
      label: 'Designation',
      type: 'text',
      placeholder: 'e.g. Software Engineer',
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text',
      placeholder: 'e.g. New York',
    },
    {
      name: 'salary',
      label: 'Salary (USD)',
      type: 'number',
      placeholder: 'e.g. 85000',
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="page-header" id="form-header">
        <h1>Add Employee</h1>
        <p>Fill out the form below to register a new employee</p>
      </div>

      {/* Success message */}
      {submitted && (
        <div className="success-toast" id="form-success" role="status">
          <i className="bi bi-check-circle-fill"></i>
          Employee added successfully! Redirecting to dashboard…
        </div>
      )}

      <div className="card-panel form-panel p-4 mt-3" id="employee-form-panel">
        <form onSubmit={handleSubmit} noValidate id="employee-form">
          {fields.map((field) => (
            <div className="mb-3" key={field.name}>
              <label htmlFor={field.name} className="form-label">
                {field.label}
              </label>
              <input
                type={field.type}
                className={`form-control ${
                  touched[field.name] && errors[field.name] ? 'is-invalid' : ''
                }`}
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                value={values[field.name]}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched[field.name] && errors[field.name] && (
                <div className="invalid-feedback">{errors[field.name]}</div>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="btn btn-primary-custom mt-2"
            id="submit-btn"
          >
            <i className="bi bi-send-fill me-2"></i>
            Submit Employee
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;
