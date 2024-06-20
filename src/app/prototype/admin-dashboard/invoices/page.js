"use client";
import { DataGrid } from "@mui/x-data-grid";
import { db } from "../../_utils/firebase";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import AddInvoiceModal from "@/components/AddInvoiceModal/AddInvoiceModal";
import UpdateInvoiceModal from "@/components/UpdateInvoiceModal/UpdateInvoiceModal";
export default function Page() {
  const invoicesCollection = collection(db, "invoices");
  const [invoices, setInvoices] = useState([]);

  const [showAddInvoiceModal, setShowAddInvoiceModal] = useState(false);
  const [showUpdateInvoiceModal, setShowUpdateInvoiceModal] = useState(false);
  const invoiceToUpdate = useRef({});
  const [noOfUsersAdded, setNoOfUsersAdded] = useState(0);

  const getInvoices = async () => {
    const invoicesDocs = await getDocs(invoicesCollection);
    const invoicesData = invoicesDocs.docs.map(doc => {
      return { ...doc.data(), date: new Date(doc.data().date), id: doc.id }
    })
    setInvoices(invoicesData);
  }

  const addInvoice = async (invoiceToAdd) => {
    await addDoc(invoicesCollection, invoiceToAdd);
    setNoOfUsersAdded(noOfUsersAdded + 1);
  }

  const updateInvoice = async (invoiceDocId, newInvoiceInfo) => {
    const invoice = doc(db, "invoices", invoiceDocId);
    const res = await updateDoc(invoice, newInvoiceInfo);
    setNoOfUsersAdded(noOfUsersAdded + 1);
  }

  const deleteInvoice = async (invoiceDocId) => {
    const invoice = doc(db, "invoices", invoiceDocId);
    await deleteDoc(invoice);
    setNoOfUsersAdded(noOfUsersAdded - 1);
  }

  useEffect(() => {
    getInvoices();
  }, [noOfUsersAdded])

  const onDeleteClick = async (event, params) => {
    deleteInvoice(params.row.id);
  };
  const onUpdateClick = async (event, params) => {
    // console.log(params.row);
    invoiceToUpdate.current = params.row;
    setShowUpdateInvoiceModal(true);
  };


  const columns = [
    { field: 'invoiceId', headerName: 'Invoice ID', headerClassName: "bg-purple-900", flex: 1 },
    { field: 'customerName', headerName: 'Customer Name', headerClassName: "bg-purple-900", flex: 1 },
    { field: 'date', headerName: 'Date', headerClassName: "bg-purple-900", flex: 1, type: "date" },
    { field: 'amount', headerName: 'Amount', headerClassName: "bg-purple-900", flex: 1, type: 'number' },
    { field: 'status', headerName: 'Status', headerClassName: "bg-purple-900", flex: 1 },
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
      <DataGrid rows={invoices} columns={columns} sx={{ color: "white" }} />
      <button onClick={() => setShowAddInvoiceModal(!showAddInvoiceModal)}>Add Invoice</button>
      {showAddInvoiceModal && <AddInvoiceModal addInvoice={addInvoice} setShowModal={setShowAddInvoiceModal} />}
      {showUpdateInvoiceModal && <UpdateInvoiceModal invoiceToUpdate={invoiceToUpdate} setShowModal={setShowUpdateInvoiceModal} updateInvoice={updateInvoice} />}
    </>
  );
}
