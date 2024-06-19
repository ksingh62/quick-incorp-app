"use client";
import { useState, useRef, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import AddUserModal from "@/components/AddUserModal/AddUserModal";
import UpdateUserModal from "@/components/UpdateUserModal/UpdateUserModal";
import useEmployee from "@/hooks/useEmployee";

export default function Page() {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
  const userToUpdate = useRef({});
  const {
    employees,
    noOfUsersAdded,
    getEmployees,
    addEmployee,
    deleteEmployee,
    updateEmployee,
  } = useEmployee();

  const onDeleteClick = async (event, params) => {
    deleteEmployee(params.row.id);
  };
  const onUpdateClick = async (event, params) => {
    userToUpdate.current = params.row;
    setShowUpdateUserModal(true);
  };

  useEffect(() => {
    getEmployees();
  }, [getEmployees, noOfUsersAdded]);

  const columns = [
    { field: "eid", headerName: "Employee Id", headerClassName: "bg-purple-900" },
    { field: "name", headerName: "Name", headerClassName: "bg-purple-900" },
    { field: "age", headerName: "Age", headerClassName: "bg-purple-900" },
    { field: "email", headerName: "Email", headerClassName: "bg-purple-900" },
    { field: "p_number", headerName: "Phone Number", headerClassName: "bg-purple-900" },
    {
      field: "deleteUser",
      headerName: "Delete User",
      headerClassName: "bg-purple-900",
      renderCell: (params) => {
        return (
          <button
            className="bg-red-400 p-2 rounded-lg text-black"
            onClick={(event) => onDeleteClick(event, params)}
          >
            Delete
          </button>
        );
      },
    },
    {
      field: "updateUser",
      headerName: "Update User",
      headerClassName: "bg-purple-900",
      renderCell: (params) => {
        return (
          <button
            className="bg-green-400 p-2 rounded-lg text-black"
            onClick={(event) => onUpdateClick(event, params)}
          >
            Update
          </button>
        );
      },
    },
  ];

  return (
    <>
      <h1>Team</h1>
      <DataGrid rows={employees} columns={columns} sx={{ color: "white" }} />
      <button onClick={() => setShowAddUserModal(!showAddUserModal)}>
        Add Employee
      </button>
      {showAddUserModal && (
        <AddUserModal
          setShowModal={setShowAddUserModal}
          addEmployee={addEmployee}
        />
      )}
      {showUpdateUserModal && (
        <UpdateUserModal
          userToUpdate={userToUpdate}
          setShowModal={setShowUpdateUserModal}
          updateEmployee={updateEmployee}
        />
      )}
    </>
  );
}