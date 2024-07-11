import Link from "next/link";
import "./Navbar.css";
import { useUserAuth } from "@/app/prototype/_utils/auth-context";

export default function Navbar() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  return (
    <>
      <nav className="nav-bar">
        <div className="dropdown">
          <button className="dropbtn">Solutions</button>
          <div className="dropdown-content">
            <Link href="/prototype/solutions/item1">GST Calculator</Link>
            <Link href="/prototype/solutions/item2">Payroll Calculator</Link>
            <Link href="/prototype/solutions/item3">Currency Converter</Link>
            <Link href="/prototype/solutions/item4">Loan Calculator</Link>
            <Link href="/prototype/solutions/item5">
              Create a Business plan
            </Link>
          </div>
        </div>
        <div>
          <Link href={"/prototype/pricing"}>Pricing</Link>
        </div>
        <div>
          <Link href={"/prototype/library"}>Library</Link>
        </div>
        <div>
          <Link href={"/prototype/about"}>About us</Link>
        </div>
        <div>
          <Link href={"/prototype/faq"}>FAQs</Link>
        </div>
        <div className="button-container">
          {user ? (
            <>
              <Link href="/prototype/profile" className="user-info-button">
                @
                {user.auth.currentUser.reloadUserInfo.screenName ||
                  user.displayName ||
                  "No Name"}
              </Link>
              <button className="sign-out-button" onClick={firebaseSignOut}>
                Sign Out
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </nav>
    </>
  );
}
