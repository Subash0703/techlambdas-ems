import React, { Fragment } from "react";
import { Collapse, Table } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

const EmployeeTable = ({ employees, expandedRow, setExpandedRow }) => {
  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <Table responsive className="g-5">
      <thead className="table-light">
        <tr>
          <th></th>
          <th className="py-3">SNo</th>
          <th className="py-3">Employee Name</th>
          <th className="py-3">Mobile Number</th>
          <th className="py-3">Location</th>
          <th className="py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, index) => (
          <Fragment key={employee.id}>
            <tr>
              <td className="text-center">
                <button
                  className={`plus-toggle border-0 ${
                    expandedRow === employee.id ? "plus-rot" : "plus"
                  }`}
                  onClick={() => toggleRow(employee.id)}
                >
                  <FaPlus />
                </button>
              </td>
              <td className="py-3">{index + 1}</td>
              <td className="py-3">{employee.name}</td>
              <td className="py-3">{employee.mobile}</td>
              <td className="py-3">{employee.location}</td>
              <td>
                <PiDotsThreeOutlineVerticalFill />
              </td>
            </tr>
            <tr>
              <td colSpan="6" className="p-0">
                <Collapse in={expandedRow === employee.id}>
                  <div id={`collapse-${employee.id}`}>
                    <div className="card">
                      <div className="card-body px-5 mx-5">
                        <Table className="">
                          <thead className="table-light">
                            <tr>
                              <th className="py-3">S.No</th>
                              <th className="py-3">Qualifications</th>
                              <th className="py-3">Percentage</th>
                            </tr>
                          </thead>
                          <tbody>
                            {employee.qualifications.map(
                              (qualification, uid) => (
                                <tr key={`${employee.id}-${uid}`}>
                                  <td className="py-3">{uid + 1}</td>
                                  <td className="py-3">{qualification.name}</td>
                                  <td className="py-3">
                                    {qualification.percentage}
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </Collapse>
              </td>
            </tr>
          </Fragment>
        ))}
      </tbody>
    </Table>
  );
};

export default EmployeeTable;
