import React, { useEffect, useState } from "react";
import "./EmployeeData.css";
import Sidebar from "../screens/Sidebar/Sidebar";
import EmployeeTable from "./EmployeeTable";
import AddEmployeeForm from "./AddEmployeeForm";
import { VscBellDot } from "react-icons/vsc";

// Initial employee data
const initialEmployees = [
  {
    id: 1,
    name: "Ajith Kumar",
    mobile: "9876543210",
    location: "Kovilpatti",
    qualifications: [
      { id: 1, name: "HSC ABCD SCHOOL", percentage: "76%" },
      { id: 2, name: "ABCD COLLEGE OF ENG", percentage: "80%" },
    ],
  },
  {
    id: 2,
    name: "Naveen",
    mobile: "8765432768",
    location: "Kovilpatti",
    qualifications: [
      { id: 1, name: "HSC ABCD SCHOOL", percentage: "76%" },
      { id: 2, name: "ABCD COLLEGE OF ENG", percentage: "80%" },
    ],
  },
  {
    id: 3,
    name: "Prasath",
    mobile: "98765439876",
    location: "Kovilpatti",
    qualifications: [
      { id: 1, name: "HSC ABCD SCHOOL", percentage: "76%" },
      { id: 2, name: "ABCD COLLEGE OF ENG", percentage: "80%" },
    ],
  },
];

const EmployeeData = () => {
  const [employees, setEmployees] = useState(() => {
    const storedEmployees = localStorage.getItem("employees");
    return storedEmployees ? JSON.parse(storedEmployees) : initialEmployees;
  });

  const [expandedRow, setExpandedRow] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const handleAddEmployee = (newEmployee) => {
    const updatedEmployees = [
      ...employees,
      { ...newEmployee, id: employees.length + 1 },
    ];
    setEmployees(updatedEmployees);
    setShowForm(false);
  };

  return (
    <section className="container-fluid">
      <div className="row">
        <div className="col-lg-2 col-3 p-0">
          <Sidebar />
        </div>
        <div className="col-lg-10 col-9 p-0">
          <header className="header mb-4">
            <div className="header-content d-flex align-items-center justify-content-between my-3 border-2 border-bottom p-2 px-3">
              <p className="sidebar-text fw-semibold fs-5">Employee View</p>
              <VscBellDot className="fs-5" />
            </div>
          </header>
          <div className="px-3 d-flex justify-content-between align-items-center mb-3">
            <h5 className="title">All Employee</h5>
            <button
              type="button"
              className="btn btn-success new-btn p-2 px-3 border-0"
              onClick={() => setShowForm(true)}
            >
              + Add New
            </button>
          </div>
          {employees && employees.length > 0 ? (
            <EmployeeTable
              employees={employees}
              expandedRow={expandedRow}
              setExpandedRow={setExpandedRow}
            />
          ) : (
            <p className="text-center text-danger">No employees found</p>
          )}
          <AddEmployeeForm
            show={showForm}
            onHide={() => setShowForm(false)}
            onSubmit={handleAddEmployee}
          />
        </div>
      </div>
    </section>
  );
};

export default EmployeeData;
