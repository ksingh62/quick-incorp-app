"use client"
import { db } from "@/app/prototype/_utils/firebase";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useState, useMemo, useCallback, createContext } from "react";


const InvoicesContext = createContext();

export function InvoicesProvider({ children }) {
    const [invoices, setInvoices] = useState([]);
    const [noOfUsersAdded, setNoOfUsersAdded] = useState(0);

    const invoicesCollection = useMemo(() => collection(db, "invoices"), []);

    const getInvoices = useCallback(async () => {
        const invoicesDocs = await getDocs(invoicesCollection);
        const invoicesData = invoicesDocs.docs.map(doc => {
            return { ...doc.data(), date: new Date(doc.data().date), id: doc.id }
        })
        setInvoices(invoicesData)
    }, [invoicesCollection])

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


    return (
        <>
            <InvoicesContext.Provider value={{
                invoices,
                noOfUsersAdded,
                getInvoices,
                addInvoice,
                updateInvoice,
                deleteInvoice
            }}>
                {children}
            </InvoicesContext.Provider>
        </>
    )
}

export default InvoicesContext;