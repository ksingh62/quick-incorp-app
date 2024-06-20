import { EmployeeProvider } from "@/context/EmployeeProvider";
import Link from "next/link";

export default function AdminLayout({ children }) {
    return (
        <EmployeeProvider>
            <h2>Sidebar</h2>
            <nav className="flex gap-6">
                <Link href="/prototype/admin-dashboard/" className="text-red-600">Dashboard Home</Link>
                <Link href="/prototype/admin-dashboard/manage-teams" className="text-red-600">Manage Teams</Link>
                <Link href="/prototype/admin-dashboard/contacts" className="text-red-600">Contacts</Link>
                <Link href="/prototype/admin-dashboard/invoices" className="text-red-600">Invoices</Link>
                <Link href="/prototype/admin-dashboard/calendar" className="text-red-600">Calendar</Link>
                <Link href="/prototype/admin-dashboard/bar-chart" className="text-red-600">Bar Chart</Link>
                <Link href="/prototype/admin-dashboard/line-chart" className="text-red-600">Line Chart</Link>
                <Link href="/prototype/admin-dashboard/pie-chart" className="text-red-600">Pie Chart</Link>
            </nav>
            <div>{children}</div>
        </EmployeeProvider>
    )
}