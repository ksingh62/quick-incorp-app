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
    { field: "eid", headerName: "Employee Id", headerClassName: "bg-indigo-700", flex: 1 },
    { field: "name", headerName: "Name", headerClassName: "bg-indigo-700", flex: 1 },
    { field: "age", headerName: "Age", headerClassName: "bg-indigo-700", flex: 1 },
    { field: "email", headerName: "Email", headerClassName: "bg-indigo-700", flex: 1 },
    { field: "p_number", headerName: "Phone Number", headerClassName: "bg-indigo-700", flex: 1 },
    {
      field: "deleteUser",
      headerName: "Delete User",
      headerClassName: "bg-indigo-700",
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
      headerClassName: "bg-indigo-700",
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
    <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Team</h1>
            <div className="bg-gray-800 border border-gray-700 text-white rounded-lg p-4 mb-6">
                <DataGrid
                    rows={employees}
                    columns={columns}
                    autoHeight
                    className="bg-gray-800 border border-gray-700 text-white"
                    sx={{
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: 'rgb(100, 96, 199)',
                        },
                        '& .MuiDataGrid-cell': {
                            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                        },
                        '& .MuiDataGrid-footerContainer': {
                            backgroundColor: 'rgb(67, 56, 202)',
                        },
                        color: "white",
                    }}
                />
            </div>
            <div className="flex justify-center">
                <button
                    onClick={() => setShowAddUserModal(!showAddUserModal)}
                    className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded"
                >
                    Add Employee
                </button>
            </div>
        </div>

        {showAddUserModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <AddUserModal setShowModal={setShowAddUserModal} addEmployee={addEmployee} />
                </div>
            </div>
        )}

        {showUpdateUserModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <UpdateUserModal userToUpdate={userToUpdate} setShowModal={setShowUpdateUserModal} updateEmployee={updateEmployee} />
                </div>
            </div>
        )}
    </div>
</>
  );
}