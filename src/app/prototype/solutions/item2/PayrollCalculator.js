"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "@/components/Layout";
import "./PayrollCalculator.css";

const PayrollCalculator = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    income: "",
    province: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("/api/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleAddEmployee = async () => {
    try {
      await axios.post("/api/employees", newEmployee);
      fetchEmployees();
      setNewEmployee({ name: "", income: "", province: "" });
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const handleCalculate = async () => {
    try {
      const response = await axios.get("/api/calculate-payroll", {
        params: { employeeId: selectedEmployee },
      });
      setResults(response.data);
      setError(null);
    } catch (error) {
      console.error("Error calculating payroll tax:", error);
      setResults(null);
      setError("Failed to calculate payroll tax. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="payroll-calculator-container mx-auto text-center">
        <h1 className="payroll-calculator-title text-4xl font-semibold mb-6">
          Canadian Payroll Tax Calculator
        </h1>
        <div className="payroll-calculator-formGroup">
          <label htmlFor="name" className="payroll-calculator-label">
            Employee Name
          </label>
          <input
            type="text"
            id="name"
            value={newEmployee.name}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, name: e.target.value })
            }
            className="payroll-calculator-input"
          />
        </div>
        <div className="payroll-calculator-formGroup">
          <label htmlFor="income" className="payroll-calculator-label">
            Enter Income
          </label>
          <input
            type="number"
            id="income"
            value={newEmployee.income}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, income: e.target.value })
            }
            className="payroll-calculator-input"
          />
        </div>
        <div className="payroll-calculator-formGroup">
          <label htmlFor="province" className="payroll-calculator-label">
            Select Province
          </label>
          <select
            id="province"
            value={newEmployee.province}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, province: e.target.value })
            }
            className="payroll-calculator-select"
          >
            <option value="">Select Province</option>
            <option value="AB">Alberta</option>
            <option value="BC">British Columbia</option>
            <option value="MB">Manitoba</option>
            <option value="NB">New Brunswick</option>
            <option value="NL">Newfoundland and Labrador</option>
            <option value="NS">Nova Scotia</option>
            <option value="ON">Ontario</option>
            <option value="PE">Prince Edward Island</option>
            <option value="QC">Quebec</option>
            <option value="SK">Saskatchewan</option>
            <option value="NT">Northwest Territories</option>
            <option value="NU">Nunavut</option>
            <option value="YT">Yukon</option>
          </select>
        </div>
        <button
          onClick={handleAddEmployee}
          className="payroll-calculator-button"
        >
          Add Employee
        </button>

        <div className="payroll-calculator-formGroup mt-6">
          <label htmlFor="employee" className="payroll-calculator-label">
            Select Employee
          </label>
          <select
            id="employee"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="payroll-calculator-select"
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleCalculate} className="payroll-calculator-button">
          Calculate Payroll
        </button>

        {results && (
          <div className="payroll-calculator-results">
            <h2>Results</h2>
            <p>Federal Tax: ${results.federalTax}</p>
            <p>Provincial Tax: ${results.provincialTax}</p>
            <p>CPP: ${results.cpp}</p>
            <p>EI: ${results.ei}</p>
            <p>Net Income: ${results.netIncome}</p>
          </div>
        )}
        {error && <h2 className="payroll-calculator-error">{error}</h2>}
      </div>
    </Layout>
  );
};

export default PayrollCalculator;

//https://www.youtube.com/watch?v=QkPKPzTGqeA&pp=ygUoY3JlYXRlIGEgcGF5cm9sbCBjYWxjdWxhdG9yIHVzaW5nIGFwaSBqcw%3D%3D
