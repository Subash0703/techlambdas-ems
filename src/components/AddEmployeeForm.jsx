import React, { useState, useEffect } from "react";
import { Offcanvas, Form, InputGroup } from "react-bootstrap";
import { MdOutlineCancel } from "react-icons/md";

const AddEmployeeForm = ({ show, onHide, onSubmit }) => {
  const initialEmployeeState = {
    name: "",
    mobile: "",
    location: "",
    qualifications: [{ name: "", percentage: "" }],
  };
  const [newEmployee, setNewEmployee] = useState(initialEmployeeState);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (!show) {
      setNewEmployee(initialEmployeeState);
      setErrors("");
    }
  }, [show]);

  const handleInputChange = (field, value) => {
    setNewEmployee((prev) => ({ ...prev, [field]: value }));
  };

  const handleQualificationChange = (index, field, value) => {
    const updatedQualifications = [...newEmployee.qualifications];
    updatedQualifications[index][field] = value;
    setNewEmployee((prev) => ({
      ...prev,
      qualifications: updatedQualifications,
    }));
  };

  const addQualification = () => {
    setNewEmployee((prev) => ({
      ...prev,
      qualifications: [...prev.qualifications, { name: "", percentage: "" }],
    }));
  };

  const removeQualification = (index) => {
    const updatedQualifications = newEmployee.qualifications.filter(
      (_, i) => i !== index
    );
    setNewEmployee((prev) => ({
      ...prev,
      qualifications: updatedQualifications,
    }));
  };

  const handleSubmit = () => {
    const newErrors = {};

    if (!newEmployee.name) {
      newErrors.name = "Employee Name is required.";
    }

    if (newEmployee.mobile.length === 0) {
      newErrors.mobile = "Mobile Number is Empty";
    } else if (!newEmployee.mobile) {
      newErrors.mobile = "Mobile Number is required.";
    } else if (!/^\d{10}$/.test(newEmployee.mobile)) {
      newErrors.mobile = "Mobile Number must be 10 digits.";
    }

    if (newEmployee.qualifications.some((q) => !q.name || !q.percentage)) {
      newErrors.qualifications = "At least one qualification is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit(newEmployee);
    setNewEmployee(initialEmployeeState);
  };

  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      placement="end"
      backdrop={true}
      style={{ width: "30vw", height: "100vh" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Add New Employee</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="d-flex flex-column justify-content-between">
        <Form>
          <Form.Group>
            <Form.Label>
              Employee Name <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              className="border border-primary mb-2"
              value={newEmployee.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Ex : Peter"
            />
            {errors.name && <p className="text-danger">{errors.name}</p>}
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Mobile Number <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              className="border border-primary mb-2"
              value={newEmployee.mobile}
              onChange={(e) => handleInputChange("mobile", e.target.value)}
              placeholder="Ex : 9876543210"
            />
            {errors.mobile && <p className="text-danger">{errors.mobile}</p>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              className="border border-primary mb-2"
              value={newEmployee.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="Ex : Kovilpatti"
            />
          </Form.Group>
          <Form.Label className="qualify-title fs-4 fw-semibold mt-3">
            Qualification
          </Form.Label>
          {newEmployee.qualifications.map((qualification, index) => (
            <InputGroup className="d-flex align-items-center gap-2" key={index}>
              <Form.Control
                type="text"
                className="border border-primary rounded-2 mb-2"
                value={qualification.name}
                onChange={(e) =>
                  handleQualificationChange(index, "name", e.target.value)
                }
                placeholder="School / Degree"
                style={{ width: "65%" }}
              />
              <Form.Control
                type="text"
                className="border border-primary rounded-2 mb-2"
                value={qualification.percentage}
                onChange={(e) =>
                  handleQualificationChange(index, "percentage", e.target.value)
                }
                placeholder="%"
                style={{ width: "15%" }}
              />
              {newEmployee.qualifications.length > 1 && (
                <MdOutlineCancel
                  className="text-danger fs-4"
                  style={{ cursor: "pointer" }}
                  onClick={() => removeQualification(index)}
                />
              )}
            </InputGroup>
          ))}
          {errors.qualifications && (
            <p className="text-danger">{errors.qualifications}</p>
          )}
          <h5
            className="text-center my-4 qualify-add-btn"
            onClick={addQualification}
          >
            + Add New
          </h5>
        </Form>
        <div className="d-flex justify-content-end gap-3 flex-wrap">
          <button
            className="btn btn-light cancel-btn p-2 px-5"
            onClick={onHide}
          >
            Cancel
          </button>
          <button
            className="btn btn-success submit-btn p-2 px-5"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default AddEmployeeForm;
