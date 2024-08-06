/* eslint-disable @next/next/no-img-element */
"use client";
import Navbar from "@/components/Navbar/Navbar";
import "./page.css";
import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <nav className="nav-bar">
        <Link href={`/`} className="sidebar-logo-container">
          <img src="/logo-mobile.svg" alt="" />
          <p>QuickIncorp</p>
        </Link>
        <div className="dropdown">
          <button className="dropbtn">Solutions</button>
          <div className="dropdown-content">
            <Link href="/prototype/solutions/item1"></Link>
            <Link href="/prototype/solutions/item2"></Link>
            <Link href="/prototype/solutions/item3"></Link>
            <Link href="/prototype/solutions/item4"></Link>
            <Link href="/prototype/solutions/item5"></Link>
          </div>
        </div>
        <div>
          <Link href={"/prototype/pricing"}>Pricing</Link>
        </div>
        <div>
          <Link href={"/prototype/library"}>Library</Link>
        </div>
        <div>
          <Link href={"/prototype/about"}>About Us</Link>
        </div>
        <div>
          <Link href={"/prototype/faq"}>FAQs</Link>
        </div>
        <div className="button-container">
          <Link href={`/prototype`} className="user-info-button">
            Login
          </Link>
          <Link href={`/prototype`} className="bg-sky-500 rounded-xl p-2">
            Get Started!
          </Link>
        </div>
      </nav>

      <div className="landing-page-container">
        <div className="content-container">
          <h1 className="landing-page-heading">
            Start your Business today with QuickIncorp
          </h1>
          <p className="landing-page-para-1">
            QuickIncorp offers seamless business incorporation services,
            ensuring a smooth start for your venture. Our expert team handles
            all legal formalities, saving you time and effort. With a
            user-friendly platform, we provide ongoing support for compliance
            and growth. Trust QuickIncorp to turn your business vision into
            reality with efficiency and professionalism.
          </p>
          <p className="landing-page-para-2">
            We go beyond incorporation with tax management, legal compliance,
            and financial planning. Our technology and expertise guarantee a
            superior experience. Join thousands of entrepreneurs who have
            successfully launched their businesses with QuickIncorp. Let us help
            you focus on growing your business.
          </p>
        </div>
        <div className="landing-page-image-container">
          <img src="/bg.svg" alt="" />
        </div>
      </div>
    </>
  );
}
