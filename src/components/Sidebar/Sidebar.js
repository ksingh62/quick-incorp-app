/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import "./Sidebar.css";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo-options-container">
        <Link href={`/prototype/homepage`} className="sidebar-logo-container">
          <img src="/logo-mobile.svg" alt="" />
          <p>QuickIncorp</p>
        </Link>

        <div className="sidebar-options">
          <div className="sidebar-option ">
            <img src="/icon-board.svg" alt="" />
            <Link href='/prototype/register'>Register a Company</Link>
          </div>

          <div className="sidebar-option active-sidebar-option">
            <img src="/icon-board.svg" alt="" />
            <Link href='/prototype/homepage'>Book a Session with advisor</Link>
          </div>

          <div className="sidebar-option">
            <img src="/icon-board.svg" alt="" />
            <Link href='/prototype/tax'>Tax Management</Link>
          </div>

          <div className="sidebar-option">
            <img src="/icon-board.svg" alt="" />
            <Link href='/prototype/inbox'>Inbox</Link>
          </div>
        </div>
      </div>
      <div className="sidebar-help-hide-container">
        <div className="sidebar-help-container">
          <div className="sidebar-option">
            <img src="/icon-board.svg" alt="" />
            <p>Help & Support</p>
          </div>

          <div className="sidebar-option">
            <img src="/icon-board.svg" alt="" />
            <p>Settings</p>
          </div>
        </div>
        <div className="hide-container">
          <div className="sidebar-option">
            <img src="/icon-hide-sidebar.svg" alt="" />
            <p>Hide Sidebar</p>
          </div>
        </div>
      </div>
    </div>
  );
}
