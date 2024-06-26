"use client";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect, useRef } from "react";
import AddInvoiceModal from "@/components/AddInvoiceModal/AddInvoiceModal";
import UpdateInvoiceModal from "@/components/UpdateInvoiceModal/UpdateInvoiceModal";
import useInvoices from "@/hooks/useInvoices";

export default function Page() {
  const [showAddInvoiceModal, setShowAddInvoiceModal] = useState(false);
  const [showUpdateInvoiceModal, setShowUpdateInvoiceModal] = useState(false);
  const invoiceToUpdate = useRef({});
  const {
    invoices,
    noOfUsersAdded,
    getInvoices,
    addInvoice,
    updateInvoice,
    deleteInvoice
  } = useInvoices();

  useEffect(() => {
    getInvoices();
  }, [getInvoices, noOfUsersAdded])

  const onDeleteClick = async (event, params) => {
    deleteInvoice(params.row.id);
  };
  const onUpdateClick = async (event, params) => {
    invoiceToUpdate.current = params.row;
    setShowUpdateInvoiceModal(true);
  };


  const columns = [
    { field: 'invoiceId', headerName: 'Invoice ID', headerClassName: "bg-indigo-700 text-white", flex: 1 },
    { field: 'customerName', headerName: 'Customer Name', headerClassName: "bg-indigo-700 text-white", flex: 1 },
    { field: 'date', headerName: 'Date', headerClassName: "bg-indigo-700 text-white", flex: 1, type: "date" },
    { field: 'amount', headerName: 'Amount', headerClassName: "bg-indigo-700 text-white", flex: 1, type: 'number' },
    { field: 'status', headerName: 'Status', headerClassName: "bg-indigo-700 text-white", flex: 1 },
    {
      field: "deleteUser",
      headerName: "Delete User",
      headerClassName: "bg-indigo-700 text-white",
      renderCell: (params) => {
        return (
          <button
            className="bg-red-500 hover:bg-red-600 p-2 text-white rounded-xl"
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
      headerClassName: "bg-indigo-700 text-white",
      renderCell: (params) => {
        return (
          <button
            className="bg-indigo-500 hover:bg-indigo-600 p-2 rounded-lg text-white"
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
          <h1 className="text-3xl font-bold mb-6 text-center">Invoices</h1>
          <div className="mb-6">
            <DataGrid rows={invoices} columns={columns} sx={{color: "white"}} className="bg-gray-800 border border-gray-700 text-white" />
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => setShowAddInvoiceModal(!showAddInvoiceModal)}
              className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded"
            >
              Add Invoice
            </button>
          </div>
        </div>

        {showAddInvoiceModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <AddInvoiceModal addInvoice={addInvoice} setShowModal={setShowAddInvoiceModal} />
            </div>
          </div>
        )}

        {showUpdateInvoiceModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <UpdateInvoiceModal invoiceToUpdate={invoiceToUpdate} setShowModal={setShowUpdateInvoiceModal} updateInvoice={updateInvoice} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
