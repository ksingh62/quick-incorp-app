import InvoicesContext from "@/context/InvoicesProvider";
import { useContext } from "react";
export default function useInvoices() {
    return useContext(InvoicesContext);
}