import Link from "next/link";

export default function AdminLayout({ children }) {
    return <>
        <h2>Sidebar</h2>
        <nav className="flex gap-6">
            <Link href="/prototype/admin-dashboard/" className="text-red-600">Dashboard Home</Link>
            <Link href="/prototype/admin-dashboard/manage-teams" className="text-red-600">Manage Teams</Link>
        </nav>
        <div>{children}</div>
    </>
}