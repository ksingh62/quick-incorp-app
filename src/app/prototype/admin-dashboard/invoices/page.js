"use client";
import { DataGrid } from "@mui/x-data-grid";
import { db } from "../../_utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
export default function Page() {
  const invoicesCollection = collection(db, "invoices");
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const getInvoices = async () => {
      const invoicesDocs = await getDocs(invoicesCollection);
      const invoicesData = invoicesDocs.docs.map(doc => {
        return { ...doc.data(), date: new Date(doc.data().date), id: doc.id }
      })
      setInvoices(invoicesData);
    }
    getInvoices();

  }, [])


  const columns = [
    { field: 'invoiceId', headerName: 'Invoice ID', headerClassName: "bg-purple-900", flex: 1 },
    { field: 'customerName', headerName: 'Customer Name', headerClassName: "bg-purple-900", flex: 1 },
    { field: 'date', headerName: 'Date', headerClassName: "bg-purple-900", flex: 1, type: "date" },
    { field: 'amount', headerName: 'Amount', headerClassName: "bg-purple-900", flex: 1, type: 'number' },
    { field: 'status', headerName: 'Status', headerClassName: "bg-purple-900", flex: 1 },
  ];

  return (
    <>
      <h1>Team</h1>
      <DataGrid rows={invoices} columns={columns} sx={{ color: "white" }} />
    </>
  );
}
