"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./Sidebar.css";
import Link from "next/link";
import { useUserAuth } from "@/app/prototype/_utils/auth-context";
import { db } from "@/app/prototype/_utils/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function Sidebar() {
  const { user } = useUserAuth();
  const [unreadCount, setUnreadCount] = useState(0);

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

  return (
    <div className="sidebar">
      <div className="sidebar-logo-options-container">
        <Link href={`/prototype/homepage`} className="sidebar-logo-container">
          <img src="/logo-mobile.svg" alt="" />
          <p>QuickIncorp</p>
        </Link>

        <div className="sidebar-options">
          <div className="sidebar-option">
            <img src="/icon-board.svg" alt="" />
            <Link href="/prototype/form">Register a Company</Link>
          </div>

          <div className="sidebar-option active-sidebar-option">
            <img src="/icon-board.svg" alt="" />
            <Link href="/prototype/advisors">Book a Session with advisor</Link>
          </div>

          <div className="sidebar-option">
            <img src="/icon-board.svg" alt="" />
            <Link href="/prototype/tax">Tax Management</Link>
          </div>

          <div className="sidebar-option">
            <img src="/icon-board.svg" alt="" />
            <Link href="/prototype/inbox">Inbox</Link>
            {unreadCount > 0 && (
              <span className="unread-count">{unreadCount}</span>
            )}
          </div>
        </div>
      </div>
      <div className="sidebar-help-hide-container">
        <div className="sidebar-help-container">
          <div className="sidebar-option">
            <img src="/icon-board.svg" alt="" />
            <Link href="/prototype/support">Help & Support</Link>
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
