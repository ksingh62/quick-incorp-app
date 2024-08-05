"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUserAuth } from "@/app/prototype/_utils/auth-context";
import { db } from "@/app/prototype/_utils/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { usePathname } from "next/navigation";
import "./Sidebar.css";

export default function Sidebar() {
  const { user } = useUserAuth();
  const [unreadCount, setUnreadCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "emails"),
        where("to", "==", user.email),
        where("read", "==", false)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setUnreadCount(querySnapshot.size);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const isActive = (path) => {
    return pathname === path ? "active-sidebar-option" : "";
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo-options-container">
        <Link href="/prototype/homepage" className="sidebar-logo-container">
          <img src="/logo-mobile.svg" alt="QuickIncorp Logo" />
          <p>QuickIncorp</p>
        </Link>

        <div className="sidebar-options">
          <div className={`sidebar-option ${isActive("/prototype/form")}`}>
            <img src="/icon-board.svg" alt="Register a Company" />
            <Link href="/prototype/form">Register a Company</Link>
          </div>

          <div className={`sidebar-option ${isActive("/prototype/advisors")}`}>
            <img src="/icon-board.svg" alt="Book a Session with Advisor" />
            <Link href="/prototype/advisors">Book a Session with Advisor</Link>
          </div>

          <div className={`sidebar-option ${isActive("/prototype/tax")}`}>
            <img src="/icon-board.svg" alt="Tax Management" />
            <Link href="/prototype/tax">Tax Management</Link>
          </div>

          <div className={`sidebar-option ${isActive("/prototype/inbox")}`}>
            <img src="/icon-board.svg" alt="Inbox" />
            <Link href="/prototype/inbox">Inbox</Link>
            {unreadCount > 0 && (
              <span className="unread-count">{unreadCount}</span>
            )}
          </div>
        </div>
      </div>
      <div className="sidebar-help-hide-container">
        <div className="sidebar-help-container">
          <div className={`sidebar-option ${isActive("/prototype/support")}`}>
            <img src="/icon-board.svg" alt="Help & Support" />
            <Link href="/prototype/support">Help & Support</Link>
          </div>

          <div className="sidebar-option">
            <img src="/icon-board.svg" alt="Settings" />
            <p>Settings</p>
          </div>
        </div>
        <div className="hide-container">
          <div className="sidebar-option">
            <img src="/icon-hide-sidebar.svg" alt="Hide Sidebar" />
            <p>Hide Sidebar</p>
          </div>
        </div>
      </div>
    </div>
  );
}
