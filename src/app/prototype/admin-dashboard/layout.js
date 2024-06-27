import { EmployeeProvider } from "@/context/EmployeeProvider";
import { InvoicesProvider } from "@/context/InvoicesProvider";
import Link from "next/link";

export default function AdminLayout({ children }) {
    return (
        <EmployeeProvider>
            <InvoicesProvider>
                <div className="min-h-screen flex">
                    <div className="bg-gray-800 text-white w-64 p-6">
                        <h2 className="text-2xl font-bold mb-6">Sidebar</h2>
                        <nav className="flex flex-col gap-4">
                            <Link href="/prototype/admin-dashboard/" className="text-white hover:text-indigo-300">
                                Dashboard Home
                            </Link>
                            <Link href="/prototype/admin-dashboard/manage-teams" className="text-white hover:text-indigo-300">
                                Manage Teams
                            </Link>
                            <Link href="/prototype/admin-dashboard/contacts" className="text-white hover:text-indigo-300">
                                Contacts
                            </Link>
                            <Link href="/prototype/admin-dashboard/invoices" className="text-white hover:text-indigo-300">
                                Invoices
                            </Link>
                            <Link href="/prototype/admin-dashboard/calendar" className="text-white hover:text-indigo-300">
                                Calendar
                            </Link>
                            <Link href="/prototype/admin-dashboard/bar-chart" className="text-white hover:text-indigo-300">
                                Bar Chart
                            </Link>
                            <Link href="/prototype/admin-dashboard/line-chart" className="text-white hover:text-indigo-300">
                                Line Chart
                            </Link>
                            <Link href="/prototype/admin-dashboard/pie-chart" className="text-white hover:text-indigo-300">
                                Pie Chart
                            </Link>
                        </nav>
                    </div>
                    <div className="flex-1">
                        {children}
                    </div>
                </div>
            </InvoicesProvider>
        </EmployeeProvider>
    )
}
